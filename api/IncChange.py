from flask_restful import Api, Resource, reqparse
import json
import threading
import time
from operator import itemgetter, truediv
from common import cache

#player number and count
pnum_count = [[]]

#base table to analyze
p_analyze = [[]]
#setting p_analyze

def watching():
  t_stop = False
  time.sleep(1)
  print("In Watcher")
  while not t_stop:
    t = False #uncounted vars
    for line in p_analyze:
      if line[4] == 0:
        print("Watcher found untalled node at:", line)
        t = True
        break
    if t == True:
      print("Watcher is still watching")
      time.sleep(10)
    else:
      #could not find uncounted var
      print("Threads will stop running")
      t_stop = True
      #print(pnum_count)

def analyze_years():
    pnum_count.clear()
    p_analyze.clear()
    #create a new table to scan with another variable at the end, it will indicate whether player+year has been tallied already, 0 = no, 1 = yes
    new_table = cache.get("player_table")
    for line in new_table:
      line.append(0)
      p_analyze.append(line)
    
    p_analyze.pop(0)
    print(p_analyze[0])
    #set_p_analyze(new_table)
    #cache.set("player_analyze", new_table)
    #player ids that will be used by threads to search and talley player's years in the league
    

    #checker to stop threads
    check = threading.Thread(target = watching)
    check.start()
    #creating runner threads
    search_and_talley()
    sort_talley()

#bool var to tell threads to stop
t_stop = False
#search through new player table and talley player's years in the league
def search_and_talley():
    print("In beginning Search and talley")
    #talley, but each will start at a different number
    
    for line in range(0,len(p_analyze)):
      current_pid = 0
      current_count = 0
      years = [""]
      
      #check if threads need to stop as everything has been hit
      #if t_stop == True:
       # break
      #check if it has been used already, if not continue
      #try:
      if p_analyze[line][4] == 0:
        #we can use, and write it is in use
        p_analyze[line][4] = 1
        #player id is in third column
        current_pid = p_analyze[line][2]
        current_count = 1
          #add year to years for later check, in col 3
        years[0] = p_analyze[line][3]
      else:
        continue
      #except IndexError:
       # print(line)
        #print(" Line number giving error \n")

      #create nested for loop to look through table and find entries that match the current_pid
      #for mplayers in range(0,len(p_analyze)):
      for mplayers in range(0,len(p_analyze)):
        #skip if we are on the "line" entry as we are comparing same thing
        if mplayers == line:
          continue
        #check if it entry is used, if so move onto next
        if p_analyze[mplayers][4] == 1:
          continue
        #otherwise, check if node is same player, if so not, move on,if so, use it and increase count
        if p_analyze[mplayers][2] != current_pid:
            continue
        #check if player has been found in a year already, if so mark it, but do not increase count and continue
        #need to check years and add them to list to iterate through
        found_y = False
        for year in years:
          #if found, mark bool true and break out of loop, else continue search
          if p_analyze[mplayers][3] == year:
            found_y = True
            break

        #check if for loop found year, if it did, move onto the next entry after marking it used
        if found_y == True:
          p_analyze[mplayers][4] = 1
          continue
        #if passed all of the checks, mark node as used and increase count and add year to list
        else:
            #marking node as used
            p_analyze[mplayers][4] = 1
            #adding year to years
            years.append( p_analyze[mplayers][3])
            #increasing count(years played)
            current_count +=1
      #for loop ends, all years(other entries for the player) have been found and documented, add player id + # years to pnum_count
      if current_pid != 0:
        list1 = [current_pid,current_count]
        pnum_count.append(list1)

    #add pnum_count to cache for use later
    cache.set("PYear_Count",pnum_count)
    #print(p[p_num])
    
   # print(threading.get_ident() + " has stopped running")

def sort_talley():
    a = sorted(cache.get("PYear_Count"), key = itemgetter(1), reverse=True)
    #years_count.pop(0)
    #reset vars
    #years in league and number of players with that
    years_count = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0]] 
    
    for i in a:
       
      test = i[1]-1
      try:
        years_count[test][1] +=1
      except IndexError:
        print("Index gives an error")
        print(test)
        print('\n')
    cache.set("Years_Count",years_count)


def incAdd(id,year):
  print("In IncAdd")
  player_table = cache.get("player_table")
  year_c =0
  #run through player_table and count how many entries with this year and this id exist, should be one for us to continue
  for line in player_table:
    if line[2] == id and line[3] == year:
      print("Found 1 occurence")
      year_c +=1
    else:
      continue
  #check count, greater than 1, we do nothing
  if year_c == 1:
    #check if player exists in PYear_Count
    pyear_table = cache.get("PYear_Count")
    id_there = False
    print("Going to find line in pyear_table")
    for line in pyear_table:
      if line[0] == id:
        #check to let function know it exists
        id_there = True
        #store year, add one to it and update pyear_table, update cache, break
        playtime = line[1]
        line[1] +=1
        cache.set("PYear_Count", pyear_table)
        print(playtime)
        print(line[1])
        updateSort(playtime, playtime+1)
        break

        
    #if False, id did not exist, we need to add, add 1 to count, send to update sort
    if id_there == False:
      temp = [id, 1]
      pyear_table.append(temp)
      cache.set("PYear_Count", pyear_table)
      updateSort(0,1)

def updateSort(y1,y2):
  #sent 2 year vals, one before change, one after change
  #if this is the case, have two vals to change, decrease y1 and increase y2
  y_count = cache.get("Years_Count")
  if y1 !=0:
    print("In updated sort")
    d1 = False
    d2 = False
    for line in y_count:
      if line[0] == y1:
        print(line[1])
        line[1]  -=1
        print(line[1])
        d1 = True
      elif line[0] == y2:
        print(line[1])
        line[1] +=1
        print(line[1])
        d2 = True
      if d1 == True and d2 == True:
        break
  else:
    for line in y_count:
      if line[1] == y2:
        line[2]  +=1
        break
  print(y_count)
  cache.set("Years_Count", y_count)

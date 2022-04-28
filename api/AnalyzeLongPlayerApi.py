from flask_restful import Api, Resource, reqparse
import json
import threading
import time
from common import cache

#player number and count
pnum_count = [[]]

#base table to analyze
p_analyze = [[]]
#setting p_analyze
def set_p_analyze(new_t):
  for line in new_t:
   p_analyze.append(line)
  

#bool var to tell threads to stop
t_stop = False
#search through new player table and talley player's years in the league
def search_and_talley(self,p_num):
    #talley, but each will start at a different number
    current_pid = 0
    current_count = 0
    for line in range(p_num,7228):
      years = [""]
      #check if threads need to stop as everything has been hit
      if t_stop == True:
        break
      #check if it has been used already, if not continue
      try:
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
      except IndexError:
        print(line)
        print(" Line number giving error \n")

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
          p_analyze[mplayers][4] == 1
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

    print(self.p[p_num])

   # print(threading.get_ident() + " has stopped running")

#search through new p_table and check var 5
def watching():
  t_stop = False
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
      print(pnum_count)

    

class AnalyzeLongPlayerApi(Resource):
  p = [0,0,0,0,0,0,0,0,0,0]
  def __init__(self):
    #create a new table to scan with another variable at the end, it will indicate whether player+year has been tallied already, 0 = no, 1 = yes
    new_table = cache.get("player_table")
    for line in new_table:
      line.append(0)
      p_analyze.append(line)
    p_analyze.pop(0)
    p_analyze.pop(0)
    print(p_analyze[0])
    #set_p_analyze(new_table)
    #cache.set("player_analyze", new_table)
    #player ids that will be used by threads to search and talley player's years in the league
    self.p[0] = 0
    self.p[1] = 1
    self.p[2] = 2
    self.p[3] = 3
    self.p[4] = 4
    self.p[5] = 5
    self.p[6] = 6
    self.p[7] = 7
    self.p[8] = 8
    self.p[9] = 9

    #checker to stop threads
    check = threading.Thread(target = watching)
    check.start()
    #creating runner threads
    for i in range(10):
      t = threading.Thread(target = search_and_talley, args =(self, i))
      t.start()  
     

  
    

  #should return top ten players who have played in the NBA the longest
  def get(self):
    pnum_count.pop(0)
    return {
      'resultStatus': 'SUCCESS',
      'message': pnum_count
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)
    parser.add_argument('field', type=str)
    parser.add_argument('new_val', type=str)

    args = parser.parse_args()

    #print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_type = args['type']
    request_json = args['message']
    #try:
     # request_field = args['field']
      #request_new = args['new_val']
    #except:
     # print("No ")


    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json
    #if status is update, then we have two other fields
    if ret_status == 'Update':
      request_field = args['field']
      request_new = args['new_val']
    #grabbing cache to modify
    data = [[]]
    data = cache.get("player_table")

    if ret_status == 'Add':
      #perform addition of message to player object
      print(ret_status)
      print(ret_msg)
      new_player = []
      new_player = ret_msg.split(",")
      #NEED TO CHECK IF WE HAVE 4 COLUMNS HERE OR BEFORE DATA IS PASSED BEFORE ADDING TO CACHE
      print(new_player)
      
      data.append(new_player)
      #updating cache with new table
      cache.set("player_table", data)
      

    elif ret_status == 'Delete':
      #perform deletion of object in cache corresponding to all data, player name, player id, team id, and year
      print(ret_status)
      print(ret_msg)
      #can send all 4 datapoints if needed
      remove_player = []
      remove_player = ret_msg.split(",")
      print(remove_player)
      #remove_player[0] = player name, remove_player[1]=player id, remove_player[2] = team id, remove_player[3] = year
      #search for entry(s)that correspond to values and delete row(s)
      for list in data:
        #compare 4 values and if they equal, delete list
        
        if list[3] == remove_player[3] and list[2] == remove_player[2] and list[1] == remove_player[1] and list[0] == remove_player[0]:
          print("Player removed\n")
          data.remove(list)
          # #updating cache with new table
          cache.set("player_table", data)
           
        else:
          continue
    elif ret_status == 'Edit':
      #check and see how Jasmine wants to do this, might just call delete, then add 
        pass
    if ret_msg:
      message = "Your Operation concluded."
    else:
      message = "No Msg"
    
    final_ret = {"status": ret_status, "message": message}

    return final_ret
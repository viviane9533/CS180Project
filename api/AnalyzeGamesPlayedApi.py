from flask_restful import Api, Resource, reqparse
from operator import itemgetter
import json
import threading
import time
from common import cache

player_games = [[]]
player_games_sum = [[]]


def sum_games(self, lock1):
  #temporary player that will be added to player_games_sum
  
  #player_t = []
  
  a= 0
  print(lock1)
  print(len(player_games))
  print("Arrived in Sum")
  print(player_games[0])
  for line in player_games:
    #player_t.clear()
    #increase the count var a
    a +=1
    #check if player has been counted(will show up in col 4)
    if line[3] == 1:
      #print(line)
      continue
    else:
      
      player_id = line[0]
      player_name = line[1]
      count = 1
      line[3] =1
      for entry in range(a,len(player_games)):
        if player_games[entry][0] == player_id:
          #checking if id is equal, if so, we check if player has been used
          if player_games[entry][3] == 1:
            continue
          else:
            #add one to count and change player_games[entry][3] to one
            player_games[entry][3] = 1
            count +=1
      #after we checked every other entry, we can set player_t to the player_id, player name, and count for game count
      #player_t.append(player_id)
      #player_t.append(player_name)
      #player_t.append(count)
      player_t = [player_id,player_name, count]
      #print(player_t)
      player_games_sum.append(player_t)
    #now we are done with the outer loop and all of the player entries should exist in the program
  print(player_games_sum[0])
  player_games_sum.pop(0)
  cache.set("Games", sorted(player_games_sum, key = itemgetter(2), reverse=True))




 
class AnalyzeGamesPlayedApi(Resource):
  
  
  def __init__(self):
    #create a new table to scan with another variable at the end, it will indicate whether player+year has been tallied already, 0 = no, 1 = yes
    
    if len(player_games_sum) < 2:
      new_table = cache.get("player_games_table")
      player_games.clear()
      a=0
      for line in new_table:
        line.append(int(0))
        player_games.append(line)
        if a==0:
          #player_games_sum.append(line)
          a+=1
      player_games.pop(0)
      print(player_games_sum[0])
      
      print(player_games_sum[0])
      print(player_games[0])
      sum_games(self,0)
    
    
    
    #set_p_analyze(new_table)
  
    
    #for i in range(0,4):
     # t = threading.Thread(target = search_and_talley, args =(self, i))
      #t.start()  
    
    #pnum_count.pop(0)


  #should return top 100 players who have played in the NBA the longest
  def get(self):

    #a = sorted(player_games_sum, key = itemgetter(2), reverse=True)
    #b = a[:20]
    #years_count.pop(0)
    #reset vars
    #years in league and number of players with that
    return {
      'resultStatus': 'SUCCESS',
      'message': cache.get("Games")
      }

  def post(self):
    print(self)
    
    
    final_ret = {"status": "No Post", "message": "This Api does not post"}

    return final_ret
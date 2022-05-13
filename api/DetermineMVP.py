from flask_restful import Api, Resource, reqparse
import json
import threading
import time
from operator import itemgetter, truediv
from common import cache


def findMVPS():
    #pull mvp_games_table to grab points scored by each player, stored in [3], their team id is [4]
    #pull game_data to find winning team id, only scan players with this id
    #pull team_table to find and translate team id to actual team ([7]+ [5] = city + team name, [1] = team id)
    #sorting by gameID, in column5
    mvp_table = sorted(cache.get("mvp_games_table"), key = itemgetter(2), reverse=True)
    #sorting by gameID, which I put in column 1
    game_data = sorted(cache.get("game_data"), key = itemgetter(0), reverse=True)

    print(len(game_data))

    team_table = cache.get("team_table")

    #populate the following table with gameid, winning team(city + name), date, mvp from winning team, pts scored
    mvp_games = [[]]
    count = 0
    for i in range(len(game_data)):
        gameID = game_data[i][0]
        teamID = game_data[i][2]
        mvp_pid = "\n"
        mvp_scored = 0
        found = False
        
        for entry in range(len(mvp_table)):
            #gameID is in column 3
            #all players of game are next to one another
            if mvp_table[entry][2] == gameID:
                count +=1
            if mvp_table[entry][2] != gameID and found == False:
                continue
            elif found == False and mvp_table[entry][2] == gameID:
                found = True

            if found == True and mvp_table[entry][2] == gameID:
                #found gameID now we can find who scored the most in it
                #set initial mvp to this entry
                
                #print(mvp_table[entry][4])
                if mvp_table[entry][4] == teamID:
                    #print(mvp_table[entry])
                    if mvp_scored <=0:
                        mvp_pid = mvp_table[entry][1]
                        temp = mvp_table[entry][3]
                        #print(temp)
                        mvp_scored = float(temp)
                        continue
                    else:
                    #now we compare current player's score with 
                        temp = mvp_table[entry][3]
                        #print(temp)
                        if mvp_scored < float(temp):
                            mvp_scored = float(temp)
                            mvp_pid = mvp_table[entry][1]
                        else:
                            continue
            elif found == True and mvp_table[entry][2] != gameID:
                
                break
                #do not need to look, we have found the mvp and looked at all of the players for this game
                #print(count)
                #count = 0
                #break
            
        #print(count)       
        #mvp vars should have player that has most wi
        #find line[2] in team data
        t_name = ""
        for a in team_table:
            if a[1] == game_data[i][2]:
                t_name = a[7] + " " + a[5]
                break
        temp_entry = [game_data[i][0],game_data[i][1],t_name,mvp_pid,mvp_scored]
        mvp_games.append(temp_entry)
        count +=1
        if count > len(game_data):
            print("Reached last elem of game_mvp")
            break
        #print(count)
    #need to pop out the first two elems
    mvp_games.pop(0)
    mvp_games[0][0] = "Game ID"
    mvp_games[0][1] = "Game Date"
    mvp_games[0][2] = "Winning Team"
    mvp_games[0][3] = "MVP"
    mvp_games[0][4] = "Points Scored"
    cache.set("Game_MVPS", mvp_games)
    print("Finished MVP")
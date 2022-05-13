from flask import Flask,send_from_directory, redirect, url_for, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from api.ImportDataApi import ImportDataApi
from api.ImportTeamDataApi import ImportTeamDataApi
from api.AnalyzeLongPlayerApi import AnalyzeLongPlayerApi 
from api.AnalyzeGamesPlayedApi import AnalyzeGamesPlayedApi
from api.FindMVPApi import FindMVPApi

from flask_cors import CORS
from api.IncChange import *#comment this on deployment
from api.DetermineMVP import *
# Import cache
from common import cache
import atexit



app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

#opening 1 db
playerData = []
teamData = []
playerGames =[] 
mvp_games = []
gameData = []

with open('players.csv', 'r') as inputfile:
    for line in inputfile:
        playerData.append(line.split(","))

with open('teams.csv', 'r') as inputfile:
    for line in inputfile:
        teamData.append(line.split(","))

#play time is in col 10
#added points scored from [27] on (5/12/22)
with open('games_details.csv', 'r') as inputfile:
    for line in inputfile:
        a = line.split(',')
        if a[9] == '' or a[8] != '':
            #no playtime, so skip
            continue
        else:
            
            #player id, player name, game id
            player_temp = [a[4],a[5],a[0]]
            #for counting mvp
            player_temp2 = [a[4],a[5],a[0], a[27], a[1]]
            if player_temp2[0] == '2039' and player_temp2[1] == 'Keyon Dooling' and player_temp2[2] == '41200174':
                print(player_temp2)
            #print(player_temp)
            playerGames.append(player_temp)
            mvp_games.append(player_temp2)

b = '\n'.join('\t'.join(x for x in y) for y in playerData)

#load up data from game table, show winning team and 
with open('games.csv', 'r') as inputfile2:
    for line in inputfile2:
        a=line.split(',')
        #adding game id and game date to game_temp
        game_temp = [a[1],a[0]]
        #check whether 21 is 0 or 1
        #0 means visitor won, grab their team id, col 5
        #1 means home won, grab their team id, col 4
        if a[20] =="0\n":
            game_temp.append(a[4])
        elif a[20] =="1\n":
            game_temp.append(a[3])
        else:
            print(a[20])
            game_temp.append("Winning Team ID")
        gameData.append(game_temp)
c = 0
for item in gameData:
    c+=1
print(gameData[0])       
print(c)  

#set up and add data to cache
cache.init_app(app=app, config={"CACHE_TYPE": "FileSystemCache",'CACHE_DIR': '/tmp'})

cache.set("player_table", playerData)
cache.set("team_table", teamData)
cache.set("player_games_table", playerGames)
cache.set("mvp_games_table",mvp_games)
cache.set("game_data",gameData)

playerGames.clear()
playerData.clear()
teamData.clear()

#defining function to run on shutdown
def updateDB():
    data_set = []
    data_set = cache.get("player_table")
    output_file = open("players2.csv","w")
    line = ""
    for entry in data_set:
        line = ""
        a=0
        for item in entry:
            a+=1
            line += item
            if a<4:
                line += ","
        #line += "\n"
        output_file.write(line)


#Register the function to be called on exit
atexit.register(updateDB)

#initializing years count table
analyze_years()

findMVPS()


# @app.route('/read_file', methods=['GET'])
# def read_uploaded_file():
#     try:
#         return b
#     except IOError:
#         pass
#     return "Unable to read file"

# @app.route("/Export", defaults={'path':''})
# def serve3(path):
#     return send_from_directory(app.static_folder,'index.html')


# @app.route("/add_player", methods=["POST"], strict_slashes=False)
# def add_articles():
#     new_player = []
#     new_player = request.json['new_player']
#     playerData.append(new_player)
#     request_data = request.get_json()
#     name = request_data['Student Name'] 
#     course = request_data['Course'] 
#     python_version = request_data['Test Marks']['Mathematics'] 
#     example = request_data['Course Interested'][0]
#     return '''
#      The student name is: {}
# The course applied for is: {}
# The test marks for Mathematics is: {}
# The Course student is interested in is: {}'''.format(name, course, python_version, example)

    #return "Added new player"
    



# @app.route("/Import", defaults={'path':''})
# def serve2(path):
#     return send_from_directory(app.static_folder,'index.html')
# api.add_resource(ImportDataApi, '/flask/Import')
# api.add_resource(ImportTeamDataApi, '/flask/Import_Team')


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
api.add_resource(FindMVPApi,'/flask/Export/GameMVP' )
api.add_resource(AnalyzeGamesPlayedApi, '/flask/Export/GamesPlayed')
api.add_resource(AnalyzeLongPlayerApi, '/flask/Export/Longest')
api.add_resource(ImportDataApi, '/flask/Import')
api.add_resource(ImportTeamDataApi, '/flask/Import_Team')
api.add_resource(HelloApiHandler, '/flask/hello')
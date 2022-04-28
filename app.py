from flask import Flask,send_from_directory, redirect, url_for, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from api.AnalyzeLongPlayerApi import AnalyzeLongPlayerApi #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from api.ImportDataApi import ImportDataApi
from api.ImportTeamDataApi import ImportTeamDataApi
# Import cache
from common import cache
import atexit


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

#opening 1 db
playerData = []
teamData = []

with open('players.csv', 'r') as inputfile:
    for line in inputfile:
        playerData.append(line.split(","))

with open('teams.csv', 'r') as inputfile:
    for line in inputfile:
        teamData.append(line.split(","))


#set up and add data to cache
cache.init_app(app=app, config={"CACHE_TYPE": "FileSystemCache",'CACHE_DIR': '/tmp'})

cache.set("player_table", playerData)
cache.set("team_table", teamData)

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


#@app.route('/read_file', methods=['GET'])
#def read_uploaded_file():
    #try:
        #return b
    #except IOError:
        #pass
    #return "Unable to read file"
@app.route("/Export", defaults={'path':''})
def serve3(path):
    return send_from_directory(app.static_folder,'index.html')
api.add_resource(AnalyzeLongPlayerApi, '/flask/Export/Longest')



@app.route("/Import", defaults={'path':''})
def serve2(path):
    return send_from_directory(app.static_folder,'index.html')
api.add_resource(ImportDataApi, '/flask/Import')
api.add_resource(ImportTeamDataApi, '/flask/Import_Team')

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')
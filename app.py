from flask import Flask, make_response, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from api.ImportDataApi import ImportDataApi
from api.ImportIndexApi import ImportIndexApi
# Import cache
from common import cache
import pandas as pd


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

#opening 1 db
# playerData = []
# with open('players.csv', 'r') as inputfile:
#     for line in inputfile:
#         playerData.append(line.split(","))
playerData = pd.read_csv('players.csv')

b = '\n'.join('\t'.join(x for x in y) for y in playerData)

#set up and add data to cache
cache.init_app(app=app, config={"CACHE_TYPE": "FileSystemCache",'CACHE_DIR': '/tmp'})

cache.set("player_table", playerData)

@app.route('/read_file', methods=['GET'])
def read_uploaded_file():
    
    try:
        
        return b
    except IOError:
        pass
    return "Unable to read file"


@app.route("/Import", defaults={'path':''})
def serve2(path):
    return send_from_directory(app.static_folder,'index.html')
api.add_resource(ImportDataApi, '/flask/Import')



# @app.route("/flask/Import/<index>")
# def get_index(index):
#    return send_from_directory(app.static_folder,'index.html')
# api.add_resource(ImportIndexApi, '/flask/Import/<index>')

# @app.route("/flask/Import/<index>", methods=["DELETE"])
# def delete_index(index):

#     # """ If the index exists, delete it """

#     if index in playerData:
#         del playerData[index]
#         res = make_response(jsonify({}), 204)
#         return res

#     res = make_response(jsonify({"error": "index not found"}), 404)
#     return res






@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask,send_from_directory, redirect, url_for, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.ImportDataApi import ImportDataApi
import unittest
# Import cache
from common import cache
#need to initiate the cache with data that is initialized in app.py, our backend
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment 
playerData = []

with open('players.csv', 'r') as inputfile:
    for line in inputfile:
        playerData.append(line.split(","))

#set up and add data to cache
cache.init_app(app=app, config={"CACHE_TYPE": "FileSystemCache",'CACHE_DIR': '/tmp'})

cache.set("player_table", playerData)

#test get and post method
class TestImportDataApi(unittest.TestCase):
   
   # testing if the get function inside ImportDataApi is taking the correct data and passing it to the requestor

    def test_get(self):
        s = ImportDataApi()
        a = s.get()
        correct_data = cache.get("player_table")
        self.assertEqual(correct_data,a)

    #testing if the post with the marker "Add" functions and adds a line to the datatable
    #count lines before sending add request, then assert that that number plus one equals new line count
    
    def test_post_addline(self):
        linecount = 0
        for i in cache.get("player_table"):
            linecount +=1
        s = ImportDataApi()
        mtype = 'Add'
        message = "Kobe Bryant, 1, 1, 22\n"
        b= s.post(mtype, message)
        linecount_update =0
        for j in cache.get("player_table"):
            linecount_update +=1
        self.assertEqual(linecount_update,linecount+1)

    #testing if the post with the marker "Add" functions and adds sent data to the datatable
    #check if data going to be sent is in table first, create boolean to indicate 

    def test_post_addline_2(self):
        player = []
        player_0="Kobe Bryant"
        player_1=" 1"
        player_2=" 1"
        player_3="21\n"
        name_check = False
        for list in cache.get("player_table"):
            if list[3] == player_3 and list[2] == player_2 and list[1] == player_1 and list[0] == player_0:
                name_check = True
        
        #check if name_check returned true
        self.assertEqual(name_check,False)
        
        s = ImportDataApi()
        #this post should update the cache file and add the post to the bottom of the list
        mtype = 'Add'
        message = "Kobe Bryant, 1, 1, 21\n"
        player = message.split(",")
        b= s.post(mtype, message)
        name_check2 = False
        c= cache.get("player_table")
        for list in c:
            if list[3] == player[3] and list[2] == player[2]and list[1] == player[1] and list[0] == player[0]:
                name_check2 = True
        #should return true if the name was added properly to the cache
        self.assertEqual(name_check2, True)



if __name__ == '__main__':
    unittest.main()
from flask_restful import Api, Resource, reqparse
import json
from common import cache


class ImportDataApi(Resource):


  def get(self):
    return cache.get("player_table")

  def post(self,type, message):
    
    #print(self)
    #for json parsing
    #parser = reqparse.RequestParser()
    #parser.add_argument('type', type=str)
    #parser.add_argument('message', type=str)
    #parser.add_argument('field', type=str)
    #parser.add_argument('new_val', type=str)

    #args = parser.parse_args()

    #print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    #request_type = args['type']
    #request_json = args['message']
    #try:
     # request_field = args['field']
      #request_new = args['new_val']
    #except:
     # print("No ")


    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    #ret_status = request_type
    #ret_msg = request_json
    #if status is update, then we have two other fields
    #if ret_status == 'Update':
      #request_field = args['field']
      #request_new = args['new_val']
      #ret_field = request_field
      #ret_new = request_new
    #grabbing cache to modify
    data = [[]]
    data = cache.get("player_table")
    #switching to tpye for test
    if type == 'Add':
    #if ret_status == 'Add':
      #perform addition of message to player object
      #print(ret_status)
      #print(ret_msg)
      new_player = []
      #new_player = ret_msg.split(",")
      new_player = message.split(",")
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
        
    if ret_msg:
      message = "Your Operation concluded."
    else:
      message = "No Msg"
    
    final_ret = {"status": ret_status, "message": message}

    return final_ret
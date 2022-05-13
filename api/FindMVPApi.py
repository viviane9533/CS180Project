from flask_restful import Api, Resource, reqparse
from operator import itemgetter
import json
import threading
import time
from common import cache


 
class FindMVPApi(Resource):
  #should return mvp of each game from game Data, along with victorious team
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': cache.get("Game_MVPS")
      }

  def post(self):
    print(self)
    final_ret = {"status": "No Post", "message": "This Api does not post"}
    return final_ret
from flask_restful import Api, Resource, reqparse
from operator import itemgetter
import json
import threading
import time
from common import cache


 
class AnalyzeLongPlayerApi(Resource):
  


  #should return top 100 players who have played in the NBA the longest
  def get(self):
    #for j in range(1,len(years_count)):
        #comparing if player's year equals year count
       # if i[1] == years_count[j][0]:
         # years_count[j][1]+=1
         # break
      
    #insertionSort(pnum_count, lock)
    #for i in pnum_count:
      #for j in i:
        #print(j)
      #print("\n")
    
    #print("\n")
    return {
      'resultStatus': 'SUCCESS',
      'message': cache.get("Years_Count")
      }

  def post(self):
    print(self)
    
    
    final_ret = {"status": "No Post", "message": "This Api does not post"}

    return final_ret
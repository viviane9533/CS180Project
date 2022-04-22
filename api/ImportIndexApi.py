from email import message
import resource
from webbrowser import get
from flask_restful import Api, Resource, reqparse
import json
from common import cache
import csv
import pandas as pd


class ImportIndexApi (Resource):
  def get(self, index):
    playerData = pd.read_csv()
    playerData_new = playerData.drop([index])
    b = '\n'.join('\t'.join(x for x in y) for y in playerData_new)
    cache.set("player_table", playerData)

    return {    
        'resultStatus': 'SUCCESS',
        'message': cache.get("player_table")
    }
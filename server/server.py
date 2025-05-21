from flask import Flask
from flask_cors import CORS
from flask_restful import Api,Resource
from api.nightclub_api import Clubs
from api.swen_344_db_utils import *


##resources={r"/api/*":{"origins": "http://localhost:3000"}}
app = Flask(__name__)
CORS(app)
api = Api(app)



api.add_resource(Clubs,'/api/clubs','/api/clubs/<int:club_id>')



if __name__ == "__main__":
    
    exec_sql_file('nightclub.sql')
    print("Starting Flask")
    app.run(debug=True)
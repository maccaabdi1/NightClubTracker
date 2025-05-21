from flask_restful import Resource ,request,reqparse 
from api.swen_344_db_utils import *
from flask import jsonify


class Clubs(Resource):

    def get(self):
        
        sql = '''
        SELECT * FROM CLUBS
        '''
        clubs = exec_get_all(sql)
        return jsonify(clubs)
    
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('location', type=str)
        parser.add_argument('count', type=str, default=0)
        parser.add_argument('max_capacity', type=int)
        parser.add_argument('genre', type=str)
        parser.add_argument('yellowThreshold', type=int,default=0)

        args = parser.parse_args()

        name = args['name']
        location = args['location']
        count = args['count']
        max_capacity = args['max_capacity']
        genre = args['genre']
        yellowThreshold = args['yellowThreshold']

        
        
        sql = '''
        INSERT INTO CLUBS(NAME, LOCATION, COUNT,MAX_CAPACITY,GENRE,YELLOWTHRESHOLD)
        VALUES(%s,%s,%s,%s,%s,%s)
        '''

        exec_commit(sql,(name,location,count,max_capacity,genre,yellowThreshold))

        return {"message" : "Club Create Successfully"}
    
    def put(self,club_id):

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('location', type=str)
        parser.add_argument('max_capacity', type=int, default=0)
        parser.add_argument('yellowThreshold', type=int,default=0)

        args = parser.parse_args()
        
        name = args['name']
        location = args['location']
        max_capacity = args['max_capacity']
        print(args['max_capacity'])
        yellowThreshold = args['yellowThreshold']



        club_exist_sql = '''
        SELECT CLUB_ID
        FROM CLUBS
        WHERE CLUB_ID =%s
        '''

        result =  exec_get_one(club_exist_sql,(club_id,))

        if not result:

            return {'Message' : 'Club Not Found'},404
        
        updates = []
        updated_values = []

        if name:
            updates.append("NAME = %s")
            updated_values.append(name)
        
        if location:
            updates.append("LOCATION= %s")
            updated_values.append(location)
        
        if max_capacity:
            updates.append("MAX_CAPACITY= %s")
            updated_values.append(max_capacity)

        if yellowThreshold:
            updates.append("YELLOWTHRESHOLD= %s")
            updated_values.append(yellowThreshold)

        if updates:
            update_sql = f"""
            UPDATE CLUBS
            SET {','.join(updates)}
            WHERE CLUBS.CLUB_ID =%s
            """

            updated_values.append(club_id)

            result = exec_commit(update_sql,tuple(updated_values))
          

        return {'message' : "Updated!"}

    def delete(self,club_id):

        club_exist_sql = '''
        SELECT CLUB_ID
        FROM CLUBS
        WHERE CLUB_ID =%s
        '''

        result =  exec_get_one(club_exist_sql,(club_id,))

        if not result:

            return {'Message' : 'Club Not Found'},404
        
        sql = '''
        DELETE 
        FROM CLUBS
        WHERE CLUBS.CLUB_ID =%s
        '''

        exec_commit(sql,(club_id,))

        return {"message" : "Club Deleted"}
    def patch(self, club_id):
        parser = reqparse.RequestParser()
        parser.add_argument('count',type=int)

        args = parser.parse_args()
        
        count = args['count']

        sql  = '''
        UPDATE CLUBS
        SET COUNT = %s
        WHERE CLUB_ID = %s
        '''

        exec_commit(sql,(count,club_id))

        return {"message": "Club count updated successful"}








        

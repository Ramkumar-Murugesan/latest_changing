# project/server/auth/views.py


from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models import User, BlacklistToken,Expert
from flask_cors import CORS

expert_blueprint = Blueprint('expert', __name__)
CORS(expert_blueprint)

class ExpertPOSTAPI(MethodView):
    def post(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                post_data = request.get_json()
                try:
                    expert = Expert(
                        name=post_data.get('name'),
                        nickname=post_data.get('nickname'),
                    )
                    db.session.add(expert)
                    db.session.commit()
                    responseObject = {
                        'status': 'Success',
                        'result': {
                            "name":expert.name,
                            "nickname":expert.nickname
                        },
                        'message':"Added successfully"
                    }
                    return make_response(jsonify(responseObject)), 200
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Some error occurred. Please try again.'
                    }
                    return make_response(jsonify(responseObject)), 401
            else:
                return "Error"
        else:
            return "Error"

class ExpertGETAPI(MethodView):
    def get(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(responseObject)), 401
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                try:
                    expert = Expert.query.all()
                    contactsArr = []
                    for contact in expert:
                     contactsArr.append(contact.toDict())
                    return jsonify(contactsArr)
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Some error occurred. Please try again.'
                    }
                    return make_response(jsonify(responseObject)), 401
            else:
                return "Error"
        else:
            return "Error"



@expert_blueprint.route('/alpha/expert/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    auth_header = request.headers.get('Authorization')
    access_token = auth_header.split(" ")[1]

    if access_token:
        user_id = User.decode_auth_token(access_token)
        if not isinstance(user_id, str):
            gotData = Expert.query.filter_by(id=id).first()
            if not gotData:
                return "Error"

            if request.method == "DELETE":
                db.session.delete(gotData)
                db.session.commit()
                response = {
                        'status': 'Success',
                        'result': {
                            "id":gotData.id,
                            "name":gotData.name,
                            "nickname":gotData.nickname,
                            "active": gotData.active
                        },
                        'message':"Removed successfully"
                    }
                return make_response(jsonify(response)), 200
            elif request.method == 'PUT':
                obj = request.get_json()

                # gotData.active = obj.get('active')
                gotData.name = obj.get('name')
                gotData.nickname = obj.get('nickname')
                # db.session.add(gotData)
                db.session.commit()

                response = {
                        'status': 'Success',
                        'result': {
                            "id":gotData.id,
                            "name":gotData.name,
                            "nickname":gotData.nickname,
                            "active": gotData.active
                        },
                        'message':"Updated successfully"
                    }
                return make_response(jsonify(response)), 200
            else:
                response = {
                    'status': 'Success',
                    'result': {
                        "id": gotData.id,
                        "name": gotData.name,
                        "nickname": gotData.nickname,
                        "active": gotData.active
                    },
                    'message': "Retrieved successfully"
                }
                return make_response(jsonify(response)), 200
        else:
            message = user_id
            response = {
                'message': message
            }
            return make_response(jsonify(response)), 401

@expert_blueprint.route('/alpha/expert/status/<int:id>', methods=['PUT'])
def update(id, **kwargs):
    auth_header = request.headers.get('Authorization')
    access_token = auth_header.split(" ")[1]

    if access_token:
        user_id = User.decode_auth_token(access_token)
        if not isinstance(user_id, str):
            gotData = Expert.query.filter_by(id=id).first()
            if not gotData:
                return "Error"

            if request.method == 'PUT':
                obj = request.get_json()

                gotData.active = obj.get('active')
                # db.session.add(gotData)
                db.session.commit()

                response = {
                    'status': 'Success',
                    'result': {
                        "id": gotData.id,
                        "name": gotData.name,
                        "nickname": gotData.nickname,
                        "active": gotData.active
                    },
                    'message': "Updated successfully"
                }
                return make_response(jsonify(response)), 200
        else:
            message = user_id
            response = {
                'message': message
            }
        return make_response(jsonify(response)), 401



# define the API resources
expert_post_view = ExpertPOSTAPI.as_view('expert_post_api')
expert_get_view = ExpertGETAPI.as_view('expert_get_api')

expert_blueprint.add_url_rule(
    '/alpha/expert/createExpert',
    view_func=expert_post_view,
    methods=['POST']
)

expert_blueprint.add_url_rule(
    '/alpha/expert/getAllExpert',
    view_func=expert_get_view,
    methods=['GET']
)


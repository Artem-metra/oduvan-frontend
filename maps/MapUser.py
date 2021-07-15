from flask import Blueprint, request, session, abort

import utils

user_app = Blueprint('user_app', __name__)


@user_app.route('/api/user/create')
def api_user_create():
    return utils.complete_request(request, request.path)


@user_app.route('/api/users/get')
def api_users_get():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/get')
def api_user_get():
    params = {}
    for item in request.args:
        params[item] = request.args.get(item)
    if 'user_id' not in params.keys():
        if 'user_id' in session:
            params = {'id': session['user_id']}
        else:
            return 'Пользователь неавторизован.'
    return utils.complete_request_with_parameters(params, request.path)


@user_app.route('/api/user/edit')
def api_user_edit():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/remove')
def api_user_remove():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/check')
def api_user_check():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/registration')
def api_user_registration():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/auth')
def api_user_auth():
    resp = utils.complete_request(request, request.path)
    if 'user_id' not in session:
        session['user_id'] = resp['user']
    return resp


@user_app.route('/api/user/liked')
def api_user_liked():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/disliked')
def api_user_disliked():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/add_address')
def api_user_add_address():
    return utils.complete_request(request, request.path)


@user_app.route('/api/user/check_password')
def api_user_check_password():
    return utils.complete_request(request, request.path)

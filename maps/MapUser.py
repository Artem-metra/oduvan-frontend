import datetime
import json

from flask import Blueprint, request, session, abort

user_app = Blueprint('user_app', __name__)


@user_app.route('/api/user/create')
def api_user_create():
    pass

@user_app.route('/api/users/get')
def api_users_get():
    pass

@user_app.route('/api/user/get')
def api_user_get():
    pass


@user_app.route('/api/user/edit')
def api_user_edit():
    pass


@user_app.route('/api/user/remove')
def api_user_remove():
    pass


@user_app.route('/api/user/check')
def api_user_check():
    pass


@user_app.route('/api/user/registration')
def api_user_registration():
    pass


@user_app.route('/api/user/auth')
def api_user_auth():
    pass


@user_app.route('/api/user/liked')
def api_user_liked():
    pass


@user_app.route('/api/user/disliked')
def api_user_disliked():
    pass


@user_app.route('/api/user/add_address')
def api_user_add_address():
    pass

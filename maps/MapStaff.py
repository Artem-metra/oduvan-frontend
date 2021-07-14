import datetime
from flask import Blueprint, request, session, abort
import random

import utils

staff_app = Blueprint('staff_app', __name__)


@staff_app.route('/api/staff/create')
def api_staff_create():
    pass
    return utils.complete_request(request, request.path)


@staff_app.route('/api/staffs/get')
def api_staffs_get():
    pass

    return utils.complete_request(request, request.path)

@staff_app.route('/api/staff/get')
def api_staff_get():
    pass
    return utils.complete_request(request, request.path)


@staff_app.route('/api/staff/edit')
def api_staff_edit():
    pass
    return utils.complete_request(request, request.path)


@staff_app.route('/api/staff/remove')
def api_staff_remove():
    return utils.complete_request(request, request.path)


# Endpoints для регистрации/авторизации сотрудников
@staff_app.route('/api/staff/registration')
def api_staff_registration():
    pass
    return utils.complete_request(request, request.path)


@staff_app.route('/api/staff/auth')
def api_staff_auth():
    pass
    return utils.complete_request(request, request.path)

from flask import Blueprint, request

position_app = Blueprint('position_app', __name__)


@position_app.route('/api/position/create')
def api_position_create():
    pass


@position_app.route('/api/positions/get')
def api_positions_get():
    pass


@position_app.route('/api/position/get')
def api_position_get():
    pass


@position_app.route('/api/position/edit')
def api_position_edit():
    pass


@position_app.route('/api/position/remove')
def api_position_remove():
    pass

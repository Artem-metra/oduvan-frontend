import json

from flask import Blueprint, request

flower_app = Blueprint('flower_app', __name__)


@flower_app.route('/api/flower/create')
def api_flower_create():
    pass


@flower_app.route('/api/flowers/get')
def api_flowers_get():
    pass


@flower_app.route('/api/flower/get')
def api_flower_get():
    pass


@flower_app.route('/api/flower/edit')
def api_flower_edit():
    pass


@flower_app.route('/api/flower/remove')
def api_flower_remove():
    pass
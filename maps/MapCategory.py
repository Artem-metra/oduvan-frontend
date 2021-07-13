from flask import Blueprint, request

category_app = Blueprint('category_app', __name__)


@category_app.route('/api/category/create')
def api_category_create():
    pass


@category_app.route('/api/categories/get')
def api_categories_get():
    pass


@category_app.route('/api/category/get')
def api_category_get():
    pass


@category_app.route('/api/category/edit')
def api_category_edit():
    pass


@category_app.route('/api/category/remove')
def api_category_remove():
    pass
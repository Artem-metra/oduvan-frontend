from flask import Blueprint, request

import utils

article_app = Blueprint('article_app', __name__)


@article_app.route('/api/article/create')
def api_article_create():
    return utils.complete_request(request, request.path)


@article_app.route('/api/articles/get')
def api_articles_get():
    pass
    return utils.complete_request(request, request.path)


@article_app.route('/api/article/get')
def api_article_get():
    pass
    return utils.complete_request(request, request.path)


@article_app.route('/api/article/edit')
def api_article_edit():
    pass
    return utils.complete_request(request, request.path)


@article_app.route('/api/article/remove')
def api_article_remove():
    pass
    return utils.complete_request(request, request.path)

import datetime
from flask import Blueprint, request

article_app = Blueprint('article_app', __name__)


@article_app.route('/api/article/create')
def api_article_create():
    pass


@article_app.route('/api/articles/get')
def api_articles_get():
    pass


@article_app.route('/api/article/get')
def api_article_get():
    pass


@article_app.route('/api/article/edit')
def api_article_edit():
    pass


@article_app.route('/api/article/remove')
def api_article_remove():
    pass

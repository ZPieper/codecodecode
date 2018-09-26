from django.conf.urls import url
from . import views           # This line is new!
urlpatterns = [
url(r'^words$', views.index),
url(r'^clear$', views.clear),
url(r'^add_word$', views.result)
]
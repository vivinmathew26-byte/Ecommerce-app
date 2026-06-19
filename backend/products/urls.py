from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, ReviewViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('reviews', ReviewViewSet)
router.register('', ProductViewSet)

urlpatterns = [path('', include(router.urls))]

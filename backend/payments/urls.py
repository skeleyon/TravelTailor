from rest_framework import routers
from .views import paymentViewSet

router = routers.DefaultRouter()
router.register(r'api/payments', paymentViewSet, 'payment')

urlpatterns = router.urls
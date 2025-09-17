# posts/views.py
from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
from .permissions import IsOwnerByHeaderOrReadOnly

@extend_schema(
    tags=['Posts'],
    examples=[
        OpenApiExample(
            'Criar post',
            value={"username": "rafa", "title": "Olá", "content": "Primeiro post"},
            request_only=True
        )
    ],
)
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwnerByHeaderOrReadOnly]

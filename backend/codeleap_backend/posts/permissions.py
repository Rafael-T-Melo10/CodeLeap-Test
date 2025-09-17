from rest_framework import permissions

class IsOwnerByHeaderOrReadOnly(permissions.BasePermission):
    """
    Permite edição/remoção só se o header X-Username bater com o username do Post.
    Leitura é liberada.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        header_username = request.headers.get('X-Username')
        return bool(header_username and header_username == obj.username)

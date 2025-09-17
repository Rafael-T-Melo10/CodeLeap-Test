# Projeto XYZ

## Demo
- Frontend: https://code-leap-test-three.vercel.app/
- Backend: https://seu-backend.onrender.com
- Docs API (Swagger): https://seu-backend.onrender.com/swagger
- Coleção Postman: ./postman_collection.json

## Como rodar local
### Requisitos
- Node 20+, npm 10+ (ou pnpm/yarn)
- Docker (opcional) e Docker Compose
- .NET 8 (se backend em C#) / Python 3.11 (se Python)

### Passos rápidos
```bash
# 1. clonar
git clone <repo-url>
cd projeto

# 2. configurar envs
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
# edite as variáveis conforme necessário

# 3. rodar com docker-compose (opcional e recomendado)
docker-compose up --build

# OU rodar manual
cd backend && npm i && npm run dev  # ou 'dotnet run'
cd ../frontend && npm i && npm run dev

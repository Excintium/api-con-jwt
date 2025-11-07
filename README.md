# 🛠️ API Productos con Autenticación JWT (NestJS + PostgreSQL)

Proyecto backend desarrollado con **NestJS**, **TypeORM** y **PostgreSQL**, que implementa un sistema completo de **autenticación JWT** para proteger rutas y gestionar usuarios, junto con un módulo CRUD de productos.

---

## 🚀 Características Principales

- ✅ CRUD completo para productos (`create`, `read`, `update`, `delete`)
- 🔐 Autenticación y autorización con **JWT**
- 🧾 Validación de datos con `class-validator` y `class-transformer`
- 🧰 Uso de `TypeORM` con entidades, repositorios y relaciones
- ⚙️ Variables de entorno gestionadas con `@nestjs/config`
- 🧠 Arquitectura modular (módulos `auth`, `users`, `productos`)
- 🐘 Base de datos PostgreSQL
- ⚡ Compatible con `npm run start:dev` sin Docker Compose

---

## 🧩 Estructura del Proyecto

src/
├── app.module.ts
├── main.ts
│
├── productos/
│ ├── dto/
│ ├── entities/
│ ├── productos.controller.ts
│ ├── productos.service.ts
│ └── productos.module.ts
│
├── users/
│ ├── entities/
│ ├── dto/
│ ├── users.service.ts
│ └── users.module.ts
│
└── auth/
├── dto/
├── guard/
├── decorators/
├── types/
├── auth.controller.ts
├── auth.service.ts
└── auth.module.ts

yaml
Copiar código

---

## ⚙️ Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sys
DB_NAME=db_productos

PORT=3000

JWT_SECRET=aveces_yo_gomito
JWT_EXPIRES=1d
⚠️ Importante: No compartas tu JWT_SECRET públicamente.
En producción, usa un gestor de secretos como AWS Secrets Manager o HashiCorp Vault.

🧱 Instalación
Clonar el repositorio:

bash
Copiar código
git clone https://github.com/Excintium/api-con-jwt.git
cd api-con-jwt
Instalar dependencias:

bash
Copiar código
npm install
Verifica tu conexión a PostgreSQL (local o Docker).

Ejecutar en modo desarrollo:

bash
Copiar código
npm run start:dev
La API se iniciará en
👉 http://localhost:3000

🧾 Endpoints Principales
🧍‍♂️ Autenticación (/auth)
Método	Ruta	Descripción
POST	/auth/register	Registrar un nuevo usuario
POST	/auth/login	Iniciar sesión y obtener token
GET	/auth/profile	Obtener perfil del usuario autenticado (requiere token)

Ejemplo de Login
bash
Copiar código
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nico@example.com","password":"123456"}'
Respuesta:

json
Copiar código
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "email": "nico@example.com",
  "name": "Nico"
}
📦 Productos (/productos)
Método	Ruta	Descripción
POST	/productos	Crear producto
GET	/productos	Obtener todos
GET	/productos/:id	Obtener por ID
PATCH	/productos/:id	Actualizar producto
DELETE	/productos/:id	Eliminar producto

🔒 Rutas protegidas con AuthGuard mediante Bearer Token.

🧪 Pruebas con cURL o Postman
bash
Copiar código
# Registrar usuario
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Nico","email":"nico@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nico@example.com","password":"123456"}'

# Acceder a ruta protegida
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer TU_TOKEN"
🧠 Buenas Prácticas
Usa DTOs con validaciones estrictas

No expongas contraseñas en texto plano

Implementa bcryptjs para hashear contraseñas

Define expiraciones razonables para JWT (JWT_EXPIRES)

Usa HTTPS en entornos productivos

🧭 Próximos Pasos Recomendados
📜 Integrar documentación Swagger/OpenAPI

🔁 Implementar refresh tokens

🧮 Agregar paginación y filtros en productos

🧪 Tests unitarios e integración

🧩 Relaciones entre entidades (usuarios ↔ productos)

🛡️ Desactivar synchronize: true en producción y usar migraciones

👨‍💻 Autor
Nicolás Esteban Fonseca Olivares
Desarrollador Fullstack & Científico de Datos en formación
🔗 GitHub: @Excintium

🏷️ Licencia
Este proyecto está bajo la licencia MIT.
Eres libre de usarlo, modificarlo y compartirlo con atribución.****
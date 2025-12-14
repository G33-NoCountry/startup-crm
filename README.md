# 🧩 Startup CRM

<div align="center">

![CRM Banner](https://img.shields.io/badge/CRM-Startup-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow?style=for-the-badge)
![NoCountry](https://img.shields.io/badge/NoCountry-Simulación%20Laboral-red?style=for-the-badge)

</div>

## 📖 Descripción

**Startup CRM** es una solución integral de gestión de relaciones con clientes diseñada específicamente para startups y equipos de ventas que necesitan cerrar más negocios de manera eficiente. 

A diferencia de una simple agenda de contactos, nuestra plataforma está centrada en el **Pipeline de Ventas**, permitiendo gestionar oportunidades (Deals), asignar conversaciones multi-canal y medir el rendimiento en tiempo real con dashboards interactivos.

---

## ✨ Funcionalidades Implementadas

### 🔐 **Autenticación y Autorización**
- ✅ Registro y Login con JWT
- ✅ Gestión de roles (Admin/Vendedor)
- ✅ Middleware de protección de rutas
- ✅ NextAuth 5 (Beta) integrado en frontend

### 👥 **Gestión de Contactos**
- ✅ CRUD completo de contactos
- ✅ Sistema de etiquetas (Tags) personalizables
- ✅ Filtrado avanzado y búsqueda
- ✅ Vista detallada con historial de interacciones
- ✅ Paginación cursor-based

### 📊 **Sales Pipeline (Kanban)**
- ✅ Gestión de Deals (Oportunidades)
- ✅ Etapas de embudo (Funnel Stages) configurables
- ✅ Asociación de Deals con contactos
- ✅ Seguimiento de valor monetario
- ✅ Sistema de tags para categorización

### 💬 **Sistema de Conversaciones**
- ✅ Gestión de conversaciones multi-canal
- ✅ Sistema de mensajes asociados
- ✅ Asignación de conversaciones a contactos
- ✅ Historial completo de interacciones

### ✅ **Tareas y Seguimiento**
- ✅ CRUD de tareas vinculadas a contactos/deals
- ✅ Priorización y estados
- ✅ Asignación a usuarios
- ✅ Seguimiento de vencimientos

### 📈 **Dashboard Analytics**
- ✅ KPIs en tiempo real (Leads, Conversiones, Contactos)
- ✅ Gráficos de métricas de ventas con Recharts
- ✅ Tareas próximas
- ✅ Conversaciones recientes
- ✅ Indicadores de tendencias

### 👤 **Gestión de Usuarios**
- ✅ Panel de administración
- ✅ Gestión de roles y permisos
- ✅ CRUD de usuarios (Admin)

---

## 🛠️ Stack Tecnológico

### **Frontend**
```
Framework:       Next.js 16.0.7 (App Router)
Lenguaje:        TypeScript 5+
Estilos:         Tailwind CSS 4
Componentes UI:  shadcn/ui + Radix UI
Iconos:          Lucide React
Estado Global:   Zustand 5
Data Fetching:   TanStack Query (React Query)
Formularios:     React Hook Form + Zod 4
Tablas:          TanStack Table
Autenticación:   NextAuth 5 (Beta)
Gráficos:        Recharts 3
```

### **Backend**
```
Runtime:         Node.js
Framework:       Express 5
Lenguaje:        TypeScript 5
Base de Datos:   MySQL
ORM:             Sequelize 6
Autenticación:   Passport.js (JWT + Local)
Validación:      Express Validator
Documentación:   Swagger UI + OpenAPI
Paginación:      Sequelize Cursor Pagination
```

---

## 🏗️ Arquitectura del proyecto

### **Estructura Frontend**
```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Páginas de autenticación
│   │   ├── (dashboard)/  # Páginas protegidas (dashboard, contactos, kanban, etc.)
│   │   └── layout.tsx
│   ├── components/       # Componentes reutilizables
│   │   ├── features/     # Componentes por feature
│   │   ├── shared/       # Componentes compartidos
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilidades y configuración
│   ├── store/            # Zustand stores
│   └── types/            # Definiciones TypeScript
└── package.json
```

### **Estructura Backend**
```
backend/
├── src/
│   ├── config/           # Configuración (DB, Passport, CORS, etc.)
│   ├── controllers/      # Lógica de controladores
│   ├── dto/              # Data Transfer Objects
│   ├── middlewares/      # Middlewares personalizados
│   ├── models/           # Modelos Sequelize
│   ├── routes/           # Definición de rutas
│   ├── services/         # Lógica de negocio
│   ├── validators/       # Validaciones con Express Validator
│   ├── docs/             # Configuración Swagger
│   ├── migrations/       # Migraciones de base de datos
│   └── seeders/          # Datos de prueba
└── package.json
```

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js v18+ 
- MySQL 8.0+
- npm o yarn

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/G33-NoCountry/startup-crm.git
cd startup-crm
```

### **2. Configurar Backend**

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend/`:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=startup_crm
DB_USER=root
DB_PASSWORD=tu_password

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=tu_secret_key_super_segura

# API Keys (opcionales para MVP)
# WHATSAPP_API_KEY=tu_key
# BREVO_API_KEY=tu_key
```

Ejecutar migraciones y seeders:
```bash
npm run db:migrate
npm run db:seed
```

Iniciar servidor:
```bash
npm run dev
```

El backend estará disponible en: `http://localhost:3001`  
Documentación API (Swagger): `http://localhost:3001/api/docs`

### **3. Configurar Frontend**

```bash
cd frontend
npm install
```

Crea un archivo `.env.local` en la carpeta `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_SECRET=tu_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

Iniciar aplicación:
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

---

## 📚 Endpoints API Principales

### **Autenticación**
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login

### **Usuarios**
- `GET /api/users/profile` - Perfil del usuario autenticado
- `GET /api/admin/users` - Listar usuarios (Admin)
- `PUT /api/admin/users/:id` - Actualizar usuario (Admin)

### **Contactos**
- `GET /api/contacts` - Listar contactos (con paginación)
- `POST /api/contacts` - Crear contacto
- `GET /api/contacts/:id` - Ver detalle
- `PUT /api/contacts/:id` - Actualizar
- `DELETE /api/contacts/:id` - Eliminar

### **Deals (Oportunidades)**
- `GET /api/deals` - Listar deals
- `POST /api/deals` - Crear deal
- `PUT /api/deals/:id` - Actualizar
- `DELETE /api/deals/:id` - Eliminar

### **Conversaciones**
- `GET /api/conversations` - Listar conversaciones
- `POST /api/conversations` - Crear conversación
- `GET /api/conversations/:id/messages` - Ver mensajes

### **Tareas**
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar
- `DELETE /api/tasks/:id` - Eliminar

📄 **Ver documentación completa en:** `http://localhost:3001/api/docs`

---

## 🔑 Credenciales de prueba

Después de ejecutar los seeders, puedes usar:

**Admin:**
- Email: `admin@admin.com`
- Password: `password1Ab_`

**Vendedor:**
- Email: `agente@agente.com`
- Password: `password1Ab_`

**Manager:**
- Email: `manager@manager.com`
- Password: `password1Ab_`
---

## 📊 Base de datos

### **Modelos principales**
- **Users** - Usuarios del sistema (Admin/Vendedor)
- **Contacts** - Clientes/Contactos
- **Deals** - Oportunidades de venta
- **FunnelStages** - Etapas del pipeline
- **Tasks** - Tareas de seguimiento
- **Conversations** - Conversaciones multi-canal
- **Messages** - Mensajes de conversaciones
- **Tags** - Etiquetas personalizables
- **Templates** - Templates de mensajes

### **Relaciones**
- User → Tasks (1:N)
- User → Deals (1:N)
- Contact → Conversations (1:N)
- Contact → Deals (1:N)
- Contact → Tasks (1:N)
- Deal → Tasks (1:N)
- FunnelStage → Deals (1:N)
- Conversation → Messages (1:N)
- Contact ↔ Tags (N:N)
- Deal ↔ Tags (N:N)

---

## 🧪 Testing

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run test  # Pendiente implementación
```

---

## 📦 Build para producción

### **Frontend**
```bash
cd frontend
npm run build
npm run start
```

### **Backend**
```bash
cd backend
npm run build
npm run start
```

---

## 🔗 Enlaces del proyecto

| Recurso | Enlace | Estado |
|---------|--------|--------|
| 🎨 **Diseño UX/UI** | [Ver en Figma](#) | ✅ Completo |
| 📋 **Gestión (Jira)** | [Ver Tablero](#) | 🔄 En uso |
| 🚀 **Deploy Frontend** | [Ver Demo en Vercel](#) | 🚧 Pendiente |
| ⚙️ **Deploy Backend** | [Ver API en Railway](#) | 🚧 Pendiente |
| 📄 **Documentación API** | `http://localhost:3001/api/docs` | ✅ Disponible |
| 📦 **Repositorio** | [GitHub](#) | ✅ Activo |

---

## 👥 Equipo

| Rol | Nombre | Redes |
|-----|--------|--------|
| 🎨 **UX/UI Designer** | Maitena Nicosia Lazzarini | [Portfolio](https://maitenlportfolio.vercel.app) |
| 💻 **Frontend Developer** | Ángeles Orquera | [Github](https://github.com/Angl098) |
| 💻 **FullStack Developer** | Jhonny Alvino | [Github](https://github.com/alvinoDev) |
| ⚙️ **Backend Developer** | Miguel Angel Choque Garcia | [Github](https://github.com/mickychog) |
| ⚙️ **Backend Developer** | Joel Barrera | [Github](https://github.com/BarreraJoel) |

---

## 🗺️ Roadmap

### ✅ **Fase 1: MVP (Actual)**
- [x] Autenticación y autorización
- [x] CRUD de contactos
- [x] CRUD de deals
- [x] Sistema de tareas
- [x] Dashboard básico
- [x] Conversaciones
- [x] Sistema de tags

### 🚧 **Fase 2: Mejoras (Próximo)**
- [ ] Integración real con WhatsApp Cloud API
- [ ] Integración con Brevo para emails
- [ ] Drag & Drop en Kanban
- [ ] Notificaciones en tiempo real
- [ ] Filtros avanzados en todas las vistas
- [ ] Exportación de reportes (PDF/Excel)

### 🔮 **Fase 3: Avanzado**
- [ ] Dashboard analytics avanzado
- [ ] IA para predicción de ventas
- [ ] Automatización de workflows
- [ ] Integraciones con Calendly, Zoom
- [ ] App móvil (React Native)

---

## 📝 Notas de desarrollo

### **Estado actual**
- ⚠️ El login usa un mock temporal en frontend mientras se ajusta la integración con el backend
- ✅ API REST completamente funcional y documentada
- ✅ Base de datos diseñada y migrada
- ✅ Frontend con componentes reutilizables y buenas prácticas

### **Próximos pasos**
1. Integrar autenticación real entre frontend y backend
2. Implementar drag & drop en el Kanban board
3. Agregar tests unitarios y de integración
4. Deploy a producción (Vercel + Railway)
5. Integrar APIs externas (WhatsApp, Email)

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de la simulación laboral de **NoCountry** con fines educativos.

---

## 🤝 Contribuciones

Este es un proyecto de simulación laboral. Para sugerencias o mejoras, contacta al equipo del proyecto.

---

## 📧 Contacto

Para consultas sobre este proyecto:
- **Repositorio:** [GitHub Link](https://github.com/G33-NoCountry/startup-crm)
- **NoCountry:** [nocountry.tech](https://talent.nocountry.tech/)

---

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

</div>
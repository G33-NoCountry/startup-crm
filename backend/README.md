### 🚀 Guía de instalación y ejecución
---

#### 🔧 Requisitos previos
1. **Servidor MySQL**: instalado y en ejecución
2. **Node.js**: v18 o superior
3. **npm**: Gestor de paquetes

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo .env

```bash
cp .env.example .env
```

### 3. Configurar valores en .env
#### Ejemplo

```bash
APP_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=startup_crm
...
```

### 4. Ejecutar migraciones (crear tablas)

```bash
npm run db:migrate
```

> para deshacer las migraciones:

```bash
npm run db:migrate:undo:all
```

### 5. Ejecutar seeders (crear registros iniciales)

```bash
npm run db:seed
```

> para deshacer los seeders:

```bash
npm run db:seed:rollback
```

### 6. Ejecutar migraciones + seeders en un solo paso (opcional)

```bash
npm run db:migrate:seed
```
> Crea las tablas y luego inserta los registros iniciales.

### 7. Ejecutar servidor en desarrollo

```bash
npm run dev
```
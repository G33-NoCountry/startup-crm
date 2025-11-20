### 📝 Guía de documentación de Swagger
---

#### 🔧 Instalación y ejecución
1. **Instalar dependencias**

```bash
npm install swagger-ui-express swagger-jsdoc
```
```bash
npm install --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```
2. **Acceder a la url de la documentación**
> http://localhost:3000/api/docs

### 📝 Documentar endpoints

#### Estructura

#### Ejemplo
```bash
/**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     description: Crea una nueva cuenta de usuario
   *     tags: [Authentication]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterRequest'
   *     responses:
   *        201:
   *         description: Usuario registrado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Registro exitoso!"
   *                 data:
   *                   type: object
   *                   properties:
   *                     user: 
   *                       $ref: '#/components/schemas/FullUser'
   *                     access_token: 
   *                       type: string
   *                       example: eyJhbGciOiJ ...
   *                     refresh_token: 
   *                       type: string
   *                       example: eyJhbGciOiJ ...
   * 
   *        400:
   *         description: Solicitud inválida
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/BadRequest'
  */
  public registerUser = async (request: Request, response: Response) => {
    ...
  }

```

#### Explicación
> **@swagger**

Activa el bloque de documentación Swagger.
Todo lo que esté dentro de este bloque se interpretará como una definición de API.

> **/api/auth/register:**

Define la URL del endpoint.
Debe coincidir exactamente con la ruta real de Express.

> **post:**

Indica si el endpoint es GET, POST, PUT, DELETE, etc.

> **summary:**

Una frase corta que explica qué hace el endpoint.
Debe ser conciso y visible en Swagger UI.

> **description:**

Explicación más detallada.
Podés incluir reglas, notas, o comportamientos importantes.

> **tags: [Authentication]**

Clasifica el endpoint por categoría.

> **security:**

Indica qué tipo de autenticación requiere el endpoint.
Usos comunes:
- **bearerAuth → JWT**
- **sessionAuth → Cookies**
- **apiKeyAuth → Header con clave**

> **requestBody:**

Describe qué espera recibir el endpoint.
- **required**: si el body es obligatorio
- **content/application/json**: formato esperado
- **schema**: referencia a un schema dentro de components.schemas

> **responses:**

Describe todas las respuestas posibles del endpoint.
Cada respuesta debe incluir:

- **status code**
- **descripción**
- **estructura del JSON devuelto**


### 📝 Schemas

#### Crear schema
Ejemplo
```bash
    RegisterRequest: {
        type: "object",

        properties: {
            full_name: { type: "string", example: "Juan Perez" },
            email: { type: "string", example: "example@mail.com" },
            password: { type: "string", minLength: 8, maxLength: 60, example: "passwordMn@" },
            password_confirmation: { type: "string", minLength: 8, maxLength: 60, example: "passwordMn@" },
        },
        required: ["full_name", "email", "password", "password_confirmation"],
    }
```
#### Explicación

> **RegisterRequest: { ... }**

Es el identificador del schema que luego se usa con:
```bash
$ref: '#/components/schemas/RegisterRequest'
```

> **type: "object"**

Indica que el schema representa un objeto JSON.
Posibles tipos de dato: **string, number, boolean, array, object**.

> **properties: { ... }**

Cada campo del request se define dentro de properties.

Dentro de cada campo se puede especificar:

| Propiedad |	Descripción |
|-----------|-----------|
|**type**	|Tipo de dato (string, number, boolean, array, object)|
|**example**	|Ejemplo que Swagger UI mostrará|
|**description**	|Explica qué representa el campo|
|**format**	| Validaciones semánticas (email, uuid, date, etc.)|
|**minLength / maxLength**	|Validación estándar|
|**enum**	|Lista de valores permitidos|

> **required: [ ... ]**

Esto le indica a Swagger que esos campos no pueden faltar en el request.

#### Registrar Schema
Dentro del archivo **index.ts** de **src/docs**, importar y exportar los schemas creados.

```bash
import authSchemas  from "./auth/auth.schema";
export default {
    ...authSchemas,
};
```
# 🔧 Guía de Debugging - Login No Funciona

## El problema
Al hacer click en "Iniciar Sesión", no te redirige a la otra vista.

## ✅ Soluciones Aplicadas
He corregido:
1. ✅ Router ahora se registra en el `setGlobalRouter()` ANTES de montar la app
2. ✅ Componente login ahora usa `useRouter()` de Vue Router (forma correcta)
3. ✅ Agregué `console.log()` para ver qué está pasando

## 🔍 Cómo Debuggear

### Paso 1: Limpiar Caché
1. Abre el navegador (Chrome/Firefox)
2. Presiona **F12** (Abrir DevTools)
3. Click derecho en el botón REFRESH (recarga)
4. Selecciona **"Vaciar Caché y hacer recarga"**

### Paso 2: Ver Logs en Consola
1. Presiona **F12** → **Consola**
2. Ve a login (http://localhost:5173/views/public/login)
3. Intenta hacer login con credenciales válidas
4. Deberías ver logs como:
   ```
   🔐 Iniciando login con: usuario@ejemplo.com
   📡 Respuesta del servidor: {status: 200, data: {...}}
   ✅ Sesión guardada. Tipo: usuario
   📍 Navegando a: /views/usuario/principal
   ```

### Paso 3: Revisar Errores
Si ves alguno de estos errores, copia y pégalo aquí:

**Error de red:**
```
📡 POST http://localhost:5173/api/auth/login 
❌ Error en login: Network error...
```

**Error de credenciales:**
```
📡 Respuesta del servidor: {status: 401, data: {mensaje: "..."}}
```

**Error de navegación:**
```
❌ Error durante navegación: ...
```

---

## 📊 Credenciales de Prueba

### Opción 1: Usar el Script Automático (⭐ Recomendado)

```bash
# Desde la carpeta raíz del proyecto
node create-test-user.js
```

Esto creará un usuario automáticamente con:
- Email: `test@workly.local`
- Contraseña: `test123456`

Luego intenta login en http://localhost:5173/views/public/login

### Opción 2: Crear Usuario Manualmente

Primero debes crear un usuario en la base de datos. Para debuggear rápido:

1. Abre MySQL:
```bash
mysql -u root -p
Enter password: Jonathan212131
USE WorklyDB;
```

2. Crea un usuario de prueba:
```sql
INSERT INTO Usuarios (nombres, apellidos, correo_electronico, contrasena, telefono, id_municipio_fk, email_verificado)
VALUES (
  'Usuario',
  'Test', 
  'test@ejemplo.com',
  '$2a$10$abcdefghijklmnopqrstuvwxyz', -- Hash bcrypt de "password123"
  '1234567890',
  1,
  1
);
```

O mejor, usa el endpoint de registro:
```bash
curl -X POST http://localhost:3000/auth/register-user \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Test",
    "apellidos": "User",
    "correo_electronico": "test@example.com",
    "contrasena": "password123",
    "telefono": "1234567890",
    "id_municipio_fk": 1
  }'
```

3. Luego intenta login en la UI:
   - Email: `test@example.com`
   - Contraseña: `password123`

---

## 🚀 Servidor en Background (si fallaba)

Si el servidor no está corriendo:

```bash
# Terminal 1 - Backend
cd c:\Users\jonat\Desktop\empleos
npm run backend:dev

# Terminal 2 - Frontend (Vite)
npm run frontend:dev
```

Luego abre: http://localhost:5173/views/public/login

---

## 📝 Verificación Rápida

Abre la consola (F12) y ejecuta:
```javascript
// Debería devolver el router instance
console.log(window.__vueRouter);
console.log(localStorage.getItem('token')); // null si no está logueado
```

---

## 🎯 Próximos Pasos Si Sigue Sin Funcionar

1. Abre DevTools (F12)
2. Ve a **Network**
3. Intenta login
4. Busca la request POST a `/api/auth/login`
5. Revisa:
   - **Status:** ¿Es 200 (éxito) o 401 (error)?
   - **Response:** ¿Tiene `token`, `tipo`, `data`?
   - **Headers:** ¿Se envía `Content-Type: application/json`?

Luego coméntame qué ves en la consola y el Network tab.

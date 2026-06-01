# 🚀 Quick Start - Fix Login Navigation

## ⚡ 3 Pasos para Probar la Solución

### 1️⃣ Limpiar caché del navegador
```
Presiona F12 → Click derecho en botón REFRESH → "Vaciar caché y hacer recarga"
```

### 2️⃣ Crear usuario de prueba
```bash
node create-test-user.js
```

Verás:
```
✅ Usuario creado exitosamente!
   ID: XX
   Email: test@workly.local

🔐 Usa estas credenciales para hacer login en http://localhost:5173/views/public/login
   Email: test@workly.local
   Contraseña: test123456
```

### 3️⃣ Probar login
1. Abre http://localhost:5173/views/public/login
2. Presiona **F12** → Abre tab **Consola**
3. Ingresa:
   - Email: `test@workly.local`
   - Contraseña: `test123456`
4. Click en **"Iniciar Sesión"**

✅ **Deberías ver** estos logs en la consola:
```
🔐 Iniciando login con: test@workly.local
📡 Respuesta del servidor: {status: 200, data: {...}}
✅ Sesión guardada. Tipo: usuario
📍 Navegando a: /views/usuario/principal
```

Y luego **ser redirigido automáticamente** a `/views/usuario/principal` ✨

---

## 🔧 Si Algo Falla

1. **Abre DevTools** (F12)
2. **Ve a Network tab**
3. **Intenta login nuevamente**
4. **Busca POST a `/api/auth/login`**
5. Revisa:
   - Status code (debe ser 200)
   - Response body (debe tener token, tipo, data)
6. **Copia los logs de error exactos**

Ver [DEBUG_LOGIN.md](./DEBUG_LOGIN.md) para guía completa.

---

## 📝 Cambios Aplicados

Actualicé 3 archivos para que el router funcione correctamente:

| Archivo | Cambio |
|---------|--------|
| `frontend/src/main.js` | Router se registra ANTES de montar app |
| `frontend/views/public/login/index.vue` | Usa `useRouter()` en lugar de `navigateTo()` |
| `frontend/views/admin/estadisticas/index.vue` | Mismo cambio para consistencia |

Ver [FIX_LOGIN_SUMMARY.md](./FIX_LOGIN_SUMMARY.md) para detalles técnicos.

---

## 🎯 Servidores Corriendo

Asegúrate que ambos estén activos:
```bash
# Terminal 1 - Backend (puerto 3000)
npm run backend:dev

# Terminal 2 - Frontend (puerto 5173)
npm run frontend:dev
```

Luego abre: http://localhost:5173/views/public/login

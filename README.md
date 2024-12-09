# Fondo Manager

**Fondo Manager** es una aplicación React que permite gestionar fondos de inversión, explorar archivos relacionados y visualizar su contenido, proporcionando una experiencia sencilla e intuitiva para el usuario.

---

## 🚀 Funcionalidades

1. **Gestión de Fondos**
   - Selección de fondos desde un listado paginado.
   - Visualización de los detalles del fondo seleccionado.

2. **Gestión de Archivos**
   - Listado de archivos relacionados con un fondo seleccionado.
   - Descarga de archivos específicos en formato `.txt`.

3. **Visualización de Contenido**
   - Visualización del contenido de un archivo seleccionado con soporte para scroll infinito.

4. **Notificaciones y Manejo de Estados**
   - Indicadores de carga.
   - Gestión de errores al cargar fondos o archivos.
   - Mensaje inicial durante la primera carga de fondos.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - React con TypeScript
  - Hooks personalizados (useFondos, useFiles, useFileContent)
  - CSS Modules para estilos personalizados

- **Backend/Integración:**
  - Consumo de APIs REST mediante `fetch`

- **Despliegue:**
  - Nginx como servidor web
  - Docker para contenerización

---

## ⚙️ Configuración del Proyecto

### Variables de Entorno

Configura las siguientes variables en tu archivo `.env`:

```plaintext
  REACT_APP_API_BASE_URL=http://your-backend-url
  REACT_APP_DEFAULT_PAGE_SIZE=50
```

---

## Instalación

1. Clona el repositorio:

```
  git clone https://github.com/your-username/fondo-manager.git
  cd fondo-manager
```

2. Instala las dependencias:

```
  npm install
```

3. Inicia la aplicación en desarrollo:

```
  npm start
```
La aplicación estará disponible en http://localhost:3000.

---

## 🐳 Dockerización

- Construcción de la imagen Docker:

```
  docker build -t fondo-manager .
```

- Ejecutar el contenedor:

```
docker run -p 3000:80 fondo-manager
```

---

## Configuración de Nginx
Asegúrate de tener el siguiente archivo de configuración en nginx.conf para manejar correctamente rutas dinámicas:

```
  server {
      listen 80;
      server_name localhost;

      root /usr/share/nginx/html;
      index index.html;

      location / {
          try_files $uri /index.html;
      }

      error_page 404 /index.html;
  }
```

---

## 🧪 Scripts Disponibles

- **npm start**: Inicia la aplicación en modo desarrollo.
- **npm run build**: Construye la aplicación para producción.
- **npm test**: Ejecuta pruebas unitarias.

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

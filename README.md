# 💡 MiOpenLab

MiOpenLab es una aplicación web donde los usuarios pueden crear, gestionar y explorar proyectos de manera intuitiva. Este laboratorio virtual permite organizar ideas, guardar proyectos y personalizar la experiencia con temas oscuros y claros.

---

## 🛠️ Tecnologías Utilizadas

- **React + TypeScript** – Construcción de la interfaz.
- **Vite** – Herramienta de desarrollo rápida.
- **Tailwind CSS** – Utilidad para estilos modernos.
- **React Router DOM** – Navegación entre páginas.
- **LocalStorage** – Persistencia de datos local.

---

## 🚀 Instalación y Despliegue Local

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/MiOpenLab.git
   cd MiOpenLab
   ```
2.  *Configurar Firebase:*
    * Crea un proyecto en la [consola de Firebase](https://console.firebase.google.com/).
    * Habilita el servicio de *Authentication* (con el método de correo electrónico/contraseña).
    * Habilita el servicio de *Firestore*.
    * Obtén las credenciales de configuración de tu proyecto de Firebase (ve a "Ajustes del proyecto" -> pestaña "General" -> sección "Tus apps"). Deberías ver un objeto de configuración similar a este:
         ```bash
        
        const firebaseConfig = {
          apiKey: "TU_API_KEY",
          authDomain: "TU_DOMINIO_DE_AUTENTICACION",
          projectId: "TU_ID_DE_PROYECTO",
          storageBucket: "TU_BUCKET_DE_ALMACENAMIENTO",
          messagingSenderId: "TU_ID_DE_EMISOR_DE_MENSAJES",
          appId: "TU_APP_ID"
        };
        
    * Crea un archivo de configuración en tu proyecto (por ejemplo, src/firebaseConfig.js si usas React, o un archivo similar según tu estructura) y pega estas credenciales. Asegúrate de no subir este archivo con tus credenciales a un repositorio público.
2.  **Instala Dependencias**:
  ```bash
   npm install
   ```
## 📦 ¿Por qué solo `npm install`?

El archivo `package.json` ya incluye todas las dependencias necesarias para que el proyecto funcione correctamente.

3. **Inicia el entorno local**:

   ```bash
   npm run dev
   ```
npm descarga e instala automáticamente:

### 🔧 Dependencias de Producción
- `react`, `react-dom`, `react-router-dom` – Librerías principales de la app.
- `firebase` – Conexión a backend y autenticación.
- `styled-components`, `react-icons`, `react-modal`, `react-confirm-alert` – Componentes visuales y de interacción.
- `@fortawesome/...` – Íconos visuales.

### 🧪 Dependencias de Desarrollo
- `vite` – Herramienta de desarrollo y build rápido.
- `tailwindcss`, `postcss`, `autoprefixer` – Sistema de estilos.
- `eslint`, `typescript`, `@vitejs/plugin-react` – Control de calidad y soporte para TS + JSX.

Por lo tanto, **no necesitas instalar nada más manualmente**.

4. **Problemas comunes y soluciones**
    
   - Error de "No se puede encontrar el módulo": Asegúrate de haber ejecutado npm install correctamente para instalar todas las dependencias.
   - Problemas con Firebase: Si la configuración de Firebase no funciona, asegúrate de que las credenciales estén correctas y de que hayas habilitado el método de autenticación que estás usando en la consola del      Firebase.
   
6. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---
6 **Pagina principal**
![image](https://github.com/user-attachments/assets/4de8a1fb-c683-45a1-983d-07c404c88974)

---

7 **pagina despues del login**
![image](https://github.com/user-attachments/assets/ca0dc0ec-46c0-4534-bc72-dbede3ec2657)

---

8 **pagina de Exploracion de proyectos**
![image](https://github.com/user-attachments/assets/08c5c3ee-2a72-4ed6-b86c-6bace0681167)


## 🧩 Componentes destacados

- `ProjectCard.tsx` – Muestra información resumida de un proyecto.
- `EditProjectModal.tsx` – Permite modificar datos de un proyecto.
- `DeleteProjectModal.tsx` – Confirma la eliminación de un proyecto.
- `ThemeToggle.tsx` – Cambia entre tema claro y oscuro.
- `Card.tsx` – Elemento base reutilizable para diseño visual.

---

## 📁 Estructura del Proyecto

```
MiOpenLab-main/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/            # Vistas principales de la app
│   ├── assets/           # Imágenes y recursos estáticos
│   └── main.tsx          # Punto de entrada
```

---
## 📜 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de utilizarlo y adaptarlo.

---

Desarrollado con ❤️ para quienes aman crear.

---



# ⚡ PWA Pokémon

Aplicación web progresiva (PWA) inspirada en el universo Pokémon, con funcionalidades offline y experiencia optimizada para dispositivos móviles.

**🔗 Demo en vivo:** https://pwa-pokemon-two.vercel.app/ (se puede instalar desde el navegador del celular)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white) ![PokeAPI](https://img.shields.io/badge/PokeAPI-EF5350?logo=pokemon&logoColor=white)

---

## 📌 Descripción

Este proyecto fue desarrollado como práctica de implementación de tecnologías PWA. Permite visualizar contenido temático de Pokémon con soporte para instalación en el dispositivo, íconos personalizados y funcionamiento offline gracias al uso de service workers.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**: estructura semántica
- **CSS3**: estilos personalizados
- **JavaScript (ES6+)**: lógica de interacción
- **Service Workers**: cacheo y funcionalidad offline
- **Manifest.json**: configuración de instalación como app
- **PokeAPI**: consumo de una API REST pública con `fetch` y `async/await`

---

## ✨ Qué se puede hacer

- Ver el listado de Pokémon cargado desde la [PokeAPI](https://pokeapi.co/).
- Buscar un Pokémon por nombre y ver su información en tarjetas.
- **Instalar la app** en el celular o la computadora (manifest + íconos).
- Seguir usándola **sin conexión**: el service worker cachea los recursos.

## ⚙️ Cómo verlo

Los service workers necesitan un servidor, así que no alcanza con abrir el archivo. Desde la carpeta del proyecto:

```bash
npx serve .
```

Después abrí la dirección que muestra la terminal. También se puede usar la extensión **Live Server** de VS Code.

---

## 👤 Autor

**Benjamín Bosch**, desarrollador Full Stack · [GitHub](https://github.com/Benja391) · [LinkedIn](https://www.linkedin.com/in/benjamin-bosch-/)

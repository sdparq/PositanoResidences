# Positano Residences — Al Marjan Island

Landing de venta *off-plan* para **Positano Residences** (Qube Development): villas y residencias
en terrazas frente al mar en Al Marjan Island, Ras Al Khaimah. Sitio 100% estático — sin build,
listo para Netlify.

## Estructura

```
index.html          Página única (todas las secciones)
css/style.css       Sistema de diseño completo
js/main.js          Interacciones (GSAP + Lenis por CDN, con fallback sin JS)
assets/img/         Imágenes  ⚠️ ahora mismo son PLACEHOLDERS
assets/video/       Vídeo del hero (hero.mp4) + poster
netlify.toml        Configuración de Netlify (headers/caché)
```

## 1. Imágenes

Renders reales ya integrados y optimizados para web (JPG progresivo, q82):

| Archivo en `assets/img/`  | Render original          | Uso                                   |
| ------------------------- | ------------------------ | ------------------------------------- |
| `render-beachfront.jpg`   | Exterior Beach.jpeg      | Arquitectura, amenities, galería      |
| `render-terraces-sea.jpg` | Villas landscape.jpg     | Full-bleed con parallax, galería      |
| `render-boulevard.jpg`    | Lateral.jpg              | Arquitectura, amenities, galería      |
| `render-access.jpg`       | Access.jpg               | Amenities (concierge), galería        |
| `masterplan-green.jpg`    | Isometric Concept.jpg    | **Masterplan interactivo** (hotspots) |
| `masterplan-axon.jpg`     | Facade.jpg               | Arquitectura, galería                 |
| `og-image.jpg`            | generada automáticamente | Compartir en RRSS (1200×630)          |

Los marcadores del masterplan ya están posicionados sobre el render real; para moverlos,
edita `style="--x:..%; --y:..%"` de cada `.hotspot` en `index.html`. Si algún día cambias
un render, mantén el nombre del archivo y actualiza los atributos `width`/`height` de sus
`<img>` con las nuevas dimensiones.

## ⚠️ 2. Datos comerciales a confirmar

Son **ilustrativos** (marcados con `<!-- TODO -->` en `index.html`). Búscalos y edítalos:

- Precios: `AED 2.1M` (Sky), `AED 6.5M` (Garden), `AED 9.8M` (Beach) · superficies y dormitorios
- Mix de unidades: `18` villas / `76` residencias / `300 m` de playa (sección stats)
- Plan de pago `20/40/40` y entrega `Q4 2028` (hero + sección invest)
- Yield proyectado `9%` y tiempos de trayecto (sección location)
- **Contacto**: email, teléfono y número de WhatsApp (footer + botón flotante `wa-float`,
  formato `https://wa.me/9715XXXXXXXX`)

El disclaimer legal del footer ya cubre que todo es indicativo, pero revísalo con tu equipo.

## 3. Desplegar en Netlify

1. Sube el repo a GitHub y en Netlify: **Add new site → Import from Git**.
2. Build command: *(vacío)* · Publish directory: `.` — lo lee de `netlify.toml`.
3. **Formulario**: usa Netlify Forms (`register-interest`). Se activa solo al desplegar.
   Verás los leads en *Site → Forms*; configura ahí las notificaciones por email.
   *En local el formulario no envía — solo funciona desplegado.*

## Notas técnicas

- Animaciones: GSAP + ScrollTrigger y Lenis **auto-alojados** en `js/vendor/` (cero dependencias
  externas; también las fuentes en `assets/fonts/`). Si JS falla o el usuario tiene
  `prefers-reduced-motion`, la página se muestra completa sin animaciones (nada queda oculto).
- El preloader se muestra una vez por sesión (`sessionStorage`).
- Vídeo del hero: `assets/video/hero.mp4` (2.4 MB). Si lo cambias, mantén el nombre o
  actualiza el `<source>` del hero; añade un `hero-poster.jpg` acorde.
- Probar en local: `python3 -m http.server 8080` y abrir `http://localhost:8080`.

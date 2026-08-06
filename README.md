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

## ⚠️ 1. Reemplazar las imágenes placeholder

Las imágenes del chat no llegaron como archivo, así que generé placeholders con la misma
proporción. **Sustitúyelas por los renders reales usando exactamente estos nombres** (no hay
que tocar ningún código):

| Archivo en `assets/img/`  | Contenido esperado                                        |
| ------------------------- | --------------------------------------------------------- |
| `render-beachfront.jpg`   | Render frontal desde la playa (panorámico ~3.4:1)          |
| `render-terraces-sea.jpg` | Vista al mar desde las terrazas (panorámico ~2.9:1)        |
| `render-boulevard.jpg`    | Calle con fachadas terracota (~1:1)                        |
| `masterplan-green.jpg`    | Axonometría verde con jardines (~1.2:1) — *base del plano interactivo* |
| `masterplan-axon.jpg`     | Axonometría de línea del bloque (~1.6:1)                   |
| `og-image.jpg`            | Imagen para compartir en RRSS (1200×630) — la generada ya sirve |

Tras poner el masterplan real, ajusta la posición de los marcadores interactivos en
`index.html` (sección `#masterplan`): cada botón `.hotspot` tiene `style="--x:..%; --y:..%"`.

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

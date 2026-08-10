# Positano Residences — Al Marjan Island

Web de presentación del proyecto de arquitectura **Positano Residences** (Qube Development):
villas y residencias en terrazas frente al mar en Al Marjan Island, Ras Al Khaimah.
Sitio 100% estático — sin build, listo para Netlify.

## Estructura

```
index.html          Página única (todas las secciones)
css/style.css       Sistema de diseño completo
js/main.js          Interacciones (GSAP + Lenis auto-alojados, con fallback sin JS)
js/vendor/          GSAP, ScrollTrigger y Lenis (sin CDNs externos)
assets/img/         Renders optimizados para web
assets/fonts/       Cormorant Garamond + Manrope (woff2, auto-alojadas)
assets/video/       Vídeo del hero (hero.mp4 1080p + hero.webm fallback) + poster
netlify.toml        Configuración de Netlify
```

## Secciones

Hero (vídeo) → Vision → **Masterplan interactivo** (hotspots) → Gallery (scroll horizontal)
→ Location (**mapa real Leaflet** con cartografía Carto/OSM teñida al estilo de la web y pin
del proyecto en 25.680214, 55.744531). Contacto: solo los datos del footer.

## Imágenes

| Archivo en `assets/img/`  | Render original          | Uso                                   |
| ------------------------- | ------------------------ | ------------------------------------- |
| `render-beachfront.jpg`   | Exterior Beach.jpeg      | Galería                               |
| `render-terraces-sea.jpg` | Villas landscape.jpg     | Full-bleed con parallax, galería      |
| `render-boulevard.jpg`    | Lateral.jpg              | Galería                               |
| `render-access.jpg`       | Access.jpg               | Galería                               |
| `masterplan-green.jpg`    | isometric front.jpg      | **Masterplan** (hotspots)             |
| `masterplan-axon.jpg`     | isometric facade-real.jpg| Galería                               |
| `og-image.jpg`            | generada automáticamente | Compartir en RRSS (1200×630)          |

Los marcadores del masterplan se posicionan con `style="--x:..%; --y:..%"` en cada
`.hotspot` de `index.html`. Si cambias un render, mantén el nombre del archivo y actualiza
los atributos `width`/`height` de sus `<img>`.

## Datos a confirmar

- **Email y teléfono de contacto** del footer (`sales@qubedevelopment.com` / `+971 50 000 0000`
  son placeholders)

## Desplegar en Netlify

1. **Add new site → Import from Git** → elige el repo, rama `main`.
2. Build command: *(vacío)* · Publish directory: `.` — lo lee de `netlify.toml`.

### Si un deploy no se refleja

- Comprueba en *Deploys* que el último deploy es **Published** y corresponde al commit
  esperado (sale el hash de git).
- La caché ya no es agresiva (se quitó el `immutable` de `/assets/*`): tras un deploy,
  un refresco duro (`Ctrl/Cmd + Shift + R`) trae siempre la última versión.
- Si los pushes no disparan deploys: *Site configuration → Build & deploy →
  Continuous deployment* — revisa la rama de producción y que la app de GitHub de
  Netlify tenga acceso al repo.

## Notas técnicas

- Animaciones GSAP + ScrollTrigger + Lenis auto-alojadas. Con JS deshabilitado o
  `prefers-reduced-motion`, la página se muestra completa sin animaciones.
- Mapa: Leaflet auto-alojado; los tiles de Carto/OSM son la única dependencia externa en
  runtime (requieren la atribución que ya lleva el mapa). El tinte cálido se aplica con un
  filtro CSS sobre `.leaflet-tile-pane`.
- El preloader se muestra una vez por sesión (`sessionStorage`).
- Vídeo del hero: reprocesado a 1080p (Lanczos + sharpen + grano fino, H.264 CRF 19)
  con fallback WebM/VP9. Si consigues el clip original en 1080p/4K del visualizador,
  sustitúyelo y re-exporta con la misma receta para un salto más de calidad.
- Probar en local: `python3 -m http.server 8080` y abrir `http://localhost:8080`.

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

Hero (vídeo) → Vision → Architecture → **Masterplan interactivo** (hotspots) → Amenities →
Gallery (scroll horizontal) → Location (plano estilizado SVG del archipiélago con marcador
del proyecto). Contacto: mailto en el nav + datos del footer.

## Imágenes

| Archivo en `assets/img/`  | Render original          | Uso                                   |
| ------------------------- | ------------------------ | ------------------------------------- |
| `render-beachfront.jpg`   | Exterior Beach.jpeg      | Arquitectura, amenities, galería      |
| `render-terraces-sea.jpg` | Villas landscape.jpg     | Full-bleed con parallax, galería      |
| `render-boulevard.jpg`    | Lateral.jpg              | Arquitectura, amenities, galería      |
| `render-access.jpg`       | Access.jpg               | Amenities (concierge), galería        |
| `masterplan-green.jpg`    | Isometric Concept.jpg    | **Masterplan interactivo** (hotspots) |
| `masterplan-axon.jpg`     | Facade.jpg               | Arquitectura, galería                 |
| `og-image.jpg`            | generada automáticamente | Compartir en RRSS (1200×630)          |

Los marcadores del masterplan se posicionan con `style="--x:..%; --y:..%"` en cada
`.hotspot` de `index.html`. Si cambias un render, mantén el nombre del archivo y actualiza
los atributos `width`/`height` de sus `<img>`.

## Datos a confirmar

Marcados con `<!-- TODO -->` en `index.html`:

- Mix de unidades del banner de cifras: `18` villas / `76` residencias / `300 m` de playa
- Superficies y dormitorios de las tipologías
- Tiempos de trayecto de la sección Location
- **Email de contacto** del footer y del botón del nav (`sales@qubedevelopment.com` es placeholder)

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
- El preloader se muestra una vez por sesión (`sessionStorage`).
- Vídeo del hero: reprocesado a 1080p (Lanczos + sharpen + grano fino, H.264 CRF 19)
  con fallback WebM/VP9. Si consigues el clip original en 1080p/4K del visualizador,
  sustitúyelo y re-exporta con la misma receta para un salto más de calidad.
- Probar en local: `python3 -m http.server 8080` y abrir `http://localhost:8080`.

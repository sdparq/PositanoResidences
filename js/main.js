/* ═══════════════════════════════════════════════════════════════
   POSITANO RESIDENCES — interactions
   Degrades gracefully: without GSAP/Lenis (CDN blocked, old
   browser) every section stays fully visible and usable.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const doc = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const anim = hasGSAP && !reduced;

  if (anim) {
    doc.classList.add("anim"); // enables CSS initial states for reveals
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Smooth scroll (Lenis) ── */
  let lenis = null;
  if (anim && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const scrollToTarget = (target) => {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        closeMenu();
        scrollToTarget(id);
      }
    });
  });

  /* ── Preloader + hero intro ── */
  const preloader = document.getElementById("preloader");

  function heroIntro() {
    if (!anim) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }, 0.1)
      .from(".hero-wordmark span", { yPercent: 105, duration: 1.3, ease: "power4.out" }, 0.3);
  }

  function finishPreloader() {
    if (preloader) preloader.classList.add("done");
    document.body.classList.remove("locked");
    heroIntro();
  }

  const seen = sessionStorage.getItem("positano-intro");
  if (!preloader || reduced || seen) {
    finishPreloader();
  } else if (anim) {
    sessionStorage.setItem("positano-intro", "1");
    document.body.classList.add("locked");
    const tl = gsap.timeline({ onComplete: finishPreloader });
    tl.from(".preloader-eyebrow", { opacity: 0, y: 12, duration: 0.5 }, 0.15)
      .from(".preloader-word", { opacity: 0, y: 26, duration: 0.9, ease: "power3.out" }, 0.3)
      .from(".preloader-sub", { opacity: 0, y: 12, duration: 0.5 }, 0.65)
      .to(".preloader-inner", { opacity: 0, y: -18, duration: 0.45, ease: "power2.in" }, "+=0.55")
      .to(preloader, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.15");
  } else {
    sessionStorage.setItem("positano-intro", "1");
    setTimeout(finishPreloader, 900);
  }

  /* ── Nav state + scroll progress ── */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const onScroll = () => {
    const y = window.scrollY || 0;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (progress) {
      const max = doc.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  const burger = document.getElementById("navBurger");
  const overlay = document.getElementById("menuOverlay");
  function closeMenu() {
    if (!overlay || !overlay.classList.contains("open")) return;
    overlay.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    if (lenis) lenis.start();
  }
  if (burger && overlay) {
    burger.addEventListener("click", () => {
      const open = !overlay.classList.contains("open");
      overlay.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      overlay.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("locked", open);
      if (lenis) open ? lenis.stop() : lenis.start();
    });
  }
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeMenu(); closeHotspots(); } });

  /* ── Hero video: nudge autoplay on strict browsers ── */
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    const tryPlay = () => heroVideo.play().catch(() => {});
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
  }

  /* ── Scroll-driven animation ── */
  if (anim) {
    // Generic reveals
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const isClip = el.getAttribute("data-reveal") === "clip";
      gsap.to(el, {
        opacity: 1,
        y: 0,
        clipPath: isClip ? "inset(0% 0% 0% 0%)" : undefined,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // Hero video parallax out
    gsap.to(".hero-video", {
      yPercent: 9,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // Full-bleed image parallax
    document.querySelectorAll("[data-parallax]").forEach((fig) => {
      const img = fig.querySelector("img");
      if (!img) return;
      gsap.fromTo(img, { yPercent: -14 }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Horizontal gallery (desktop pin)
    const gallery = document.querySelector(".gallery");
    const track = document.getElementById("galleryTrack");
    if (gallery && track) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        gallery.classList.add("pinned");
        const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: gallery,
            start: "top top",
            end: () => "+=" + getDist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => gallery.classList.remove("pinned"); // gsap.matchMedia reverts its own tweens

      });
    }

    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* ── Masterplan hotspots ── */
  const hotspots = Array.from(document.querySelectorAll(".hotspot"));
  function closeHotspots(except) {
    hotspots.forEach((h) => {
      if (h !== except) { h.classList.remove("active"); h.setAttribute("aria-expanded", "false"); }
    });
  }
  hotspots.forEach((h) => {
    h.addEventListener("click", (e) => {
      e.stopPropagation();
      const active = h.classList.toggle("active");
      h.setAttribute("aria-expanded", String(active));
      closeHotspots(h);
    });
  });
  document.addEventListener("click", () => closeHotspots());

  /* ── Sketch-to-render comparison ── */
  const cmp = document.getElementById("compare");
  if (cmp) {
    const handle = document.getElementById("compareHandle");
    const setPos = (p) => {
      p = Math.max(4, Math.min(96, p));
      cmp.style.setProperty("--pos", p + "%");
      if (handle) handle.setAttribute("aria-valuenow", String(Math.round(p)));
    };
    const posFromEvent = (e) => {
      const r = cmp.getBoundingClientRect();
      setPos(((e.clientX - r.left) / r.width) * 100);
    };
    let dragging = false;
    cmp.addEventListener("dragstart", (e) => e.preventDefault());
    cmp.addEventListener("pointerdown", (e) => {
      e.preventDefault(); // stop native image dragging from hijacking the gesture
      dragging = true;
      try { cmp.setPointerCapture(e.pointerId); } catch {}
      posFromEvent(e);
    });
    cmp.addEventListener("pointermove", (e) => { if (dragging) posFromEvent(e); });
    const stopDrag = () => { dragging = false; };
    cmp.addEventListener("pointerup", stopDrag);
    cmp.addEventListener("pointercancel", stopDrag);
    if (handle) {
      handle.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        const cur = parseFloat(cmp.style.getPropertyValue("--pos")) || 32;
        setPos(cur + (e.key === "ArrowRight" ? 4 : -4));
      });
    }
    if (anim) {
      // affordance sweep when the block first enters the viewport
      const obj = { p: 4 };
      gsap.to(obj, {
        p: 32, duration: 1.6, ease: "power3.inOut", delay: 0.3,
        onUpdate: () => cmp.style.setProperty("--pos", obj.p + "%"),
        scrollTrigger: { trigger: cmp, start: "top 75%", once: true },
      });
    }
  }

  /* ── Custom cursor (fine pointers only) ── */
  if (anim && window.matchMedia("(pointer: fine)").matches) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (dot && ring) {
      let tx = -100, ty = -100, rx = -100, ry = -100;
      window.addEventListener("mousemove", (e) => {
        tx = e.clientX; ty = e.clientY;
        dot.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`;
      }, { passive: true });
      const loop = () => {
        rx += (tx - rx) * 0.16;
        ry += (ty - ry) * 0.16;
        const half = ring.classList.contains("is-hover") ? 26 : 17;
        ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
        requestAnimationFrame(loop);
      };
      loop();
      const HOVERABLE = "a, button, input, select, textarea";
      document.addEventListener("mouseover", (e) => {
        ring.classList.toggle("is-hover", Boolean(e.target.closest(HOVERABLE)));
      });
    }
  }
})();

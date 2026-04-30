"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // ─── AUTO CONTAINER: wrap all section direct children in .container ───
    const wrapTargets = [
      ".services.fade-up",
      ".process.fade-up",
      ".team.fade-up",
      ".partner.fade-up",
      ".testimonials.fade-up",
      ".faq.fade-up",
      ".news.fade-up",
      ".cta-section.fade-up",
    ];

    wrapTargets.forEach((sel) => {
      const sec = document.querySelector<HTMLElement>(sel);
      if (!sec) return;
      if (sec.querySelector(":scope > .container")) return;

      const container = document.createElement("div");
      container.className = "container";

      while (sec.firstChild) {
        container.appendChild(sec.firstChild);
      }
      sec.appendChild(container);
    });

    // Footer: wrap wordmark-top + wordmark in container
    const footer = document.querySelector<HTMLElement>(".wordmark-footer");
    if (footer && !footer.querySelector(":scope > .container")) {
      const fc = document.createElement("div");
      fc.className = "container";
      while (footer.firstChild) fc.appendChild(footer.firstChild);
      footer.appendChild(fc);
    }

    // Cursor
    const dot = document.getElementById("cursorDot") as HTMLDivElement | null;
    const ring = document.getElementById("cursorRing") as HTMLDivElement | null;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) {
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId = 0;
    const animRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      rafId = window.requestAnimationFrame(animRing);
    };
    rafId = window.requestAnimationFrame(animRing);

    // Nav scroll
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (!navbar) return;
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);

    // FAQ
    const faqHandlers: Array<{
      el: Element;
      handler: () => void;
    }> = [];
    document.querySelectorAll(".faq-q").forEach((btn) => {
      const handler = () => {
        const item = btn.closest(".faq-item");
        if (!item) return;
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      };
      btn.addEventListener("click", handler);
      faqHandlers.push({ el: btn, handler });
    });

    // ─── DITHER CANVAS RENDERING ───
    function renderDither(canvas: HTMLCanvasElement, shape: string | undefined) {
      const W = canvas.width,
        H = canvas.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const offscreen = document.createElement("canvas");
      offscreen.width = W;
      offscreen.height = H;
      const oc = offscreen.getContext("2d");
      if (!oc) return;

      oc.clearRect(0, 0, W, H);

      // Draw shape in white on offscreen
      oc.fillStyle = "#000";
      oc.fillRect(0, 0, W, H);
      oc.strokeStyle = "#fff";
      oc.fillStyle = "#fff";
      oc.lineWidth = 2;
      const cx = W / 2,
        cy = H / 2;

      if (shape === "magnifier") {
        oc.beginPath();
        oc.arc(cx - 18, cy - 18, 62, 0, Math.PI * 2);
        oc.strokeStyle = "#fff";
        oc.lineWidth = 16;
        oc.stroke();

        oc.beginPath();
        oc.arc(cx - 18, cy - 18, 62, 0, Math.PI * 2);
        oc.strokeStyle = "rgba(255,255,255,0.25)";
        oc.lineWidth = 8;
        oc.stroke();

        oc.strokeStyle = "#fff";
        oc.lineWidth = 14;
        oc.lineCap = "round";
        oc.beginPath();
        oc.moveTo(cx + 28, cy + 28);
        oc.lineTo(cx + 72, cy + 72);
        oc.stroke();

        oc.beginPath();
        oc.arc(cx - 18, cy - 18, 52, 0, Math.PI * 2);
        oc.fillStyle = "rgba(255,255,255,0.12)";
        oc.fill();
      }

      if (shape === "brain") {
        oc.fillStyle = "rgba(255,255,255,0.0)";
        oc.strokeStyle = "#fff";
        oc.lineWidth = 3;

        for (let layer = 0; layer < 4; layer++) {
          const r = 72 - layer * 12;
          const wobble = 14 - layer * 2;
          oc.beginPath();
          for (let a = 0; a <= 360; a += 5) {
            const rad = (a * Math.PI) / 180;
            const noise =
              Math.sin(a * 0.18 + layer * 1.5) * wobble +
              Math.cos(a * 0.31 + layer) * (wobble * 0.6) +
              Math.sin(a * 0.55) * (wobble * 0.4);
            const px = cx + (r + noise) * Math.cos(rad);
            const py = cy + (r + noise) * Math.sin(rad);
            a === 0 ? oc.moveTo(px, py) : oc.lineTo(px, py);
          }
          oc.closePath();
          oc.strokeStyle = `rgba(255,255,255,${0.9 - layer * 0.18})`;
          oc.lineWidth = 3 - layer * 0.4;
          oc.stroke();
        }

        for (let i = 0; i < 6; i++) {
          oc.beginPath();
          const ang = (i / 6) * Math.PI * 2;
          oc.moveTo(cx + 20 * Math.cos(ang), cy + 20 * Math.sin(ang));
          oc.bezierCurveTo(
            cx + 50 * Math.cos(ang + 0.4),
            cy + 50 * Math.sin(ang + 0.4),
            cx + 55 * Math.cos(ang + 0.8),
            cy + 55 * Math.sin(ang + 0.8),
            cx + 68 * Math.cos(ang + 1.0),
            cy + 68 * Math.sin(ang + 1.0),
          );
          oc.strokeStyle = "rgba(255,255,255,0.4)";
          oc.lineWidth = 1.2;
          oc.stroke();
        }
      }

      if (shape === "rocket") {
        oc.strokeStyle = "#fff";
        oc.lineWidth = 3;
        oc.fillStyle = "rgba(255,255,255,0.15)";

        oc.save();
        oc.translate(cx, cy);
        oc.rotate(-Math.PI / 4);

        oc.beginPath();
        oc.moveTo(0, -72);
        oc.bezierCurveTo(28, -72, 40, -40, 40, 0);
        oc.bezierCurveTo(40, 40, 28, 60, 0, 72);
        oc.bezierCurveTo(-28, 60, -40, 40, -40, 0);
        oc.bezierCurveTo(-40, -40, -28, -72, 0, -72);
        oc.fill();
        oc.stroke();

        oc.beginPath();
        oc.arc(0, -72, 18, 0, Math.PI * 2);
        oc.fillStyle = "rgba(255,255,255,0.55)";
        oc.fill();

        oc.beginPath();
        oc.arc(0, -16, 14, 0, Math.PI * 2);
        oc.strokeStyle = "#fff";
        oc.lineWidth = 5;
        oc.stroke();
        oc.fillStyle = "rgba(255,255,255,0.2)";
        oc.fill();

        oc.fillStyle = "rgba(255,255,255,0.6)";
        oc.beginPath();
        oc.moveTo(-40, 40);
        oc.lineTo(-70, 80);
        oc.lineTo(-20, 60);
        oc.closePath();
        oc.fill();

        oc.beginPath();
        oc.moveTo(40, 40);
        oc.lineTo(70, 80);
        oc.lineTo(20, 60);
        oc.closePath();
        oc.fill();

        oc.fillStyle = "rgba(255,255,255,0.35)";
        oc.beginPath();
        oc.moveTo(-18, 72);
        oc.quadraticCurveTo(0, 108, 18, 72);
        oc.closePath();
        oc.fill();

        oc.restore();
      }

      // ─── Floyd-Steinberg dithering ───
      const imgData = oc.getImageData(0, 0, W, H);
      const d = imgData.data;
      const err = new Float32Array(W * H);

      for (let i = 0; i < W * H; i++) {
        err[i] = d[i * 4] / 255;
      }

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const idx = y * W + x;
          const old = err[idx];
          const nw = old > 0.5 ? 1 : 0;
          err[idx] = nw;
          const e = old - nw;
          if (x + 1 < W) err[idx + 1] += (e * 7) / 16;
          if (y + 1 < H && x > 0) err[idx + W - 1] += (e * 3) / 16;
          if (y + 1 < H) err[idx + W] += (e * 5) / 16;
          if (y + 1 < H && x + 1 < W) err[idx + W + 1] += (e * 1) / 16;
        }
      }

      ctx.clearRect(0, 0, W, H);
      const out = ctx.createImageData(W, H);
      for (let i = 0; i < W * H; i++) {
        const v = err[i] > 0.5 ? 255 : 0;
        out.data[i * 4] = v;
        out.data[i * 4 + 1] = v;
        out.data[i * 4 + 2] = v;
        out.data[i * 4 + 3] = v > 0 ? 255 : 0;
      }
      ctx.putImageData(out, 0, 0);
    }

    document.querySelectorAll<HTMLCanvasElement>(".dither-canvas").forEach((canvas) => {
      renderDither(canvas, canvas.dataset.shape);
    });

    function renderWorkDither(canvas: HTMLCanvasElement, shape: string | undefined) {
      const W = canvas.width,
        H = canvas.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const oc = off.getContext("2d");
      if (!oc) return;
      const cx = W / 2,
        cy = H / 2;

      oc.fillStyle = "#000";
      oc.fillRect(0, 0, W, H);

      if (shape === "bubbles") {
        const r = 58;
        const offset = 36;
        const circles = [
          { x: cx - offset, y: cy - offset },
          { x: cx + offset, y: cy - offset },
          { x: cx - offset, y: cy + offset },
          { x: cx + offset, y: cy + offset },
        ];
        circles.forEach((c) => {
          oc.beginPath();
          oc.arc(c.x, c.y, r, 0, Math.PI * 2);
          oc.fillStyle = "rgba(255,255,255,0.22)";
          oc.fill();
        });
        circles.forEach((c) => {
          oc.beginPath();
          oc.arc(c.x, c.y, r, 0, Math.PI * 2);
          oc.strokeStyle = "rgba(255,255,255,0.9)";
          oc.lineWidth = 9;
          oc.stroke();
        });
        circles.forEach((c) => {
          oc.beginPath();
          oc.arc(c.x, c.y, r * 0.6, 0, Math.PI * 2);
          oc.strokeStyle = "rgba(255,255,255,0.3)";
          oc.lineWidth = 3;
          oc.stroke();
        });
      }

      if (shape === "cube3d") {
        const drawIsoCube = (ox: number, oy: number, s: number, alpha: number) => {
          oc.globalAlpha = alpha;
          oc.strokeStyle = "#fff";
          oc.lineWidth = 2.2;
          const h = s * 0.52;
          oc.beginPath();
          oc.rect(ox - s, oy, s * 2, s * 1.25);
          oc.stroke();
          oc.beginPath();
          oc.moveTo(ox - s, oy);
          oc.lineTo(ox - s + h, oy - h);
          oc.lineTo(ox + s + h, oy - h);
          oc.lineTo(ox + s, oy);
          oc.closePath();
          oc.stroke();
          oc.beginPath();
          oc.moveTo(ox + s, oy);
          oc.lineTo(ox + s + h, oy - h);
          oc.lineTo(ox + s + h, oy - h + s * 1.25);
          oc.lineTo(ox + s, oy + s * 1.25);
          oc.closePath();
          oc.stroke();
          oc.globalAlpha = alpha * 0.4;
          oc.beginPath();
          oc.moveTo(ox - s, oy + s * 0.62);
          oc.lineTo(ox + s, oy + s * 0.62);
          oc.stroke();
          oc.beginPath();
          oc.moveTo(ox, oy);
          oc.lineTo(ox, oy + s * 1.25);
          oc.stroke();
        };
        oc.globalAlpha = 1;
        [
          { ox: cx - 8, oy: cy - 5, s: 60, a: 0.95 },
          { ox: cx + 6, oy: cy - 18, s: 54, a: 0.7 },
          { ox: cx - 20, oy: cy + 8, s: 48, a: 0.5 },
          { ox: cx + 18, oy: cy - 30, s: 40, a: 0.3 },
        ].forEach((o) => drawIsoCube(o.ox, o.oy, o.s, o.a));
        oc.globalAlpha = 1;
      }

      if (shape === "star4") {
        const drawStar = (scale: number, alpha: number) => {
          oc.globalAlpha = alpha;
          oc.beginPath();
          oc.moveTo(cx, cy - 80 * scale);
          oc.lineTo(cx + 20 * scale, cy - 20 * scale);
          oc.lineTo(cx + 80 * scale, cy);
          oc.lineTo(cx + 20 * scale, cy + 20 * scale);
          oc.lineTo(cx, cy + 80 * scale);
          oc.lineTo(cx - 20 * scale, cy + 20 * scale);
          oc.lineTo(cx - 80 * scale, cy);
          oc.lineTo(cx - 20 * scale, cy - 20 * scale);
          oc.closePath();
          oc.fillStyle = "rgba(255,255,255,0.9)";
          oc.fill();
          oc.strokeStyle = "#fff";
          oc.lineWidth = 1.5;
          oc.stroke();
        };
        drawStar(1.0, 0.9);
        drawStar(0.7, 0.35);
        drawStar(0.45, 0.2);
        oc.globalAlpha = 1;
        oc.beginPath();
        oc.arc(cx, cy, 6, 0, Math.PI * 2);
        oc.fillStyle = "#fff";
        oc.fill();
      }

      const imgData = oc.getImageData(0, 0, W, H);
      const d = imgData.data;
      const err = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) err[i] = d[i * 4] / 255;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const idx = y * W + x;
          const old = err[idx];
          const nw = old > 0.5 ? 1 : 0;
          err[idx] = nw;
          const e = old - nw;
          if (x + 1 < W) err[idx + 1] += (e * 7) / 16;
          if (y + 1 < H && x > 0) err[idx + W - 1] += (e * 3) / 16;
          if (y + 1 < H) err[idx + W] += (e * 5) / 16;
          if (y + 1 < H && x + 1 < W) err[idx + W + 1] += (e * 1) / 16;
        }
      }
      ctx.clearRect(0, 0, W, H);
      const out = ctx.createImageData(W, H);
      for (let i = 0; i < W * H; i++) {
        const v = err[i] > 0.5 ? 255 : 0;
        out.data[i * 4] = v;
        out.data[i * 4 + 1] = v;
        out.data[i * 4 + 2] = v;
        out.data[i * 4 + 3] = v > 0 ? 255 : 0;
      }
      ctx.putImageData(out, 0, 0);
    }

    document.querySelectorAll<HTMLCanvasElement>(".work-canvas").forEach((canvas) => {
      renderWorkDither(canvas, canvas.dataset.work);
    });

    // ─── HERO ASCII ART CANVAS ───
    const heroCanvas = document.getElementById("heroAsciiCanvas") as HTMLCanvasElement | null;
    let heroRo: ResizeObserver | null = null;
    if (heroCanvas) {
      const CHARS = "789ABAA998877A789BA9987";
      const FONT_SIZE = 7.5;

      const draw = () => {
        const W = heroCanvas.width,
          H = heroCanvas.height;
        const ctx = heroCanvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);

        const dpr = window.devicePixelRatio || 1;
        const fs = FONT_SIZE * dpr;
        ctx.font = `${fs}px 'DM Mono', monospace`;

        const cols = Math.ceil(W / (fs * 0.62));
        const rows = Math.ceil(H / (fs * 1.18));

        function handBrightness(nx: number, ny: number) {
          const ax = 0.52,
            aw = 0.13;
          const armMask = nx > ax - aw / 2 && nx < ax + aw / 2 && ny > 0.52 ? 1 : 0;

          const pCx = 0.52,
            pCy = 0.47,
            pRx = 0.19,
            pRy = 0.13;
          const palmD = ((nx - pCx) / pRx) ** 2 + ((ny - pCy) / pRy) ** 2;
          const palmMask = palmD < 1 ? 1 - palmD * 0.3 : 0;

          const fingers = [
            { cx: 0.38, cy: 0.25, rx: 0.038, ry: 0.22 },
            { cx: 0.44, cy: 0.2, rx: 0.04, ry: 0.25 },
            { cx: 0.51, cy: 0.17, rx: 0.042, ry: 0.27 },
            { cx: 0.58, cy: 0.2, rx: 0.04, ry: 0.25 },
            { cx: 0.65, cy: 0.3, rx: 0.038, ry: 0.2 },
          ];
          let fingerMask = 0;
          for (const f of fingers) {
            const d = ((nx - f.cx) / f.rx) ** 2 + ((ny - f.cy) / f.ry) ** 2;
            if (d < 1) fingerMask = Math.max(fingerMask, 1 - d * 0.4);
          }

          const total = Math.max(armMask, palmMask, fingerMask);

          const noise =
            Math.sin(nx * 87.3 + ny * 43.7) * 0.08 + Math.cos(nx * 34.1 - ny * 61.2) * 0.06;

          return Math.max(0, Math.min(1, total + noise));
        }

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const nx = col / cols;
            const ny = row / rows;
            const brightness = handBrightness(nx, ny);
            if (brightness < 0.05) continue;

            const alpha = Math.min(1, brightness * 1.4);
            const lightness = Math.floor(120 + brightness * 120);
            ctx.fillStyle = `rgba(${lightness},${lightness + 2},${lightness},${alpha})`;

            const charIdx = (row * 7 + col * 3 + Math.floor(nx * 11)) % CHARS.length;
            const ch = CHARS[charIdx];

            ctx.fillText(ch, col * fs * 0.62, row * fs * 1.18 + fs);
          }
        }
      };

      const resize = () => {
        heroCanvas.width = heroCanvas.offsetWidth * (window.devicePixelRatio || 1);
        heroCanvas.height = heroCanvas.offsetHeight * (window.devicePixelRatio || 1);
        draw();
      };

      heroRo = new ResizeObserver(resize);
      if (heroCanvas.parentElement) heroRo.observe(heroCanvas.parentElement);
      window.setTimeout(resize, 100);
    }

    // Scroll animations — reveal all fade-up sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    const onLoad = () => {
      document.querySelectorAll<HTMLElement>(".fade-up").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add("visible");
      });
    };
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", onLoad);
      if (rafId) window.cancelAnimationFrame(rafId);
      faqHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler));
      observer.disconnect();
      heroRo?.disconnect();
    };
  }, []);

  return null;
}


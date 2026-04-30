## Wave AI (Next.js)

Chuyển từ file HTML/CSS gốc sang Next.js để deploy lên Vercel, giữ nguyên giao diện.

### Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

### Build production

```bash
npm run build
npm run start
```

### Ghi chú

- CSS gốc được giữ nguyên và được load từ `public/assets/site.css`.
- Markup được tách thành các component trong `components/sections/*` và render bằng `dangerouslySetInnerHTML` để tránh lệch SVG/attribute so với HTML gốc.
- Các hiệu ứng JS (cursor, FAQ toggle, canvas dither, reveal on scroll, …) nằm trong `components/ClientEffects.tsx`.


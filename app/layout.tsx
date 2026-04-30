import "./globals.css";

export const metadata = {
  title: "Wave AI — AI Automation Agency",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link href="/assets/site.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}


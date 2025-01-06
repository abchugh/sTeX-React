// SEO
export const metadata = {
  title: "CC",
  description: "desc",
  keywords: "key",
  icons: { icon: "/favicon.png" },
  metadataBase: new URL("https://abc.com")
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}

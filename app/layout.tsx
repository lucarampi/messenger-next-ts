import "../styles/globals.css";
import Header from "./Header";
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
      {/* @ts-expect-error */}
        <Header />
        {children}
      </body>
    </html>
  );
}

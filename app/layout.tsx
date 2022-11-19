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
      <body className="scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-700 scrollbar-thumb-rounded-full transition-all">
      {/* @ts-expect-error */}
        <Header />
        {children}
      </body>
    </html>
  );
}

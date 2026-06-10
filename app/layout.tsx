import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jio Jain National Conclave — Registration",
  description:
    "Register for the Jio Jain National Conclave at Palitana, Gujarat. Join Jain professionals from across India for networking and collaboration.",
  openGraph: {
    title: "Jio Jain National Conclave — Registration",
    description: "Register for the premier Jain professional conclave at Palitana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

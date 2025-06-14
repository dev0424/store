import { getBaseURL } from "@lib/util/env";
import { Metadata } from "next";
import localFont from "next/font/local";
import "styles/globals.css";

export const font = localFont({
  src: [
    {
      path: "./fonts/Nexa-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Nexa-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Nexa-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Nexa-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nexa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={font.variable}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  );
}

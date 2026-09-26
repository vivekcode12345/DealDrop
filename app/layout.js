import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, HERO_SUBTITLE } from "@/lib/content";
import "./globals.css";

export const metadata = {
  title: `${SITE_NAME} - ${HERO_SUBTITLE}`,
  description: HERO_SUBTITLE,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster richColors />
      </body>
    </html>
  );
}
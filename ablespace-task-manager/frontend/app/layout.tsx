import "./globals.css";
import { ThemeProvider } from "../components/shared/ThemeProvider";

export const metadata = {
  title: "Pyramid Tasks",
  description: "AbleSpace technical assessment"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

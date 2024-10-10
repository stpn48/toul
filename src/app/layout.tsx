import PageContainer from "@/components/PageContainer";
import { SettingButton } from "@/components/SettingButton";
import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "toul",
  description: "toul.app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex text-sm antialiased">
        <ThemeProvider>
          <SettingButton className="absolute right-2 top-2" />
          <Sidebar />
          <PageContainer>{children}</PageContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./context/context";
import { MonthlyProvider } from "./context/monthlyContext";
import { SearchProvider } from "./context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

// ✅ Typed metadata
export const metadata: Metadata = {
  title: "TODO LIST",
  description: "A todo application to manage daily and monthly todos",
};

// ✅ Props typing
type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MonthlyProvider>
          <Provider>
            <SearchProvider>{children}</SearchProvider>
          </Provider>
        </MonthlyProvider>
      </body>
    </html>
  );
}

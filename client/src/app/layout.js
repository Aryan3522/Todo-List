import { Inter } from "next/font/google";
import "./globals.css";

import { Provider } from "./context/context";
import { MonthlyProvider } from "./context/monthlyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TODO LIST",
  description: "A todo application to manage daily and monthly todos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global State Providers */}
        <Provider>
          <MonthlyProvider>
            {children}
          </MonthlyProvider>
        </Provider>
      </body>
    </html>
  );
}
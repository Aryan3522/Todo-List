import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./context/context";
import { MonthlyProvider } from "./context/monthlyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TODO LIST",
  description: "A todo application to manage daily an monthly todo's",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MonthlyProvider>
          <Provider>{children}</Provider>
        </MonthlyProvider>
      </body>
    </html>
  );
}

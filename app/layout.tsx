'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02"
import "./globals.css"  
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {AppProgressBar as ProgressBar} from 'next-nprogress-bar'
import NextTopLoader from 'nextjs-toploader'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader
                height={3}
                color="#f00"
                showSpinner={false}
              />
              {!isAuthPage &&
                <Navbar02 
                  logoHref="/"
                />
              }
                <main className={cn("bg-gray-50 text-gray-900 antialiased dark:bg-neutral-950")}>
                  {children}
                </main>
                <Toaster />
            </ThemeProvider>

        </body>
      </html>
    </>
  )
}
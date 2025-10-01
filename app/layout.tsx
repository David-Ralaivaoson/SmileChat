'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar02 } from "@/components/ui/shadcn-io/navbar-02"
import "./globals.css"  
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {AppProgressBar as ProgressBar} from 'next-nprogress-bar'

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
              {!isAuthPage &&
                <Navbar02 
                  logoHref="/"
                />
              }
                <main className={cn("bg-gray-50 text-gray-900 antialiased dark:bg-gray-900")}>
                  {children}
                  <ProgressBar 
                    height="4px"
                    color="#f00"
                    options={{showSpinner:false}}
                    shallowRouting  
                  />
                </main>
                <Toaster />
            </ThemeProvider>

        </body>
      </html>
    </>
  )
}
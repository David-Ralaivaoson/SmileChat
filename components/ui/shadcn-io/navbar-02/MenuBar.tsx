import LogoSmile from "@/components/logo";
import { useIsMobile } from "@/hooks/useIsMobile"; // <- ton hook
import React from "react";
import { Navbar02Props } from ".";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Button } from "../../button";
import { HamburgerIcon } from "lucide-react";
import { NavigationMenu, NavigationMenuList } from "../../navigation-menu";

export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(
  (
    {
      className,
      logo = <LogoSmile />,
      logoHref = '#',
      ...props
    },
    ref
  ) => {
    const { isMobile, combinedRef } = useIsMobile(ref, 768);

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2 flex-1">
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0" />
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* reste du code inchangé */}
          </div>
        </div>
      </header>
    );
  }
);


import * as React from 'react';

import { useEffect, useState, useRef } from 'react';
import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';
import LogoSmile from '@/components/logo';
import { ModeToggle } from '@/components/utils/dark-mode-toogle';
import AuthButton from './AuthButton';
import SearchInput from './SearchInput';
import NavIcons from './NavIcons';
import SearchInputPopover from './SearchInputPopover';
import MenuMobile from './MenuMobile';

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <LogoSmile />
  );
};


// Types
export interface Navbar02NavItem {
  href?: string;
  label: string;
  submenu?: boolean;
  type?: 'description' | 'simple' | 'icon';
  items?: Array<{
    href: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
}

export interface Navbar02Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar02NavItem[];
}


export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '#',
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    const renderIcon = (iconName: string) => {
      switch (iconName) {
        case 'BookOpenIcon':
          return <BookOpenIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
        case 'LifeBuoyIcon':
          return <LifeBuoyIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
        case 'InfoIcon':
          return <InfoIcon size={16} className="text-foreground opacity-60" aria-hidden={true} />;
        default:
          return null;
      }
    };

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
            {/* Mobile menu trigger */}
            {isMobile && (
              <MenuMobile />
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <button 
                onClick={(e) => e.preventDefault()}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">
                  {logo}
                </div>
                <span className="hidden font-bold text-xl lg:inline-block bg-gradient-to-r from-[#34D399] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">SmileChat</span>
              </button>
            </div>
              {/* Navigation menu */}
              
                <div className="flex flex-1 items-center justify-center w-full">
                <NavigationMenu className="flex flex-1 items-center w-full">
                  <NavigationMenuList className=" flex flex-1 items-center w-full gap-8">
                    {!isMobile && (
                      <SearchInput />
                     )}
                    <NavIcons />
                </NavigationMenuList>
                </NavigationMenu>
                </div>

          </div>
          {/* Right side */}

          {!isMobile ? (
          <div className="flex items-center justify-end gap-3">
            <ModeToggle/>  
            <AuthButton />
          </div>
          )
          :
          (
            <SearchInputPopover />
          ) 
          }
        </div>
      </header>
    );
  }
);

Navbar02.displayName = 'Navbar02';

// ListItem component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    href?: string;
    icon?: string;
    type?: 'description' | 'simple' | 'icon';
    children?: React.ReactNode;
  }
>(({ className, title, children, icon, type, ...props }, ref) => {
  const renderIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    switch (iconName) {
      case 'BookOpenIcon':
        return <BookOpenIcon className="h-5 w-5" />;
      case 'LifeBuoyIcon':
        return <LifeBuoyIcon className="h-5 w-5" />;
      case 'InfoIcon':
        return <InfoIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        onClick={(e) => e.preventDefault()}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer',
          className
        )}
        {...props}
      >
        {type === 'icon' && icon ? (
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              {renderIconComponent(icon)}
            </div>
            <div className="space-y-1">
              <div className="text-base font-medium leading-tight">{title}</div>
              {children && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-base font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </>
        )}
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = 'ListItem';

export { Logo };
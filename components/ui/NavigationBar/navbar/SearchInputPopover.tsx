import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Button } from '../../button'
import { Search } from 'lucide-react'
import { FaSearch } from "react-icons/fa";
import { NavigationMenu, NavigationMenuList } from '../../navigation-menu'
import SearchInput from './SearchInput'
import { IoSettings } from 'react-icons/io5';

export default function SearchInputPopover() {
  return (
    <>
      <Popover>
          <PopoverTrigger asChild>
              <Button
              className="group sm:hidden h-9 w-9 hover:bg-accent hover:text-accent-foreground"
              variant="ghost"
              size="icon"
              >
              <FaSearch size={16}/>
              </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 p-1 bg-transparent">
              <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex-col items-start gap-0">
                  <SearchInput />
              </NavigationMenuList>
              </NavigationMenu>
          </PopoverContent>
      </Popover>
      <Popover>
          <PopoverTrigger asChild>
              <Button
              className="group hidden sm:flex h-9 w-9 hover:bg-accent hover:text-accent-foreground"
              variant="ghost"
              size="icon"
              >
              <IoSettings size={16}/>
              </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 p-1 bg-transparent">
              <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex-col items-start gap-0">
                  Setting
              </NavigationMenuList>
              </NavigationMenu>
          </PopoverContent>
      </Popover>
    </>
  )
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import type { Dispatch, SetStateAction } from "react";
import { useState } from 'react';

interface MemberMenuProps {
  name: string;
  id: string;
  level: string;
  testdate: string;
}

export default function MemberMenu(data: MemberMenuProps){
  const [showMenu, setShowMenu] = useState(false);

  function handleMenu() {
    setShowMenu(!showMenu);
  }

  return(
    <Menu as="div" className="relative inline-block">
      <MenuButton>
        {data.name}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems transition>
        <MenuItem>
          <a href="#" className="block"></a>
          {data.id}
        </MenuItem>
        <MenuItem>
          <a href="#" className="block"></a>
          {data.level}Insert Commission Level
        </MenuItem>
        <MenuItem>
          <a href="#" className="block"></a>
          {data.testdate}Insert Next Licensing Test
        </MenuItem>
      </MenuItems> 
    </Menu>
  );
}
import { Menu, MenuButton } from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface MemberMenuProps {
  name: string;
  id: string;
  level: string;
  testdate: string;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MemberMenu(data: MemberMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton onClick={() => setShowMenu(!showMenu)}>
        {data.name}
      </MenuButton>
      {showMenu && (
        <>
          <p>{data.id}</p>
          <p>{data.level}</p>
          <p>{data.testdate}</p>
        </>
      )}
    </Menu>
  );
}

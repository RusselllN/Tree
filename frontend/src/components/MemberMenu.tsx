import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

interface MemberMenuProps {
  id: string;
  level: string;
  testdate: string;
}


// export default function MemberMenu({ id, level, testdate }): MemberMenuProps {
export default function MemberMenu({id,level,testdate}: MemberMenuProps){
  return(
    <Menu as="div" className="relative inline-block">
      <MenuButton></MenuButton>

      <MenuItems transition>
        <MenuItem>
          <a href="#" className="block"></a>
          {id}
        </MenuItem>
        <MenuItem>
          <a href="#" className="block"></a>
          {level}Insert Commission Level
        </MenuItem>
        <MenuItem>
          <a href="#" className="block"></a>
          {testdate}Insert Next Licensing Test
        </MenuItem>
      </MenuItems> 
    </Menu>
  );
}
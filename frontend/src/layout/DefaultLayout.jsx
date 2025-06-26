import { Outlet } from 'react-router';
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';

export default function DefaultLayout() {
  return (
    <div className='flex flex-col h-screen'>
      {/* top bar */}
      <div>
        <Navbar fluid rounded>
          <NavbarBrand href='https://flowbite-react.com'>
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              Flowbite React
            </span>
          </NavbarBrand>
          <div className='flex md:order-2'>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt='User settings'
                  img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className='block text-sm'>Bonnie Green</span>
                <span className='block truncate text-sm font-medium'>
                  name@flowbite.com
                </span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href='#' active>
              Home
            </NavbarLink>
            <NavbarLink href='#'>About</NavbarLink>
            <NavbarLink href='#'>Services</NavbarLink>
            <NavbarLink href='#'>Pricing</NavbarLink>
            <NavbarLink href='#'>Contact</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
      {/* Outlet/sidebar */}
      <div className='flex-1'>
        <div className='grid grid-cols-6 h-full '>
          {/* sidebar */}
          <div className='col-span-1 '>
            <Sidebar aria-label='Default sidebar example'>
              <SidebarItems>
                <SidebarItemGroup>
                  <SidebarItem href='#' icon={HiChartPie}>
                    Dashboard
                  </SidebarItem>
                  <SidebarItem
                    href='#'
                    icon={HiViewBoards}
                    label='Pro'
                    labelColor='dark'
                  >
                    Kanban
                  </SidebarItem>
                  <SidebarItem href='#' icon={HiInbox} label='3'>
                    Inbox
                  </SidebarItem>
                  <SidebarItem href='#' icon={HiUser}>
                    Users
                  </SidebarItem>
                  <SidebarItem href='#' icon={HiShoppingBag}>
                    Products
                  </SidebarItem>
                  <SidebarItem href='#' icon={HiArrowSmRight}>
                    Sign In
                  </SidebarItem>
                  <SidebarItem href='#' icon={HiTable}>
                    Sign Up
                  </SidebarItem>
                </SidebarItemGroup>
              </SidebarItems>
            </Sidebar>
          </div>
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

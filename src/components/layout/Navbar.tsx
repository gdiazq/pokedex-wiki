'use client';

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu
} from '@nextui-org/react';
import { ChevronDown } from '../icons/navbar/Icons.jsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ThemeSwitch } from '@/components/providers/ThemeSwitch';
import { useTheme } from 'next-themes';
import { REGIONS } from '@/constants/regions';

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const bannerSrc = mounted && resolvedTheme === 'light' ? '/banner-dark.svg' : '/banner-light.svg';

  return (
    <Navbar
      isBordered
      className="fixed left-0 right-0 top-0 z-50 border-b"
      classNames={{
        base: 'bg-[#ffffffdd] dark:bg-[#09112add] backdrop-blur-md border-slate-200 dark:border-slate-800',
        item: 'data-[active=true]:text-blue-600'
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <Image
              src={bannerSrc}
              width={200}
              height={58}
              className="h-auto w-[118px] sm:w-[145px]"
              priority
              alt="Pokedex Wiki banner"
            />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] sm:text-xs">
              POKEMON WIKI
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-5 sm:flex" justify="center">
        <NavbarItem>
          <Link className="font-medium hover:text-blue-500" color="foreground" href="/">
            Pokemon
          </Link>
        </NavbarItem>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="w-28 justify-between bg-transparent px-0 font-medium data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} height={16} width={16} />}
                radius="sm"
                variant="light"
              >
                By Region
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Regions"
            className="w-28 p-0"
            itemClasses={{
              base: 'min-h-0 px-2 py-1 justify-center',
              title: 'w-full text-center'
            }}
          >
            {REGIONS.map((region) => (
              <DropdownItem
                key={region.key}
                className="text-sm text-center"
                onClick={() => router.push(`/${region.key}`)}
              >
                {region.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" href="/" size="lg">
            Pokemon
          </Link>
        </NavbarMenuItem>
        {REGIONS.map((region) => (
          <NavbarMenuItem key={region.key}>
            <Link className="w-full" href={`/${region.key}`} size="lg">
              {region.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

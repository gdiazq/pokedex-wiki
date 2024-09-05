'use client';

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { ChevronDown } from "../icons/Icons.jsx"
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ThemeSwitch } from "@/components/providers/ThemeSwitch";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();

    const menuItems = [
        "Pokemon",
        "By Region",
        "Integrations"
    ];

    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} height={16} width={16} />,
    }

    return (
        <Navbar className="w-full" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Image className="font-bold text-inherit" src="/logo.png" width={80} height={80} priority={true} alt="logo" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link className="hover:text-blue-500" color="foreground" href="/">
                        Pokemon
                    </Link>
                </NavbarItem>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button 
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-blue-500"
                                endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            >
                                By Region 
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                        base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="kanto"
                            description="Region Kanto is the first region in the Pokémon series and contains the first 151 Pokémon."
                            onClick={() => router.push("/kanto")}
                        >
                            Kanto
                        </DropdownItem>
                        <DropdownItem
                            key="Johto"
                            description="Region Johto is the second region in the Pokémon series and contains 100 Pokémon."
                            onClick={() => router.push("/johto")}
                        >
                            Johto
                        </DropdownItem>
                        <DropdownItem
                            key="Hoenn"
                            description="Region Hoenn is the third region in the Pokémon series and contains 135 Pokémon."
                            onClick={() => router.push("/hoenn")}
                            
                        >
                            Hoenn
                        </DropdownItem>
                        <DropdownItem
                            key="Sinnoh"
                            description="Region Sinnoh is the fourth region in the Pokémon series and contains 107 Pokémon."
                            onClick={() => router.push("/sinnoh")}
                        >
                            Sinnoh
                        </DropdownItem>
                        <DropdownItem
                            key="Unova"
                            description="Region Unova is the fifth region in the Pokémon series and contains 156 Pokémon."
                            onClick={() => router.push("/unova")}
                        >
                            Unova
                        </DropdownItem>
                        <DropdownItem
                            key="Kalos"
                            description="Region Kalos is the sixth region in the Pokémon series and contains 72 Pokémon."
                            onClick={() => router.push("/kalos")}
                        >
                            Kalos
                        </DropdownItem>
                        <DropdownItem
                            key="Alola"
                            description="Region Alola is the seventh region in the Pokémon series and contains 86 Pokémon."
                            onClick={() => router.push("/alola")}
                        >
                            Alola
                        </DropdownItem>
                        <DropdownItem
                            key="Galar"
                            description="Region Galar is the eighth region in the Pokémon series and contains 89 Pokémon."
                            onClick={() => router.push("/galar")}
                        >
                            Galar
                        </DropdownItem>
                        <DropdownItem
                            key="Husui"
                            description="Region Husui is the ninth region in the Pokémon series and contains 7 Pokémon."
                            onClick={() => router.push("/husui")}
                        >
                            Husui
                        </DropdownItem>
                        <DropdownItem
                            key="Paldea"
                            description="Region Paldea is the tenth region in the Pokémon series and contains 120 Pokémon."
                            onClick={() => router.push("/paldea")}
                        >
                            Paldea
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem>
                    <Link className="hover:text-blue-500" color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            
            <NavbarContent justify="end">
                <ThemeSwitch />
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
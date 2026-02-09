// app/components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Switch
      defaultSelected={theme === "light"}
      size="lg"
      color="primary"
      onValueChange={(isSelected) => setTheme(isSelected ? "light" : "dark")}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <BsSunFill className={className} /> : <BsMoonFill className={className} />
      }
    />
  )
};
// app/components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSwitch = (isSelected: boolean, classname: string): ReactNode => {
    if (isSelected) {
      setTheme("light");
      return <BsSunFill className={classname} />;
    } else {
      setTheme("dark");
      return <BsMoonFill className={classname} />;
    }
  };

  if(!mounted) return null

  return (
    <Switch
      defaultSelected={theme === "light" ? true : false}
      size="lg"
      color="primary"
      thumbIcon={({ isSelected, className }) => handleSwitch(isSelected, className)}
    />
  )
};
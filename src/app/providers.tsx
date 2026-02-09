'use client'

import { useEffect } from 'react';
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider, useTheme} from 'next-themes';

function ThemeCookieSync({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    useEffect(() => {
        if (theme) {
            document.cookie = `theme=${theme};path=/;max-age=31536000`;
        }
    }, [theme]);

    return <>{children}</>;
}

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <ThemeCookieSync>
                    {children}
                </ThemeCookieSync>
            </NextThemesProvider>
        </NextUIProvider>
    )
}

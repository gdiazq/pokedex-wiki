// Objective: Create the main page of the app
'use client'

import Navbar  from '@/components/layout/Navbar'


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="space-y-6 py-24 text-center px-4">
          <h1 className="text-5xl font-semibold text-black dark:text-white drop-shadow-md">
            Pokedex App
          </h1>
        </div>
      </main>
    </>
  );
}

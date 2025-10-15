import { Tourney } from 'next/font/google';
import { type JSX } from 'react';

const tourney = Tourney({
  variable: "--font-tourney",
  subsets: ["latin"]
})


export default function HomePage(): JSX.Element {
  return (
    <main>
      {/* Navbar */}
      <nav className='p-5 shadow'>
        <span className={`${tourney.className} text-3xl tracking-wider text-primary`}>EppMe</span>
      </nav>

      {/* Input Form */}
      <form action=""></form>
    </main>
  )
}

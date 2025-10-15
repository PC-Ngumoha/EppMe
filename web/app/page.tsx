import { Tourney } from 'next/font/google';
import { type JSX } from 'react';
import { ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';

const tourney = Tourney({
  variable: "--font-tourney",
  subsets: ["latin"]
})


export default function HomePage(): JSX.Element {
  return (
    <main>
      {/* Navbar */}
      <nav className='p-5 shadow'>
        <span className={`${tourney.className} text-3xl tracking-wider text-soft-green`}>EppMe</span>
      </nav>

      {/* Input Form */}
      <form action="" className='bg-green-50 w-[40%] mx-auto my-8 p-4'>
        <div className='flex justify-between items-center px-4 m-2'>
          <h2>What&apos;s on your mind?</h2>

          <ToggleGroup type='single'>
            <ToggleGroupItem value='need'>Need</ToggleGroupItem>
            <ToggleGroupItem value='offer'>Offer</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <hr className='border-2 border-gray-400'/>
      </form>
    </main>
  )
}

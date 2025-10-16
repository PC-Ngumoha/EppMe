import { Borel } from 'next/font/google';
import { type JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const borel = Borel({
  subsets: ['latin'],
  weight: '400',
});

export default function HomePage(): JSX.Element {
  return (
    <main>
      {/* Navbar */}
      <nav className="p-5 shadow flex items-center justify-center">
        <span
          className={`${borel.className} text-4xl tracking-wider text-soft-green`}
        >
          EppMe
        </span>
      </nav>

      {/* Input Form */}
      <form
        action=""
        className="bg-green-50 w-[40%] mx-auto my-8 p-6 text-text rounded-md"
      >
        <div className="flex justify-between items-center px-4 m-2">
          <h2 className="font-bold text-xl">What&apos;s on your mind?</h2>

          <ToggleGroup type="single">
            <ToggleGroupItem
              value="need"
              className="font-bold data-[state=on]:bg-soft-green data-[state=on]:text-white"
            >
              Need
            </ToggleGroupItem>
            <ToggleGroupItem
              value="offer"
              className="font-bold data-[state=on]:bg-soft-green data-[state=on]:text-white"
            >
              Offer
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <hr className="border-2 border-gray-300 my-2" />
        <div className="flex flex-col w-[80%] mx-auto">
          <Textarea
            placeholder="Type what you need or can help with"
            className="my-2 bg-white py-3 px-2 border border-gray-300 focus:outline-none
            font-sans h-[120px] tracking-wider"
          />
          <Input
            placeholder="Your name"
            className="my-2 px-2 py-3 bg-white border border-gray-300 rounded-md font-sans
            placeholder:font-sans tracking-wider"
          />
          <Button
            type="submit"
            className="my-2 bg-soft-green font-bold tracking-wider hover:bg-soft-green text-lg text-white
            font-sans"
          >
            Post
          </Button>
        </div>
      </form>
    </main>
  );
}

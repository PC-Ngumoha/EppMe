'use client';

import { Borel } from 'next/font/google';
import { type JSX, useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Empty, EmptyHeader, EmptyDescription } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

import PostCard from '@/components/custom/post_card';

import type { IPost } from '@/lib/types';

const borel = Borel({
  subsets: ['latin'],
  weight: '400',
});

export const fakePosts: IPost[] = [
  {
    id: 'd0e1f9b8-4b6a-44ab-97ce-2f91f59fcb56',
    type: 'need',
    message:
      'Looking for a reliable supplier of fresh crayfish in bulk around Lagos.',
    timestamp: '2025-10-17T08:43:12.000Z',
    author_name: 'Adaobi Okafor',
  },
  {
    id: 'a3c2d489-fb20-4e56-bbbd-5f4a7d3b9b0c',
    type: 'offer',
    message:
      'Offering premium ground crayfish in paint, mudu, and pack sizes — fresh from Oron.',
    timestamp: '2025-10-17T09:15:27.000Z',
    author_name: 'Chukwuemeka Ngumoha',
  },
  {
    id: 'e6a21ad1-97ac-4b1e-bf18-7038dfc8a661',
    type: 'need',
    message: 'Need 2 paints of crayfish delivered to Kaduna South by Friday.',
    timestamp: '2025-10-17T09:58:40.000Z',
    author_name: 'John Bello',
  },
  {
    id: '72de8cf1-7ab5-47e1-b37d-57c3e530c97c',
    type: 'offer',
    message:
      'Discount alert! Buy 5 packs of Nicadeen Crayfish and get 1 free this weekend.',
    timestamp: '2025-10-17T10:22:09.000Z',
    author_name: 'Nicadeen Crayfish',
  },
  {
    id: 'f1a3b8cb-3e94-45cb-9823-b76b73b56b6a',
    type: 'need',
    message: 'Looking for someone to supply crayfish to my restaurant weekly.',
    timestamp: '2025-10-17T11:04:55.000Z',
    author_name: 'Esther Johnson',
  },
  {
    id: 'bd17fa21-3c7e-42f4-8a57-083981fecc92',
    type: 'offer',
    message:
      'We supply dried crayfish in large quantities for retailers and food vendors nationwide.',
    timestamp: '2025-10-17T11:37:21.000Z',
    author_name: 'Adebayo Fisheries',
  },
];

export default function HomePage(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const retrieveAllPosts = async () => {
      setLoading(true);
      const data = await (await fetch('http://localhost:8000/posts')).json();
      setPosts(data);
      console.log(data);
      setLoading(false);
    };

    retrieveAllPosts();
  }, []);

  if (loading)
    return (
      <Spinner className="mx-auto my-[50vh] h-[100px] w-[100px] text-soft-green" />
    );

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
              className="font-bold data-[state=on]:bg-soft-green data-[state=on]:text-white
              hover:bg-green-200 transition-colors ease-in-out"
            >
              Need
            </ToggleGroupItem>
            <ToggleGroupItem
              value="offer"
              className="font-bold data-[state=on]:bg-soft-green data-[state=on]:text-white
              hover:bg-green-200 transition-colors ease-in-out"
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
            className="my-2 py-6 bg-soft-green font-bold tracking-wider hover:bg-soft-green-dark
            text-md text-white font-sans transition-colors ease-in-out duration-200"
          >
            Post
          </Button>
        </div>
      </form>

      {/* Post Feed */}
      {posts.length > 0 ? (
        <Tabs defaultValue="all" className="mx-auto mt-4 w-[50%]">
          <TabsList className="w-[30%] mx-auto bg-transparent">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-soft-green data-[state=active]:text-white
            hover:bg-green-200 mx-1"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="needs"
              className="data-[state=active]:bg-soft-green data-[state=active]:text-white
            hover:bg-green-200 mx-1"
            >
              Needs
            </TabsTrigger>
            <TabsTrigger
              value="offers"
              className="data-[state=active]:bg-soft-green data-[state=active]:text-white
            hover:bg-green-200 mx-1"
            >
              Offers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {/* All posts made */}
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          <TabsContent value="needs">
            {/* Needs of other users  */}
            {posts
              .filter(post => post.type === 'need')
              .map(post => (
                <PostCard key={post.id} post={post} />
              ))}
          </TabsContent>
          <TabsContent value="offers">
            {/* Offers from other users */}
            {posts
              .filter(post => post.type === 'offer')
              .map(post => (
                <PostCard key={post.id} post={post} />
              ))}
          </TabsContent>
        </Tabs>
      ) : (
        // <h1 className="text-2xl tracking-widest font-sans mx-auto">No Posts</h1>
        <Empty>
          <EmptyHeader className="text-2xl font-sans font-semibold tracking-wider">
            No Posts Yet
          </EmptyHeader>
          <EmptyDescription>
            Congratulations 🎊 you&apos;re our very first user.
          </EmptyDescription>
        </Empty>
      )}
    </main>
  );
}

'use client';

import { Borel } from 'next/font/google';
import { type JSX, useState, useEffect, FormEvent } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Empty, EmptyHeader, EmptyDescription } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

import PostCard from '@/components/custom/post_card';

import type { IPost, PostType, PostPayloadType } from '@/lib/types';
import { retrievePosts, createPost } from '@/lib/axios';

const borel = Borel({
  subsets: ['latin'],
  weight: '400',
});

export default function HomePage(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<PostPayloadType>({
    type: 'need',
    author_name: '',
    message: '',
  });

  useEffect(() => {
    const retrieveAllPosts = async () => {
      const posts = await retrievePosts();
      setPosts(posts);
      setLoading(false);
    };

    retrieveAllPosts();
  }, []);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const response = await createPost(fields);

    if (response.status === 201) {
      // router.reload(); // Refresh the page.
      window.location.reload(); // Refresh the page.
    }
  };

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
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center px-4 m-2">
          <h2 className="font-bold text-xl">What&apos;s on your mind?</h2>

          <ToggleGroup
            type="single"
            value={fields.type}
            onValueChange={(value: PostType) => {
              if (value) {
                setFields({ ...fields, type: value });
              }
            }}
          >
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
            value={fields.message}
            onChange={evt => {
              setFields({ ...fields, message: evt.target.value });
            }}
          />
          <Input
            placeholder="Your name"
            className="my-2 px-2 py-3 bg-white border border-gray-300 rounded-md font-sans
            placeholder:font-sans tracking-wider"
            value={fields.author_name}
            onChange={evt => {
              setFields({ ...fields, author_name: evt.target.value });
            }}
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

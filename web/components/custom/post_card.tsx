import { type JSX } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { IPost } from '@/lib/types';
import { deletePost } from '@/lib/axios';
import dayjs from '@/lib/dayjs';

export default function PostCard({ post }: { post: IPost }): JSX.Element {
  const handlePostDeletion = async () => {
    const response = await deletePost(post.id);

    if (response.status === 200) {
      window.location.reload(); // Reload page.
    }
  };

  return (
    <Card className="my-3 rounded-sm border-gray-50">
      <CardHeader className="flex justify-start items-center">
        <Badge
          variant="default"
          className={
            post.type === 'need'
              ? 'bg-soft-green text-white capitalize'
              : 'bg-warm-orange text-white capitalize'
          }
        >
          {post.type}
        </Badge>
        <h3 className="mx-1 font-bold font-sans tracking-wide">
          {post.author_name}
        </h3>
      </CardHeader>
      <CardContent className="tracking-wider font-sans">
        {post.message}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-gray-400 tracking-wide text-sm">
          {dayjs(post.timestamp).fromNow()}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <FiMoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handlePostDeletion()}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

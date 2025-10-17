import { JSX } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { IPost } from '@/lib/types';
import dayjs from '@/lib/dayjs';

export default function PostCard({ post }: { post: IPost }): JSX.Element {
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
      <CardContent className="tracking-wider leading-2 font-sans">
        {post.message}
      </CardContent>
      <CardFooter>
        <span className="text-gray-400 tracking-wide text-sm">
          {dayjs(post.timestamp).fromNow()}
        </span>
      </CardFooter>
    </Card>
  );
}

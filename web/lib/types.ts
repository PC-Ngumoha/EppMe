
export type PostType = "need" | "offer";

export interface IPost {
  id: string;
  type: PostType;
  message: string;
  timestamp: string;
  author_name: string;
}

export type PostPayloadType = Omit<IPost, "id" | "timestamp">;

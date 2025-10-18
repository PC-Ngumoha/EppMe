/**
 * axios.ts: Contains helper functions and config that utilize axios to
 * make requests to the API.
 */
import axios, { AxiosError, AxiosResponse } from "axios";
import {IPost, PostPayloadType } from '@/lib/types';

axios.defaults.baseURL = 'http://localhost:8000'


export async function retrievePosts(): Promise<IPost[]> {
  let posts: IPost[];

  try {
    posts = (await axios.get('/posts')).data;
  } catch (error) {
    throw new AxiosError(`Oops! ${error}`);
  }

  return posts;
}

export async function createPost(payload: PostPayloadType): Promise<AxiosResponse> {
  let response;

  try {
    response = await axios.post('/posts', payload);
  } catch (error) {
    throw new AxiosError(`Oops! ${error}`);
  }

  return response;
}


export interface IPost {
  id: string;
  type: 'need' | 'offer';
  message: string;
  timestamp: string;
  author_name: string;
}

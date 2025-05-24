export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isVerified: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  image: string;
  author: string;
  type: 'artwork' | 'collection' | 'post';
  secondary?: boolean;
}

export type TabType = 'pinned' | 'created' | 'listed' | 'collections' | 'holders' | 'owned';
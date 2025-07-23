export interface ReviewType {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  helpful: number;
  images: string[];
}
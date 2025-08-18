export type BlogAuthor = {
  id: number;
  username: string | null;
};

export type BlogCategory = {
  id: number;
  name: string;
};

export interface links {
  next: string;
  previous: string | null;
}

export interface IBlog {
  id: number;
  title: string;
  sub_title: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string;
  cover_image: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  send_as_newsletter: boolean;
  recommended_products: any[];
}

export interface BlogsList{
  links: links;
  count: number;
  total_pages: number;
  current_page: number;
  results: IBlog[];
}
export interface IPartnerCompany {
  id: number;
  name: string;
  link: string;
  logo: string;
  is_active: boolean;
}

export interface IFaq {
  id: number;
  question: string;
  answer: string;
}

export interface INotification {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface IExpertRecommendation {
  id: number;
  name: string;
  designation: string;
  company: string;
  message: string;
  recommended_products: string[];
  is_active: boolean;
}

export interface INewsletters {
  id: number;
  title: string;
  users: string[];
  subject_header: string;
  is_active: boolean;
  is_saved_as_template: boolean;
  message: string;
}

export interface ISms {
  id: number;
  title: string;
  users: string[];
  subject_header: string;
  is_active: boolean;
  is_saved_as_template: boolean;
  message: string;
}

export interface ITestimonial {
  id: number;
  name: string;
  company: string;
  designation: string;
  message: string;
  image: string;
  rating: number;
  created_at: string;
  is_active: boolean;
}

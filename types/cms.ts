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

export interface Author {
  id: number
  username: string
  full_name: any
  email: string
}

export interface Category {
  id: number
  name: string
  is_active: boolean
}
export interface RecommendedProduct {
  id: number
  name: string
  slug_name: string
  image: any
}

export interface RecommendedBlog {
  id: number
  title: string
  slug: string
  cover_image: string
  sub_title: string
  created_at: string
  author: Author
}
export interface IBlog {
  id: number
  title: string
  sub_title: string
  slug: string
  description: string
  tags: string
  author: Author
  category: Category
  cover_image: string
  recommended_products: RecommendedProduct[]
  recommended_blogs: RecommendedBlog[]
  created_at: string
  updated_at: string
  is_active: boolean
  send_as_newsletter: boolean
}

export interface IBlogWithIsNew {
  id: number
  title: string
  sub_title: string
  slug: string
  description: string
  tags: string
  author: Author
  category: Category
  cover_image: string
  recommended_products: RecommendedProduct[]
  recommended_blogs: RecommendedBlog[]
  created_at: string
  updated_at: string
  is_active: boolean
  send_as_newsletter: boolean
  is_new: boolean
}

export interface BlogsList {
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
  type: string;
  answer: string;
  slug: string;
  is_active: boolean;
  product?: IPaginatedDropdownData[];
}

export interface INotification {
  id: number;
  title: string;
  description: string;
  link: string;
  is_active: boolean;
}

export interface IExpertRecommendation {
  id: number;
  name: string;
  designation: string;
  company: string;
  message: string;
  photo: string;
  products: IPaginatedDropdownData[];
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

export interface IApplicant {
  id: number;
  full_name: string;
  phone_no: string;
  email: string;
  cv: string;
  cover_letter: string;
  shortlisted: string;
}

export interface IDashboardITestimonial {
  id: number;
  name: string;
  company: string;
  designation: string;
  message: string;
  image: string;
  slug: string;
  rating: number;
  created_at: string;
  is_active: boolean;
  is_video: boolean;
  video_url: string
}

export interface IPaginatedDropdownData {
  id: number;
  slug_name?: string;
  image?: string;
  user?: string;
  name: string;
}
export interface IAdvertisementBanner {
  id: number;
  position: string;
  image: string;
  product: IPaginatedDropdownData;
  is_active: boolean;
}

export interface ICareer {
  id: number;
  slug: string;
  job_title: string;
  job_description: string;
  job_requirement: string;
  job_responsibility: string;
  job_type: string;
  position: string;
  location: string;
  end_date: string;
  salary: number;
  total_applications: number;
  is_active: boolean;
}

export interface IContact {
  id: number,
  firstname: string
  lastname: string
  phoneNumber: string;
  email: string
  message: string
  subject: string
  status: string
  created_at: string
}

export interface ITeam {
  id: number;
  name: string;
  designation: string;
  description: string;
  is_active: boolean;
  photo: string; // File upload or URL
  linkedin_link?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
}
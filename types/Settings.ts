export interface ICompanyProfile {
  id: number;
  company_name: string;
  company_address: string;
  company_logo_url: string;
  company_favicon_url: string;
}

export interface IPersonalProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile?: {
    bio: string;
    profile_picture: string;
    user_type: "superadmin" | "admin" | "user" | string;
    address: string;
  };
}

export interface ICategory {
  id: number;
  name: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

export interface IBlogCategory {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ISubCategory {
  id: number;
  category_name: string;
  category_id?: string;
  name: string;
  image: string;
  is_used_to_build_system: boolean;
  is_active: boolean;
}

export interface IBrand {
  id: number;
  brand_name: string;
  brand_image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

export interface IAttributeVariation {
  id: number;
  attribute_id: number;
  name: string;
  value: string;
}

export interface IAttribute {
  id: number;
  name: string;
  type: string;
  is_active: boolean;
  variations: IAttributeVariation[];
}

export interface IApi {
  id: number;
  api_name: string;
  api_key: string;
  is_activated: boolean;
}

export interface IAdmin {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  password: string;
  confirm_password: string;
  profile: {
    profile_picture: string;
    bio: string;
    user_type: string;
    address: string;
  };
}

export interface ITaxes {
  id: number;
  tax_name: string;
  tax_percentage: string;
  is_active: boolean;
}

export interface ISeo {
  id: number;
  meta_title: string;
  meta_keyword: string[];
  meta_description: string;
  primary_color?: string;
  text_color?: string;
  is_activated?: boolean;
}

export interface IBill {
  id: number;
  logo: string;
  bill_name: string;
  name: string;
  address: string;
  pan_number: string;
  tax: {
    id: number;
    tax_name: string;
    tax_percentage: string;
    is_active: boolean;
  };
  is_active: boolean;
}

export interface ISocial {
  id: number;
  name: string;
  url: string;
  icon: string;
  is_active: boolean;
}

export interface IReferral {
  id: number;
  name: string;
  point_amount: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IOrderStatus {
  id: number;
  icon: string;
  name: string;
  description: string;
  position: number;
  primary_color: string;
  text_color: string;
  is_type_success: boolean;
  is_type_failed: boolean;
  is_active: boolean;
}

// export interface IPreference {
//   id: number;
//   theme_name: string;
//   colors: {
//     primary: string;
//     secondary: string;
//     ternary: string;
//     forth: string;
//     textPrimary: string;
//     textSecondary: string;
//     textMuted: string;
//     textParagraph: string;
//   };
//   is_activated: boolean;
// }

export interface IPreference {
  id: number;
  theme_name: string;
  colors: {
    color_name: string;
    color_value: string;
  }[];
  is_active: boolean;
}

export interface ISection {
  id: number;
  name: string;
  is_active: boolean;
}

export interface IInventory {
  id: number;
  inventory_name: string;
  inventory_address: string;
  is_active: boolean;
  pin_location: {
    latitude: number;
    longitude: number;
  };
}

export interface IHelpAndSupport {
  id: number;
  icon: string;
  name: string;
  description: string;
  steps: string;
  is_active: boolean;
}

export interface IPrivacyPolicy {
  id: number;
  topic: string;
  description: string;
  effective_date: string;
  is_active: boolean;
}

export interface ITermsAndCondition {
  id: number;
  topic: string;
  description: string;
  is_active: boolean;
}

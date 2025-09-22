interface UserProfile {
  bio: string;
  profile_picture: string;
  user_type: EUserTypes;
  address: string;
}

export interface IProfileDetails {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile: UserProfile;
}

export enum EUserTypes {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "superadmin",
}


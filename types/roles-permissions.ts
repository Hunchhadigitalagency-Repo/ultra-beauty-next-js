export interface IPermissionConfig {
  title: string;
  data: string;
  permissions: string[];
  subItems?: IPermissionConfig[];
}

export interface IPermission {
  id: number;
  name: string;
}

export interface IRoles {
  id?: number;
  role_name: string;
  is_activated: boolean;
  permissions: IPermission[];
}

export interface IRolesFormData {
  role_name: string;
  entities: Record<string, Record<string, boolean>>;
}
interface Profile {
  bio: string;
  profile_picture: string;
  user_type: string;
  address: string | null;
}
export interface IRolesUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile: Profile;
  date_joined: string; // ISO date string
}

export interface IRolesPermissions {
  id: number;
  role: string;
  permissions: IPermission[];
  user: IRolesUser[];
  group: string;
  is_active: boolean;
}


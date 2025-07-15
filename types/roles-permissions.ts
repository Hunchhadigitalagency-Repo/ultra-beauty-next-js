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

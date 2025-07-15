import { EUserRoles, IUserPermission } from "@/types/permissions";
import {
  IPermissionConfig,
  IRoles,
  IRolesFormData,
} from "@/types/roles-permissions";

export const isSuperAdmin = (userType: string): boolean =>
  userType === EUserRoles.SUPERADMIN;

export const hasAllPermissions = (
  userPermissions: IUserPermission[],
  requiredPermissions: string[]
): boolean => {
  const names = userPermissions.map((p) => p.name);
  return requiredPermissions.every((perm) => names.includes(perm));
};

export function getAllEntities(
  config: IPermissionConfig[]
): IPermissionConfig[] {
  return config.flatMap((entity) => [
    entity,
    ...(entity.subItems ? getAllEntities(entity.subItems) : []),
  ]);
}

export function mapRolesDataToForm(
  defaultConfig: IPermissionConfig[],
  backendData: IRoles
): IRolesFormData {
  const allEntities = getAllEntities(defaultConfig);

  const formData: IRolesFormData = {
    role_name: backendData.role_name,
    entities: allEntities.reduce((acc, entity) => {
      acc[entity.data] = entity.permissions.reduce(
        (permissionAcc, permission) => {
          permissionAcc[permission] = false;
          return permissionAcc;
        },
        {} as Record<string, boolean>
      );
      return acc;
    }, {} as Record<string, Record<string, boolean>>),
  };

  if (backendData.permissions?.length) {
    backendData.permissions.forEach(({ name }) => {
      const [action, entityName] = name.replace("can-", "").split("-");
      const entityConfig = allEntities.find((e) => e.data === entityName);
      if (entityConfig?.permissions.includes(action)) {
        formData.entities[entityName][action] = true;
      }
    });
  }

  return formData;
}

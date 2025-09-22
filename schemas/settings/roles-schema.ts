import { permissionsData } from "@/constants/permissions-data";
import { getAllEntities } from "@/lib/roles-permissions-utils";
import { z } from "zod";

export const rolesSchema = z.object({
  role_name: z.string().min(1, { message: "Role name is required." }),
  is_active: z.boolean(),
  users: z.array(z.string()).min(1, { message: "User is required." }),
  entities: z.object(
    getAllEntities(permissionsData).reduce((acc, entity) => {
      acc[entity.data] = z.object(
        entity.permissions.reduce((permissionAcc, permission) => {
          permissionAcc[permission] = z.boolean();
          return permissionAcc;
        }, {} as Record<string, z.ZodBoolean>)
      );
      return acc;
    }, {} as Record<string, z.ZodObject<any>>)
  ),
});

export type RolesValues = z.infer<typeof rolesSchema>;

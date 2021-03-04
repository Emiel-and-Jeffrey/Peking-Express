import { Role } from "@vrees/authentication";
import { RolesGuard } from "guards/role.guard";

export const UserPermissions = {
    admin: {
        guards: [RolesGuard],
        data: { roles: [Role.Admin] },
    },
    developer: {
        guards: [RolesGuard],
        data: { roles: [Role.User] },
    },
};

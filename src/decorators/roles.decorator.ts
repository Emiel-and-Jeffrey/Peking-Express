import { SetMetadata } from "@nestjs/common";
import { Role } from "@vrees/authentication";

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);

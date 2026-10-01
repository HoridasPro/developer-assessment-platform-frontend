import { Role } from "./registerPayload";

export type TUser = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  role: Role;
  status: "ACTIVE" | "INACTIVE";
  isActive: boolean;
  phone: string | null;
};

export type TGetMeResponse = {
  success: boolean;
  message: string;
  data: TUser;
};

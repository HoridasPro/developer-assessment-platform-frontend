export type Role = "CANDIDATE" | "COMPANY" | "ADMIN";

export type registerPayload = {
  name: string;
  email: string;
  password: string;
  profilePhoto: FileList;
  role: Role;
  phone: string;
};

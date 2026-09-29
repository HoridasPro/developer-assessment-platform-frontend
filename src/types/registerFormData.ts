export type Role = "CANDIDATE" | "COMPANY" | "ADMIN";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  profilePhoto: FileList;
  role: Role;
  phone: string;
};

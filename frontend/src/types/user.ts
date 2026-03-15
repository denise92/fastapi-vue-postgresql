export interface UserProfile {
  id: number;
  email: string;
  full_name?: string;
  is_active: boolean;
  is_superuser: boolean;
}

export interface UserCreateInput {
  email: string;
  full_name?: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface UserUpdateInput {
  email?: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

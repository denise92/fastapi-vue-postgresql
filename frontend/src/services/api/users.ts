import {
  createUserApiV1UsersPost,
  readUsersApiV1UsersGet,
  updateUserApiV1UsersUserIdPut,
  type User,
  type UserCreate,
  type UserUpdate,
} from "@/client";
import { requireData, withAuth } from "./shared";

export async function getReadUsers(token: string): Promise<User[]> {
  const { data } = await readUsersApiV1UsersGet({ ...withAuth(token), throwOnError: true });
  return requireData(data, "Read users response is empty");
}

export async function postCreateUser(token: string, payload: UserCreate): Promise<User> {
  const { data } = await createUserApiV1UsersPost({
    ...withAuth(token),
    throwOnError: true,
    body: payload,
  });
  return requireData(data, "Create user response is empty");
}

export async function putUpdateUser(token: string, userId: number, payload: UserUpdate): Promise<User> {
  const { data } = await updateUserApiV1UsersUserIdPut({
    ...withAuth(token),
    throwOnError: true,
    path: { user_id: userId },
    body: payload,
  });
  return requireData(data, "Update user response is empty");
}

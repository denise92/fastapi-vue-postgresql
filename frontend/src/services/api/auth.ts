import {
  loginAccessTokenApiV1LoginAccessTokenPost,
  readUserMeApiV1UsersMeGet,
  type Token,
  type User,
} from "@/client";
import { requireData, withAuth } from "./shared";

export async function postLoginAccessToken(username: string, password: string): Promise<Token> {
  const { data } = await loginAccessTokenApiV1LoginAccessTokenPost({
    throwOnError: true,
    body: { username, password },
  });
  return requireData(data, "Login response is empty");
}

export async function getReadMe(token: string): Promise<User> {
  const { data } = await readUserMeApiV1UsersMeGet({ ...withAuth(token), throwOnError: true });
  return requireData(data, "Read me response is empty");
}

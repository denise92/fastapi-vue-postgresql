import {
  recoverPasswordApiV1PasswordRecoveryEmailPost,
  resetPasswordApiV1ResetPasswordPost,
  type Msg,
} from "@/client";
import { requireData } from "./shared";

export async function postRecoverPassword(email: string): Promise<Msg> {
  const { data } = await recoverPasswordApiV1PasswordRecoveryEmailPost({
    path: { email },
    throwOnError: true,
  });
  return requireData(data, "Recover password response is empty");
}

export async function postResetPassword(token: string, newPassword: string): Promise<Msg> {
  const { data } = await resetPasswordApiV1ResetPasswordPost({
    body: { token, new_password: newPassword },
    throwOnError: true,
  });
  return requireData(data, "Reset password response is empty");
}

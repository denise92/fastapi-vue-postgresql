export default {
  login: {
    title: "Login",
    email: "Email",
    password: "Password",
    submit: "Login",
    requiredUsername: "Please enter your account",
    requiredPassword: "Please enter your password",
    failed: "Login failed, please check your credentials",
    forgotPassword: "Forgot password?",
  },
  forgotPassword: {
    title: "Forgot Password",
    description:
      "Enter your registered email and we'll send you a link to reset your password.",
    email: "Email",
    submit: "Send Reset Link",
    success: "Password reset email sent. Please check your inbox.",
    backToLogin: "Back to Login",
    requiredEmail: "Please enter your email",
  },
  resetPassword: {
    title: "Reset Password",
    description: "Enter your new password",
    password: "New Password",
    confirmPassword: "Confirm Password",
    submit: "Reset Password",
    success: "Password updated. Please log in with your new password.",
    backToLogin: "Back to Login",
    requiredPassword: "Please enter your new password",
    passwordMismatch: "Passwords do not match",
    invalidToken: "Link expired. Please request a new password reset.",
  },
} as const;

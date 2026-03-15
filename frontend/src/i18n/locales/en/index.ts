import auth from "./auth";
import dashboard from "./dashboard";
import member from "./member";
import storefront from "./storefront";
import users from "./users";

const app = {
  brand: "Pet Liveshop Frontend",
  storefront: "Storefront",
  dashboard: "Dashboard",
  users: "Users",
  adminLogin: "Admin Login",
  logout: "Logout",
  language: "Language",
  zhTW: "繁體中文",
  en: "English",
  back: "Back",
  save: "Save",
  cancel: "Cancel",
  confirm: "Confirm",
  loading: "Loading...",
  success: "Success",
  failed: "Failed",
};

const errors = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email",
  networkError: "Network error. Please try again later.",
  unknown: "An unknown error occurred",
  notFound: "Resource not found",
  unauthorized: "Please log in first",
  forbidden: "You do not have permission to perform this action",
};

export default {
  errors,
  app,
  auth,
  dashboard,
  member,
  users,
  storefront,
};

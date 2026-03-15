import auth from "./auth";
import dashboard from "./dashboard";
import member from "./member";
import storefront from "./storefront";
import users from "./users";

const app = {
  brand: "汝的寶寵物生活館",
  storefront: "購物車網站",
  dashboard: "儀表板",
  users: "使用者",
  adminLogin: "後台登入",
  logout: "登出",
  language: "語言",
  zhTW: "繁體中文",
  en: "English",
  back: "返回",
  save: "儲存",
  cancel: "取消",
  confirm: "確認",
  loading: "載入中...",
  success: "成功",
  failed: "失敗",
};

const errors = {
  required: "此為必填欄位",
  invalidEmail: "請輸入有效的 Email",
  networkError: "網路連線異常，請稍後再試",
  unknown: "發生未知錯誤",
  notFound: "找不到資源",
  unauthorized: "請先登入",
  forbidden: "您沒有權限執行此操作",
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

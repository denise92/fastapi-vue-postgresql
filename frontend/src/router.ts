import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  // 購物車前台
  {
    path: "/",
    component: () => import("./layouts/StorefrontLayout.vue"),
    children: [
      {
        path: "",
        name: "storefront-home",
        component: () => import("./views/StorefrontHomePage.vue"),
      },
    ],
  },
  // 後台管理 (app)
  {
    path: "/app",
    component: () => import("./layouts/AppLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("./views/app/LoginPage.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("./views/app/ForgotPasswordPage.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("./views/app/ResetPasswordPage.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        meta: { requiresAuth: true },
        component: () => import("./views/app/DashboardPage.vue"),
      },
      {
        path: "admin/users",
        name: "admin-users",
        meta: { requiresAuth: true },
        component: () => import("./views/app/AdminUsersPage.vue"),
      },
    ],
  },
  // 會員專區 (member)
  {
    path: "/member",
    component: () => import("./layouts/MemberLayout.vue"),
    children: [
      {
        path: "login",
        name: "member-login",
        component: () => import("./views/member/MemberLoginPage.vue"),
      },
      {
        path: "dashboard",
        name: "member-dashboard",
        meta: { requiresAuth: true },
        component: () => import("./views/member/MemberDashboardPage.vue"),
      },
      {
        path: "orders",
        name: "member-orders",
        meta: { requiresAuth: true },
        component: () => import("./views/member/MemberOrdersPage.vue"),
      },
      {
        path: "addresses",
        name: "member-addresses",
        meta: { requiresAuth: true },
        component: () => import("./views/member/MemberAddressesPage.vue"),
      },
    ],
  },
  {
    path: "/reset-password",
    redirect: (to) => ({ path: "/app/reset-password", query: to.query }),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

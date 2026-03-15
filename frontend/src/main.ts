import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./router";
import { useAuthStore } from "@/stores/auth";
import { i18n } from "@/i18n";
import { setAppRouter } from "@/services/navigation";
import "ant-design-vue/dist/reset.css";
import "./styles.css";

export const createApp = ViteSSG(App, { routes }, ({ app, router }) => {
  const pinia = createPinia();
  setAppRouter(router);
  app.use(pinia);
  app.use(i18n);
  app.use(Antd);

  const auth = useAuthStore(pinia);
  auth.bootstrap();

  router.beforeEach(async (to) => {
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
      const loginPath = to.path.startsWith("/member") ? "/member/login" : "/app/login";
      return { path: loginPath, query: { redirect: to.fullPath } };
    }
    if (to.path === "/app/login" && auth.isLoggedIn) {
      return { path: "/app/dashboard" };
    }
    if (to.path === "/member/login" && auth.isLoggedIn) {
      return { path: "/member/dashboard" };
    }
    return true;
  });
});

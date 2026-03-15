import type { Router } from "vue-router";

let appRouter: Router | null = null;

export function setAppRouter(router: Router) {
  appRouter = router;
}

export function getCurrentPath(): string {
  return appRouter?.currentRoute.value.path || "";
}

export async function navigateTo(path: string) {
  if (!appRouter) return;
  if (appRouter.currentRoute.value.path === path) return;
  await appRouter.push(path);
}

export function navigateBack() {
  if (!appRouter) return;
  appRouter.back();
}

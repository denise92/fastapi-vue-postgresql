<template>
  <a-layout class="app-layout app-layout--admin">
    <a-layout-header class="app-layout__header">
      <div class="app-layout__brand">{{ t("app.brand") }}</div>
      <a-space>
        <RouterLink to="/"><a-button type="link">{{ t("app.storefront") }}</a-button></RouterLink>
        <RouterLink v-if="isLoggedIn" to="/app/dashboard"><a-button type="link">{{ t("app.dashboard") }}</a-button></RouterLink>
        <RouterLink v-if="isLoggedIn" to="/app/admin/users"><a-button type="link">{{ t("app.users") }}</a-button></RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/app/login"><a-button type="link">{{ t("app.adminLogin") }}</a-button></RouterLink>
        <a-button v-if="isLoggedIn" type="primary" ghost @click="handleLogout">{{ t("app.logout") }}</a-button>
        <a-select v-model:value="locale" style="width: 130px" size="small">
          <a-select-option value="zh-TW">{{ t("app.zhTW") }}</a-select-option>
          <a-select-option value="en">{{ t("app.en") }}</a-select-option>
        </a-select>
      </a-space>
    </a-layout-header>
    <a-layout-content class="app-layout__content">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAppI18n } from "@/i18n";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
const isLoggedIn = computed(() => auth.isLoggedIn);
const { t, locale } = useAppI18n();

function handleLogout() {
  auth.logout();
  router.push("/app/login");
}
</script>

<style scoped>
.app-layout--admin .app-layout__header {
  background: #001529;
}
.app-layout--admin .app-layout__brand {
  color: white;
  font-size: 16px;
  font-weight: 600;
}
.app-layout__content {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}
</style>

<template>
  <a-layout class="member-layout">
    <a-layout-header class="member-layout__header">
      <div class="member-layout__brand">{{ t("app.brand") }}</div>
      <a-space>
        <RouterLink to="/"><a-button type="link">{{ t("app.storefront") }}</a-button></RouterLink>
        <RouterLink v-if="isLoggedIn" to="/member/dashboard"><a-button type="link">{{ t("member.dashboard.title") }}</a-button></RouterLink>
        <RouterLink v-if="isLoggedIn" to="/member/orders"><a-button type="link">{{ t("member.nav.orders") }}</a-button></RouterLink>
        <RouterLink v-if="isLoggedIn" to="/member/addresses"><a-button type="link">{{ t("member.nav.addresses") }}</a-button></RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/member/login"><a-button type="link">{{ t("member.nav.memberLogin") }}</a-button></RouterLink>
        <a-button v-if="isLoggedIn" type="primary" ghost @click="handleLogout">{{ t("app.logout") }}</a-button>
        <a-select v-model:value="locale" style="width: 130px" size="small">
          <a-select-option value="zh-TW">{{ t("app.zhTW") }}</a-select-option>
          <a-select-option value="en">{{ t("app.en") }}</a-select-option>
        </a-select>
      </a-space>
    </a-layout-header>
    <a-layout-content class="member-layout__content">
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
  router.push("/member/login");
}
</script>

<style scoped>
.member-layout__header {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.member-layout__brand {
  color: white;
  font-size: 18px;
  font-weight: 600;
}
.member-layout__content {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  background: #fafbfc;
}
</style>

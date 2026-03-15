<template>
  <a-layout class="storefront-layout">
    <a-layout-header class="storefront-layout__header">
      <div class="storefront-layout__brand">{{ t("app.brand") }}</div>
      <a-space>
        <RouterLink to="/member/login"><a-button type="link">{{ t("member.nav.memberLogin") }}</a-button></RouterLink>
        <RouterLink to="/app/login"><a-button type="link">{{ t("app.adminLogin") }}</a-button></RouterLink>
        <a-select v-model:value="locale" style="width: 130px" size="small">
          <a-select-option value="zh-TW">{{ t("app.zhTW") }}</a-select-option>
          <a-select-option value="en">{{ t("app.en") }}</a-select-option>
        </a-select>
      </a-space>
    </a-layout-header>
    <a-layout-content class="storefront-layout__content">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { useAppI18n } from "@/i18n";

const { t, locale } = useAppI18n();
</script>

<style scoped>
.storefront-layout__header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.storefront-layout__brand {
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}
.storefront-layout__content {
  min-height: calc(100vh - 64px);
  padding: 24px;
}
</style>

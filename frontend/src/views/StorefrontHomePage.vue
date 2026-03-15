<template>
  <a-card :title="t('storefront.title')">
    <p>{{ t("storefront.description") }}</p>
    <a-space>
      <a-button type="primary" href="/app/login">{{ t("app.adminLogin") }}</a-button>
      <a-button href="/app/dashboard">{{ t("app.dashboard") }}</a-button>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
import { useAppI18n } from "@/i18n";

const { t } = useAppI18n();
</script>

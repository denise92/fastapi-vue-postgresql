<template>
  <a-card :title="t('dashboard.title')">
    <a-descriptions bordered :column="1" v-if="auth.user">
      <a-descriptions-item :label="t('dashboard.id')">{{ auth.user.id }}</a-descriptions-item>
      <a-descriptions-item :label="t('dashboard.email')">{{ auth.user.email }}</a-descriptions-item>
      <a-descriptions-item :label="t('dashboard.fullName')">{{ auth.user.full_name || "-" }}</a-descriptions-item>
      <a-descriptions-item :label="t('dashboard.active')">{{ auth.user.is_active ? t("dashboard.yes") : t("dashboard.no") }}</a-descriptions-item>
      <a-descriptions-item :label="t('dashboard.superuser')">{{ auth.user.is_superuser ? t("dashboard.yes") : t("dashboard.no") }}</a-descriptions-item>
    </a-descriptions>
    <a-alert v-else type="warning" show-icon :message="t('dashboard.noUser')" />
  </a-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppI18n } from "@/i18n";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const { t } = useAppI18n();

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchMe();
  }
});
</script>

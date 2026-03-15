<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">{{ t('member.dashboard.title') }}</h1>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card v-if="auth.user" :title="t('member.dashboard.profile')">
          <a-descriptions bordered :column="1">
            <a-descriptions-item :label="t('member.dashboard.email')">{{ auth.user.email }}</a-descriptions-item>
            <a-descriptions-item :label="t('member.dashboard.fullName')">{{ auth.user.full_name || '-' }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
        <a-alert v-else type="warning" show-icon :message="t('member.dashboard.noUser')" />
      </a-col>
      <a-col :xs="24" :md="12">
        <a-card :title="t('member.nav.orders')" class="cursor-pointer hover:shadow-md transition-shadow" @click="$router.push('/member/orders')">
          <template #extra>
            <RouterLink to="/member/orders">{{ t('app.back') }} &rarr;</RouterLink>
          </template>
          <p class="text-gray-500">{{ t('member.dashboard.ordersDesc') }}</p>
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12">
        <a-card :title="t('member.nav.addresses')" class="cursor-pointer hover:shadow-md transition-shadow" @click="$router.push('/member/addresses')">
          <template #extra>
            <RouterLink to="/member/addresses">{{ t('member.dashboard.goTo') }} &rarr;</RouterLink>
          </template>
          <p class="text-gray-500">{{ t('member.dashboard.addressesDesc') }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppI18n } from '@/i18n';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const { t } = useAppI18n();

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchMe();
  }
});
</script>

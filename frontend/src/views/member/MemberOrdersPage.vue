<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">{{ t('member.orders.title') }}</h1>
    <a-spin :spinning="loading">
      <a-empty v-if="!loading && orders.length === 0" :description="t('member.orders.empty')" />
      <a-table v-else :data-source="orders" :columns="columns" :pagination="false" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">{{ statusLabel(record.status) }}</template>
          <template v-else-if="column.key === 'totalAmount'">
            NT$ {{ (record.total_amount / 100).toLocaleString() }}
          </template>
          <template v-else-if="column.key === 'createdAt'">{{ formatDate(record.created_at) }}</template>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAppI18n } from '@/i18n';
import { useAuthStore } from '@/stores/auth';
import { getMyOrders, type Order } from '@/services/api/members';

const auth = useAuthStore();
const { t } = useAppI18n();
const orders = ref<Order[]>([]);
const loading = ref(true);

const columns = [
  { title: () => t('member.orders.id'), dataIndex: 'id', key: 'id', width: 100 },
  { title: () => t('member.orders.status'), dataIndex: 'status', key: 'status', width: 120 },
  { title: () => t('member.orders.totalAmount'), dataIndex: 'total_amount', key: 'totalAmount', width: 120 },
  { title: () => t('member.orders.createdAt'), dataIndex: 'created_at', key: 'createdAt' },
];

function statusLabel(status: string) {
  const map: Record<string, string> = {
    pending: t('member.orders.statusPending'),
    confirmed: t('member.orders.statusConfirmed'),
    shipped: t('member.orders.statusShipped'),
    delivered: t('member.orders.statusDelivered'),
  };
  return map[status] || status;
}

function formatDate(s?: string) {
  if (!s) return '-';
  try {
    return new Date(s).toLocaleString();
  } catch {
    return s;
  }
}

onMounted(async () => {
  if (!auth.token) return;
  try {
    orders.value = await getMyOrders(auth.token);
  } catch {
    orders.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">{{ t("member.addresses.title") }}</h1>
      <a-button type="primary" @click="openModal()">{{ t("member.addresses.add") }}</a-button>
    </div>
    <a-spin :spinning="loading">
      <a-empty
        v-if="!loading && addresses.length === 0"
        :description="t('member.addresses.empty')"
      />
      <a-list v-else :data-source="addresses">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <span>{{ item.recipient_name }}</span>
                <a-tag v-if="item.is_default" color="blue" class="ml-2">{{ t('member.addresses.defaultTag') }}</a-tag>
              </template>
              <template #description>
                <div>{{ item.phone }}</div>
                <div>
                  {{ item.address_line1 }}
                  <span v-if="item.address_line2">, {{ item.address_line2 }}</span>
                  {{ item.city }}{{ item.postal_code ? ` ${item.postal_code}` : "" }}
                </div>
              </template>
            </a-list-item-meta>
            <template #actions>
              <a @click="openModal(item)">{{ t("member.addresses.edit") }}</a>
              <a-popconfirm
                :title="t('member.addresses.deleteConfirm')"
                @confirm="handleDelete(item.id)"
              >
                <a class="text-red-500">{{ t("member.addresses.delete") }}</a>
              </a-popconfirm>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </a-spin>

    <a-modal
      v-model:open="modalVisible"
      :title="editingAddress ? t('member.addresses.edit') : t('member.addresses.add')"
      @ok="handleSubmit"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="form" layout="vertical">
        <a-form-item
          :label="t('member.addresses.recipientName')"
          name="recipient_name"
          :rules="[{ required: true, message: t('errors.required') }]"
        >
          <a-input v-model:value="form.recipient_name" />
        </a-form-item>
        <a-form-item
          :label="t('member.addresses.phone')"
          name="phone"
          :rules="[{ required: true, message: t('errors.required') }]"
        >
          <a-input v-model:value="form.phone" />
        </a-form-item>
        <a-form-item
          :label="t('member.addresses.addressLine1')"
          name="address_line1"
          :rules="[{ required: true, message: t('errors.required') }]"
        >
          <a-input v-model:value="form.address_line1" />
        </a-form-item>
        <a-form-item :label="t('member.addresses.addressLine2')" name="address_line2">
          <a-input v-model:value="form.address_line2" />
        </a-form-item>
        <a-form-item
          :label="t('member.addresses.city')"
          name="city"
          :rules="[{ required: true, message: t('errors.required') }]"
        >
          <a-input v-model:value="form.city" />
        </a-form-item>
        <a-form-item :label="t('member.addresses.postalCode')" name="postal_code">
          <a-input v-model:value="form.postal_code" />
        </a-form-item>
        <a-form-item :label="t('member.addresses.isDefault')" name="is_default">
          <a-checkbox v-model:checked="form.is_default" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import type { FormInstance } from "ant-design-vue";
import { useAppI18n } from "@/i18n";
import { useAuthStore } from "@/stores/auth";
import {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  type ShippingAddress,
  type ShippingAddressCreate,
} from "@/services/api/members";

const auth = useAuthStore();
const { t } = useAppI18n();
const addresses = ref<ShippingAddress[]>([]);
const loading = ref(true);
const modalVisible = ref(false);
const editingAddress = ref<ShippingAddress | null>(null);
const formRef = ref<FormInstance>();
const form = reactive<ShippingAddressCreate & { id?: number }>({
  recipient_name: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  postal_code: "",
  is_default: false,
});

async function fetchAddresses() {
  if (!auth.token) return;
  try {
    addresses.value = await getMyAddresses(auth.token);
  } catch {
    addresses.value = [];
  } finally {
    loading.value = false;
  }
}

function openModal(addr?: ShippingAddress) {
  editingAddress.value = addr || null;
  if (addr) {
    form.id = addr.id;
    form.recipient_name = addr.recipient_name;
    form.phone = addr.phone;
    form.address_line1 = addr.address_line1;
    form.address_line2 = addr.address_line2 || "";
    form.city = addr.city;
    form.postal_code = addr.postal_code || "";
    form.is_default = addr.is_default;
  } else {
    form.id = undefined;
    form.recipient_name = "";
    form.phone = "";
    form.address_line1 = "";
    form.address_line2 = "";
    form.city = "";
    form.postal_code = "";
    form.is_default = false;
  }
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
  editingAddress.value = null;
}

async function handleSubmit() {
  try {
    await formRef.value?.validate();
  } catch {
    return;
  }
  if (!auth.token) return;
  const payload = {
    recipient_name: form.recipient_name,
    phone: form.phone,
    address_line1: form.address_line1,
    address_line2: form.address_line2 || undefined,
    city: form.city,
    postal_code: form.postal_code || undefined,
    is_default: form.is_default,
  };
  try {
    if (editingAddress.value) {
      await updateAddress(auth.token, editingAddress.value.id, payload);
    } else {
      await createAddress(auth.token, payload);
    }
    closeModal();
    await fetchAddresses();
  } catch (e) {
    console.error(e);
  }
}

async function handleDelete(id: number) {
  if (!auth.token) return;
  try {
    await deleteAddress(auth.token, id);
    await fetchAddresses();
  } catch (e) {
    console.error(e);
  }
}

onMounted(fetchAddresses);
</script>

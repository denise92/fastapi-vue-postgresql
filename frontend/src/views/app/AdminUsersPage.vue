<template>
  <a-space direction="vertical" style="width: 100%" :size="16">
    <a-card :title="t('users.createTitle')">
      <a-form layout="vertical" @finish="onCreate">
        <a-row :gutter="12">
          <a-col :span="8">
            <a-form-item label="Email" name="email" :rules="[{ required: true, message: t('users.requiredEmail') }]">
              <a-input v-model:value="createForm.email" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="t('users.fullName')" name="full_name">
              <a-input v-model:value="createForm.full_name" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="t('users.password')" name="password" :rules="[{ required: true, message: t('users.requiredPassword') }]">
              <a-input-password v-model:value="createForm.password" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label=" " :colon="false">
              <a-button type="primary" html-type="submit" :loading="users.loading">{{ t("users.create") }}</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card :title="t('users.manageTitle')">
      <a-table :data-source="users.items" :loading="users.loading" :pagination="false" row-key="id">
        <a-table-column title="ID" data-index="id" key="id" />
        <a-table-column title="Email" data-index="email" key="email" />
        <a-table-column :title="t('users.fullName')" data-index="full_name" key="full_name" />
        <a-table-column :title="t('users.active')" key="is_active">
          <template #default="{ record }">
            <a-tag :color="record.is_active ? 'green' : 'red'">{{ record.is_active ? t("users.yes") : t("users.no") }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column :title="t('users.superuser')" key="is_superuser">
          <template #default="{ record }">
            <a-tag :color="record.is_superuser ? 'purple' : 'default'">{{ record.is_superuser ? t("users.yes") : t("users.no") }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column :title="t('users.actions')" key="actions">
          <template #default="{ record }">
            <a-button type="link" @click="openEdit(record)">{{ t("users.edit") }}</a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
  </a-space>

  <a-modal v-model:open="editOpen" :title="t('users.editTitle')" @ok="onUpdate" :confirm-loading="users.loading">
    <a-form layout="vertical">
      <a-form-item label="Email">
        <a-input v-model:value="editForm.email" />
      </a-form-item>
      <a-form-item :label="t('users.fullName')">
        <a-input v-model:value="editForm.full_name" />
      </a-form-item>
      <a-form-item :label="t('users.passwordOptional')">
        <a-input-password v-model:value="editForm.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useAppI18n } from "@/i18n";
import type { UserProfile } from "@/types/user";
import { useUsersStore } from "@/stores/users";

const users = useUsersStore();
const { t } = useAppI18n();

const createForm = reactive({
  email: "",
  full_name: "",
  password: "",
});

const editOpen = ref(false);
const editUserId = ref<number | null>(null);
const editForm = reactive({
  email: "",
  full_name: "",
  password: "",
});

onMounted(async () => {
  await users.fetchUsers();
});

async function onCreate() {
  await users.createUser({
    email: createForm.email,
    full_name: createForm.full_name || undefined,
    password: createForm.password,
  });
  createForm.email = "";
  createForm.full_name = "";
  createForm.password = "";
}

function openEdit(record: UserProfile) {
  editUserId.value = record.id;
  editForm.email = record.email;
  editForm.full_name = record.full_name || "";
  editForm.password = "";
  editOpen.value = true;
}

async function onUpdate() {
  if (!editUserId.value) return;
  await users.updateUser(editUserId.value, {
    email: editForm.email,
    full_name: editForm.full_name || undefined,
    password: editForm.password || undefined,
  });
  editOpen.value = false;
}
</script>

<template>
  <a-row justify="center">
    <a-col>
      <a-card :title="t('auth.login.title')">
        <a-form :model="form" layout="vertical" @finish="onSubmit">
          <a-form-item :label="t('auth.login.email')" name="username" :rules="[{ required: true, message: t('auth.login.requiredUsername') }]">
            <a-input v-model:value="form.username" />
          </a-form-item>
          <a-form-item :label="t('auth.login.password')" name="password" :rules="[{ required: true, message: t('auth.login.requiredPassword') }]">
            <a-input-password v-model:value="form.password" />
          </a-form-item>
          <RouterLink to="/app/forgot-password" style="display: block; margin-bottom: 16px">
            {{ t("auth.login.forgotPassword") }}
          </RouterLink>
          <a-space>
            <a-button type="primary" html-type="submit" :loading="submitting">{{ t("auth.login.submit") }}</a-button>
          </a-space>
          <a-alert
            v-if="errorMessage"
            style="margin-top: 16px"
            type="error"
            show-icon
            :message="errorMessage"
          />
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppI18n } from "@/i18n";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { t } = useAppI18n();

const form = reactive({
  username: "",
  password: "",
});
const submitting = ref(false);
const errorMessage = ref("");

async function onSubmit() {
  submitting.value = true;
  errorMessage.value = "";
  try {
    await auth.login(form.username, form.password);
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/app/dashboard";
    router.push(redirect);
  } catch {
    errorMessage.value = t("auth.login.failed");
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <a-row justify="center">
    <a-col :xs="24" :sm="18" :md="12" :lg="8">
      <a-card :title="t('auth.resetPassword.title')">
        <p v-if="!token">{{ t("auth.resetPassword.invalidToken") }}</p>
        <a-form v-else-if="!success" layout="vertical" @finish="onSubmit">
          <a-form-item
            :label="t('auth.resetPassword.password')"
            name="password"
            :rules="[{ required: true, message: t('auth.resetPassword.requiredPassword') }]"
          >
            <a-input-password v-model:value="form.password" />
          </a-form-item>
          <a-form-item
            :label="t('auth.resetPassword.confirmPassword')"
            name="confirmPassword"
            :rules="[
              { required: true, message: t('auth.resetPassword.requiredPassword') },
              { validator: validateConfirm },
            ]"
          >
            <a-input-password v-model:value="form.confirmPassword" />
          </a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit" :loading="submitting">
              {{ t("auth.resetPassword.submit") }}
            </a-button>
            <RouterLink to="/app/login">
              <a-button>{{ t("auth.resetPassword.backToLogin") }}</a-button>
            </RouterLink>
          </a-space>
          <a-alert
            v-if="errorMessage"
            style="margin-top: 16px"
            type="error"
            show-icon
            :message="errorMessage"
          />
        </a-form>
        <template v-else>
          <a-alert type="success" show-icon :message="t('auth.resetPassword.success')" />
          <a-button type="primary" style="margin-top: 16px" href="/app/login">
            {{ t("auth.resetPassword.backToLogin") }}
          </a-button>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppI18n } from "@/i18n";
import { postResetPassword } from "@/services/api/password";

const route = useRoute();
const { t } = useAppI18n();

const token = computed(() => {
  const q = route.query.token;
  return typeof q === "string" ? q : "";
});

const form = reactive({ password: "", confirmPassword: "" });
const submitting = ref(false);
const success = ref(false);
const errorMessage = ref("");

function validateConfirm() {
  if (form.password !== form.confirmPassword) {
    return Promise.reject(t("auth.resetPassword.passwordMismatch"));
  }
  return Promise.resolve();
}

async function onSubmit() {
  if (!token.value) return;
  submitting.value = true;
  errorMessage.value = "";
  try {
    await postResetPassword(token.value, form.password);
    success.value = true;
  } catch (e: unknown) {
    const msg = e && typeof e === "object" && "detail" in e
      ? String((e as { detail: unknown }).detail)
      : t("auth.resetPassword.invalidToken");
    errorMessage.value = msg;
  } finally {
    submitting.value = false;
  }
}
</script>

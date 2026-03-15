<template>
  <a-row justify="center">
    <a-col :xs="24" :sm="18" :md="12" :lg="8">
      <a-card :title="t('auth.forgotPassword.title')">
        <p>{{ t("auth.forgotPassword.description") }}</p>
        <a-form v-if="!success" layout="vertical" @finish="onSubmit">
          <a-form-item
            :label="t('auth.forgotPassword.email')"
            name="email"
            :rules="[{ required: true, message: t('auth.forgotPassword.requiredEmail') }]"
          >
            <a-input v-model:value="form.email" type="email" />
          </a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit" :loading="submitting">
              {{ t("auth.forgotPassword.submit") }}
            </a-button>
            <RouterLink to="/app/login">
              <a-button>{{ t("auth.forgotPassword.backToLogin") }}</a-button>
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
          <a-alert type="success" show-icon :message="t('auth.forgotPassword.success')" />
          <a-button type="primary" style="margin-top: 16px" href="/app/login">
            {{ t("auth.forgotPassword.backToLogin") }}
          </a-button>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAppI18n } from "@/i18n";
import { postRecoverPassword } from "@/services/api/password";

const { t } = useAppI18n();

const form = reactive({ email: "" });
const submitting = ref(false);
const success = ref(false);
const errorMessage = ref("");

async function onSubmit() {
  submitting.value = true;
  errorMessage.value = "";
  try {
    await postRecoverPassword(form.email);
    success.value = true;
  } catch (e: unknown) {
    const msg = e && typeof e === "object" && "detail" in e
      ? String((e as { detail: unknown }).detail)
      : t("auth.login.failed");
    errorMessage.value = msg;
  } finally {
    submitting.value = false;
  }
}
</script>

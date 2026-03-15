<template>
  <a-row justify="center">
    <a-col>
      <a-card :title="t('member.login.title')">
        <p class="text-gray-500 mb-4">{{ t('member.login.description') }}</p>
        <a-form layout="vertical" @finish="onSubmit">
          <a-form-item
            :label="t('member.login.email')"
            name="username"
            :rules="[{ required: true, message: t('member.login.requiredUsername') }]"
          >
            <a-input v-model:value="form.username" />
          </a-form-item>
          <a-form-item
            :label="t('member.login.password')"
            name="password"
            :rules="[{ required: true, message: t('member.login.requiredPassword') }]"
          >
            <a-input-password v-model:value="form.password" />
          </a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit" :loading="submitting">
              {{ t('member.login.submit') }}
            </a-button>
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
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppI18n } from '@/i18n';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { t } = useAppI18n();

const form = reactive({ username: '', password: '' });
const submitting = ref(false);
const errorMessage = ref('');

async function onSubmit() {
  submitting.value = true;
  errorMessage.value = '';
  try {
    await auth.login(form.username, form.password);
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/member/dashboard';
    router.push(redirect);
  } catch {
    errorMessage.value = t('member.login.failed');
  } finally {
    submitting.value = false;
  }
}
</script>

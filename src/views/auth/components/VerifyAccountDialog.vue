<template>
    <Form ref="formRef">
        <div class="py-4">
            <div>
                <span
                    >Enter verification code to verify your email
                    <span class="text-red-500">(*)</span></span
                >
                <Field name="token" rules="required" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="token"
                        placeholder="Verification Code"
                        class="mt-2"
                        size="large"
                    />
                </Field>
                <ErrorMessage name="token" class="text-red-500" />
            </div>
            <div class="flex justify-end">
                <el-button type="primary" @click="verify" class="w-full mt-5"> Verify </el-button>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ElNotification } from 'element-plus';

const { verifyUser } = useAuthStore();
const token = ref('');
const formRef = ref<any>(null);
const emit = defineEmits(['close']);

const verify = async () => {
    const result = await formRef.value?.validate();
    if (!result?.valid) {
        return;
    }
    const verifyResult = await verifyUser(token.value);
    if (verifyResult.success) {
        ElNotification({
            type: 'success',
            message: 'Verify Email Success!',
        });
        emit('close');
    } else {
        const error = verifyResult.error;
        formRef.value.setFieldError(error?.errors[0].key, error?.message);
    }
};
</script>

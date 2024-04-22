<template>
    <Form ref="formRef">
        <div class="py-4">
            <div>
                <span
                    >Enter your email so we can find your account
                    <span class="text-red-500">(*)</span></span
                >
                <Field name="email" type="email" :rules="validateEmail as any" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="email"
                        placeholder="Email"
                        class="mt-2"
                        size="large"
                    />
                </Field>
                <ErrorMessage name="email" class="text-red-500" />
            </div>
            <div>
                <el-button type="primary" @click="findAccount" class="w-full mt-5">
                    Continue
                </el-button>
            </div>
            <div class="mt-5">
                <div>
                    Need an account?
                    <span class="text-blue-500 cursor-pointer underline" @click="openRegister">
                        Register Here
                    </span>
                </div>
            </div>
        </div> </Form
    >>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { validateEmail } from '@/common/veeValidateRule';
import { forgotPassword } from '@/services/user.service';
import { ElNotification } from 'element-plus';
import type { Error } from '@/interface/common.interface';

const email = ref('');
const formRef = ref<any>(null);
const emit = defineEmits(['openRegister', 'openSetPassword']);

const findAccount = async () => {
    const validate = await formRef.value?.validate();
    if (!validate?.valid) {
        return;
    }
    try {
        await forgotPassword(email.value);
        ElNotification({
            type: 'success',
            message:
                'We have sent you an email with an verification code. Please enter the code to reset your password.',
        });
        emit('openSetPassword');
    } catch (error) {
        formRef.value.setFieldError((error as Error)?.errors[0].key, (error as Error)?.message);
    }
};

const openRegister = async () => {
    await formRef?.value?.resetForm();
    emit('openRegister');
};
</script>

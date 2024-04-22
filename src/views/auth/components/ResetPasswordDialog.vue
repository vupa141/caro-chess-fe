<template>
    <Form ref="formRef">
        <div class="py-4">
            <div>
                <span
                    >Enter verification code to reset your password
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
            <div class="mt-4">
                <span>Password <span class="text-red-500">(*)</span></span>
                <Field
                    name="password"
                    type="password"
                    :rules="validatePassword as any"
                    v-slot="{ field }"
                >
                    <el-input
                        v-bind="field"
                        v-model="password"
                        placeholder="Password"
                        class="mt-2"
                        :type="showPassword ? 'text' : 'password'"
                        size="large"
                    >
                        <template #append>
                            <el-button
                                :icon="showPassword ? Hide : View"
                                @click="toggleShowPassword"
                            />
                        </template>
                    </el-input>
                </Field>
                <ErrorMessage name="password" class="text-red-500" />
            </div>
            <div class="mt-4">
                <span>Password Confirmation<span class="text-red-500"> (*)</span></span>
                <Field
                    name="reg-password-confirmation"
                    type="password"
                    :rules="validatePasswordConfirmation as any"
                    v-slot="{ field }"
                >
                    <el-input
                        v-bind="field"
                        v-model="passwordConfirmation"
                        placeholder="Password Confirmation"
                        class="mt-2"
                        :type="showPassword ? 'text' : 'password'"
                        size="large"
                    >
                        <template #append>
                            <el-button
                                :icon="showPassword ? Hide : View"
                                @click="toggleShowPassword"
                            />
                        </template>
                    </el-input>
                </Field>
                <ErrorMessage name="reg-password-confirmation" class="text-red-500" />
            </div>
            <div class="flex justify-end">
                <el-button type="primary" class="w-full mt-5" @click="confirm">Confirm</el-button>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ElNotification } from 'element-plus';
import { validatePassword } from '@/common/veeValidateRule';
import { View, Hide } from '@element-plus/icons-vue';
import { resetPassword } from '@/services/user.service';
import type { Error } from '@/interface/common.interface';

const token = ref('');
const formRef = ref<any>(null);
const password = ref('');
const passwordConfirmation = ref('');
const showPassword = ref(false);
const emit = defineEmits(['openLogin']);

const validatePasswordConfirmation = (value: string) => {
    if (value !== password.value) {
        return 'Password confirmation must be the same as password';
    }
    return true;
};

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};

const confirm = async () => {
    const validate = await formRef.value?.validate();
    if (!validate?.valid) {
        return;
    }
    try {
        await resetPassword(token.value, password.value);
        ElNotification({
            type: 'success',
            message: 'Set password success!',
        });
        emit('openLogin');
    } catch (error) {
        formRef.value.setFieldError((error as Error)?.errors[0].key, (error as Error)?.message);
    }
};
</script>

<template>
    <Form ref="formRef">
        <div>
            <div>
                <span>Email <span class="text-red-500">(*)</span></span>
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
            <div class="mt-4">
                <span>Password <span class="text-red-500">(*)</span></span>
                <Field name="password" type="password" v-slot="{ field }">
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
            <div>
                <el-button type="primary" @click="login" class="w-full mt-5"> Log In </el-button>
            </div>
            <div class="mt-5 flex justify-between">
                <div class="mr-4">
                    Need an account?
                    <span class="text-blue-500 cursor-pointer underline" @click="openRegister">
                        Register Here
                    </span>
                </div>
                <div>
                    <span
                        class="text-blue-500 cursor-pointer underline"
                        @click="openForgotPassword"
                    >
                        Forgot your password?
                    </span>
                </div>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { View, Hide } from '@element-plus/icons-vue';
import { validateEmail } from '@/common/veeValidateRule';
import { ElNotification } from 'element-plus';
import { useAuthStore } from '@/stores/auth';

const { logIn } = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const formRef = ref<any>(null);
const emit = defineEmits(['openRegister', 'openForgotPassword', 'close']);
const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};

const login = async () => {
    const validate = await formRef?.value?.validate();
    if (!validate?.valid) {
        return;
    }
    const loginResult = await logIn({ email: email.value, password: password.value });
    if (loginResult.success) {
        ElNotification({
            type: 'success',
            message: 'Login Success. Welcome back!',
        });
        emit('close');
    } else {
        const error = loginResult.error;
        formRef.value.setFieldError(error?.errors[0].key, error?.message);
    }
};

const openRegister = async () => {
    await formRef?.value?.resetForm();
    emit('openRegister');
};

const openForgotPassword = async () => {
    await formRef?.value?.resetForm();
    emit('openForgotPassword');
};

defineExpose({
    formRef,
});
</script>

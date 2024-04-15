<template>
    <Form ref="registerFormRef">
        <div class="py-4">
            <div>
                <span>Display Name <span class="text-red-500">(*)</span></span>
                <Field name="username" :rules="validateName as any" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="username"
                        placeholder="Display Name"
                        class="mt-2"
                        size="large"
                    />
                </Field>
                <ErrorMessage name="username" class="text-red-500" />
            </div>
            <div class="mt-4">
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
            <div>
                <el-button type="primary" @click="signUp" class="w-full mt-5"> Sign Up </el-button>
            </div>
            <div class="mt-5">
                <div>
                    Already have an account?
                    <span class="text-blue-500 cursor-pointer underline" @click="openLogin">
                        Log In Here
                    </span>
                </div>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { View, Hide } from '@element-plus/icons-vue'
import { validateEmail, validatePassword, validateName } from '@/common/veeValidateRule'
import { register } from '@/services/user.service'
import { useCommonStore } from '@/stores/common'

const email = ref('')
const password = ref('')
const username = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const registerFormRef = ref<any>(null)
const emit = defineEmits(['openLogin', 'verify'])

const commonStore = useCommonStore()
const setUser = commonStore.setUser

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
}

const openLogin = async () => {
    await registerFormRef.value?.resetForm()
    emit('openLogin')
}

const validatePasswordConfirmation = (value: string) => {
    if (value !== password.value) {
        return 'Password confirmation must be the same as password'
    }
    return true
}

const signUp = async () => {
    const result = await registerFormRef.value?.validate()
    if (!result?.valid) {
        return
    }
    try {
        const registerResult = await register({
            username: username.value,
            email: email.value,
            password: password.value
        })
        setUser(registerResult.data.user)
        ElNotification({
            type: 'success',
            message: 'Register Success'
        })
        registerFormRef.value?.resetForm()
        emit('verify')
    } catch (error: any) {
        registerFormRef.value.setFieldError(error?.errors[0].key, error.message)
    }
}
</script>

<template>
    <el-dialog
        v-model="open"
        title="Welcome to Caro Game!"
        width="500"
        :before-close="handleClose"
    >
    <Form ref="loginFormRef" v-if="mode === MODE.LOGIN">
        <div>
            <div>
                <span>Email <span class="text-red-500">(*)</span></span>
                <Field name="email" type="email" :rules="validateEmail as any" v-slot="{ field }">
                    <el-input v-bind="field" v-model="email"  placeholder="Email" class="mt-2" size="large"/>
                </Field>
                <ErrorMessage name="email" class="text-red-500" />
            </div>
            <div class="mt-4">
                <span>Password <span class="text-red-500">(*)</span></span>
                <Field name="password" type="password" :rules="validatePassword as any" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="password"
                        placeholder="Password"
                        class="mt-2"
                        :type="showPassword ? 'text' : 'password'"
                        size="large">
                        <template #append>
                            <el-button :icon="showPassword ? Hide : View" @click="toggleShowPassword"/>
                        </template>
                    </el-input>
                </Field>
                <ErrorMessage name="password" class="text-red-500" />
            </div>
            <div>
                <el-button type="primary" @click="login" class="w-full mt-5">
                    Log In
                </el-button>
            </div>
            <div class="mt-5 flex justify-between">
                <div>
                    Need an account? 
                    <span
                        class="text-blue-500 cursor-pointer underline"
                        @click="openRegister"
                    >
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
    <Form ref="registerFormRef" v-else-if="mode === MODE.REGISTER">
        <div class="py-4">
            <div>
                <span>Display Name <span class="text-red-500">(*)</span></span>
                <Field name="name" :rules="validateName as any" v-slot="{ field }">
                    <el-input v-bind="field" v-model="email"  placeholder="Display Name" class="mt-2" size="large"/>
                </Field>
                <ErrorMessage name="name" class="text-red-500" />
            </div>
            <div class="mt-4">
                <span>Email <span class="text-red-500">(*)</span></span>
                <Field name="reg-email" type="email" :rules="validateEmail as any" v-slot="{ field }">
                    <el-input v-bind="field" v-model="email"  placeholder="Email" class="mt-2" size="large"/>
                </Field>
                <ErrorMessage name="reg-email" class="text-red-500" />
            </div>
            <div class="mt-4">
                <span>Password <span class="text-red-500">(*)</span></span>
                <Field name="reg-password" type="password" :rules="validatePassword as any" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="password"
                        placeholder="Password"
                        class="mt-2"
                        :type="showPassword ? 'text' : 'password'"
                        size="large">
                        <template #append>
                            <el-button :icon="showPassword ? Hide : View" @click="toggleShowPassword"/>
                        </template>
                    </el-input>
                </Field>
                <ErrorMessage name="reg-password" class="text-red-500" />

            </div>
            <div class="mt-4">
                <span>Password Confirmation<span class="text-red-500"> (*)</span></span>
                <Field name="reg-password-confirmation" type="password" :rules="validatePasswordConfirmation as any" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="passwordConfirmation"
                        placeholder="Password Confirmation"
                        class="mt-2"
                        :type="showPassword ? 'text' : 'password'"
                        size="large">
                        <template #append>
                            <el-button :icon="showPassword ? Hide : View" @click="toggleShowPassword"/>
                        </template>
                    </el-input>
                </Field>
                <ErrorMessage name="reg-password-confirmation" class="text-red-500" />
            </div>
            <div>
                <el-button type="primary" @click="signUp" class="w-full mt-5">
                    Sign Up
                </el-button>
            </div>
            <div class="mt-5">
                <div>
                    Already have an account? 
                    <span
                        class="text-blue-500 cursor-pointer underline"
                        @click="openLogin"
                    >
                        Log In Here
                    </span>
                </div>
            </div>
        </div>
    </Form>
    <Form ref="forgotPasswordFormRef" v-else="mode === MODE.FORGOT_PASSWORD">
        <div  class="py-4">
            <div>
                <span>Enter your email so we can find your account <span class="text-red-500">(*)</span></span>
                <Field name="forgot-pw-email" type="email" :rules="validateEmail as any" v-slot="{ field }">
                    <el-input v-bind="field" v-model="email"  placeholder="Email" class="mt-2" size="large"/>
                </Field>
                <ErrorMessage name="forgot-pw-email" class="text-red-500" />
            </div>
            <div>
                <el-button type="primary" @click="findAccount" class="w-full mt-5">
                    Continue
                </el-button>
            </div>
            <div class="mt-5">
                <div>
                    Need an account? 
                    <span
                        class="text-blue-500 cursor-pointer underline"
                        @click="openRegister"
                    >
                        Register Here
                    </span>
                </div>
            </div>
        </div>
    </Form>>

    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { View, Hide } from '@element-plus/icons-vue'
import { validateEmail, validatePassword, validateName } from '@/common/helper';
const props = defineProps({
    openModal: Boolean
})

watch(props, (prop) => {
    open.value = prop.openModal;
})

const MODE = {
    LOGIN: 1,
    REGISTER: 2,
    FORGOT_PASSWORD: 3,
}

const open = ref(props.openModal)
const mode = ref(MODE.LOGIN)
const loginFormRef = ref<any>(null)
const registerFormRef = ref<any>(null)
const forgotPasswordFormRef = ref<any>(null)
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
}

const login = async () => {
    const result = await loginFormRef.value?.validate();
    if (!result?.valid) {
        return;
    }
}

const signUp = async () => {
    const result = await registerFormRef.value?.validate();
    if (!result?.valid) {
        return;
    }
}

const findAccount = async () => {
    const result = await forgotPasswordFormRef.value?.validate();
    if (!result?.valid) {
        return;
    }
}

const clearFormData = () => {
    name.value = ''
    email.value = ''
    password.value = ''
    passwordConfirmation.value = ''
    showPassword.value =  false
    loginFormRef.value?.resetForm();
    registerFormRef.value?.resetForm();
    forgotPasswordFormRef.value?.resetForm();
}

const openForgotPassword = () => {
    clearFormData()
    mode.value = MODE.FORGOT_PASSWORD
}

const openRegister = () => {
    clearFormData()
    mode.value = MODE.REGISTER
}

const openLogin = () => {
    clearFormData()
    mode.value = MODE.LOGIN
}

const emit = defineEmits(['close'])

const handleClose = () => {
    clearFormData()
    mode.value = MODE.LOGIN
    open.value = false
    emit('close')
}

const validatePasswordConfirmation = (value: string) => {
    if (value !== password.value) {
        return 'Password confirmation must be the same as password';
    }
    return true;
}

</script>
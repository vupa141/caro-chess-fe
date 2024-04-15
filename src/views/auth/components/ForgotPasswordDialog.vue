<template>
    <Form ref="forgotPasswordFormRef">
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
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { validateEmail } from '@/common/veeValidateRule'

const email = ref('')
const forgotPasswordFormRef = ref<any>(null)
const emit = defineEmits(['openRegister'])

const findAccount = async () => {
    const result = await forgotPasswordFormRef.value?.validate()
    if (!result?.valid) {
        return
    }
}

const openRegister = async () => {
    await forgotPasswordFormRef?.value?.resetForm()
    emit('openRegister')
}
</script>

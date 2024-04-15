<template>
    <Form ref="formRef">
        <div class="py-4">
            <div>
                <span
                    >Enter verification code to verify your email
                    <span class="text-red-500">(*)</span></span
                >
                <Field name="forgot-pw-email" type="email" rules="required" v-slot="{ field }">
                    <el-input
                        v-bind="field"
                        v-model="token"
                        placeholder="Verification Code"
                        class="mt-2"
                        size="large"
                    />
                </Field>
                <ErrorMessage name="forgot-pw-email" class="text-red-500" />
            </div>
            <div class="flex justify-end">
                <el-button type="primary" @click="verify" class="w-full mt-5"> Verify </el-button>
            </div>
        </div> </Form
    >>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useCommonStore } from '@/stores/common'
import { verifyAccount } from '@/services/user.service'
import { ElNotification } from 'element-plus'
import { USER_STATUS } from '@/common/constant'

const commonStore = useCommonStore()
const setUser = commonStore.setUser
const user = commonStore.user
const token = ref('')
const formRef = ref<any>(null)
const emit = defineEmits(['back', 'close'])

const verify = async () => {
    const result = await formRef.value?.validate()
    if (!result?.valid) {
        return
    }
    try {
        await verifyAccount(token.value)
        ElNotification({
            type: 'success',
            message: 'Verify Email Success!'
        })
        setUser({
            ...user,
            status: USER_STATUS.VERIFIED
        })
        emit('close')
    } catch (error: any) {
        formRef.value.setFieldError(error?.errors[0].key, error.message)
    }
}
</script>

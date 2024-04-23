<template>
    <el-dialog v-model="open" title="Welcome to Caro Game!" :width="screenWidth < 500 ? screenWidth * 0.9 : 500" :before-close="handleClose">
        <LoginDialog
            ref="loginRef"
            v-if="mode === MODE.LOGIN"
            @openForgotPassword="openForgotPassword"
            @openRegister="openRegister"
            @close="handleClose"
        />
        <RegisterDialog
            v-else-if="mode === MODE.REGISTER"
            @openLogin="openLogin"
            @verify="openVerify"
        />
        <ForgotPasswordDialog
            v-else-if="mode === MODE.FORGOT_PASSWORD"
            @openRegister="openRegister"
            @openSetPassword="openSetPassword"
        />
        <ResetPasswordDialog v-else-if="mode === MODE.RESET_PASSWORD" @openLogin="openLogin" />
        <VerifyAccountDialog v-else-if="mode === MODE.VERIFY_ACCOUNT" @close="handleClose" />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import LoginDialog from './components/LoginDialog.vue';
import RegisterDialog from './components/RegisterDialog.vue';
import ForgotPasswordDialog from './components/ForgotPasswordDialog.vue';
import VerifyAccountDialog from './components/VerifyAccountDialog.vue';
import ResetPasswordDialog from './components/ResetPasswordDialog.vue';
import { useCommonStore } from '@/stores/common';
import { storeToRefs } from 'pinia';

const { screenWidth } = storeToRefs(useCommonStore());
const props = defineProps({
    openModal: Boolean,
});

watch(props, (prop) => {
    open.value = prop.openModal;
});

const MODE = {
    LOGIN: 1,
    REGISTER: 2,
    FORGOT_PASSWORD: 3,
    VERIFY_ACCOUNT: 4,
    RESET_PASSWORD: 5,
};

const open = ref(props.openModal);
const mode = ref(MODE.LOGIN);

const loginRef = ref<any>(null);
const openForgotPassword = () => {
    mode.value = MODE.FORGOT_PASSWORD;
};

const openRegister = () => {
    mode.value = MODE.REGISTER;
};

const openLogin = () => {
    mode.value = MODE.LOGIN;
};

const openVerify = () => {
    mode.value = MODE.VERIFY_ACCOUNT;
};

const openSetPassword = () => {
    mode.value = MODE.RESET_PASSWORD;
};

const emit = defineEmits(['close']);

const handleClose = () => {
    (loginRef as any)?.value?.formRef?.resetForm();
    mode.value = MODE.LOGIN;
    open.value = false;
    emit('close');
};
</script>

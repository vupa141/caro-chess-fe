<template>
    <el-dialog
        v-model="open"
        title="Welcome to Caro Game!"
        :width="screenWidth < 500 ? screenWidth * 0.9 : 500"
        :before-close="handleClose"
        :show-close="props.showClose"
    >
        <div>
            <span class="font-bold text-2xl">Enter your nickname</span>
            <el-input v-model="username" placeholder="Your Nickname" class="mt-2" size="large" />
        </div>
        <div class="flex justify-end">
            <el-button
                type="success"
                class="mt-5 rounded-md"
                @click="confirm"
                :disabled="!username"
            >
                Join the game!
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { COMMON_ERROR_MSG } from '@/common/constant';
import { useAuthStore } from '@/stores/auth';
import { ElNotification } from 'element-plus';
import { ref, watch } from 'vue';
import { useCommonStore } from '@/stores/common';
import { storeToRefs } from 'pinia';

const { screenWidth } = storeToRefs(useCommonStore());
const props = defineProps({
    openModal: Boolean,
    showClose: {
        type: Boolean,
        default: true,
    },
});

const { guestRegister } = useAuthStore();
const emit = defineEmits(['close', 'success']);

watch(props, (prop) => {
    open.value = prop.openModal;
});

const username = ref('');
const open = ref(false);

const handleClose = () => {
    open.value = false;
    emit('close');
};
const confirm = async () => {
    const result = await guestRegister(username.value);
    if (result.success) {
        emit('close');
        emit('success');
    } else {
        ElNotification({
            type: 'error',
            message: COMMON_ERROR_MSG,
        });
    }
};
</script>

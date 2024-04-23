<template>
    <el-dialog v-model="open" width="500" :before-close="handleClose">
        <div class="font-bold text-2xl">Back To Home</div>
        <div class="mt-5">
            Are you sure to go to home page? Your game progress will be lost.
        </div>
        <div class="mt-3 flex justify-end">
            <el-button type="info" @click="handleClose">
                Go Back
            </el-button>
            <el-button type="danger" @click="confirm">
                Continue
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { terminateGame } from '@/services/game.service';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    openModal: boolean;
}>();

const router = useRouter()
const emit = defineEmits(['close']);
const confirm = () => {
    terminateGame();
    router.push('/');
};

const handleClose = () => {
    open.value = false;
    emit('close');
};

watch(props, (prop) => {
    open.value = prop.openModal;
});

const open = ref(false);
</script>

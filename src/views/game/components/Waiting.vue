<template>
    <el-dialog
        v-model="open"
        :width="screenWidth < 500 ? screenWidth * 0.9 : 500"
        :show-close="false"
        :close-on-click-modal="false">
        <div class="font-bold text-2xl">Waiting for your friends...</div>
        <div class="mt-5">
            Copy The Following Link and Send to Your Friend. The Game will be started when your
            friend is ready.
        </div>
        <div class="mt-3">
            <span class="mr-2 max-xs:text-xs">
                {{ link }}
            </span>
            <el-button :icon="CopyDocument" type="primary" @click="copyLink" />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { CopyDocument } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { useCommonStore } from '@/stores/common';
import { storeToRefs } from 'pinia';

const { screenWidth } = storeToRefs(useCommonStore());
const props = defineProps<{
    openModal: boolean;
    link: string;
}>();

const copyLink = () => {
    navigator.clipboard.writeText(props.link);
    ElNotification({
        type: 'info',
        message: 'Link Copied.',
    });
};

watch(props, (prop) => {
    open.value = prop.openModal;
});

const open = ref(false);
</script>

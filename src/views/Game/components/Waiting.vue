<template>
    <el-dialog
        v-model="open"
        width="500"
        :show-close="false"
    >
        <div class="font-bold text-2xl">Waiting for your friends...</div>
        <div class="mt-5">
            Copy The Following Link and Send to Your Friends To Start The Game
        </div>
        <div>
            {{ link }}
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    openModal: boolean;
    link: string;
}>();

const selectValue = ref(0);

watch(props, (prop) => {
    open.value = prop.openModal;
});

const open = ref(false);

</script>

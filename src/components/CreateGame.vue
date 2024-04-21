<template>
    <el-dialog v-model="open" title="Start a game with robot!" width="500" :before-close="handleClose">
        <div class="font-bold text-2xl">
            Who will go first?
        </div>
        <div class="mt-5">
            <el-select
                v-model="selectValue"
                placeholder="Select"
                size="large"
                style="width: 240px"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
        <div class="flex justify-end">
            <el-button type="success" class="mt-5 rounded-md" @click="confirm">
                Start game!
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { COMMON_ERROR_MSG, GAME_MODE } from '../common/constant';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game';
import { ElNotification } from 'element-plus';

const props = defineProps<{
    openModal: boolean,
    mode: GAME_MODE | null
}>()

const router = useRouter()
const { user } =  storeToRefs(useAuthStore())
const { createGame } = useGameStore()
const { game } = storeToRefs(useGameStore())
const selectValue = ref(0)
const options = ref([
    {
        value: 0,
        label: 'You'
    },
    {
        value: 1,
        label: props.mode ===  GAME_MODE.PVB ? 'Robot' : 'Your Friend'
    }
])

const emit = defineEmits(['close'])

watch(props, (prop) => {
    open.value = prop.openModal
    options.value[1].label = props.mode ===  GAME_MODE.PVB ? 'Robot' : 'Your Friend'
})

const open = ref(false)

const handleClose = () => {
    open.value = false
    selectValue.value = 0
    emit('close')
}
const confirm = async () => {
    const createGameData = {
        mode: props.mode as GAME_MODE,
        ...selectValue.value ? {
            xPlayer: user.value?._id
        } : {
            oPlayer: user.value?._id
        }
    }
    const result = await createGame(createGameData)
    if (result.success) {
        router.push(`/game/${game?.value?._id}`)
    }
    else {
        ElNotification({
            type: 'error',
            message: COMMON_ERROR_MSG
        })
    }
    emit('close')
}
</script>

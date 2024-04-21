<template>
    <div :class="`chessboard-container bg-gradient-to-r ${selectedBg} container p-5`">
        <div v-for="i in 20" :key="i" :class="`row-${i} flex`">
            <div
                v-for="j in 20"
                :key="j"
                :class="[
                    `record record-${i}-${j} border border-secondary`,
                    {
                        'border-top-2': i == 1,
                        'border-bottom-2': i == 20,
                        'border-left-2': j == 1,
                        'border-right-2': j == 20
                    }
                ]"
                @click="handleClick(i, j)"
            >
                <img
                    v-if="chessboardData[i - 1][j - 1] == 0"
                    src="@/assets/images/icons8-x-48.png"
                    width="23"
                />
                <img
                    v-else-if="chessboardData[i - 1][j - 1] == 1"
                    src="@/assets/images/icons8-o-50.png"
                    width="23"
                />
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="400" class="!rounded-md" align-center>
            <div class="flex justify-center items-center">
                <FontAwesomeIcon :icon="faMedal" class="mr-2 text-3xl" color="#FFD700"/>
                <div class="text-lg font-semi-bold">{{ resultMessage }}</div>
            </div>
            <template #footer>
                <div class="dialog-footer flex justify-center">
                    <el-button type="primary" @click="dialogVisible = false"> OK </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from 'vue'
import { useGameStore } from '@/stores/game';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { GAME_MODE } from '@/common/constant';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faFaceSadCry,
    faMedal
} from '@fortawesome/free-solid-svg-icons'

const { game } = storeToRefs(useGameStore());
const { user } = storeToRefs(useAuthStore());
const dialogVisible = ref(false)
const resultMessage = ref('')
const resultIcon = ref<any>(null)
const gameEnded = ref(false)
let chessboardData = reactive<number[][]>([])
const bg = [
    'from-violet-500 to-fuchsia-300',
    'from-indigo-400 to-cyan-200',
    'from-blue-300 to-yellow-300',
    'from-fuchsia-600 to-indigo-600',
    'from-indigo-300 to-yellow-300',
    'from-cyan-500 to-violet-600'
]

const props = defineProps<{
    xoFlag: number,
    time: number,
    isYourTurn: any
}>()

const emit = defineEmits(['setXoFlag', 'resetTime', 'finishGame'])

const selectedBg = bg[Math.floor(Math.random() * bg.length)]

const initChessboard = () => {
    for (let i = 0; i < 20; i += 1) {
        const arr = []
        for (let j = 0; j < 20; j += 1) {
            arr.push(-1)
        }
        chessboardData.push(arr)
    }
}

initChessboard()

const clearChestboard = () => {
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            chessboardData[i][j] = -1
        }
    }
}

const showResultMessage = async (win: boolean) => {
    resultMessage.value = win ? 'Congratulations. You won.' : 'You lost. Better luck next time.'
    resultIcon.value = win ? faMedal : faFaceSadCry
    dialogVisible.value = true
}

const handleClick = (i: number, j: number) => {
    if (chessboardData[i - 1][j - 1] === -1 && props.isYourTurn && !gameEnded.value) {
        chessboardData[i - 1][j - 1] = props.xoFlag
        checkWinner(i - 1, j - 1)
        console.log('game ended: ', gameEnded.value)
        if (!gameEnded.value) {
            emit('setXoFlag')
            emit('resetTime')
        }
    }
}

const isXPlayer = computed(() => {
    return user?.value?._id === game.value?.xPlayer?._id
});

const checkWinner = async (rowIndex: number, colIndex: number) => {
    const xo = chessboardData[rowIndex][colIndex]

    let adjacentCellInRow = 0
    for (let j = colIndex + 1; j < 20; j += 1) {
        if (chessboardData[rowIndex][j] === xo) {
            adjacentCellInRow += 1
        } else {
            break
        }
    }
    for (let j = colIndex - 1; j >= 0; j -= 1) {
        if (chessboardData[rowIndex][j] === xo) {
            adjacentCellInRow += 1
        } else {
            break
        }
    }
    if (adjacentCellInRow === 4) {
        gameEnded.value = true
        const win = (isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)
        await showResultMessage(win)
        emit('finishGame')
        // clearChestboard();
    }

    let adjacentCellInCol = 0
    for (let i = rowIndex + 1; i < 20; i += 1) {
        if (chessboardData?.[i]?.[colIndex] === xo) {
            adjacentCellInCol += 1
        } else {
            break
        }
    }
    for (let i = rowIndex - 1; i >= 0; i -= 1) {
        if (chessboardData?.[i]?.[colIndex] === xo) {
            adjacentCellInCol += 1
        } else {
            break
        }
    }
    if (adjacentCellInCol === 4) {
        gameEnded.value = true
        const win = (isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)
        await showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }

    let adjacentCellInFirstDiagonal = 0
    let i = rowIndex
    let j = colIndex
    while (i < 20 && j < 20) {
        if (chessboardData[--i][--j] === xo) {
            adjacentCellInFirstDiagonal += 1
        } else {
            break
        }
    }
    i = rowIndex
    j = colIndex
    while (i < 20 && j < 20) {
        if (chessboardData[++i][++j] === xo) {
            adjacentCellInFirstDiagonal += 1
        } else {
            break
        }
    }
    if (adjacentCellInFirstDiagonal === 4) {
        gameEnded.value = true
        const win = (isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)
        await showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }

    let adjacentCellInSecondDiagonal = 0
    i = rowIndex
    j = colIndex
    while (i < 20 && j < 20) {
        if (chessboardData[++i][--j] === xo) {
            adjacentCellInSecondDiagonal += 1
        } else {
            break
        }
    }
    i = rowIndex
    j = colIndex
    while (i < 20 && j < 20) {
        if (chessboardData[--i][++j] === xo) {
            adjacentCellInSecondDiagonal += 1
        } else {
            break
        }
    }
    if (adjacentCellInSecondDiagonal === 4) {
        gameEnded.value = true
        const win = (isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)
        await showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }
}


watch(props, (oldValue, newValue) => {
    if (oldValue.time && newValue.time === 0) {
        emit('resetTime')
    }
    if (!newValue.isYourTurn && game?.value?.mode === GAME_MODE.PVB) {
        setTimeout(() => robotMove(), 100)
    }
})

const robotMove = () => {
    let randI, randJ
    while (true) {
        randI = Math.round(Math.random() * 19)
        randJ = Math.round(Math.random() * 19)
        if ((chessboardData[randI][randJ] === -1)) {
            break
        }
    }
    chessboardData[randI][randJ] = props.xoFlag
    checkWinner(randI, randJ)
    emit('setXoFlag')
    emit('resetTime')
}

onMounted(() => {
    setTimeout(() => {
        if (!props.isYourTurn && game?.value?.mode === GAME_MODE.PVB) {
            robotMove() 
        }    
    }, 3000)
})



</script>

<style lang="scss" scoped>
.chessboard-container {
    margin: auto;
    border-radius: 12px;
    .record {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
}
.border-top-2 {
    border-top-width: 2px !important;
}
.border-bottom-2 {
    border-bottom-width: 2px !important;
}
.border-left-2 {
    border-left-width: 2px !important;
}
.border-right-2 {
    border-right-width: 2px !important;
}
</style>

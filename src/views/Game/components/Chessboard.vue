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
                @click="handleClick(i - 1, j - 1)"
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
                <FontAwesomeIcon :icon="resultIcon" class="mr-2 text-3xl" color="gray"/>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faFaceSadCry,
    faMedal
} from '@fortawesome/free-solid-svg-icons';

const { game } = storeToRefs(useGameStore());
const { user } = storeToRefs(useAuthStore());
const dialogVisible = ref(false)
const resultMessage = ref('')
const resultIcon = ref<any>(null)
const gameEnded = ref(false)
let chessboardData = reactive<number[][]>([])
const cellFilled = ref(0)
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

const showResultMessage = (win: number) => {
    resultMessage.value = (win === 1 
        ? 'Congratulations. You won.'
        : (
            win === -1
            ? 'You lost. Better luck next time.'
            : 'It\'s a draw.'
        ))
    resultIcon.value = win >= 0 ? faMedal : faFaceSadCry
    dialogVisible.value = true
}

const handleClick = (i: number, j: number) => {
    if (chessboardData[i][j] === -1 && props.isYourTurn && !gameEnded.value) {
        chessboardData[i][j] = props.xoFlag
        checkWinner(i, j)
        if (!gameEnded.value) {
            cellFilled.value += 1
            // draw game
            if (cellFilled.value === 40) {
                gameEnded.value = true
                showResultMessage(0)
                emit('finishGame')
            }
            else {
                emit('setXoFlag')
                emit('resetTime')
            }
        }
    }
}

const isXPlayer = computed(() => {
    return user?.value?._id === game.value?.xPlayer?._id
});

const checkWinner = (rowIndex: number, colIndex: number) => {
    const xo = chessboardData[rowIndex][colIndex]

    let { adjacentCellInRow } = countAdjacentCellsInRow(rowIndex, colIndex, xo)
    if (adjacentCellInRow === 4) {
        gameEnded.value = true
        const win = ((isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)) ? 1 : -1
        showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }

    let { adjacentCellInCol } = countAdjacentCellsInCol(rowIndex, colIndex, xo)
    if (adjacentCellInCol === 4) {
        gameEnded.value = true
        const win = ((isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)) ? 1 : -1
        showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }

    // top left diagonal
    let { adjacentCellInTopLeftDiagonal } = countAdjacentCelsInTopLeftDiagonal(rowIndex, colIndex, xo)
    if (adjacentCellInTopLeftDiagonal === 4) {
        gameEnded.value = true
        const win = ((isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)) ? 1 : -1
        showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }

    // top right diagonal
    let { adjacentCellInTopRightDiagonal } = countAdjacentCelsInTopRightDiagonal(rowIndex, colIndex, xo)
    if (adjacentCellInTopRightDiagonal === 4) {
        gameEnded.value = true
        const win = ((isXPlayer.value && xo === 0) || (!isXPlayer.value && xo === 1)) ? 1 : -1
        showResultMessage(win)
        emit('finishGame')
        return
        // clearChestboard();
    }
}

const countAdjacentCellsInRow = (rowIndex: number, colIndex: number, xo: number) => {
    let adjacentCellInRow = 0
    let blockedSide = 0
    for (let j = colIndex + 1; j < 20; j += 1) {
        if (chessboardData[rowIndex][j] === xo) {
            adjacentCellInRow += 1
        } else {
            if (chessboardData[rowIndex][j] !== 1) {
                blockedSide += 1
            }
            break
        }
    }
    for (let j = colIndex - 1; j >= 0; j -= 1) {
        if (chessboardData[rowIndex][j] === xo) {
            adjacentCellInRow += 1
        } else {
            if (chessboardData[rowIndex][j] !== 1) {
                blockedSide += 1
            }
            break
        }
    }
    return {
        adjacentCellInRow,
        blockedSide
    }
}

const countAdjacentCellsInCol = (rowIndex: number, colIndex: number, xo: number) => {
    let adjacentCellInCol = 0
    let blockedSide = 0
    for (let i = rowIndex + 1; i < 20; i += 1) {
        if (chessboardData?.[i]?.[colIndex] === xo) {
            adjacentCellInCol += 1
        } else {
            if (chessboardData?.[i]?.[colIndex] !== -1) {
                blockedSide += 1
            }
            break
        }
    }
    for (let i = rowIndex - 1; i >= 0; i -= 1) {
        if (chessboardData?.[i]?.[colIndex] === xo) {
            adjacentCellInCol += 1
        } else {
            if (chessboardData?.[i]?.[colIndex] !== -1) {
                blockedSide += 1
            }
            break
        }
    }
    return {
        adjacentCellInCol,
        blockedSide
    }
} 

const countAdjacentCelsInTopLeftDiagonal = (rowIndex: number, colIndex: number, xo: number) => {
    let adjacentCellInTopLeftDiagonal = 0
    let blockedSide = 0
    let i = rowIndex
    let j = colIndex
    while (i >= 0 && j >= 0) {
        if (chessboardData?.[--i]?.[--j] === xo) {
            adjacentCellInTopLeftDiagonal += 1
        } else {
            if (chessboardData?.[i]?.[j] !== -1) {
                blockedSide += 1;
            }
            break
        }
    }
    i = rowIndex
    j = colIndex
    while (i < 20 && j < 20) {
        if (chessboardData?.[++i]?.[++j] === xo) {
            adjacentCellInTopLeftDiagonal += 1
        } else {
            if (chessboardData?.[i]?.[j] !== -1) {
                blockedSide += 1
            }
            break
        }
    }
    return {
        adjacentCellInTopLeftDiagonal,
        blockedSide
    }
} 

const countAdjacentCelsInTopRightDiagonal = (rowIndex: number, colIndex: number, xo: number) => {
    let adjacentCellInTopRightDiagonal = 0
    let blockedSide = 0
    let i = rowIndex
    let j = colIndex
    while (i < 20 && j < 20 && i >= 0 && j >= 0) {
        if (chessboardData?.[++i]?.[--j] === xo) {
            adjacentCellInTopRightDiagonal += 1
        } else {
            if (chessboardData?.[i]?.[j] !== -1) {
                blockedSide += 1
            }
            break
        }
    }
    i = rowIndex
    j = colIndex
    while (i < 20 && j < 20 && i >= 0 && j >= 0) {
        if (chessboardData?.[--i]?.[++j] === xo) {
            adjacentCellInTopRightDiagonal += 1
        } else {
            if (chessboardData?.[i]?.[j] !== -1) {
                blockedSide += 1
            }
            break
        }
    }
    return {
        adjacentCellInTopRightDiagonal,
        blockedSide
    }
} 

watch(props, (value) => {
    if (value.time === 0 && !gameEnded.value) {
        randomMove()
        emit('resetTime')
    }
    if (!value.isYourTurn && game?.value?.mode === GAME_MODE.PVB && !gameEnded.value) {
        setTimeout(() => robotMove(), 100)
    }
})

const ROBOT_ATTACK = {
    4: 999999,
    3: 10000,
    2: 500,
    1: 300,
    0: 50
}

const ROBOT_DEFENSE = {
    4: 100000,
    3: 8000,
    2: 400,
    1: 100,
    0: 0
}

const randomMove = () => {
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

const robotMove = () => {
    // randomMove()
    let maxScore = -1;
    let cells: {i: number, j: number, score: number}[] = [];
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (chessboardData[i][j] === -1) {
                let cellScore = calculateScore(i, j, props.xoFlag)
                cells.push( {i, j, score: cellScore})
                if (cellScore > maxScore) {
                    maxScore = cellScore
                }
            }
        }
    }
    if (cells.length) {
        cells = cells.filter(cell => cell.score === maxScore)
        const selectedCell = cells[Math.floor(Math.random() * cells.length)]
        chessboardData[selectedCell.i][selectedCell.j] = props.xoFlag
        checkWinner(selectedCell.i, selectedCell.j)
        if (!gameEnded.value) {
            emit('setXoFlag')
            emit('resetTime')
        }
    }
    else {
        randomMove()
    }
}

const calculateScore = (i: number, j: number, xo: number) => {
    // calculate attack score
    type ROBOT_ATTACK_KEY = keyof typeof ROBOT_ATTACK;
    const { adjacentCellInCol } = countAdjacentCellsInCol(i, j, xo)
    const colScore = ROBOT_ATTACK?.[adjacentCellInCol as ROBOT_ATTACK_KEY] ?? 0
    const { adjacentCellInRow } = countAdjacentCellsInRow(i, j, xo)
    const rowScore = ROBOT_ATTACK?.[adjacentCellInRow as ROBOT_ATTACK_KEY] ?? 0
    const { adjacentCellInTopLeftDiagonal } = countAdjacentCelsInTopLeftDiagonal(i, j ,xo)
    const topLeftDiagonalScore = ROBOT_ATTACK?.[adjacentCellInTopLeftDiagonal as ROBOT_ATTACK_KEY] ?? 0
    const { adjacentCellInTopRightDiagonal } = countAdjacentCelsInTopRightDiagonal(i, j ,xo)
    const topRightDiagonalScore = ROBOT_ATTACK?.[adjacentCellInTopRightDiagonal as ROBOT_ATTACK_KEY] ?? 0

    // calculate defend score
    const opponentXO = xo ? 0 : 1
    type ROBOT_DEFENSE_KEY = keyof typeof ROBOT_DEFENSE;
    const {
        adjacentCellInCol: adjacentCellsInColOpponent,
        blockedSide: colBlockedSide 
    } = countAdjacentCellsInCol(i, j, opponentXO)
    const opponentColScore = 
        (ROBOT_DEFENSE?.[adjacentCellsInColOpponent as ROBOT_DEFENSE_KEY] ?? 0) / (colBlockedSide + 1)
    const { 
        adjacentCellInRow: adjacentCellsInRowOpponent,
        blockedSide: rowBlockedSide 
    } = countAdjacentCellsInRow(i, j, opponentXO)
    const opponentRowScore = 
        (ROBOT_DEFENSE?.[adjacentCellsInRowOpponent as ROBOT_DEFENSE_KEY] ?? 0) / (rowBlockedSide + 1)
    const {
        adjacentCellInTopLeftDiagonal: adjacentCellsInTopLeftDiagonalOpponent,
        blockedSide: topLeftDiagonalBlockedSide
    } = countAdjacentCelsInTopLeftDiagonal(i, j ,opponentXO)
    const opponentTopLeftDiagonalScore = 
        (ROBOT_DEFENSE?.[adjacentCellsInTopLeftDiagonalOpponent as ROBOT_DEFENSE_KEY] ?? 0) / (topLeftDiagonalBlockedSide + 1)
    const {
        adjacentCellInTopRightDiagonal: adjacentCellsInTopRightDiagonalOpponent,
        blockedSide: topRightDiagonalBlockedSide
    } = countAdjacentCelsInTopRightDiagonal(i, j ,opponentXO)
    const opponentTopRightDiagonalScore = 
        (ROBOT_DEFENSE?.[adjacentCellsInTopRightDiagonalOpponent as ROBOT_DEFENSE_KEY] ?? 0) / (topRightDiagonalBlockedSide + 1)

    // calculate total score
    const maxAttackScore = Math.max(colScore, rowScore, topLeftDiagonalScore, topRightDiagonalScore)
    const attackScore = maxAttackScore + (colScore + rowScore + topLeftDiagonalScore + topRightDiagonalScore - maxAttackScore) / 3
    const maxDefendScore = Math.max(opponentColScore, opponentRowScore, opponentTopLeftDiagonalScore, opponentTopRightDiagonalScore)
    const defendScore = maxDefendScore + (opponentColScore + opponentRowScore + opponentTopLeftDiagonalScore + opponentTopRightDiagonalScore - maxDefendScore) / 3
    return attackScore + defendScore
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

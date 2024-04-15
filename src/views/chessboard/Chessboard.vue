<template>
    <div class="chessboard-container bg-gradient-to-r from-indigo-400 to-cyan-400 container p-5">
        <div v-for="i in 20" :key="{ i }" :class="`row-${i} flex`">
            <div
                v-for="j in 20"
                :key="{ j }"
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
                    src="../assets/images/icons8-x-48.png"
                    width="23"
                />
                <img
                    v-else-if="chessboardData[i - 1][j - 1] == 1"
                    src="../assets/images/icons8-o-50.png"
                    width="23"
                />
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="300" class="!rounded-md" align-center>
            <div class="flex justify-center items-center">
                <img src="../assets/images/winner.webp" width="60" class="align-middle" />
                <div class="text-lg font-semi-bold">{{ winnerMessage }}</div>
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
import { useCommonStore } from '@/stores/common'
import { reactive, ref } from 'vue'
import { MODE } from '@/common/constant'

const dialogVisible = ref(false)
const winnerMessage = ref('')
const isPlaying = ref(true)
let chessboardData = reactive([])
const xoFlag = ref(0) // X = 0, O = 1

const commonStore = useCommonStore()
const appMode = commonStore.appMode

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

const showWinnerMessage = async (winner: string) => {
    winnerMessage.value = `The winner is ${winner}`
    dialogVisible.value = true
    // await Swal.fire({
    //     title: "Congratulations!",
    //     text: `${winner} is the winner`,
    //     icon: "success",
    // });
}
const handleClick = (i: number, j: number) => {
    if (appMode === MODE.START) {
        return
    }
    if (isPlaying.value && chessboardData[i - 1][j - 1] === -1) {
        chessboardData[i - 1][j - 1] = xoFlag.value
        checkWinner(i - 1, j - 1)
        xoFlag.value = xoFlag.value ? 0 : 1
    }
}
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
        console.log(`${xo ? 'O' : 'X'} won`)
        await showWinnerMessage(`${xo ? 'O' : 'X'}`)
        isPlaying.value = false
        return
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
        console.log(`${xo ? 'O' : 'X'} won`)
        await showWinnerMessage(`${xo ? 'O' : 'X'}`)
        isPlaying.value = false
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
        console.log(`${xo ? 'O' : 'X'} won`)
        await showWinnerMessage(`${xo ? 'O' : 'X'}`)
        isPlaying.value = false
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
        await showWinnerMessage(`${xo ? 'O' : 'X'}`)
        isPlaying.value = false
        return
        // clearChestboard();
    }
    // console.log('adjacentCellInRow: ', adjacentCellInRow)
    // console.log('adjacentCellInCol', adjacentCellInCol)
    // console.log('adjacentCellInD', adjacentCellInFirstDiagonal)
}
</script>

<style lang="scss" scoped>
.chessboard-container {
    margin: auto;
    // background: #B8E2F2;
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

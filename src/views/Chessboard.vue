<template>
    <div class="chessboard-container container p-5 ">
        <div v-for="i in 20" :key={i} :class="`row-${i} d-flex`">
            <div 
                v-for="j in 20"
                :key={j} :class="[
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
                <img v-if="chessboardData[i - 1][j - 1] == 0" src="../assets/images/icons8-x-48.png" width="23"/>
                <img v-else-if="chessboardData[i - 1][j - 1] == 1" src="../assets/images/icons8-o-50.png" width="23"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import Swal from 'sweetalert2'

    let chessboardData = reactive([])
    const xoFlag = ref(0); // X = 0, O = 1

    const initChessboard = () => {
        for (let i = 0; i < 20; i += 1) {
            const arr = [];
            for (let j = 0; j < 20; j += 1) {
                arr.push(-1);
            }
            chessboardData.push(arr);
        }
    }

    initChessboard();

    const clearChestboard = () => {
        for (let i = 0; i < 20; i += 1) {
            for (let j = 0; j < 20; j += 1) {
                chessboardData[i][j] = -1;
            }
        }
    }

    const showWinnerMessage = async (winner: string) => {
        await Swal.fire({
            title: "Congratulations!",
            text: `${winner} is the winner`,
            icon: "success"
        });
    }
    const handleClick = (i: number, j: number) => {
        if (chessboardData[i - 1][j - 1] === -1) {
            chessboardData[i - 1][j - 1] = xoFlag.value;
            checkWinner(i - 1, j - 1);
            xoFlag.value = (xoFlag.value ? 0 : 1);
        }
    }
    const checkWinner = async (rowIndex: number, colIndex: number) => {
        const xo = chessboardData[rowIndex][colIndex];

        let adjacentCellInRow = 0;
        for (let j = colIndex + 1; j < 20; j += 1) {
            if (chessboardData[rowIndex][j] === xo) {
                adjacentCellInRow += 1;
            }
            else {
                break;
            }
        }
        for (let j = colIndex - 1; j >= 0; j -= 1) {
            if (chessboardData[rowIndex][j] === xo) {
                adjacentCellInRow += 1;
            }
            else {
                break;
            }
        }
        if (adjacentCellInRow === 4) {
            console.log(`${xo ? 'O' : 'X'} won`);
            await showWinnerMessage(`${xo ? 'O' : 'X'}`)
            // clearChestboard();
        }

        let adjacentCellInCol = 0;
        for (let i = rowIndex + 1; i < 20; i += 1) {
            if (chessboardData?.[i]?.[colIndex] === xo) {
                adjacentCellInCol += 1;
            }
            else {
                break;
            }
        }
        for (let i = rowIndex - 1; i >= 0; i -= 1) {
            if (chessboardData?.[i]?.[colIndex] === xo) {
                adjacentCellInCol += 1;
            }
            else {
                break;
            }
        }
        if (adjacentCellInCol === 4) {
            console.log(`${xo ? 'O' : 'X'} won`);
            await showWinnerMessage(`${xo ? 'O' : 'X'}`)
            // clearChestboard();
        }

        let adjacentCellInFirstDiagonal = 0;
        let i = rowIndex;
        let j = colIndex;
        while (i < 20 && j < 20) {
            if (chessboardData[--i][--j] === xo) {
                adjacentCellInFirstDiagonal += 1;
            }
            else {
                break;
            }
        }
        i = rowIndex;
        j = colIndex;
        while (i < 20 && j < 20) {
            if (chessboardData[++i][++j] === xo) {
                adjacentCellInFirstDiagonal += 1;
            }
            else {
                break;
            }
        }
        if (adjacentCellInFirstDiagonal === 4) {
            console.log(`${xo ? 'O' : 'X'} won`);
            await showWinnerMessage(`${xo ? 'O' : 'X'}`)
            // clearChestboard();
        }

        let adjacentCellInSecondDiagonal = 0;
        i = rowIndex;
        j = colIndex;
        while (i < 20 && j < 20) {
            if (chessboardData[++i][--j] === xo) {
                adjacentCellInSecondDiagonal += 1;
            }
            else {
                break;
            }
        }
        i = rowIndex;
        j = colIndex;
        while (i < 20 && j < 20) {
            if (chessboardData[--i][++j] === xo) {
                adjacentCellInSecondDiagonal += 1;
            }
            else {
                break;
            }
        }
        if (adjacentCellInSecondDiagonal === 4) {
            console.log(`${xo ? 'O' : 'X'} won`);
            await showWinnerMessage(`${xo ? 'O' : 'X'}`)
            // clearChestboard();
        }
        console.log('adjacentCellInRow: ', adjacentCellInRow)
        console.log('adjacentCellInCol', adjacentCellInCol)
        console.log('adjacentCellInD', adjacentCellInFirstDiagonal)
    }
</script>

<style lang='scss' scoped>
.chessboard-container {
    margin: auto;
    background: #B8E2F2;
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
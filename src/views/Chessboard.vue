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
    const arr = Array(20).fill(-1)
    const chessboardData = reactive([])
    for (let i = 0; i < 20; i += 1) {
        const arr = [];
        for (let j = 0; j < 20; j += 1) {
            arr.push(-1);
        }
        chessboardData.push(arr);
    }
    const xoFlag = ref(0); // X = 0, O = 1
    const handleClick = (i: number, j: number) => {
        console.log(i, j)
        if (chessboardData[i - 1][j - 1] === -1) {
            chessboardData[i - 1][j - 1] = xoFlag.value;
            xoFlag.value = (xoFlag.value ? 0 : 1);
        }
        console.log(chessboardData)
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
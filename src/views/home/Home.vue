<template>
    <div class="p-5 bg-white shadow-lg rounded-md max-w-[900px]">
        <p class="font-bold text-center mb-8 text-2xl">
            Caro Game: Challenge Your Friends to a Classic Game of Five-in-a-Row
        </p>
        <p class="text-center text-2xl">
            Sharpen your strategy and test your logic in this exciting two-player board game
        </p>
        <div class="text-center">
            <p
                class="text-2xl mt-10 mb-5 text-center bg-gradient-to-r from-pink-500 to-violet-600 inline-block text-transparent bg-clip-text"
            >
                Here's what we offer you
            </p>
        </div>

        <div class="flex w-full justify-between">
            <div class="flex items-center bg-slate-200 py-2 px-4 rounded-lg shadow-lg">
                <el-icon color="#4cbb17" size="30"><CircleCheckFilled /></el-icon>
                <span class="ml-4 text-xl">100% Free</span>
            </div>
            <div class="flex items-center bg-slate-200 py-2 px-4 rounded-lg shadow-lg">
                <el-icon color="#4cbb17" size="30"><CircleCheckFilled /></el-icon>
                <span class="ml-4 text-xl">Multiplayer</span>
            </div>
            <div class="flex items-center bg-slate-200 py-2 px-4 rounded-lg shadow-lg">
                <el-icon color="#4cbb17" size="30"><CircleCheckFilled /></el-icon>
                <span class="ml-4 text-xl">User Friendly</span>
            </div>
            <div class="flex items-center bg-slate-200 py-2 px-4 rounded-lg shadow-lg">
                <el-icon color="#4cbb17" size="30"><CircleCheckFilled /></el-icon>
                <span class="ml-4 text-xl">Easy To Play</span>
            </div>
        </div>

        <div class="banner mt-10">
            <img src="@/assets/images/banner.jpg" class="full object-contain rounded-lg" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CircleCheckFilled } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped></style>

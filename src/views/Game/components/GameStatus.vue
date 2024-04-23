<template>
    <div
        class="bg-gray-100 rounded-md shadow-lg min-h-[100px] mb-10 flex justify-between px-10 py-3"
    >
        <div class="x-player">
            <img
                :src="game?.xPlayer?.avatar ?? '/default-avatar/default-avatar-1.svg'"
                class="rounded-full md:w-[50px] md:h-[50px] w-[30px] h-[30px] object-cover"
            />
            <div class="text-center mt-1">{{ game?.xPlayer?.username ?? 'Robot' }}</div>
        </div>
        <div class="xs:w-60 w-40">
            <div
                :class="`text-center turn bg-red-500 rounded-lg py-2 px-5 text-white h-fit ${
                    props.isYourTurn ? 'bg-green-500' : 'bg-red-500'
                }`"
            >
                <div>
                    {{ props.isYourTurn ? 'Your Turn' : "Opponent's turn" }}
                </div>
            </div>
            <div
                :class="`time font-bold text-xl text-center mt-2
                    ${
                        time >= 40
                            ? 'text-green-500'
                            : `${time >= 20 ? 'text-yellow-500' : 'text-red-500'}`
                    }
                    `"
            >
                {{ time }}
            </div>
        </div>

        <div class="o-player">
            <img
                :src="game?.oPlayer?.avatar ?? '/default-avatar/default-avatar-1.svg'"
                class="rounded-full md:w-[50px] md:h-[50px] w-[30px] h-[30px] object-cover"
            />
            <div class="text-center mt-1">{{ game?.oPlayer?.username ?? 'Robot' }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { storeToRefs } from 'pinia';

const { game } = storeToRefs(useGameStore());

const props = defineProps<{
    xoFlag: number;
    time: number;
    isYourTurn: boolean;
}>();
</script>

<style scoped lang="scss"></style>

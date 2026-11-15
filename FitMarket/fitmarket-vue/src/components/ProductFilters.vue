<script setup>
defineProps({
    categories: {
        type: Array,
        required: true
    },
    selectedCategory: {
        type: String,
        required: true
    }
});

const emit = defineEmits(["change-category"]);
</script>

<template>
    <div class="filters" aria-label="Filtrar productos por categoría">
        <button
            :class="{ active: selectedCategory === 'Todas' }"
            :aria-pressed="selectedCategory === 'Todas'"
            @click="emit('change-category', 'Todas')"
        >
            Todas
        </button>
        <button
            v-for="category in categories"
            :key="category"
            :class="{ active: selectedCategory === category }"
            :aria-pressed="selectedCategory === category"
            @click="emit('change-category', category)"
        >
            {{ category }}
        </button>
    </div>
</template>

<style scoped>
.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 25px;
}

.filters button {
    padding: 10px 17px;
    color: #ccc;
    background: #292929;
    border: 1px solid #444;
    border-radius: 20px;
    cursor: pointer;
}

.filters button:hover,
.filters button.active {
    color: #171717;
    background: #a3e635;
    border-color: #a3e635;
}

.filters button:focus-visible {
    outline: 2px solid white;
    outline-offset: 3px;
}
</style>

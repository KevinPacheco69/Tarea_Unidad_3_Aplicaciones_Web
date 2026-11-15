
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard.vue";
import ProductFilters from "./ProductFilters.vue";

const products = ref([]);
const loading = ref(true);
const error = ref("");
const selectedCategory = ref("Todas");

// Control de cancelación de peticiones
let controller = null;

// Obtener categorías disponibles
const categories = computed(() => {
    return [...new Set(
        products.value.map(product => product.category)
    )].sort();
});

// Filtrar productos
const filteredProducts = computed(() => {
    if (selectedCategory.value === "Todas") {
        return products.value;
    }

    return products.value.filter(
        product => product.category === selectedCategory.value
    );
});

// Cambiar categoría
const changeCategory = (category) => {
    selectedCategory.value = category;
};

// Consultar productos
const loadProducts = async () => {
    // Evitar peticiones simultáneas
    if (loading.value) {
        return;
    }

    // Cancelar petición anterior si existe
    controller?.abort();

    controller = new AbortController();

    loading.value = true;
    error.value = "";

    try {
        products.value = await getProducts({
            signal: controller.signal
        });

    } catch (err) {
        if (err.name === "AbortError") {
            return;
        }

        error.value = err.message ||
            "No se pudieron cargar los productos.";

    } finally {
        loading.value = false;
    }
};

// Carga inicial
onMounted(async () => {
    loading.value = false;
    await loadProducts();
});

// Cancelar petición al abandonar el componente
onUnmounted(() => {
    controller?.abort();
});
</script>

<template>
    <section class="product-section">
        <div class="section-heading">
            <span class="section-label">NUESTRO CATÁLOGO</span>
            <h2>Equipamiento deportivo</h2>
            <p>
                Encuentra el equipo que necesitas para alcanzar tus objetivos.
            </p>
        </div>

        <div v-if="loading" class="message">
            Cargando productos...
        </div>

        <div v-else-if="error" class="message error-message">
            <p>{{ error }}</p>
            <button @click="loadProducts">
                Intentar nuevamente
            </button>
        </div>

        <template v-else>
            <ProductFilters
                :categories="categories"
                :selected-category="selectedCategory"
                @change-category="changeCategory"
            />

            <p class="product-count">
                Mostrando {{ filteredProducts.length }} productos
            </p>

            <div v-if="filteredProducts.length === 0" class="message">
                No hay productos en esta categoría.
            </div>

            <div v-else class="product-grid">
                <ProductCard
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </template>
    </section>
</template>

<style scoped>
.product-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
}

.section-heading {
    margin-bottom: 30px;
}

.section-label {
    color: #a3e635;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
}

.section-heading h2 {
    margin: 10px 0;
    color: white;
    font-size: 30px;
}

.section-heading p {
    color: #aaa;
}

.product-count {
    margin-bottom: 20px;
    color: #aaa;
    font-size: 14px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
}

.message {
    padding: 30px;
    text-align: center;
    color: #ccc;
    background: #1c1c1c;
    border-radius: 12px;
}

.error-message {
    color: #ff8585;
}

.error-message button {
    margin-top: 12px;
    padding: 10px 18px;
    color: #171717;
    background: #a3e635;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>

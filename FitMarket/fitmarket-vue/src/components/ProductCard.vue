<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
});

const formatPrice = (price) => {
    return new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD"
    }).format(Number(price));
};
</script>

<template>
    <article class="product-card">
        <div class="product-image">
            <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
            />

            <span v-else class="product-placeholder">
                <span aria-hidden="true">🏋️</span>
                <span>FitMarket</span>
            </span>
        </div>

        <div class="product-info">
            <span class="product-category">
                {{ product.category }}
            </span>

            <h3>{{ product.name }}</h3>

            <p class="product-description">
                {{ product.description || "Producto de entrenamiento deportivo." }}
            </p>

            <div class="product-footer">
                <strong class="product-price">
                    {{ formatPrice(product.price) }}
                </strong>

                <span class="product-stock">
                    Stock: {{ product.stock }}
                </span>
            </div>
        </div>
    </article>
</template>

<style scoped>
.product-card {
    overflow: hidden;
    background: #1c1c1c;
    border: 1px solid #333;
    border-radius: 12px;
    transition: transform 0.2s ease;
}

.product-card:hover {
    transform: translateY(-4px);
}

.product-image {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #292929;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #a3e635;
}

.product-placeholder span:first-child {
    font-size: 42px;
}

.product-info {
    padding: 16px;
}

.product-category {
    color: #a3e635;
    font-size: 12px;
    text-transform: uppercase;
}

.product-info h3 {
    margin: 10px 0;
    color: white;
}

.product-description {
    min-height: 40px;
    color: #aaa;
    font-size: 14px;
}

.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
}

.product-price {
    color: #a3e635;
    font-size: 18px;
}

.product-stock {
    color: #aaa;
    font-size: 12px;
}
</style>

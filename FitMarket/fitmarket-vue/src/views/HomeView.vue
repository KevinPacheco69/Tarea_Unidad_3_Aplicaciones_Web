<template>
    <section class="hero">
        <div class="hero-content">
            <span class="hero-label">SUPERA TUS LÍMITES</span>

            <h1>
                Equípate para alcanzar
                <span>tu mejor versión.</span>
            </h1>

            <p>
                Encuentra el equipamiento deportivo que necesitas
                para entrenar y alcanzar tus objetivos.
            </p>

            <RouterLink to="/catalogo" class="hero-button">
                Explorar catálogo
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
.hero {
    min-height: 380px;
    display: flex;
    align-items: center;
    background: linear-gradient(120deg, #171717, #292929);
    padding: 60px 20px;
}

.hero-content {
    width: 100%;
    max-width: 1160px;
    margin: auto;
}

.hero-label {
    color: #a3e635;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 3px;
}

.hero h1 {
    max-width: 650px;
    font-size: clamp(32px, 5vw, 52px);
    line-height: 1.15;
}

.hero h1 span {
    color: #a3e635;
}

.hero p {
    max-width: 520px;
    color: #bbb;
    line-height: 1.7;
}

.hero-button {
    display: inline-block;
    margin-top: 18px;
    padding: 13px 22px;
    color: #171717;
    background: #a3e635;
    border-radius: 6px;
    font-weight: bold;
}

.hero-button:hover {
    background: #bef264;
}
</style>

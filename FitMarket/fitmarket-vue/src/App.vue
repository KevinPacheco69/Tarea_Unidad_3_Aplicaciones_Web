<template>
    <div class="app">
        <header class="site-header">
            <div class="header-content">
                <RouterLink to="/" class="logo">
                    FIT<span>MARKET</span>
                </RouterLink>

                <nav aria-label="Navegación principal">
                    <RouterLink to="/">Inicio</RouterLink>
                    <RouterLink to="/catalogo">Catálogo</RouterLink>
                </nav>
            </div>
        </header>

        <main>
            <RouterView />
        </main>

        <footer class="site-footer">
            <p>© 2026 FitMarket. Todos los derechos reservados.</p>
        </footer>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    background: #111;
    font-family: Arial, sans-serif;
    color: white;
}

a {
    text-decoration: none;
}

.site-header {
    background: #191919;
    border-bottom: 1px solid #333;
}

.header-content {
    max-width: 1200px;
    min-height: 70px;
    margin: auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.logo {
    color: white;
    font-size: 23px;
    font-weight: 900;
}

.logo span {
    color: #a3e635;
}

nav {
    display: flex;
    gap: 25px;
}

nav a {
    color: #ccc;
}

nav a:hover,
nav a.router-link-active {
    color: #a3e635;
}

.hero {
    min-height: 380px;
    display: flex;
    align-items: center;
    background: linear-gradient(120deg, #171717, #292929);
    padding: 60px 20px;
}

.site-footer {
    padding: 25px 20px;
    text-align: center;
    color: #888;
    background: #191919;
    border-top: 1px solid #333;
}

@media (max-width: 480px) {
    .header-content {
        flex-direction: column;
        padding: 18px;
    }

    nav {
        gap: 18px;
    }
}
</style>

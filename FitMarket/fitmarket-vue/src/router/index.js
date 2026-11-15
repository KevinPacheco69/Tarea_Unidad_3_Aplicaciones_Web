
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";
import ContactView from "../views/ContactView.vue";

const routes = [
    {
        path: "/",
        name: "inicio",
        component: HomeView
    },
    {
        path: "/catalogo",
        name: "catalogo",
        component: CatalogView
    },
    {
        path: "/contacto",
        name: "contacto",
        component: ContactView
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

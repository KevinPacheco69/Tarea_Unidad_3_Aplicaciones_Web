
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";

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
        path: "/:pathMatch(.*)*",
        redirect: "/"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

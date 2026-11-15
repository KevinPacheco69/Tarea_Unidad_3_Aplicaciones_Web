
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),

        VitePWA({
            registerType: "autoUpdate",

            includeAssets: [
                "favicon.ico",
                "icons/icon-192.png",
                "icons/icon-512.png",
                "icons/maskable-512.png"
            ],

            manifest: {
                id: "/",
                name: "FitMarket - Equipamiento Deportivo",
                short_name: "FitMarket",
                description: "Tu tienda de equipamiento y accesorios deportivos.",
                lang: "es-EC",
                start_url: "/",
                scope: "/",
                display: "standalone",
                orientation: "portrait",
                theme_color: "#111111",
                background_color: "#111111",

                icons: [
                    {
                        src: "/icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "/icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "/icons/maskable-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ]
            },

            workbox: {
                globPatterns: [
                    "**/*.{js,css,html,ico,png,svg,webmanifest}"
                ],

                runtimeCaching: [
                    {
                        urlPattern: /^http:\/\/localhost:3000\/api\/products(?:\/\d+)?$/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "fitmarket-products",
                            networkTimeoutSeconds: 5,
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    ],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});

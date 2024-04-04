import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: 'Lights',
        short_name: 'Lights',
        id: '/',
        start_url: '/?from=homescreen',
        display: 'standalone',
        orientation: 'portrait-primary',
        description: 'Lights — social network for everyone.',
        categories: ['social'],
        lang: 'en',
        dir: 'ltr',
        display_override: [
          'standalone',
          'minimal-ui',
          'window-controls-overlay'
        ],
        prefer_related_applications: false,
        theme_color: "#ffffff",
        background_color: "#f2f2f2",
        icons: [
          {
            src: "icon-transparent-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icon-transparent-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "monochrome any"
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      filter: /\.(js|mjs|png|webmanifest|json|txt|css|html|svg)$/i,
    })
  ],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "hywer",
  },
})

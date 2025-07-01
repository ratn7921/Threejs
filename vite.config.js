// // vite.config.js
// import { defineConfig } from 'vite';

// export default defineConfig({
//   root: 'src',              // Your source files are in the /src folder
//   publicDir: '../public',   // Static assets (textures) are in /public
//   build: {
//     outDir: '../dist',      // Where final files will be built
//     emptyOutDir: true,
//   },
//   server: {
//     proxy: {
//       // Proxy API calls to the Express backend
//       '/api': 'http://localhost:5000'
//     }
//   }
// });




import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy to Express backend
    },
  },
});

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   // add your own icons to src/app/manifest.ts
//   // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
// });
//
// /** @type {import('next').NextConfig} */
// module.exports = withPWA({
//   swcMinify: true,
//   reactStrictMode: true,
//   eslint: {
//     dirs: ['src'],
//   },
// });

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}

module.exports = nextConfig
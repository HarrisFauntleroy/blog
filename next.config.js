/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = {};

module.exports = removeImports(nextConfig);

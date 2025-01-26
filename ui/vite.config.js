export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Exposes to the network
    port: 5176,        // Set a fixed port
  }
})

import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

const server = await createServer({
  plugins: [react()],
  configFile: false,
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});

// Run server fron frontend
await server.listen();
server.printUrls();
server.bindCLIShortcuts();


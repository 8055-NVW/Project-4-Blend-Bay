import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  
=======
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
<<<<<<< HEAD
  },
  base: '/static/'
=======
  }
>>>>>>> 0f82a3b33801132971e8c7e6c9ea4bd5fe687085
})

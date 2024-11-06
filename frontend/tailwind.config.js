/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontWeight: {
        'light': '300',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      fontFamily: {
        'inter-tight': ['Inter-Tight', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'neutral-50': '#F6F6F6',
        'neutral-100': '#E7E7E7',
        'neutral-200': '#D1D1D1',
        'neutral-300': '#B0B0B0',
        'neutral-400': '#888888',
        'neutral-500': '#6D6D6D',
        'neutral-600': '#5D5D5D',
        'neutral-700': '#4F4F4F',
        'neutral-800': '#454545',
        'neutral-900': '#3D3D3D',
        'neutral-950': '#1B1B1B',
        'neutral-black': '#1B1B1B',
        
        // 'navy-50': '#F6F6F6',
        // 'navy-100': '#E7E7E7',
        // 'navy-200': '#D1D1D1',
        // 'navy-300': '#B0B0B0',
        // 'navy-400': '#888888',
        // 'navy-500': '#6D6D6D',
        // 'navy-600': '#5D5D5D',
        // 'navy-700': '#4F4F4F',
        // 'navy-800': '#454545',
        // 'navy-900': '#3D3D3D',
        
        'navy': '#051D47',
        
        'red': '#CE161E',
        
        'green-50': '#F1F8F4',
        'green-100': '#DCEFE2',
        'green-200': '#BCDEC9',
        'green-300': '#90C5A8',
        'green-400': '#60A782',
        'green': '#43936C',
        'green-600': '#2D6E50',
        'green-700': '#245841',
        'green-800': '#1F4635',
        'green-900': '#1A3A2D',
        'green-950': '#0E2019',

      }
    },
  },
  plugins: [],
};


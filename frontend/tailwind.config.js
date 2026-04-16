/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Direct - Premium Red Theme (Tailwind v4 compatible)
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#ba0013',
        },
        
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#FF4444',
        },
        
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#15803d',
        },
        
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        
        // Clinical Direct Surfaces - using CSS variables approach
        surface: '#f5f3f1',
        surfacecontainer: '#fffbf8',
        surfacelow: '#faf8f6',
        surfacelowest: '#fefdfb',
        
        // Text Colors
        textprimary: '#000000',
        textsecondary: '#404040',
        texttertiary: '#757575',
        textinverse: '#ffffff',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        // Heading Sizes
        'h1': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'h5': ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'h6': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        // Body Sizes
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
      },
      boxShadow: {
        // Soft Shadows - Clinical Direct
        'soft-xs': '0 1px 2px 0 rgba(25, 28, 30, 0.02)',
        'soft-sm': '0 2px 4px 0 rgba(25, 28, 30, 0.04)',
        'soft-md': '0 4px 8px 0 rgba(25, 28, 30, 0.06)',
        'soft-lg': '0 8px 16px 0 rgba(25, 28, 30, 0.08)',
        'soft-xl': '0 12px 24px 0 rgba(25, 28, 30, 0.10)',
        'soft-2xl': '0 20px 40px -10px rgba(25, 28, 30, 0.06)',
        'soft-3xl': '0 25px 50px -12px rgba(25, 28, 30, 0.08)',
        // Elevation Shadows
        'elevation-1': '0 1px 3px 0 rgba(25, 28, 30, 0.12)',
        'elevation-2': '0 4px 6px -1px rgba(25, 28, 30, 0.10)',
        'elevation-3': '0 10px 15px -3px rgba(25, 28, 30, 0.10)',
      },
      borderRadius: {
        // Consistent rounded corners
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
        '5xl': '56px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}

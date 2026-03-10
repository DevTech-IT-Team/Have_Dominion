/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// Obsidian Black & Deep Midnight Navy
  			obsidian: {
  				DEFAULT: '#0B0B0F',
  				light: '#151519',
  				dark: '#050508',
  			},
  			// Midnight Navy
  			midnight: {
  				50: '#e8eaf0',
  				100: '#b8c1d4',
  				200: '#95a3bf',
  				300: '#65779a',
  				400: '#465b87',
  				500: '#193064',
  				600: '#172c5b',
  				700: '#0A1628', // Primary Midnight Navy
  				800: '#061020',
  				900: '#020816', // Deepest Navy
  			},
  			// Royal Blue
  			royal: {
  				50: '#eff6ff',
  				100: '#dbeafe',
  				200: '#bfdbfe',
  				300: '#93c5fd',
  				400: '#60a5fa',
  				500: '#3b82f6',
  				600: '#2563eb',
  				700: '#1d4ed8',
  				800: '#1e40af',
  				900: '#1e3a8a', // Primary Royal Blue
  			},
  			// Dark Purple/Indigo gradients
  			indigo: {
  				50: '#eef2ff',
  				100: '#e0e7ff',
  				200: '#c7d2fe',
  				300: '#a5b4fc',
  				400: '#818cf8',
  				500: '#6366f1',
  				600: '#4f46e5',
  				700: '#4338ca',
  				800: '#3730a3',
  				900: '#312e81',
  				950: '#1e1b4b',
  			},
  			// Electric Accent (GitHub-style)
  			electric: {
  				DEFAULT: '#00D4FF',
  				light: '#5EE7FF',
  				dark: '#00A3CC',
  				glow: 'rgba(0, 212, 255, 0.5)',
  			},
  			// Off-White/Soft Gray Background
  			soft: {
  				DEFAULT: '#F7F9FC',
  				light: '#FFFFFF',
  				dark: '#E8ECF2',
  				gray: '#E2E8F0',
  			},
  			// Legacy colors (keeping for compatibility)
  			navy: {
  				50: '#e8eaf0',
  				100: '#b8c1d4',
  				200: '#95a3bf',
  				300: '#65779a',
  				400: '#465b87',
  				500: '#193064',
  				600: '#172c5b',
  				700: '#0A1F44', // Primary Royal Navy
  				800: '#061538',
  				900: '#020816', // Deepest Navy
  			},
  			// Base Dark
  			basedark: {
  				DEFAULT: '#0B0B0F',
  				light: '#151519',
  				dark: '#050508',
  			},
  			// Metallic Gold Colors
  			gold: {
  				50: '#fdf8e8',
  				100: '#f9ecc5',
  				200: '#f5e0a3',
  				300: '#F5D36B', // Light Gold
  				400: '#E0B84C', // Medium Gold
  				500: '#C9A227', // Primary Metallic Gold
  				600: '#b08e22',
  				700: '#987a1d',
  				800: '#7f6618',
  				900: '#665213',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		backgroundImage: {
  			'navy-gradient': 'linear-gradient(135deg, #0A1F44 0%, #020816 100%)',
  			'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E0B84C 50%, #F5D36B 100%)',
  			'dark-gradient': 'linear-gradient(180deg, #080B12 0%, #0D1117 100%)',
  			'obsidian-gradient': 'linear-gradient(135deg, #0B0B0F 0%, #1E1B4B 50%, #0A1628 100%)',
  			'electric-gradient': 'linear-gradient(135deg, #00D4FF 0%, #5EE7FF 100%)',
  			'purple-gradient': 'linear-gradient(135deg, #2E1065 0%, #4C1D95 50%, #3730a3 100%)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ['class', "class"],
  plugins: [require("tailwindcss-animate")],
}

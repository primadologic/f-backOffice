import type { Config } from 'tailwindcss'
import tailwindcssAnimate from "tailwindcss-animate"

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
			20: '1.25rem',
  		},
  		colors: {
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
  			},
			
			origin: {
				'fb': 'hsl(var(--origin-fb))',
				'ig': 'hsl(var(--origin-ig))',
				'tg': 'hsl(var(--origin-tg))',
				'wa': 'hsl(var(--origin-wa))',
				'portal': 'hsl(var(--origin-portal))',
			},

  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			'custom-black': '#000314',
  			'custom-btn-start': '#f97c3a',
  			'custom-btn-end': '#fd3266',
  			'shadcn-black': '#09090b',
  			'custom-black2': '#010519',
  			'custom-gray': '#484d5d',
  			'brand-orange': '#ffa90c',
  			'btn-border-gray': '#e6e6eb',

  			button_colors: {
  				dark_gray: '#313638',
  				primary: '#FFFFFF',
  				primary_2: '#F5F6F7',
  				light_warning: '#FFF4E6',
  				deep_warning: '#FF9500'
  			},
  			status: {
  				success_500: 'hsl(var(--success-500))',
  				warning_100: 'hsl(var(--warning-100))',
  				danger_100: 'hsl(var(--danger-100))',
  				primary_500: 'hsl(var(--primary-500))'
  			},

			custom_theme: {
				primary_background: "#FFFFFF",
				primary_foreground: "#181818",
				dark_gray_1: "#212121",
				dark_gray_2: "#3D3D3D",
				gray: "#AAAAAA",
				gray2: "#272727",
				gray_hover: "#414141",
				black: "#0f0f0f",
				light_blue: "#b18cff"
			}
  		},

		fontFamily: {
			space: [
  				'Space Grotesk',
  				'serif'
  			]
  		},

		width: {
			dashCard: "10.69rem"
		},
		height: {
			dashCard: "9.52rem"
		}

  	}
  },
  plugins: [
    tailwindcssAnimate
  ],
} satisfies Config


/** @type {import('tailwindcss').Config} */
module.exports = {
   daisyui: {
     themes: [
       'wireframe',
     ]
   },
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
        extend: {
            // backgroundImage: {
            //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //     'gradient-conic':
            //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            // },
             colors: {
                'toggle-custom-bg': '#ccc',
                'toggle-custom-border': '#aaa',
            },
            screens: {
                'dark': {'raw': '(prefers-color-scheme: dark)'},
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['dark'],
            textColor: ['dark'],
        },
    },
    plugins: [
        require("daisyui"),
    ],
}

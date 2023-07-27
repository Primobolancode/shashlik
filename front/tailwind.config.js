/** @type {import('tailwindcss').Config} */
module.exports = {


    darkMode: false,
    daisyui: {
        themes: [
            'wireframe',
            // {
            //     mytheme: {
            //
            //         "primary": "#ccc",
            //
            //         "secondary": "#86d7f4",
            //
            //         "accent": "#b4bdf7",
            //
            //         "neutral": "#20182a",
            //
            //         "base-100": "#cccfff",
            //
            //         "info": "#768fe0",
            //
            //         "success": "#24a372",
            //
            //         "warning": "#cc6e0f",
            //
            //         "error": "#ea3e39",
            //     },
            // },
        ]
    },

    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",

    ],
    theme: {
        extend: {
            // Ваш собственный класс
            colors: {
                'toggle-custom-bg': '#ccc',
                'toggle-custom-border': '#aaa',
            },
            screens: {
                'dark': {'raw': '(prefers-color-scheme: dark)'},
            },
        }
    },
    variants: {
        extend: {
            backgroundColor: ['dark'],
            textColor: ['dark'],
        },
    },
    // Другие настройки Tailwind CSS...


    // theme: {
    //   extend: {
    //     backgroundImage: {
    //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //       'gradient-conic':
    //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //     },
    //   },
    // },
    plugins: [
        require("daisyui"),
    ],
}

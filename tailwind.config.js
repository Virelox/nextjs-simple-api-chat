/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                accent: '#fe8618',
                bg: '#1e1f21',
                'bg-lighter': '#303133',
                'bg-message': '#fe8618',
                'bg-ai-message': '#303133',
                'bg-dark': '#FF0000',
            },
            boxShadow: {
                '3xl': '0px 40px 60px -5px rgba(0, 0, 0, 0.4)',
            },
            dropShadow: {
                logo: '0 45px 65px rgba(0, 0, 0, 1)',
            },
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.vue'],
    theme: {
        extend: {
            screens: {
                xs: '576px',
                '2xs': '430px',
            },
        },
    },
    plugins: [],
};

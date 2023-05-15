/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                dkblue: "#004678",
                midnight: "#002540",
                white: "#F9F9F9",
                teal: "#3EC0A9",
            },
        },
        fontFamily: {
            default: ["IBM Plex Sans", "sans serif"]
        },
        fontSize: {
            sm: '0.875em', // 14px
            base: ['1.125em', {
                fontWeight: 600,
            }], // 18px
            l: '1.25em', // 20px
            xl: ['2em', {
                fontWeight: 700,
            }] // 32px
        }
    },
    plugins: [],
};

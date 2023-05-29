/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                dkblue: "#004678",
                lgblue: "#E5F3F1",
                mdblue: "#6291BC",
                midnight: "#002540",
                white: "#F9F9F9",
                teal: "#3EC0A9",
            },
            fontSize: {
                sm: '0.85em',
                base: ['1em', {
                    fontWeight: 600,
                }],
                l: '1.25em', // 20px
                lbold: ['1.25em', {
                    fontWeight: 700,
                }],
                basebold: ['1.125em', {
                    fontWeight: 700,
                }], // 18px
                xl: ['2em', {
                    fontWeight: 700,
                }] // 32px
            }
        },
        fontFamily: {
            default: ["IBM Plex Sans", "sans serif"]
        },

    },
    plugins: [],
};

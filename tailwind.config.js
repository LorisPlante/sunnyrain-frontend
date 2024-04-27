/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        background: "#020227",
        "background-secondary": "#000b3f",
        interaction: "#FFB526",
        "interaction-secondary": "#031388",
        content: "#F5F7FF",
      },
      padding: {
        main: "78px 0",
        section: "44px 2.5%",
      },
      fontFamily: {
        sunny: ["sunny", "sans-serif"],
        rain: ["rain", "sans-serif"],
      },
      backgroundImage: {
        "title-bg-sun": "url('assets/medias/img/jpg/title_bg_sun.jpg')",
        "title-bg-rain": "url('assets/medias/img/jpg/title_bg_rain.jpg')",
      },
      backgroundPosition: {
        "top-15": "center top 35%",
      },
    },
  },
  plugins: [],
};

// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl2: "1.25rem",
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"], // Pakai tema navy dark dari DaisyUI
  },
};
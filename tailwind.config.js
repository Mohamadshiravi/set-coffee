module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "8px 8px 10px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(0, 0, 0, 0.2)",
        "4xl":
          "1px 1px 7px rgba(0, 0, 0, 0.1), -1px -1px 7px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        mybrown: "rgb(52, 24, 14)",
        headcolor: "#114639",
        mybrown2: "#755f56",
        backicon: "#bcaaa3",
        icon: "#5e5551",
      },
    },
  },
};

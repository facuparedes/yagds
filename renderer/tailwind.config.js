const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

module.exports = {
  mode: "jit",
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        custom: {
          background: "#fff",
          first: "#242A3D",
          accent: "#4064E3", //3F66FF, 1B53F4
        },
      },
      height: {
        "fit-content": "fit-content",
        titlebar: "30px",
        titlebarButtons: "30px",
        windowWithoutTitlebar: "calc(100vh - 30px)",
        iconInButton: "16px",
      },
      width: {
        "fit-content": "fit-content",
        titlebarButtons: "40px",
        iconInButton: "16px",
      },
      margin: {
        titlebar: "30px",
      },
      lineHeight: {
        textWithIconInButton: "16px",
      },
      fontFamily: {
        poppins: "Poppins",
      },
      scale: {
        500: "5",
      },
    },
  },
  // variants: {
  //   extend: {
  //     textColor: ["disabled"],
  //     textOpacity: ["disabled"],
  //   },
  // },
  purge: {
    // enabled: process.env.NODE_ENV === "production",
    keyframes: true,
    content: ["./renderer/common/**/*.{tsx, jsx, ts, js}", "./renderer/pages/**/*.{tsx, jsx, ts, js}"],
  },
  plugins: [
    ({ addUtilities, theme, variants }) => {
      let colors = flattenColorPalette(theme("borderColor"));
      delete colors["default"];

      if (this.theme?.extend?.colors !== undefined) colors = Object.assign(colors, this.theme.extend.colors);

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants("borderColor"));
    },
  ],
};

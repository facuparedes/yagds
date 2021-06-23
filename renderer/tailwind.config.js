module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          background: "#fff",
          first: "#242A3D",
          accent: "#4064E3", //3F66FF, 1B53F4
        },
      },
      height: {
        titlebar: "30px",
        titlebarButtons: "30px",
      },
      width: {
        "fit-content": "fit-content",
        titlebarButtons: "40px",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["disabled"],
      textOpacity: ["disabled"],
    },
  },
  plugins: [],
};

const tailwind = require(`@theme-ui/preset-tailwind`)

const tailwindPreset = tailwind.default

const final = {
  ...tailwindPreset,
  space: [
    `0`,
    `0.25rem`,
    `0.5rem`,
    `1rem`,
    `2rem`,
    `4rem`,
    `8rem`,
    `16rem`,
    `32rem`,
  ],
  styles: {
    ...tailwindPreset.styles,

    pre: {
      ...tailwindPreset.styles.pre,
      variant: `prism`,
      fontFamily: `monospace`,
      tabSize: 4,
      hyphens: `none`,
      marginBottom: 2,
      color: `white`,
      bg: `prism.background`,
      overflow: `auto`,
      borderRadius: `lg`,
      p: 3,
      ".highlight": {
        background: `hsla(0, 0%, 40%, .5)`,
      },
    },
    code: {
      ...tailwindPreset.styles.code,
      fontFamily: `monospace`,
      // from typography overrideThemeStyles
      // "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code"
      fontSize: `inherit`,
    },
    inlineCode: {
      borderRadius: `default`,
      color: `secondary`,
      bg: `gray.2`,
      p: 2,
    },
    p: {
      ...tailwindPreset.styles.p,
      fontSize: 2,
    },
    h1: {
      ...tailwindPreset.styles.h1,
      mb: 4,
    },
    h2: {
      ...tailwindPreset.styles.h2,
      mb: 4,
    },
    h3: {
      ...tailwindPreset.styles.h3,
      mb: 4,
    },
    h4: {
      ...tailwindPreset.styles.h4,
      mb: 4,
    },
    h5: {
      ...tailwindPreset.styles.h5,
      mb: 4,
    },
    h6: {
      ...tailwindPreset.styles.h5,
      mb: 4,
    },
  },
}

module.exports = final

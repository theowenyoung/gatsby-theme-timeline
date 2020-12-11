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
  links: {
    ...tailwindPreset.links,
    nav: {
      px: 2,
      py: 1,
      letterSpacing: `0.2rem`,
    },
  },
  alerts: {
    primary: {
      color: `background`,
      bg: `red.6`,
    },
  },

  styles: {
    ...tailwindPreset.styles,
    img: {
      ...tailwindPreset.styles.img,
      maxWidth: `full`,
    },
    p: {
      ...tailwindPreset.styles.p,
      mb: 3,
      lineHeight: `body`,
    },
    li: {
      lineHeight: `2`,
    },
    pre: {
      ...tailwindPreset.styles.pre,
      variant: `prism`,
      fontFamily: `monospace`,
      fontSize: 1,
      tabSize: 4,
      hyphens: `none`,
      marginBottom: 2,
      color: `white`,
      bg: `prism.background`,
      overflow: `auto`,
      borderRadius: `lg`,
      p: 3,
    },
    inlineCode: {
      borderRadius: `default`,
      color: `secondary`,
      bg: `gray.2`,
      p: 2,
    },
    blockquote: {
      ...tailwindPreset.styles.blockquote,
      borderLeftWidth: 4,
      borderLeftStyle: `solid`,
      borderLeftColor: `muted`,
      color: `textMuted`,
      m: 0,
      p: 0,
      fontStyle: `italic`,
      my: 4,
      pl: 3,
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
      mb: 3,
    },
    h4: {
      ...tailwindPreset.styles.h4,
      mb: 3,
    },
    h5: {
      ...tailwindPreset.styles.h5,
      mb: 3,
    },
    h6: {
      ...tailwindPreset.styles.h5,
      mb: 3,
    },
    table: {
      width: `100%`,
      marginBottom: 4,
      color: `gray.9`,
      captionSide: `bottom`,
      borderCollapse: `separate`,
      borderSpacing: 0,
      "> tbody > tr:nth-of-type(odd)": {
        bg: `gray.1`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderTopWidth: 2,
      borderTopStyle: `solid`,
      borderTopColor: `gray.3`,
      borderBottomWidth: 2,
      borderBottomStyle: `solid`,
      borderBottomColor: `gray.3`,
      padding: `.75rem`,
      textAlign: `inherit`,
    },
    td: {
      borderBottomWidth: 2,
      borderBottomStyle: `solid`,
      borderBottomColor: `gray.3`,
      verticalAlign: `top`,
      padding: `.75rem`,
    },
  },
}

module.exports = final

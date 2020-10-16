const base = require(`@theme-ui/preset-tailwind`)
const basePreset = base.default
module.exports = {
  ...basePreset,
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
}

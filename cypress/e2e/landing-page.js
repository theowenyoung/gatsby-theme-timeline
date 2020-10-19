describe(`blog landing page`, () => {
  beforeEach(() => {
    cy.visit(`/`)
  })

  it(`Focuses on the footer link and asserts its attributes`, () => {
    cy.findAllByText(`Gatsby`).focus()

    cy.focused()
      .should(`have.text`, `Gatsby`)
      .should(`have.attr`, `href`, `https://www.gatsbyjs.com`)
  })
  it(`Focuses on the footer Theme link and asserts its attributes`, () => {
    cy.findAllByText(`Timeline`).focus()

    cy.focused()
      .should(`have.text`, `Timeline`)
      .should(
        `have.attr`,
        `href`,
        `https://github.com/theowenyoung/gatsby-theme-timeline`
      )
  })
  it(`Focuses on the title and asserts its attributes`, () => {
    cy.findAllByText(`Shadowed Site Title`).focus()

    cy.focused()
      .should(`have.text`, `Shadowed Site Title`)
      .should(`have.attr`, `href`, `/`)
  })
  it(`Focuses on the bio and asserts its attributes`, () => {
    cy.findAllByText(`GitHub`).focus()
    cy.focused()
      .should(`have.text`, `GitHub`)
      .should(`have.attr`, `href`, `https://github.com/gatsbyjs`)
  })
})

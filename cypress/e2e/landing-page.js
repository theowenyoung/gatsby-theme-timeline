describe(`blog landing page`, () => {
  beforeEach(() => {
    cy.visit(`/`)
  })

  it(`Focuses on the footer link and asserts its attributes`, () => {
    cy.getBySel(`powered-link`).focus()

    cy.focused()
      .should(`have.text`, `Gatsby`)
      .should(`have.attr`, `href`, `https://www.gatsbyjs.com`)
  })
  it(`Focuses on the footer Theme link and asserts its attributes`, () => {
    cy.getBySel(`theme-link`).focus()

    cy.focused()
      .should(`have.text`, `Timeline`)
      .should(
        `have.attr`,
        `href`,
        `https://github.com/theowenyoung/gatsby-theme-timeline`
      )
  })
  it(`Focuses on the title and asserts its attributes`, () => {
    cy.getBySel(`site-title`).focus()

    cy.focused().should(`have.attr`, `href`, `/`)
  })
  it(`Focuses on tags title`, () => {
    cy.getBySel(`tags-title`).should(`have.text`, `Tags`)
  })
})

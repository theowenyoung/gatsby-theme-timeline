describe(`hello world post`, () => {
  it(`should display date`, () => {
    cy.visit(`/hello-world/`)
    cy.findByText(`April 15, 2019`).should(`exist`)
  })

  it(`should display bio`, () => {
    cy.get(`picture > img`).should(`exist`)
  })

  it(`should display URL image`, () => {
    cy.get(`header > .gatsby-image-wrapper > picture > img`).should(`exist`)
  })

  it(`should display relative image`, () => {
    cy.visit(`/my-second-post/`)
    cy.get(`header > .gatsby-image-wrapper > picture > img`).should(`exist`)
  })
})

describe(`hello world post`, () => {
  it(`should display date`, () => {
    cy.visit(`/hello-world/`)
    cy.getBySel(`detail-post-date`).should(`have.text`, `April 15, 2019`)
  })

  it(`should display relative image`, () => {
    cy.visit(`/my-second-post/`)
    cy.getBySel(`item-hero`).should(`exist`)
  })
})

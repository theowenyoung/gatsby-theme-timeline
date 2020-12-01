Cypress.Commands.add(`assertRoute`, (route) => {
  cy.url().should(`equal`, `${window.location.origin}${route}`)
})
Cypress.Commands.add(`getBySel`, (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

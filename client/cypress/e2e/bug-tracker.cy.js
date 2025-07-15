describe('Bug Tracker E2E', () => {
  it('should load the app, show empty list, add a bug, and display it', () => {
    cy.visit('http://localhost:3000');
    cy.contains(/bug tracker/i);
    cy.contains(/no bugs reported/i);

    cy.get('input[name="title"]').type('E2E Bug');
    cy.get('textarea[name="description"]').type('E2E bug description');
    cy.get('button[type="submit"]').click();

    // Wait for the bug to appear in the list
    cy.contains('E2E Bug').should('exist');
    cy.contains('E2E bug description').should('exist');
  });
}); 
describe('Авторизація та Реєстрація', () => {
  const uniqueId = Date.now();
  const newUser = {
    firstName: 'Cypress',
    lastName: 'Test',
    email: `auto_test_${uniqueId}@gmail.com`,
    password: 'password123',
  };

  it('проходить повний цикл: Реєстрація -> Логін -> Вихід', () => {
    cy.viewport(1536, 864);
    cy.visit('/register');

    cy.get('input').eq(0).type(newUser.firstName);
    cy.get('input').eq(1).type(newUser.lastName);

    cy.get('input[type="email"]').first().type(newUser.email);

    cy.get('input[type="password"]').each(($el) => {
      cy.wrap($el).type(newUser.password);
    });

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.contains('Вийти').should('be.visible');
    cy.contains('Увійти').should('not.exist');

    cy.contains('Вийти').click();

    cy.contains('Увійти').should('be.visible');
  });
});

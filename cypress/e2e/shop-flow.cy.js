describe('Сценарій користувача: Підбір та Лайк', () => {
  beforeEach(() => {
    cy.viewport(1536, 864);
    const uniqueEmail = `buyer_${Date.now()}@test.com`;
    cy.visit('/register');
    cy.get('input').eq(0).type('Buyer');
    cy.get('input').eq(1).type('User');
    cy.get('input[type="email"]').first().type(uniqueEmail);
    cy.get('input[type="password"]').each(($el) => cy.wrap($el).type('123456'));
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/register');
  });

  it('фільтрує товари та додає в улюблені', () => {
    cy.visit('/select');

    cy.get('a[href*="/product/"]', { timeout: 10000 }).should(
      'have.length.at.least',
      1
    );

    cy.get('a[href*="/product/"]').first().click();

    cy.get('button svg').click({ force: true });

    cy.get('button svg').should('have.attr', 'fill', '#e53e3e');

    cy.visit('/favorites');
    cy.contains('ВПОДОБАНІ ТОВАРИ').should('be.visible');
    cy.get('a[href*="/product/"]').should('exist');
  });
});

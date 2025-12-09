describe('Навігація по сайту (Гість)', () => {
  it('успішно відкриває головну сторінку', () => {
    cy.viewport(1536, 864);
    cy.visit('/');
    cy.contains('Твій персональний гід').should('be.visible');
    cy.contains('Підібрати Засоби').should('be.visible');
  });

  it('переходить на сторінку "Про Нас"', () => {
    cy.viewport(1536, 864);
    cy.visit('/');
    cy.contains('nav a', 'Про Нас').click();

    cy.url().should('include', '/about');
    cy.contains('В ЧОМУ НАША ОСОБЛИВІСТЬ?').should('be.visible');
  });

  it('перенаправляє на логін при спробі зайти у "Вподобані"', () => {
    cy.viewport(1536, 864);
    cy.visit('/');
    cy.contains('nav a', 'Вподобані').click();

    cy.url().should('include', '/login');
    cy.contains('Вхід до кабінету').should('be.visible');
  });
});

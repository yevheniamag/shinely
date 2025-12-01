import React from 'react';
import Header from './Header';
import { AuthContext } from '../../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<Header />', () => {
  it('shows Login/Register buttons when NOT logged in', () => {
    const mockAuthValue = { user: null };
    cy.viewport(1280, 720);

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('SHINELY').should('be.visible');
    cy.contains('Увійти').should('be.visible');
    cy.contains('Зареєструватися').should('be.visible');
    cy.contains('Вийти').should('not.exist');
  });

  it('shows Logout button when logged in and handles logout', () => {
    cy.viewport(1280, 720);
    const logoutStub = cy.stub().as('logoutStub');

    const mockAuthValue = {
      user: { firstName: 'TestUser' },
      logout: logoutStub,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('Вийти').should('be.visible');
    cy.contains('Увійти').should('not.exist');
    cy.contains('Вийти').click();
    cy.get('@logoutStub').should('have.been.called');
  });
});

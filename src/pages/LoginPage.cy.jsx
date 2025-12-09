import React from 'react';
import LoginPage from './LoginPage';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<LoginPage />', () => {
  it('shows error message on failed login', () => {
    cy.viewport(1280, 720);
    const mockLogin = cy.stub().resolves({
      success: false,
      message: 'Неправильний email або пароль',
    });

    const mockAuthValue = {
      user: null,
      login: mockLogin,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('input[type="email"]').type('wrong@test.com');
    cy.get('input[type="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    cy.contains('Неправильний email або пароль').should('be.visible');
  });
  it('calls login function with correct credentials on submit', () => {
    cy.viewport(1280, 720);

    const loginStub = cy.stub().as('loginStub').resolves({ success: true });

    const mockAuthValue = {
      user: null,
      login: loginStub,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('input[type="email"]').type('correct@test.com');
    cy.get('input[type="password"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.get('@loginStub').should(
      'have.been.calledWith',
      'correct@test.com',
      'password123'
    );
  });
});

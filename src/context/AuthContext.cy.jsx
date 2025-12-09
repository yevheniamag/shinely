import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';

const TestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="user-name">{user ? user.firstName : 'Guest'}</p>
      <button onClick={() => login('test@test.com', '123456')}>
        Login Real
      </button>
      <button onClick={logout}>Logout Real</button>
    </div>
  );
};

describe('<AuthProvider /> Integration', () => {
  it('loads initial state (Guest)', () => {
    cy.mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    cy.contains('Guest').should('be.visible');
  });

  it('updates state and localStorage on login (covers useEffect)', () => {
    cy.intercept('POST', '**/users/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: { firstName: 'Ivan', favorites: [] },
      },
    }).as('loginApi');

    cy.mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    cy.contains('Login Real').click();

    cy.wait('@loginApi');

    cy.contains('Ivan').should('be.visible');

    cy.window().then((window) => {
      expect(window.localStorage.getItem('shinely-auth-token')).to.eq(
        'fake-jwt-token'
      );
    });
  });

  it('clears localStorage on logout', () => {
    localStorage.setItem(
      'shinely-current-user',
      JSON.stringify({ firstName: 'Ivan' })
    );
    localStorage.setItem('shinely-auth-token', 'token123');

    cy.mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    cy.contains('Ivan').should('be.visible');

    cy.contains('Logout Real').click();

    cy.contains('Guest').should('be.visible');

    cy.window().then((window) => {
      expect(window.localStorage.getItem('shinely-auth-token')).to.be.null;
    });
  });
});

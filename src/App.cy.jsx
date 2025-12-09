import React from 'react';
import App from './App';
import { AuthContext } from './context/AuthContext';

describe('<App />', () => {
  it('renders the app structure (Header & Footer) without crashing', () => {
    window.history.pushState({}, '', '/');

    const mockAuth = {
      user: null,
      login: cy.stub(),
      register: cy.stub(),
      logout: cy.stub(),
      toggleFavorite: cy.stub(),
    };

    cy.mount(
      <AuthContext.Provider value={mockAuth}>
        <App />
      </AuthContext.Provider>
    );

    cy.contains('S H I N E L Y').should('be.visible');

    cy.contains('HairCare Project').should('be.visible');
    cy.contains('ПРО НАС').should('be.visible');
  });
});

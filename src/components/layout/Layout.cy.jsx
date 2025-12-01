import React from 'react';
import Layout from './Layout';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<Layout />', () => {
  it('renders Header, Footer and content', () => {
    cy.viewport(1280, 720);

    const mockAuth = { user: null, toggleFavorite: cy.stub() };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuth}>
          <Layout>
            <h1>Тестовий Контент</h1>
          </Layout>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('S H I N E L Y').should('be.visible');
    cy.contains('Haircare@Gmail.Com').should('be.visible');
    cy.contains('© 2025 HairCare Project').should('be.visible');
  });
});

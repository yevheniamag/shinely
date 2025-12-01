import React from 'react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('<Footer />', () => {
  it('renders footer content', () => {
    cy.viewport(1280, 720);
    cy.mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    cy.contains('S H I N E L Y').should('be.visible');
  });
});

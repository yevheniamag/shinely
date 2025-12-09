import React from 'react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('<HomePage />', () => {
  it('renders hero section', () => {
    cy.viewport(1280, 720);
    cy.mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    cy.contains('Твій персональний гід').should('be.visible');
    cy.contains('Підібрати Засоби').should('be.visible');
  });
});

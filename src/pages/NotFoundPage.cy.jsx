import React from 'react';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

describe('<NotFoundPage />', () => {
  it('renders 404 message', () => {
    cy.viewport(1280, 720);
    cy.mount(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    cy.contains('404').should('be.visible');
    cy.contains('Сторінку не знайдено').should('be.visible');
  });
});

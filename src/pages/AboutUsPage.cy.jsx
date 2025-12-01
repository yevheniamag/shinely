import React from 'react';
import AboutUsPage from './AboutUsPage';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<AboutUsPage />', () => {
  it('hides register button when logged in', () => {
    const mockAuthValue = { user: { firstName: 'User' } };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <AboutUsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('ПРО НАС').should('be.visible');
    cy.contains('Зареєструватися').should('not.exist');
  });
});

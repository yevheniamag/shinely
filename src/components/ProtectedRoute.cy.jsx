import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<ProtectedRoute />', () => {
  it('renders children when user IS logged in', () => {
    const mockAuth = { user: { firstName: 'Test' } };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuth}>
          <ProtectedRoute>
            <div>Секретна інформація</div>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('Секретна інформація').should('be.visible');
  });

  it('redirects (does not render children) when user is NOT logged in', () => {
    const mockAuth = { user: null };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuth}>
          <ProtectedRoute>
            <div>Секретна інформація</div>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('Секретна інформація').should('not.exist');
  });
});

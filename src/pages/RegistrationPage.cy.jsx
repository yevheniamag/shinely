import React from 'react';
import RegistrationPage from './RegistrationPage';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<RegistrationPage />', () => {
  it('shows alert when passwords do not match', () => {
    const mockAuthValue = { register: cy.stub() };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <RegistrationPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('input').eq(0).type('Test');
    cy.get('input').eq(1).type('User');
    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').eq(0).type('123456');
    cy.get('input[type="password"]').eq(1).type('000000');

    const alertSpy = cy.spy().as('alertSpy');
    cy.on('window:alert', alertSpy);

    cy.get('button[type="submit"]').click();

    cy.get('@alertSpy').should(
      'have.been.calledWith',
      'Паролі не співпадають!'
    );
  });
});

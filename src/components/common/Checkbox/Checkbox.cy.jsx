import React from 'react';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('renders and checks label', () => {
    cy.mount(<Checkbox label="Agree to terms" />);
    cy.contains('Agree to terms').should('be.visible');
    cy.get('input[type="checkbox"]').should('exist');
  });
});

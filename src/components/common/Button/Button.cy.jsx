import React from 'react';
import Button from './Button';

describe('<Button />', () => {
  it('renders', () => {
    cy.mount(<Button>Click me</Button>);
    cy.contains('Click me').should('be.visible');
  });

  it('renders with variant', () => {
    cy.mount(<Button variant="dark">Dark</Button>);
    cy.get('button').should('exist');
  });
});

import React from 'react';
import Input from './Input';

describe('<Input />', () => {
  it('renders with specific type and label', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(
      <Input
        label="Email Address"
        type="email"
        value="test"
        onChange={onChangeSpy}
      />
    );
    cy.get('label').should('contain.text', 'Email Address');
    cy.get('input').should('have.attr', 'type', 'email');
    cy.get('input').should('have.value', 'test');
  });

  it('uses default type="text" when type prop is missing', () => {
    cy.mount(<Input label="Default Input" />);
    cy.get('input').should('have.attr', 'type', 'text');
  });

  it('handles typing', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<Input label="Test" onChange={onChangeSpy} />);
    cy.get('input').type('Hello');
    cy.get('@onChangeSpy').should('have.been.called');
  });
});

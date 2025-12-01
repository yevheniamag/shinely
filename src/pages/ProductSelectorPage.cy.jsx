import React from 'react';
import ProductSelectorPage from './ProductSelectorPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const mockProducts = [
  { _id: '1', name: 'Shampoo Dry', type: 'Шампунь', filter_hairType: 'Сухе' },
  { _id: '2', name: 'Mask Oily', type: 'Маска', filter_hairType: 'Жирне' },
  {
    _id: '3',
    name: 'Universal Oil',
    type: 'Олія',
    filter_hairType: 'Будь-який',
  },
];

describe('<ProductSelectorPage />', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products', { body: mockProducts }).as(
      'getProducts'
    );
  });

  const mountPage = () => {
    const mockAuth = { user: null, toggleFavorite: cy.stub() };
    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuth}>
          <ProductSelectorPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('filters by specific hair type', () => {
    mountPage();
    cy.wait('@getProducts');

    cy.contains('Тип волосся').click();
    cy.contains('div', 'Сухе').click();
    cy.contains('Підібрати').click();

    cy.contains('Shampoo Dry').should('be.visible');
    cy.contains('Mask Oily').should('not.exist');
  });

  it('handles "Any" filter and Reset button', () => {
    mountPage();
    cy.wait('@getProducts');

    cy.contains('Тип волосся').click();
    cy.contains('div', 'Сухе').click();
    cy.contains('Підібрати').click();

    cy.contains('Mask Oily').should('not.exist');

    cy.contains('Скинути').click();

    cy.contains('Shampoo Dry').should('be.visible');
    cy.contains('Mask Oily').should('be.visible');
  });
});

import React from 'react';
import ProductInfoPage from './ProductInfoPage';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockProduct = {
  _id: '1',
  name: 'Kerastase Nutritive Bain Satin',
  type: 'Шампунь',
  volume: '250 мл',
  image: '/assets/shampoo-mock.png',
  description: 'Опис шампуню...',
  benefits: ['Глибоке зволоження', 'Захист'],
  filter_hairType: 'Сухе',
  filter_problem: 'Сухість',
};

describe('<ProductInfoPage />', () => {
  it('renders product details based on URL param', () => {
    cy.intercept('GET', '**/products/*', {
      statusCode: 200,
      body: mockProduct,
    }).as('getProductById');

    const mockAuthValue = { user: null, toggleFavorite: cy.stub() };

    cy.mount(
      <MemoryRouter initialEntries={['/product/1']}>
        <AuthContext.Provider value={mockAuthValue}>
          <Routes>
            <Route path="/product/:productId" element={<ProductInfoPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.wait('@getProductById');

    cy.contains('Kerastase Nutritive Bain Satin').should('be.visible');
    cy.contains('Шампунь').should('be.visible');
    cy.contains('Глибоке зволоження').should('be.visible');
  });
});

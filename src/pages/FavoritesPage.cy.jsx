import React from 'react';
import FavoritesPage from './FavoritesPage';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('<FavoritesPage />', () => {
  const mockProducts = [
    { _id: '1', name: 'Loved Shampoo', type: 'Шампунь', image: 'L.png' },
    { _id: '2', name: 'Hated Mask', type: 'Маска', image: 'H.png' },
  ];

  it('shows only favorite products', () => {
    const toggleFavoriteStub = cy.stub();

    cy.intercept('GET', '**/products', { body: mockProducts }).as(
      'getProducts'
    );

    const mockAuthValue = {
      user: { favorites: ['1'] },
      toggleFavorite: toggleFavoriteStub,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <FavoritesPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.wait('@getProducts');

    cy.contains('Loved Shampoo').should('be.visible');
    cy.contains('Hated Mask').should('not.exist');
  });

  it('shows loading state initially', () => {
    const toggleFavoriteStub = cy.stub();

    cy.intercept('GET', '**/products', (req) => {
      req.reply((res) => {
        res.setDelay(200);
        res.send({ body: mockProducts });
      });
    }).as('getProducts');

    const mockAuthValue = {
      user: { favorites: [] },
      toggleFavorite: toggleFavoriteStub,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <FavoritesPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('Завантаження...').should('be.visible');
    cy.wait('@getProducts');

    cy.contains('Завантаження...').should('not.exist');
  });

  it('shows error message on fetch failure', () => {
    cy.on('uncaught:exception', () => false);

    const toggleFavoriteStub = cy.stub();

    cy.intercept('GET', '**/products', (req) => {
      req.reply({
        statusCode: 500,
        body: { message: 'Server Error' },
      });
    }).as('getProductsError');

    const mockAuthValue = {
      user: { favorites: [] },
      toggleFavorite: toggleFavoriteStub,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <FavoritesPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.wait('@getProductsError');
    cy.contains('Помилка завантаження').should('be.visible');
  });

  it('shows empty state message when there are no favorite products', () => {
    const toggleFavoriteStub = cy.stub();

    cy.intercept('GET', '**/products', { body: mockProducts }).as(
      'getProducts'
    );

    const mockAuthValue = {
      user: { favorites: [] },
      toggleFavorite: toggleFavoriteStub,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <FavoritesPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.wait('@getProducts');

    cy.contains('Ваш список вподобаних порожній').should('be.visible');
    cy.contains('Перейти до каталогу').should('be.visible');
  });
});

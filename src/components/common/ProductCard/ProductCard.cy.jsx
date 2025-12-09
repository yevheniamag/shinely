import React from 'react';
import ProductCard from './ProductCard';
import { AuthContext } from '../../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const mockProduct = {
  _id: '999',
  name: 'Test Shampoo',
  type: 'Shampoo',
  image: '/test.png',
};

describe('<ProductCard />', () => {
  it('renders product details', () => {
    cy.viewport(1000, 600);
    const mockAuthValue = { user: null, toggleFavorite: cy.stub() };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <ProductCard product={mockProduct} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.contains('Test Shampoo').should('be.visible');
    cy.contains('Shampoo').should('be.visible');
  });

  it('shows red heart if product IS favorite', () => {
    const mockAuthValue = {
      user: { favorites: ['999'] },
      toggleFavorite: cy.stub(),
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <ProductCard product={mockProduct} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('button svg').should('have.attr', 'fill', '#e53e3e');
  });

  it('shows transparent heart if product is NOT favorite', () => {
    const mockAuthValue = {
      user: { favorites: ['111'] },
      toggleFavorite: cy.stub(),
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <ProductCard product={mockProduct} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('button svg').should('have.attr', 'fill', 'none');
  });

  it('redirects GUEST to login on favorite click', () => {
    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);
    const mockAuthValue = { user: null, toggleFavorite: cy.stub() };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <ProductCard product={mockProduct} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('button').find('svg').click({ force: true });
    cy.get('@alertStub').should('have.been.called');
  });

  it('calls toggleFavorite when LOGGED-IN user clicks heart', () => {
    const toggleSpy = cy.stub().as('toggleSpy');
    const mockAuthValue = {
      user: { favorites: [] },
      toggleFavorite: toggleSpy,
    };

    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <ProductCard product={mockProduct} />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    cy.get('button').find('svg').click({ force: true });
    cy.get('@toggleSpy').should('have.been.calledWith', '999');
  });
});

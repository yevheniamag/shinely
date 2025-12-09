import React from 'react';
import ProductCarousel from './ProductCarousel';
import { AuthContext } from '../../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const mockList = [
  { _id: '1', name: 'A', type: 'T', image: '' },
  { _id: '2', name: 'B', type: 'T', image: '' },
  { _id: '3', name: 'C', type: 'T', image: '' },
];

describe('<ProductCarousel />', () => {
  const mountCarousel = (list) => {
    const mockAuthValue = { user: null, toggleFavorite: cy.stub() };
    cy.mount(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthValue}>
          <ProductCarousel productList={list} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('renders list and handles scrolls', () => {
    cy.viewport(1000, 600);
    mountCarousel(mockList);
    cy.contains('A').should('be.visible');
    cy.get('button[aria-label="Прокрутити вправо"]').click();
    cy.get('button[aria-label="Прокрутити вліво"]').click();
  });

  it('returns null when list is empty array', () => {
    mountCarousel([]);
    cy.get('button').should('not.exist');
  });

  it('returns null when list is undefined (prop missing)', () => {
    mountCarousel(undefined);
    cy.get('button').should('not.exist');
  });
});

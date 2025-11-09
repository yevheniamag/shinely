import { useState, useMemo } from 'react';
import styles from './ProductSelectorPage.module.css';
import ProductCarousel from '../components/common/ProductCarousel/ProductCarousel.jsx';
import Button from '../components/common/Button/Button.jsx';
import { useFetchData } from '../hooks/useFetchData.js';

const getCategoryTitle = (category) => {
  const titles = {
    shampoos: 'Шампунь',
    conditioners: 'Кондиціонер',
    masks: 'Маска',
    oils: 'Олія',
    sprays: 'Спрей',
  };
  return titles[category] || category;
};

const typeToCategoryKey = {
  Шампунь: 'shampoos',
  Кондиціонер: 'conditioners',
  Маска: 'masks',
  Олія: 'oils',
  Спрей: 'sprays',
};

const filterOptions = {
  hairType: [
    'Сухе',
    'Тонке',
    'Фарбоване',
    'Пошкоджене',
    'Кучеряве',
    'Будь-який',
  ],
  problem: [
    'Ламкість',
    'Сухість',
    'Лупа',
    'Випадіння',
    'Пухнастість',
    "Відсутність об'єму",
    'Посічені кінчики',
    'Термозахист',
    'Тьмяність',
    'Пошкодження',
  ],
  type: ['Шампунь', 'Кондиціонер', 'Маска', 'Олія', 'Спрей'],
};

export default function ProductSelectorPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    hairType: null,
    problem: null,
    type: null,
  });
  const [filteredProducts, setFilteredProducts] = useState(null);

  const {
    data: allProducts,
    isLoading,
    error,
  } = useFetchData('/products.json');

  const handleSelectFilter = (filterName, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setOpenDropdown(null);
  };

  const handleFilterSubmit = () => {
    if (!allProducts) return;

    let results = allProducts;
    const activeFilters = Object.entries(selectedFilters).filter(
      ([, value]) => value !== null
    );
    if (activeFilters.length === 0) {
      setFilteredProducts(null);
      return;
    }
    results = results.filter((product) => {
      return activeFilters.every(([key, value]) => {
        if (key === 'type') {
          return product.type === value;
        }
        const productFilterValue = product[`filter_${key}`];
        if (value === 'Будь-який') {
          return true;
        }
        if (productFilterValue === 'Будь-який') {
          return true;
        }
        return productFilterValue === value;
      });
    });
    setFilteredProducts(results);
  };

  const handleResetFilters = () => {
    setSelectedFilters({ hairType: null, problem: null, type: null });
    setFilteredProducts(null);
    setOpenDropdown(null);
  };

  const productsToShow = useMemo(() => {
    if (!allProducts) return {};

    const sourceData = filteredProducts || allProducts;

    return sourceData.reduce((acc, product) => {
      const category = typeToCategoryKey[product.type];
      if (!category) return acc;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  }, [filteredProducts, allProducts]);

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
          Завантаження продуктів...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
          Помилка завантаження: {error}
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.filterSection}>
        <h1 className={styles.title}>ПІДБІР ЗАСОБІВ</h1>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            Тут ти можеш підібрати ідеальні засоби догляду, що відповідатимуть
            саме твоїм потребам.
          </p>
        </div>
        <div className={styles.filters}>
          <div className={styles.filterWrapper}>
            <button
              className={styles.filterButton}
              onClick={() =>
                setOpenDropdown(openDropdown === 'hairType' ? null : 'hairType')
              }
            >
              <span>{selectedFilters.hairType || 'Тип волосся'}</span>
              <span>&gt;</span>
            </button>
            {openDropdown === 'hairType' && (
              <div className={styles.dropdown}>
                {filterOptions.hairType.map((option) => (
                  <div
                    key={option}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectFilter('hairType', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.filterWrapper}>
            <button
              className={styles.filterButton}
              onClick={() =>
                setOpenDropdown(openDropdown === 'problem' ? null : 'problem')
              }
            >
              <span>{selectedFilters.problem || 'Проблема'}</span>
              <span>&gt;</span>
            </button>
            {openDropdown === 'problem' && (
              <div className={styles.dropdown}>
                {filterOptions.problem.map((option) => (
                  <div
                    key={option}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectFilter('problem', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.filterWrapper}>
            <button
              className={styles.filterButton}
              onClick={() =>
                setOpenDropdown(openDropdown === 'type' ? null : 'type')
              }
            >
              <span>{selectedFilters.type || 'Тип засобу'}</span>
              <span>&gt;</span>
            </button>
            {openDropdown === 'type' && (
              <div className={styles.dropdown}>
                {filterOptions.type.map((option) => (
                  <div
                    key={option}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectFilter('type', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.actionButtons}>
          <Button
            variant="primary"
            className={styles.submitButton}
            onClick={handleFilterSubmit}
          >
            Підібрати
          </Button>
          <Button
            variant="light"
            className={styles.resetButton}
            onClick={handleResetFilters}
          >
            Скинути
          </Button>
        </div>
      </section>

      <div className={styles.resultsContainer}>
        {Object.keys(productsToShow).length > 0 ? (
          Object.entries(productsToShow).map(([category, productList]) => (
            <section key={category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>
                {getCategoryTitle(category)}
              </h2>

              <ProductCarousel productList={productList} />
            </section>
          ))
        ) : (
          <div className={styles.noResultsContainer}>
            <h3>На жаль, за вашими фільтрами нічого не знайдено.</h3>
            <p>Спробуйте скинути фільтри або обрати інші параметри.</p>
          </div>
        )}
      </div>
    </div>
  );
}

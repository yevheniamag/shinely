import Header from './Header/Header';
import Footer from './Footer';
import HeaderStyles from './Header/Header.module.css'; // <-- Цей імпорт важливий!

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      {/* ВИКОРИСТОВУЄМО КЛАС З МОДУЛЯ Header.module.css */}
      <div className={HeaderStyles.headerWrapper}>
        <Header />
      </div>

      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

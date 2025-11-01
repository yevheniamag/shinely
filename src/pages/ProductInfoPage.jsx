import styles from './ProductInfoPage.module.css';

import shampoo1 from '../assets/shampoo-1.png';
import shampoo2 from '../assets/shampoo-2.png';
import shampoo3 from '../assets/shampoo-3.png';
import shampoo4 from '../assets/shampoo-4.png';
import shampoo5 from '../assets/shampoo-5.png';
import conditioner1 from '../assets/conditioner-1.png';
import conditioner2 from '../assets/conditioner-2.png';
import conditioner3 from '../assets/conditioner-3.png';
import conditioner4 from '../assets/conditioner-4.png';
import conditioner5 from '../assets/conditioner-5.png';
import mask1 from '../assets/mask-1.png';
import mask2 from '../assets/mask-2.png';
import mask3 from '../assets/mask-3.png';
import mask4 from '../assets/mask-4.png';
import mask5 from '../assets/mask-5.png';
import oil1 from '../assets/oil-1.png';
import oil2 from '../assets/oil-2.png';
import oil3 from '../assets/oil-3.png';
import oil4 from '../assets/oil-4.png';
import oil5 from '../assets/oil-5.png';
import spray1 from '../assets/spray-1.png';
import spray2 from '../assets/spray-2.png';
import spray3 from '../assets/spray-3.png';
import spray4 from '../assets/spray-4.png';
import spray5 from '../assets/spray-5.png';

const products = {
  shampoos: [
    {
      id: 1,
      image: shampoo2,
      name: 'Redken Volume Injection Shampoo',
      description:
        "Шампунь для неймовірного об'єму тонкого волосся. Збагачений філоксаном, він робить волосся візуально густішим та щільнішим, не обтяжуючи його.",
      composition:
        'Aqua, Sodium Laureth Sulfate, Coco-Betaine, Sodium Lauryl Sulfate, Filloxane.',
    },
    {
      id: 2,
      image: shampoo1,
      name: 'Herbal Essences Petal Soft',
      description:
        "Ніжний шампунь з ароматом троянди, що дбайливо очищує та зволожує волосся, роблячи його м'яким, блискучим та шовковистим на дотик.",
      composition: 'Rose Extract, Jojoba Oil, Aloe Vera, Vitamin E.',
    },
    {
      id: 3,
      image: shampoo3,
      name: 'Matrix Food For Soft Hydrating',
      description:
        'Інтенсивно зволожуючий шампунь з олією авокадо та гіалуроновою кислотою. Ідеально підходить для сухого та ламкого волосся.',
      composition: 'Avocado Oil, Hyaluronic Acid, Glycerin.',
    },
    {
      id: 4,
      image: shampoo4,
      name: 'Davines Minu Shampoo',
      description:
        'Захисний шампунь для фарбованого волосся. Його формула, збагачена екстрактом квітів каперсів, захищає колір та надає волоссю тривалого блиску.',
      composition:
        'Capparis Spinosa Flower Extract, Aqua, Sodium Lauroyl Methyl Isethionate.',
    },
    {
      id: 5,
      image: shampoo5,
      name: 'Vichy Dercos Anti-Dandruff',
      description:
        'Інтенсивний шампунь-догляд проти лупи для сухого волосся. Допомагає усунути видиму лупу вже після першого застосування та заспокоює шкіру голови.',
      composition: 'Selenium DS, Salicylic Acid, Ceramide R.',
    },
  ],
  conditioners: [
    {
      id: 6,
      image: conditioner1,
      name: 'Moisture & More Conditioner',
      description:
        "Зволожуючий кондиціонер для сухого та пошкодженого волосся. Надає м'якості та полегшує розчісування.",
      composition: 'Glycerin, Shea Butter, Panthenol.',
    },
    {
      id: 7,
      image: conditioner2,
      name: 'Tresemme Flawless Waves',
      description:
        'Кондиціонер для створення ідеальних хвиль. Допомагає структурувати локони та запобігає пухнастості.',
      composition: 'Keratin, Sea Salt Extract, Biotin.',
    },
    {
      id: 8,
      image: conditioner3,
      name: 'Kerastase Premiere Fondant',
      description:
        'Відновлюючий кондиціонер для ослабленого волосся, схильного до ламкості. Зміцнює структуру волосся зсередини.',
      composition: 'Ceramide, Creatine R, Maleic Acid.',
    },
    {
      id: 9,
      image: conditioner4,
      name: 'Clever Hair Cosmetics 3D Line Extra',
      description:
        "Багатофункціональний кондиціонер 3D-ефекту, що забезпечує об'єм, блиск та гладкість.",
      composition: 'Collagen, Silk Proteins, Vitamin Complex.',
    },
    {
      id: 10,
      image: conditioner5,
      name: 'Kerastase Chroma Absolu Fondant Cica',
      description:
        'Зміцнюючий кондиціонер для фарбованого волосся. Захищає колір від вимивання та відновлює пошкоджені ділянки.',
      composition: 'Centella Asiatica, Lactic Acid, Tartaric Acid.',
    },
  ],
  masks: [
    {
      id: 11,
      image: mask1,
      name: "La'dor Eco Hydro LPP Treatment",
      description:
        'Протеїнова маска для інтенсивного відновлення пошкодженого волосся. Заповнює пошкоджені ділянки та робить волосся еластичним.',
      composition: 'Hydrolyzed Collagen, Jojoba Seed Oil, Olive Oil.',
    },
    {
      id: 12,
      image: mask2,
      name: 'Brelil Numero Total Repair Mask',
      description:
        'Відновлююча маска з екстрактом вівса для глибокого живлення та реструктуризації сухого та ламкого волосся.',
      composition: 'Avena Sativa (Oat) Kernel Extract, Shea Butter.',
    },
    {
      id: 13,
      image: mask3,
      name: 'Alfaparf Milano Semi Di Lino Moisture Nutritive Mask',
      description:
        "Поживна маска для сухого волосся, що надає неймовірної м'якості та блиску, не обтяжуючи його.",
      composition: 'Urban Defence Pro, Shine Fix Complex, Color Fix Complex.',
    },
    {
      id: 14,
      image: mask4,
      name: 'Inebrya She Care Repair Mask',
      description:
        'Реструктуризуюча маска з кератином для сильно пошкодженого волосся. Глибоко проникає в структуру та відновлює її.',
      composition: 'Keratin, Cotton Oil, Grape Stem Cells.',
    },
    {
      id: 15,
      image: mask5,
      name: 'Anagana Professional Lipid Mask',
      description:
        'Ліпідна маска для інтенсивної реконструкції волосся. Відновлює ліпідний баланс, роблячи волосся сильним та здоровим.',
      composition: 'Lipid Complex, Ceramide NG, Argan Oil.',
    },
  ],
  oils: [
    {
      id: 16,
      image: oil1,
      name: "La'dor Wonder Hair Oil",
      description:
        'Зволожуюча олія для волосся, що миттєво робить його гладким і блискучим, не залишаючи відчуття жирності.',
      composition:
        'Avocado Oil, Argan Oil, Macadamia Oil, Camellia Japonica Seed Oil.',
    },
    {
      id: 17,
      image: oil2,
      name: 'CHI Argan Oil Plus Moringa Oil',
      description:
        'Відновлююча суміш олій аргана та морінги, що глибоко живить, розгладжує та омолоджує пошкоджене волосся.',
      composition:
        'Argania Spinosa (Argan) Kernel Oil, Moringa Oleifera Seed Oil.',
    },
    {
      id: 18,
      image: oil3,
      name: 'Comex Ayurvedic Natural Oil',
      description:
        'Натуральна аюрведична олія на основі індійських трав для зміцнення коренів та стимуляції росту волосся.',
      composition: 'Sesame Oil, Amla Extract, Bhringraj Extract.',
    },
    {
      id: 19,
      image: oil4,
      name: 'Hair Trend Total Oil Repair',
      description:
        'Комплексна олія для повного відновлення волосся. Захищає від термічних пошкоджень та УФ-променів.',
      composition: 'Cyclopentasiloxane, Dimethiconol, Phenyl Trimethicone.',
    },
    {
      id: 20,
      image: oil5,
      name: 'Bogenia Professional Hair Oil Marula',
      description:
        'Професійна олія з марулою для інтенсивного зволоження та надання шовковистості. Ідеальна для всіх типів волосся.',
      composition: 'Sclerocarya Birrea (Marula) Seed Oil, Vitamin E.',
    },
  ],
  sprays: [
    {
      id: 21,
      image: spray1,
      name: 'CHI Volume Booster',
      description:
        "Спрей для надання прикореневого об'єму. Створює щільну, але рухливу основу для укладки.",
      composition:
        'Aqua/Water/Eau, VP/VA Copolymer, Polyquaternium-16, Hydrolyzed Silk.',
    },
    {
      id: 22,
      image: spray2,
      name: 'Leia Magnetisme Spray',
      description:
        'Магнетичний спрей для текстури та фіксації. Допомагає створити легкі, природні хвилі.',
      composition: 'Sea Salt, Magnesium Sulfate, Algae Extract.',
    },
    {
      id: 23,
      image: spray3,
      name: 'You look Professional Multiaction Spray 10 in 1',
      description:
        'Багатофункціональний спрей 10 в 1: термозахист, зволоження, блиск, легке розчісування та багато іншого.',
      composition: 'Argan Oil, Keratin, Panthenol.',
    },
    {
      id: 24,
      image: spray4,
      name: 'Comex Ayurvedic Natural',
      description:
        'Натуральний аюрведичний спрей-тонік для зміцнення волосся від коренів до кінчиків.',
      composition: 'Amla Water, Bhringraj Extract, Neem Hydrosol.',
    },
    {
      id: 25,
      image: spray5,
      name: 'Alter Ego Italy Hasty Too Hi T Security',
      description:
        'Професійний термозахисний спрей. Захищає волосся від пошкодження під час використання фену або вирівнювача.',
      composition:
        'Cyclopentasiloxane, Dimethiconol, Linum Usitatissimum (Linseed) Seed Oil.',
    },
  ],
};

export default function ProductInfoPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Детальніше про Засоби</h1>

      {}
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Шампуні</h2>
        {products.shampoos.map((product) => (
          // Контейнер для одного продукту
          <div key={product.id} className={styles.productEntry}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              {product.composition && (
                <p className={styles.productComposition}>
                  <strong>Склад:</strong> {product.composition}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Кондиціонери</h2>
        {products.conditioners.map((product) => (
          <div key={product.id} className={styles.productEntry}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              {product.composition && (
                <p className={styles.productComposition}>
                  <strong>Склад:</strong> {product.composition}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Маски</h2>
        {products.masks.map((product) => (
          <div key={product.id} className={styles.productEntry}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              {product.composition && (
                <p className={styles.productComposition}>
                  <strong>Склад:</strong> {product.composition}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Олії</h2>
        {products.oils.map((product) => (
          <div key={product.id} className={styles.productEntry}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              {product.composition && (
                <p className={styles.productComposition}>
                  <strong>Склад:</strong> {product.composition}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Спреї</h2>
        {products.sprays.map((product) => (
          <div key={product.id} className={styles.productEntry}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              {product.composition && (
                <p className={styles.productComposition}>
                  <strong>Склад:</strong> {product.composition}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

//  # React-компоненты - карточка продукта

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Цена: {product.price} ₸</p>
      <button>В корзину</button>
      <button>❤️ В избранное</button>
    </div>
  );
}
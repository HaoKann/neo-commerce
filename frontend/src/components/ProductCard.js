//  # React-компоненты - карточка продукта
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price} ₸</p>
      <button onClick={() => dispatch(addToCart(product))}>
        В корзину
      </button>
    </div>
  );
}

export default ProductCard;

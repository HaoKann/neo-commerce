//  # React-компоненты - корзина

import { useSelector, useDispatch } from 'react-redux';

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.price} ₸ x {item.quantity}
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
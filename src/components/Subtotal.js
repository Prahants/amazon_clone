import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../providers/StateProvider';
import { getBasketTotal } from '../providers/reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();

  const handleProceedToCheckout = () => {
    if (basket.length === 0) {
      alert('BASKET IS EMPTY');
    } else {
      // Navigate to the address form page
      history.push('/address');
    }
  };

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
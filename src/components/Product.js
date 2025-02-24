import React from 'react';
import './Product.css';
import { useStateValue } from '../providers/StateProvider';
import { Link } from 'react-router-dom';

function Product({ id, title, image, price, rating, description }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
      },
    });
  };

  return (
    <div className='product'>
      <Link to={{
        pathname: `/product/${id}`,
        state: { id, title, image, price, rating, description }
      }} className='product__link'>
        <div className='product__info'>
          <p>{title}</p>
          <p className='product__price'>
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className='product__rating'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
        </div>
        <img className='product__image' src={image} alt={title} />
      </Link>
      <div className='product__buttons'>
        <button onClick={addToBasket} className='add-to-cart'>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
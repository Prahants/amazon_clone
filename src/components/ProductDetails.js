import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useStateValue } from '../providers/StateProvider';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  const product = location.state;
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock additional images (in real app, these would come from product data)
  const productImages = [
    product?.image,
    product?.image, // Add more image variations in real implementation
    product?.image,
    product?.image,
  ];

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        description: product.description,
      },
    });
  };

  const handleBuyNow = () => {
    addToBasket();
    history.push('/address');
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="star-icon" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className="star-icon" />);
    }
    return stars;
  };

  return (
    <div className="productDetails">
      {/* Left Section - Image Gallery */}
      <div className="productDetails__left">
        <div className="productDetails__thumbnails">
          {productImages.map((img, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`${product.title} view ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="productDetails__mainImage">
          <img src={productImages[selectedImage]} alt={product.title} />
        </div>
      </div>

      {/* Right Section - Product Information */}
      <div className="productDetails__right">
        <div className="productDetails__header">
          <h1 className="productDetails__title">{product.title}</h1>
          <button className="share-button">
            <ShareIcon />
          </button>
        </div>

        <div className="productDetails__ratings">
          <div className="rating-stars">
            {renderRatingStars(product.rating)}
          </div>
          <span className="rating-count">1,228 ratings</span>
          <span className="separator">|</span>
          <span className="questions-count">100+ answered questions</span>
        </div>

        <div className="productDetails__price">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{product.price}</span>
          </div>
          <div className="original-price">
            M.R.P.: <strike>${(product.price * 1.1).toFixed(2)}</strike>
          </div>
          <div className="savings">You save: ${(product.price * 0.1).toFixed(2)} (10%)</div>
        </div>

        <div className="productDetails__delivery">
          <LocationOnIcon />
          <div className="delivery-info">
            <span className="delivery-location">Deliver to Your Location</span>
            <span className="delivery-time">FREE delivery Monday, 24 February</span>
          </div>
        </div>

        <div className="productDetails__offers">
          <h3>Available offers</h3>
          <div className="offer-item">
            <CreditCardIcon />
            <span>No Cost EMI available</span>
          </div>
          <div className="offer-item">
            <LocalShippingIcon />
            <span>Free Delivery</span>
          </div>
          <div className="offer-item">
            <SecurityIcon />
            <span>1 Year Warranty</span>
          </div>
        </div>

        <div className="productDetails__description">
          <h3>About this item</h3>
          <p>{product.description}</p>
        </div>

        <div className="productDetails__buttons">
          <button onClick={handleBuyNow} className="buy-now">
            Buy Now
          </button>
          <button onClick={addToBasket} className="add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
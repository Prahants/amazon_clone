import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddressForm.css';
import { useStateValue } from '../providers/StateProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AddressForm() {
  const [country, setCountry] = useState('India');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();
  const [, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show the popup instead of immediately redirecting
    setShowPopup(true);
    
    // Empty the basket
    dispatch({
      type: 'EMPTY_BASKET',
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    // Redirect to home page
    history.push('/');
  };

  return (
    <>
      <div className="addressForm">
        <h2>Enter Your Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="country">Country/Region</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              readOnly
            />
          </div>
          <div className="formGroup">
            <label htmlFor="fullName">Full name (First and Last name)</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="mobile">Mobile number</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="flat">Flat, House no., Building, Company, Apartment</label>
            <input
              type="text"
              id="flat"
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="area">Area, Street, Sector, Village</label>
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            <small>E.g. near Apollo hospital</small>
          </div>
          <div className="formGroup">
            <label htmlFor="city">Town/City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      {showPopup && (
        <>
          <div className="popup__backdrop" onClick={handlePopupClose} />
          <div className="popup">
            <CheckCircleIcon className="popup__icon" />
            <h3>Order Confirmed!</h3>
            <p>Your order will be delivered to the provided address.</p>
            <p>Estimated delivery: 2-3 business days</p>
            <button className="popup__button" onClick={handlePopupClose}>
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AddressForm;
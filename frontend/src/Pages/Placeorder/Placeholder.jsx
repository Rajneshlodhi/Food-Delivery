import React, { useContext, useEffect, useState } from 'react';
import './Placeholder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Placeholder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const navigate= useNavigate()


  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value; // fixed typo here from `valuel`
    setData(data => ({ ...data, [name]: value }));
  };
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
 
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,

    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const { success_url } = response.data;
      window.location.href = success_url; // or just session.url

    } else {
      alert("Error")
    }


}


useEffect(()=>{
  if(!token){
    navigate('/cart')
  }
  else if(getTotalCartAmount()===0)
  {
    navigate('/cart')
  }
},[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type='text'
            placeholder='First name'
            required
          />
          <input
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type='text'
            placeholder='Last name'
            required

          />
        </div>
        <input
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type='email'
          placeholder='Enter email'
          required
        />
        <input
          name='address'
          onChange={onChangeHandler}
          value={data.street}
          type='text'
          placeholder='address'
          required
        />
        <div className='multi-fields'>
          <input
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type='text'
            placeholder='City'
            required
          />
          <input
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type='text'
            placeholder='State'
            required
          />
        </div>
        <div className='multi-fields'>
          <input
            name='pincode'
            onChange={onChangeHandler}
            value={data.pincode}
            type='text'
            placeholder='Pincode'
            required
          />
          <input
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type='text'
            placeholder='Country'
            required
          />
        </div>
        <input
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type='text'
          placeholder='Phone'
          required
        />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placeholder;

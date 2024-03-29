import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory()

    const handleProceedCheckout =() =>{
        history.push("/shipment");
    }

    const removeProduct = (productKey) => {
        // console.log('remove',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const  cartProducts = productKeys.map(key =>{
          const product = fakeData.find(pd => pd.key === key);
          product.quantity = savedCart[key];
          return product
      });
       setCart(cartProducts);
    },[])

    //img

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={HappyImg} alt=""/>
    }
    return (
        <div  className=" cart-container">

           <div className="products-container">
           <h2>cart Items:{cart.length}</h2>
          {
              cart.map(pd => <ReviewItem product ={pd} key ={pd.key} removeProduct = {removeProduct}></ReviewItem>)
          }
          { thankYou }
            </div>
            <div className="cart-container">
               <Cart cart={cart}><button onClick={handleProceedCheckout} className='add-button'>Proceed Checkout</button></Cart>
            </div>
        </div>
    );
};

export default Review;
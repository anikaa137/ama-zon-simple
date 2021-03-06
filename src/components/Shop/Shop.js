import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';



const Shop = () => {
    const first15 = fakeData.slice(0, 10);
    const [products, ] = useState(first15);
    const [cart, setCart] = useState ([])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCount = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            
            product.quantity = savedCart[existingKey];
            return product;
        })
        // console.log (saveCart, productKeys,first15)
        setCart(previousCount)
    },[])
    const handleAddProduct = (product) =>{
    //  console.log( product )
        const toBeAddedKey = product.key;

        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);

        let count = 1;
        let newCart;

        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count; 
            const others = cart.filter(pd => pd.key !== toBeAddedKey);

            newCart = [...others , sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart , product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (

        <div className=" cart-container">
            <div className="products-container">
                {
                 products.map(pdt => <Product product={pdt} handleAddProduct = {handleAddProduct} showAddToCart = {true} key = {pdt.key}> </Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}><Link to ='/Review'><button className='add-button'> Review Order</button> </Link></Cart>
            </div>
        </div>
    );
};

export default Shop;

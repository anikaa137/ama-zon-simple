import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props)
    const {img,name,seller,price,stock}=props.product
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className='product-info'>
                <h3 className='product-name'>{name}</h3>
                <p><small>by{seller}</small></p>
                <p>{price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button className='add-button' onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart}/>  add to cart</button>
            </div>
           
        </div>
    );
};

export default Product;
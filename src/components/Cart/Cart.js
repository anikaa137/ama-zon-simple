import React from 'react';
const Cart = (props) => {
    const cart = props.cart
    // const total = cart.reduce((total, prd)=> total+prd.price * prd.quantity,0)
  
    let total = 0;
    for(let i=0; i < cart.length; i++){
        const prd = cart[i];
        total = total + prd.price * prd.quantity;
    }
    
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }else if(total > 15){
        shipping = 4.99;
    }else if(total > 0){
        shipping = 0
    }
    
    const tax = Math.round(total / 10);
    
    const grandTotal = Math.round(total + shipping + tax)

    // const formatNumber = num => {
    //     const precision =Math.round(num);
    //     return Number(precision)
    // }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered:{cart.length}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p>Tax + Vat: {tax}</p>
            {/* <p>Total Price :{formatNumber(grandTotal)}</p> */}
            <p>Total Price :{grandTotal}</p>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;
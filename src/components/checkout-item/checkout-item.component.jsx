import { Fragment, useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } =
        useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            {/* <button onClick={decreaseCartItemQuantity}> {'<'} </button> */}
            <span className='quantity'>
                <div className='arrow' onClick={addItemHandler}>
                    &#10094
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={removeItemHandler}>
                    &#0095
                </div>
            </span>
            {/* <button onClick={() => addItemToCart(cartItem)}> {'>'} </button> */}
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;

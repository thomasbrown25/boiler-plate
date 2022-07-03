import './cart-item.styles.scss';

const CartItem = ({ cartItem: { name, quantity } }) => {
    return (
        <div>
            <h2>{name}</h2>
            <span>{quantity}</span>
        </div>
    );
};

export default CartItem;

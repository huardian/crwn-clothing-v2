import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemToCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";
import { CheckoutItemContainer, ImageContainer } from "./checkout-item.styles";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemToCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

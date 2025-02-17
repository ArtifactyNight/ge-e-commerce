import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product & { selectedSize?: string } }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart from storage:", error);
  }
  return {
    items: [],
    total: 0,
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        const { selectedSize, ...product } = action.payload;
        newState = {
          ...state,
          items: [...state.items, { product, quantity: 1, selectedSize }],
        };
      }
      break;
    }
    case "REMOVE_ITEM": {
      newState = {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
      break;
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity === 0) {
        newState = {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.payload.productId
          ),
        };
      } else {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      }
      break;
    }
    case "CLEAR_CART":
      newState = {
        items: [],
        total: 0,
      };
      break;
    default:
      return state;
  }

  // Calculate total
  newState.total = newState.items.reduce((total, item) => {
    const price =
      item.product.packagingSizes && item.selectedSize
        ? item.product.packagingSizes.find((s) => s.size === item.selectedSize)
            ?.price || item.product.basePrice
        : item.product.basePrice;
    return total + price * item.quantity;
  }, 0);

  return newState;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCartFromStorage
  );

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

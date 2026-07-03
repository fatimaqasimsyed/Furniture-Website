import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product, WishlistItem } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewed: Product[];
  theme: 'light' | 'dark';
  isCartOpen: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity?: number; color?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: Product }
  | { type: 'ADD_RECENTLY_VIEWED'; payload: Product }
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_TOAST'; payload: AppState['toast'] };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  theme: 'light',
  isCartOpen: false,
  toast: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1, color } = action.payload;
      const existing = state.cart.find(item => item.product.id === product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product, quantity, selectedColor: color }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.find(w => w.product.id === action.payload.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter(w => w.product.id !== action.payload.id)
          : [...state.wishlist, { product: action.payload }],
      };
    }
    case 'ADD_RECENTLY_VIEWED': {
      const filtered = state.recentlyViewed.filter(p => p.id !== action.payload.id);
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 6),
      };
    }
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('tfg-theme', newTheme);
      return { ...state, theme: newTheme };
    }
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_TOAST':
      return { ...state, toast: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
  addRecentlyViewed: (product: Product) => void;
  cartTotal: number;
  cartCount: number;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const savedTheme = localStorage.getItem('tfg-theme') as 'light' | 'dark' | null;
    const savedCart = localStorage.getItem('tfg-cart');
    const savedWishlist = localStorage.getItem('tfg-wishlist');
    const theme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    return {
      ...init,
      theme,
      cart: savedCart ? JSON.parse(savedCart) : [],
      wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
    };
  });

  // Persist cart and wishlist
  useEffect(() => {
    localStorage.setItem('tfg-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('tfg-wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  // Auto-dismiss toast
  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(() => dispatch({ type: 'SET_TOAST', payload: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.toast]);

  const addToCart = (product: Product, quantity = 1, color?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, color } });
    showToast(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const toggleWishlist = (product: Product) => {
    const exists = state.wishlist.find((w: WishlistItem) => w.product.id === product.id);
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    showToast(exists ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  const isInWishlist = (id: number) => state.wishlist.some((w: WishlistItem) => w.product.id === id);

  const addRecentlyViewed = (product: Product) => {
    dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: product });
  };

  const cartTotal = state.cart.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);
  const cartCount = state.cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    dispatch({ type: 'SET_TOAST', payload: { message, type } });
  };

  return (
    <AppContext.Provider value={{
      state, dispatch, addToCart, removeFromCart,
      toggleWishlist, isInWishlist, addRecentlyViewed, cartTotal, cartCount, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dbService } from '../services/db';
import { User, Product, CartItem, Coupon, Order, Address } from '../types';

interface ShopContextType {
  currentUser: User | null;
  cart: CartItem[];
  wishlist: string[];
  activeCoupon: Coupon | null;
  isLoading: boolean;
  authError: string | null;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (fullName: string, phone: string) => Promise<void>;
  manageAddress: (action: 'add' | 'edit' | 'delete', address: Partial<Address> & { id?: string }) => Promise<void>;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => Coupon | null;
  removeCoupon: () => void;
  createOrder: (orderData: Omit<Order, 'id' | 'created_at' | 'status'>) => Promise<Order>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize and load user, cart, wishlist
  useEffect(() => {
    const initializeShop = async () => {
      try {
        setIsLoading(true);
        // Load User
        const user = await dbService.auth.getCurrentUser();
        setCurrentUser(user);

        // Load Wishlist
        const savedWishlist = await dbService.wishlist.get();
        setWishlist(savedWishlist);

        // Load Cart from localStorage
        const savedCart = localStorage.getItem('wt_cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (err) {
        console.error('Error during shop initialization:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeShop();
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('wt_cart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  // Auth: SignUp
  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    setAuthError(null);
    try {
      const { user, error } = await dbService.auth.signUp(email, password, fullName);
      if (error) {
        setAuthError(error);
        return false;
      }
      setCurrentUser(user);
      return true;
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred during registration.');
      return false;
    }
  };

  // Auth: SignIn
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setAuthError(null);
    try {
      const { user, error } = await dbService.auth.signIn(email, password);
      if (error) {
        setAuthError(error);
        return false;
      }
      setCurrentUser(user);
      return true;
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred during sign-in.');
      return false;
    }
  };

  // Auth: SignOut
  const signOut = async () => {
    await dbService.auth.signOut();
    setCurrentUser(null);
    setCart([]);
    setWishlist([]);
    setActiveCoupon(null);
  };

  // Auth: Update Profile
  const updateProfile = async (fullName: string, phone: string) => {
    const updatedUser = await dbService.auth.updateProfile(fullName, phone);
    setCurrentUser(updatedUser);
  };

  // Auth: Manage Address
  const manageAddress = async (action: 'add' | 'edit' | 'delete', address: Partial<Address> & { id?: string }) => {
    const updatedUser = await dbService.auth.manageAddress(action, address);
    setCurrentUser(updatedUser);
  };

  // Cart: Add To Cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const newQty = updatedCart[existingItemIndex].quantity + quantity;
        updatedCart[existingItemIndex].quantity = Math.min(newQty, product.stock_quantity);
        return updatedCart;
      }
      return [...prevCart, { product, quantity: Math.min(quantity, product.stock_quantity) }];
    });
  };

  // Cart: Update Quantity
  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.min(quantity, item.product.stock_quantity) };
        }
        return item;
      })
    );
  };

  // Cart: Remove From Cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Cart: Clear Cart
  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Wishlist: Toggle
  const toggleWishlist = async (productId: string) => {
    const updatedList = await dbService.wishlist.toggle(productId);
    setWishlist(updatedList);
  };

  // Wishlist: Is In Wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  // Coupon: Apply
  const applyCoupon = (code: string): Coupon | null => {
    const coupon = dbService.coupons.validate(code);
    if (coupon) {
      setActiveCoupon(coupon);
    }
    return coupon;
  };

  // Coupon: Remove
  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  // Orders: Create Order
  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order> => {
    const order = await dbService.orders.create(orderData);
    clearCart();
    return order;
  };

  return (
    <ShopContext.Provider value={{
      currentUser,
      cart,
      wishlist,
      activeCoupon,
      isLoading,
      authError,
      signUp,
      signIn,
      signOut,
      updateProfile,
      manageAddress,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      applyCoupon,
      removeCoupon,
      createOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

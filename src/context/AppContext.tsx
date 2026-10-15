'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  ServiceItem,
  Mechanic,
  CartItem,
  Order,
  ServiceRequest,
  VehicleSelection,
  OrderStatus,
  ServiceRequestStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_SERVICES,
  INITIAL_MECHANICS,
  INITIAL_ORDERS,
  INITIAL_SERVICE_REQUESTS
} from '../data/mockData';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  services: ServiceItem[];
  mechanics: Mechanic[];
  orders: Order[];
  serviceRequests: ServiceRequest[];
  cart: CartItem[];
  userRole: 'customer' | 'admin';
  savedGarage: VehicleSelection | null;
  searchTerm: string;
  selectedCategory: string | null;
  selectedBrand: string | null;
  activeModal: 'cart' | 'checkout' | 'service-book' | 'quick-view' | 'track-order' | 'report' | null;
  quickViewProduct: Product | null;
  selectedServiceForBooking: ServiceItem | null;
  trackingOrderId: string | null;
  toasts: ToastItem[];
  couponDiscountPercent: number;
  appliedCouponCode: string;

  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (catId: string | null) => void;
  setSelectedBrand: (brandId: string | null) => void;
  setUserRole: (role: 'customer' | 'admin') => void;
  setSavedGarage: (garage: VehicleSelection | null) => void;
  setActiveModal: (modal: 'cart' | 'checkout' | 'service-book' | 'quick-view' | 'track-order' | 'report' | null) => void;
  setQuickViewProduct: (prod: Product | null) => void;
  setSelectedServiceForBooking: (serv: ServiceItem | null) => void;
  setTrackingOrderId: (orderId: string | null) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;

  // Order operations
  placeOrder: (orderData: Omit<Order, 'id' | 'dateCreated' | 'trackingNumber' | 'courierName' | 'status'>) => Order;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Service operations
  bookServiceRequest: (requestData: Omit<ServiceRequest, 'id' | 'dateCreated' | 'status'>) => ServiceRequest;
  updateServiceStatus: (requestId: string, status: ServiceRequestStatus) => void;
  assignMechanicToService: (requestId: string, mechanicId: string) => void;

  // Admin Product operations
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (productId: string, quantity: number) => void;

  // Toast
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [brands] = useState<Brand[]>(INITIAL_BRANDS);
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [mechanics, setMechanics] = useState<Mechanic[]>(INITIAL_MECHANICS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userRole, setUserRole] = useState<'customer' | 'admin'>('customer');
  const [savedGarage, setSavedGarage] = useState<VehicleSelection | null>({
    year: '2022',
    make: 'Honda',
    model: 'Civic'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'cart' | 'checkout' | 'service-book' | 'quick-view' | 'track-order' | 'report' | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>('ORD-84920');
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');

  // Hydrate cart from localStorage if present
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('apesw_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('apesw_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
      }
    });
    showToast(`Added ${quantity}x "${product.name.slice(0, 32)}..." to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'APESW10' || clean === 'AUTOPARTS10') {
      setCouponDiscountPercent(10);
      setAppliedCouponCode(clean);
      showToast('Promo code applied: 10% Discount!', 'success');
      return true;
    } else if (clean === 'VIP20') {
      setCouponDiscountPercent(20);
      setAppliedCouponCode(clean);
      showToast('VIP code applied: 20% Discount!', 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try "APESW10"', 'error');
      return false;
    }
  };

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'dateCreated' | 'trackingNumber' | 'courierName' | 'status'>
  ): Order => {
    const randomRef = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = 'TRK-IND-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const dateCreated = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      ...orderData,
      id: randomRef,
      dateCreated,
      trackingNumber,
      courierName: 'Apex Express Logistics',
      status: 'Confirmed'
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const orderedItem = orderData.items.find((item) => item.productId === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(newOrder.id);
    showToast(`Order ${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' as OrderStatus } : o))
    );
    showToast(`Order ${orderId} has been cancelled`, 'info');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order ${orderId} updated to ${status}`, 'success');
  };

  const bookServiceRequest = (
    requestData: Omit<ServiceRequest, 'id' | 'dateCreated' | 'status'>
  ): ServiceRequest => {
    const randomId = 'SRV-' + Math.floor(100 + Math.random() * 900);
    const now = new Date();
    const dateCreated = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Pick a mechanic
    const availableMech = mechanics.find((m) => m.status === 'active') || mechanics[0];

    const newRequest: ServiceRequest = {
      ...requestData,
      id: randomId,
      dateCreated,
      status: 'Assigned',
      mechanicId: availableMech?.id,
      mechanicName: availableMech ? `${availableMech.name} (${availableMech.specialty.split(' ')[0]})` : 'Assigned Soon'
    };

    setServiceRequests((prev) => [newRequest, ...prev]);
    showToast(`Service appointment ${randomId} confirmed!`, 'success');
    return newRequest;
  };

  const updateServiceStatus = (requestId: string, status: ServiceRequestStatus) => {
    setServiceRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    showToast(`Service ${requestId} updated to ${status}`, 'success');
  };

  const assignMechanicToService = (requestId: string, mechanicId: string) => {
    const mech = mechanics.find((m) => m.id === mechanicId);
    if (!mech) return;

    setServiceRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              mechanicId,
              mechanicName: `${mech.name} (${mech.specialty.split(' ')[0]})`,
              status: 'Assigned'
            }
          : r
      )
    );

    // Update mechanic job counter
    setMechanics((prev) =>
      prev.map((m) => (m.id === mechanicId ? { ...m, currentJobsCount: m.currentJobsCount + 1 } : m))
    );

    showToast(`Assigned ${mech.name} to service ${requestId}`, 'success');
  };

  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = 'prod-' + String(products.length + 1).padStart(3, '0');
    const newProduct: Product = {
      ...productData,
      id: newId
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name.slice(0, 24)}" added to catalog!`, 'success');
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`Product ${updatedProduct.partNumber} updated`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted from inventory', 'info');
  };

  const updateStock = (productId: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, quantity) } : p))
    );
    showToast('Stock quantity updated', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        brands,
        services,
        mechanics,
        orders,
        serviceRequests,
        cart,
        userRole,
        savedGarage,
        searchTerm,
        selectedCategory,
        selectedBrand,
        activeModal,
        quickViewProduct,
        selectedServiceForBooking,
        trackingOrderId,
        toasts,
        couponDiscountPercent,
        appliedCouponCode,
        setSearchTerm,
        setSelectedCategory,
        setSelectedBrand,
        setUserRole,
        setSavedGarage,
        setActiveModal,
        setQuickViewProduct,
        setSelectedServiceForBooking,
        setTrackingOrderId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
        bookServiceRequest,
        updateServiceStatus,
        assignMechanicToService,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

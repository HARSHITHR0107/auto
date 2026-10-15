export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryId: string;
  brandId: string;
  partNumber: string;
  price: number;
  originalPrice: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  compatibleModels: string[];
  specifications: Record<string, string>;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  origin: string;
  description: string;
  partsCount: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
  includes: string[];
  recommendedInterval: string;
}

export interface Mechanic {
  id: string;
  name: string;
  contact: string;
  email: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  status: 'active' | 'inactive';
  currentJobsCount: number;
  avatar: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'Credit/Debit Card' | 'UPI / QR' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  status: OrderStatus;
  dateCreated: string;
  estimatedDelivery: string;
  trackingNumber: string;
  courierName: string;
}

export type ServiceRequestStatus = 'Pending' | 'Assigned' | 'Inspection' | 'In Progress' | 'Completed' | 'Cancelled';

export interface ServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegNo: string;
  fuelType: 'Petrol' | 'Diesel' | 'EV' | 'Hybrid' | 'CNG';
  serviceType: 'Doorstep Mobile Mechanic' | 'Workshop Drop-off';
  address?: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  notes?: string;
  mechanicId?: string;
  mechanicName?: string;
  status: ServiceRequestStatus;
  dateCreated: string;
}

export interface VehicleSelection {
  year: string;
  make: string;
  model: string;
}

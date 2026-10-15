'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    cart,
    placeOrder,
    couponDiscountPercent,
    setTrackingOrderId
  } = useApp();

  // Form State
  const [customerName, setCustomerName] = useState('Sree Harish P K');
  const [customerEmail, setCustomerEmail] = useState('sreeharish.pk@apesw.edu.in');
  const [customerPhone, setCustomerPhone] = useState('+91 98450 12345');
  const [shippingAddress, setShippingAddress] = useState('42, Hennur Main Road, Kalyan Nagar');
  const [city, setCity] = useState('Bangalore');
  const [postalCode, setPostalCode] = useState('560043');
  const [paymentMethod, setPaymentMethod] = useState<'UPI / QR' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery'>('UPI / QR');

  // Success state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (activeModal !== 'checkout') return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleClose = () => {
    setActiveModal(null);
    setPlacedOrder(null);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      brand: item.product.brand,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));

    const order = placeOrder({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      postalCode,
      items: orderItems,
      subtotal,
      discount: discountAmount,
      shippingFee,
      totalAmount: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      estimatedDelivery: 'Within 2-3 Business Days'
    });

    setPlacedOrder(order);
  };

  const handleTrackNewOrder = () => {
    if (placedOrder) {
      setTrackingOrderId(placedOrder.id);
      setActiveModal('track-order');
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.2rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={18} color="#34d399" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {placedOrder ? 'Order Confirmed!' : 'Secure Checkout & Delivery'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            style={{ color: '#94a3b8', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Checkout Form OR Success Receipt */}
        {placedOrder ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem',
              border: '2px solid rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={36} color="#34d399" />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
              Thank You! Your Order has been Placed.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We have generated your order reference and assigned it to our automated packing & dispatch center.
            </p>

            {/* Order Reference Box */}
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              maxWidth: '440px',
              margin: '0 auto 1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Order Reference:</span>
                <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{placedOrder.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Courier Tracking:</span>
                <span style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>{placedOrder.trackingNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Total Paid:</span>
                <strong style={{ color: '#f8fafc' }}>₹{placedOrder.totalAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Payment Method:</span>
                <span style={{ color: '#34d399' }}>{placedOrder.paymentMethod}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={handleTrackNewOrder}
                className="btn-primary"
                style={{ padding: '0.8rem 1.6rem' }}
              >
                <PackageCheck size={18} /> Track Package Live
              </button>
              <button
                onClick={handleClose}
                className="btn-secondary"
                style={{ padding: '0.8rem 1.4rem' }}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} style={{ padding: '1.8rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {/* Section 1: Customer Contact */}
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  1. Contact Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <div>
                    <label className="label-control">Full Name</label>
                    <input
                      type="text"
                      className="input-control"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label-control">Phone Number</label>
                    <input
                      type="text"
                      className="input-control"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="label-control">Email Address</label>
                    <input
                      type="email"
                      className="input-control"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  2. Shipping & Delivery Address
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label className="label-control">Street Address / Landmark</label>
                    <input
                      type="text"
                      className="input-control"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label className="label-control">City</label>
                      <input
                        type="text"
                        className="input-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="label-control">Postal / PIN Code</label>
                      <input
                        type="text"
                        className="input-control"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method Selection */}
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  3. Payment Method
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'UPI / QR', label: 'UPI / QR', icon: QrCode },
                    { id: 'Credit/Debit Card', label: 'Card', icon: CreditCard },
                    { id: 'Cash on Delivery', label: 'Pay on Delivery', icon: Truck }
                  ].map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        style={{
                          background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-input)',
                          border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Icon size={20} color={isSelected ? '#60a5fa' : '#94a3b8'} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                          {pm.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Payment Notice */}
                {paymentMethod === 'UPI / QR' && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(6, 182, 212, 0.08)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    fontSize: '0.78rem',
                    color: '#67e8f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <QrCode size={16} /> Instant UPI scan via GPay / PhonePe / Paytm enabled upon submission.
                  </div>
                )}
              </div>

              {/* Order Items & Cost Summary Box */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Items in Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#34d399', marginBottom: '6px' }}>
                    <span>Discount Savings</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Shipping</span>
                  <span style={{ color: shippingFee === 0 ? '#34d399' : '#e2e8f0', fontWeight: 600 }}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: '#f8fafc'
                }}>
                  <span>Payable Amount</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                Place Order & Confirm (₹{grandTotal.toLocaleString('en-IN')}) <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

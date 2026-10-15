'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  CheckCircle2,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    cart,
    removeFromCart,
    updateCartQuantity,
    applyCoupon,
    couponDiscountPercent,
    appliedCouponCode
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  if (activeModal !== 'cart') return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setActiveModal('checkout');
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        style={{
          background: 'var(--bg-secondary)',
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.7)',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style jsx>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div style={{
          padding: '1.2rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Your Shopping Cart</h3>
            <span className="badge badge-blue">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            style={{ color: '#94a3b8', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.08)',
          padding: '10px 1.5rem',
          borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#cbd5e1'
        }}>
          <Truck size={16} color="#38bdf8" />
          {subtotal >= 1500 ? (
            <span style={{ color: '#34d399', fontWeight: 600 }}>
              🎉 You qualified for FREE Express Delivery!
            </span>
          ) : (
            <span>
              Add <strong>₹{(1500 - subtotal).toLocaleString('en-IN')}</strong> more for Free Shipping
            </span>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: '#94a3b8'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <ShoppingBag size={28} color="#64748b" />
              </div>
              <h4 style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '240px' }}>
                Browse our auto parts catalog and add components to your order.
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      background: '#0d131f'
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600 }}>
                          {item.product.brand}
                        </span>
                        <h5 style={{
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          lineHeight: 1.3,
                          marginTop: '2px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {item.product.name}
                        </h5>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: '#64748b', padding: '2px', cursor: 'pointer' }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: '2px 8px', fontSize: '0.8rem', color: '#cbd5e1' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 4px', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: '2px 8px', fontSize: '0.8rem', color: '#cbd5e1' }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Breakdown */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.2rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'var(--bg-primary)'
          }}>
            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Coupon code (Try APESW10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="input-control"
                  style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                />
              </div>
              <button
                type="submit"
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                Apply
              </button>
            </form>

            {appliedCouponCode && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#34d399',
                marginBottom: '10px'
              }}>
                <CheckCircle2 size={13} />
                <span>Coupon &apos;{appliedCouponCode}&apos; Applied (-{couponDiscountPercent}%)</span>
              </div>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Subtotal</span>
                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                  <span>Discount ({couponDiscountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Shipping Fee</span>
                <span style={{ color: shippingFee === 0 ? '#34d399' : '#e2e8f0', fontWeight: 600 }}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#f8fafc'
              }}>
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 700
              }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

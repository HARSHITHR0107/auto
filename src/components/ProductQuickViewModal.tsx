'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShoppingCart,
  ShieldCheck,
  Star,
  CheckCircle2,
  Car,
  Truck,
  RotateCcw,
  Zap
} from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    savedGarage
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (activeModal !== 'quick-view' || !quickViewProduct) return null;

  const handleClose = () => {
    setActiveModal(null);
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setActiveModal(null);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity);
    setActiveModal('checkout');
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '820px' }}
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
            <span className="badge badge-blue">{quickViewProduct.brand}</span>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
              Part #{quickViewProduct.partNumber}
            </span>
          </div>

          <button
            onClick={handleClose}
            style={{ color: '#94a3b8', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Left: Product Image */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: '#0d131f',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '1rem'
            }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
              />
            </div>

            {/* Trust Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>100% Genuine OEM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <Truck size={16} color="#38bdf8" />
                <span>Express Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <RotateCcw size={16} color="#f59e0b" />
                <span>10-Day Easy Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <Zap size={16} color="#a855f7" />
                <span>Warranty Protected</span>
              </div>
            </div>
          </div>

          {/* Right: Specs & Purchasing */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '8px' }}>
              {quickViewProduct.name}
            </h3>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', fontSize: '0.85rem' }}>
                <Star size={15} fill="#f59e0b" color="#f59e0b" />
                <span style={{ marginLeft: '4px', fontWeight: 700 }}>{quickViewProduct.rating}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                ({quickViewProduct.reviewsCount} verified customer reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span style={{ fontSize: '0.95rem', color: '#64748b', textDecoration: 'line-through' }}>
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="badge badge-emerald" style={{ marginLeft: 'auto' }}>
                In Stock ({quickViewProduct.stock} units)
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.2rem' }}>
              {quickViewProduct.description}
            </p>

            {/* Technical Specifications */}
            <div style={{ marginBottom: '1.2rem' }}>
              <h5 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '8px' }}>
                Technical Specifications
              </h5>
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {Object.entries(quickViewProduct.specifications).map(([key, val], idx) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '7px 12px',
                      fontSize: '0.78rem',
                      background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                    }}
                  >
                    <span style={{ color: '#94a3b8' }}>{key}</span>
                    <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatible Models */}
            <div style={{ marginBottom: '1.4rem' }}>
              <h5 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '6px' }}>
                Guaranteed Fitment Models
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {quickViewProduct.compatibleModels.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: '0.72rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <Car size={11} style={{ display: 'inline', marginRight: '4px' }} />
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '4px 8px'
              }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ color: '#e2e8f0', padding: '4px 8px', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))}
                  style={{ color: '#e2e8f0', padding: '4px 8px', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem' }}
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-amber"
                style={{ padding: '0.75rem 1.2rem', fontSize: '0.9rem' }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

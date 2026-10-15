'use client';

import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  ShoppingCart,
  Eye,
  Star,
  CheckCircle2,
  AlertTriangle,
  Tag
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct, setActiveModal, savedGarage } = useApp();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Check compatibility with savedGarage
  const isCompatible = savedGarage
    ? product.compatibleModels.some(
        (m) =>
          m.toLowerCase().includes(savedGarage.make.toLowerCase()) ||
          m.toLowerCase().includes(savedGarage.model.toLowerCase())
      )
    : false;

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setActiveModal('quick-view');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="glass-panel hover-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={handleQuickView}
    >
      {/* Top Badges */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <span className="badge badge-blue" style={{ pointerEvents: 'auto', background: 'rgba(15, 23, 42, 0.85)' }}>
          {product.brand}
        </span>

        {discountPercent > 0 && (
          <span className="badge badge-amber" style={{ pointerEvents: 'auto', background: 'rgba(245, 158, 11, 0.9)', color: '#000000', fontWeight: 800 }}>
            <Tag size={11} /> {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '65%',
        background: '#0d131f',
        overflow: 'hidden'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="product-img-hover"
        />

        {/* Quick View Floating Button */}
        <button
          onClick={handleQuickView}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#f8fafc',
            borderRadius: 'var(--radius-full)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.75rem',
            fontWeight: 600,
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            transition: 'all 0.2s'
          }}
        >
          <Eye size={13} /> Quick Specs
        </button>
      </div>

      {/* Product Details Body */}
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Part Number & Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
            {product.partNumber}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h4 style={{
          fontSize: '0.98rem',
          fontWeight: 700,
          color: '#f8fafc',
          lineHeight: 1.4,
          marginBottom: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.name}
        </h4>

        {/* Vehicle Fitment Alert */}
        <div style={{ marginBottom: '10px' }}>
          {savedGarage && isCompatible ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              color: '#34d399',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <CheckCircle2 size={12} /> Fits your {savedGarage.make} {savedGarage.model}
            </div>
          ) : savedGarage ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              color: '#94a3b8',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              Check compatibility
            </div>
          ) : null}
        </div>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', fontSize: '0.8rem' }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span style={{ marginLeft: '4px', fontWeight: 700 }}>{product.rating}</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            ({product.reviewsCount} reviews)
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: product.stock < 10 ? '#f43f5e' : '#34d399', fontWeight: 600 }}>
            {product.stock < 10 ? `Only ${product.stock} left` : `In Stock (${product.stock})`}
          </span>
        </div>

        {/* Price & Action Row */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '0.75rem', color: '#64748b', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary"
            style={{
              padding: '7px 14px',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

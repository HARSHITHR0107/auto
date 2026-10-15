'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  Search,
  RotateCcw,
  ShieldCheck,
  User
} from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderTrackerModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    trackingOrderId,
    setTrackingOrderId,
    orders,
    cancelOrder
  } = useApp();

  const [inputOrderRef, setInputOrderRef] = useState('');

  if (activeModal !== 'track-order') return null;

  const currentOrder = orders.find((o) => o.id === trackingOrderId) || orders[0];

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === inputOrderRef.trim().toLowerCase());
    if (found) {
      setTrackingOrderId(found.id);
      setInputOrderRef('');
    } else {
      alert(`No order found matching "${inputOrderRef}". Try ORD-84920 or ORD-72914`);
    }
  };

  const stages: { label: OrderStatus; desc: string }[] = [
    { label: 'Confirmed', desc: 'Order verified & payment processed' },
    { label: 'Packed', desc: 'Auto parts packed & quality inspected' },
    { label: 'Out for Delivery', desc: 'With courier delivery agent' },
    { label: 'Delivered', desc: 'Delivered to recipient address' }
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Confirmed': return 0;
      case 'Packed': return 1;
      case 'Dispatched': return 2;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      case 'Cancelled': return -1;
      default: return 0;
    }
  };

  const currentStageIndex = currentOrder ? getStageIndex(currentOrder.status) : 0;
  const isCancelled = currentOrder?.status === 'Cancelled';

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: '720px' }}
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
            <Package size={20} color="#a855f7" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Live Order & Package Tracking
            </h3>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            style={{ color: '#94a3b8', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.8rem' }}>
          {/* Search by reference code */}
          <form onSubmit={handleSearchOrder} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Enter Order Reference (e.g. ORD-84920, ORD-72914)..."
                value={inputOrderRef}
                onChange={(e) => setInputOrderRef(e.target.value)}
                className="input-control"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
            </div>
            <button
              type="submit"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Search size={15} /> Find Order
            </button>
          </form>

          {currentOrder && (
            <div>
              {/* Order Overview Banner */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.2rem 1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Order Ref:</span>
                    <strong style={{ fontSize: '1.05rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                      {currentOrder.id}
                    </strong>
                    <span className={`badge ${
                      currentOrder.status === 'Delivered' ? 'badge-emerald' :
                      currentOrder.status === 'Cancelled' ? 'badge-rose' : 'badge-amber'
                    }`}>
                      {currentOrder.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Placed on {currentOrder.dateCreated} • Courier: {currentOrder.courierName}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Estimated Delivery</div>
                  <strong style={{ fontSize: '0.95rem', color: '#34d399' }}>
                    {currentOrder.estimatedDelivery}
                  </strong>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              {!isCancelled ? (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', position: 'relative' }}>
                    {stages.map((stage, idx) => {
                      const isCompleted = idx <= currentStageIndex;
                      const isCurrent = idx === currentStageIndex;
                      return (
                        <div key={stage.label} style={{ textAlign: 'center', position: 'relative' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isCompleted ? '#2563eb' : 'var(--bg-input)',
                            border: isCurrent ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 8px',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            boxShadow: isCurrent ? '0 0 15px rgba(59, 130, 246, 0.6)' : 'none'
                          }}>
                            {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                          </div>

                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isCompleted ? '#f8fafc' : '#64748b' }}>
                            {stage.label}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#94a3b8', lineHeight: 1.2, marginTop: '2px' }}>
                            {stage.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '1rem',
                  background: 'rgba(244, 63, 94, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#fb7185'
                }}>
                  <AlertCircle size={20} />
                  <span>This order was cancelled. Refund processed back to your original payment source.</span>
                </div>
              )}

              {/* Order Items Table */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '8px' }}>
                  Ordered Auto Parts
                </h4>
                <div style={{
                  background: 'var(--bg-input)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden'
                }}>
                  {currentOrder.items.map((it) => (
                    <div
                      key={it.productId}
                      style={{
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={it.image}
                          alt={it.productName}
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                            {it.productName}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            Brand: {it.brand} | Qty: {it.quantity}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#e2e8f0' }}>
                        ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address & Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: '1.2rem',
                fontSize: '0.8rem'
              }}>
                <div>
                  <div style={{ color: '#94a3b8', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="#38bdf8" /> Destination Address:
                  </div>
                  <div style={{ color: '#cbd5e1', fontWeight: 600 }}>
                    {currentOrder.customerName}<br />
                    {currentOrder.shippingAddress}, {currentOrder.city} - {currentOrder.postalCode}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#94a3b8', marginBottom: '2px' }}>Total Amount:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                    ₹{currentOrder.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#34d399' }}>
                    Paid via {currentOrder.paymentMethod}
                  </div>
                </div>
              </div>

              {/* Cancel Order Action as implemented in VIEW_ORDER.PHP */}
              {!isCancelled && currentOrder.status !== 'Delivered' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel order ${currentOrder.id}?`)) {
                        cancelOrder(currentOrder.id);
                      }
                    }}
                    style={{
                      color: '#f43f5e',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={14} /> Cancel Order Request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

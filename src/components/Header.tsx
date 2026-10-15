'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  ShoppingCart,
  Search,
  ShieldCheck,
  FileText,
  Package,
  Layers,
  ChevronDown,
  Car,
  User,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { VEHICLE_DATABASE } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    cart,
    userRole,
    setUserRole,
    savedGarage,
    setSavedGarage,
    searchTerm,
    setSearchTerm,
    setActiveModal,
    setTrackingOrderId
  } = useApp();

  const [garageDropdownOpen, setGarageDropdownOpen] = useState(false);
  const [selectedMake, setSelectedMake] = useState('Honda');
  const [selectedModel, setSelectedModel] = useState('Civic');
  const [selectedYear, setSelectedYear] = useState('2022');

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleApplyGarage = () => {
    setSavedGarage({
      make: selectedMake,
      model: selectedModel,
      year: selectedYear
    });
    setGarageDropdownOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 14, 23, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Top Banner: Academic Project Notice & Quick Stats */}
      <div style={{
        background: 'linear-gradient(90deg, #1e3a8a 0%, #0f172a 50%, #1e293b 100%)',
        padding: '6px 0',
        fontSize: '0.8rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>BCA PROJECT 2024-25</span>
            <span style={{ color: '#cbd5e1' }}>
              Autonomous Project by <strong>Sree Harish P K, Varun K S & Venkat Bhanu Prasad</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setActiveModal('report')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#38bdf8',
                fontWeight: 600,
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <FileText size={13} /> View Full Report & UML Schemas
            </button>
            <span style={{ color: '#64748b' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot"></span>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Pan-India Express Dispatch Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '12px 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
            }}>
              <Wrench size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  APEX<span style={{ color: '#38bdf8' }}>AUTO</span>
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>APESW</span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '-3px' }}>
                Auto Parts & Certified Mechanics
              </p>
            </div>
          </a>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '440px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 12px 4px 16px',
            transition: 'border-color 0.2s'
          }}>
            <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search part name, OEM number (e.g. Brembo, Spark Plug)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.88rem'
              }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ color: '#94a3b8', padding: '4px' }}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Garage & Navigation Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* My Garage Vehicle Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setGarageDropdownOpen(!garageDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: savedGarage ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                border: savedGarage ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid var(--border-color)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                color: savedGarage ? '#93c5fd' : '#cbd5e1',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Car size={16} color={savedGarage ? '#60a5fa' : '#94a3b8'} />
              <span>
                {savedGarage ? `${savedGarage.year} ${savedGarage.make} ${savedGarage.model}` : 'Select Vehicle'}
              </span>
              <ChevronDown size={14} />
            </button>

            {/* Garage Dropdown Modal */}
            {garageDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '280px',
                background: 'var(--bg-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                zIndex: 200
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Select Your Garage</span>
                  <button onClick={() => setGarageDropdownOpen(false)} style={{ color: '#94a3b8' }}>
                    <X size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label className="label-control">Make</label>
                    <select
                      className="input-control"
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        setSelectedModel(VEHICLE_DATABASE.modelsByMake[e.target.value]?.[0] || '');
                      }}
                      style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                    >
                      {VEHICLE_DATABASE.makes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-control">Model</label>
                    <select
                      className="input-control"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                    >
                      {(VEHICLE_DATABASE.modelsByMake[selectedMake] || []).map((mod) => (
                        <option key={mod} value={mod}>{mod}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-control">Year</label>
                    <select
                      className="input-control"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                    >
                      {VEHICLE_DATABASE.years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleApplyGarage}
                    className="btn-primary"
                    style={{ marginTop: '8px', padding: '8px 12px', fontSize: '0.85rem' }}
                  >
                    Save Vehicle & Filter
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Role Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '2px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setUserRole('customer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: userRole === 'customer' ? 'var(--accent-blue)' : 'transparent',
                color: userRole === 'customer' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              <User size={13} /> Customer
            </button>
            <button
              onClick={() => setUserRole('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: userRole === 'admin' ? 'var(--accent-amber)' : 'transparent',
                color: userRole === 'admin' ? '#000000' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              <SlidersHorizontal size={13} /> Admin
            </button>
          </div>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setActiveModal('cart')}
            className="btn-primary"
            style={{
              padding: '7px 14px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={18} />
              {totalCartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #0f172a'
                }}>
                  {totalCartCount}
                </span>
              )}
            </div>
            <span>₹{totalCartValue.toLocaleString('en-IN')}</span>
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '6px 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={() => scrollToSection('catalog-section')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#e2e8f0',
                transition: 'color 0.2s'
              }}
            >
              <Layers size={15} color="#38bdf8" /> Auto Parts Catalog
            </button>

            <button
              onClick={() => scrollToSection('services-section')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#e2e8f0',
                transition: 'color 0.2s'
              }}
            >
              <Wrench size={15} color="#f59e0b" /> Mechanic & Services
            </button>

            <button
              onClick={() => scrollToSection('brands-section')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#e2e8f0',
                transition: 'color 0.2s'
              }}
            >
              <ShieldCheck size={15} color="#10b981" /> Authorized Brands
            </button>

            <button
              onClick={() => {
                setTrackingOrderId('ORD-84920');
                setActiveModal('track-order');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#e2e8f0',
                transition: 'color 0.2s'
              }}
            >
              <Package size={15} color="#a855f7" /> Live Order Tracking
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setActiveModal('report')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#93c5fd'
              }}
            >
              <FileText size={14} /> Academic Documentation & ERD
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { ServicesSection } from '../components/ServicesSection';
import { BrandsSection } from '../components/BrandsSection';
import { Footer } from '../components/Footer';
import { AdminDashboard } from '../components/AdminDashboard';
import {
  Layers,
  Filter,
  CheckCircle2,
  SlidersHorizontal,
  Car,
  Tag,
  ArrowUpDown,
  Sparkles,
  RotateCcw,
  Zap,
  Disc,
  Cpu,
  GitCommit,
  Droplet,
  Settings,
  Wind,
  CircleDot
} from 'lucide-react';

export default function HomePage() {
  const {
    products,
    categories,
    brands,
    userRole,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    savedGarage,
    setActiveModal
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock'>('featured');
  const [onlyCompatibleWithGarage, setOnlyCompatibleWithGarage] = useState(false);

  // Filter Products
  const filteredProducts = products.filter((p) => {
    // Search Term Filter
    if (searchTerm) {
      const match =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.compatibleModels.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!match) return false;
    }

    // Category Filter
    if (selectedCategory && p.categoryId !== selectedCategory && p.category !== selectedCategory) {
      return false;
    }

    // Brand Filter
    if (selectedBrand && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
      return false;
    }

    // Vehicle Garage Compatibility Filter
    if (onlyCompatibleWithGarage && savedGarage) {
      const isCompat = p.compatibleModels.some(
        (m) =>
          m.toLowerCase().includes(savedGarage.make.toLowerCase()) ||
          m.toLowerCase().includes(savedGarage.model.toLowerCase())
      );
      if (!isCompat) return false;
    }

    return true;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'stock': return b.stock - a.stock;
      default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Disc': return <Disc size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'GitCommit': return <GitCommit size={18} />;
      case 'Droplet': return <Droplet size={18} />;
      case 'Zap': return <Zap size={18} />;
      case 'Settings': return <Settings size={18} />;
      case 'Wind': return <Wind size={18} />;
      case 'CircleDot': return <CircleDot size={18} />;
      default: return <Layers size={18} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Main Content: Either Admin Dashboard or Customer Storefront */}
      {userRole === 'admin' ? (
        <main style={{ flex: 1 }}>
          <AdminDashboard />
        </main>
      ) : (
        <main style={{ flex: 1 }}>
          {/* Hero Banner with Fitment Widget */}
          <Hero />

          {/* Quick Category Navigation Strip */}
          <section style={{
            padding: '2.5rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(15, 23, 42, 0.3)'
          }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Browse by Category</h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {categories.length} Specialized Vehicle Systems
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                gap: '10px'
              }}>
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id || selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedCategory(null);
                        } else {
                          setSelectedCategory(cat.id);
                          const el = document.getElementById('catalog-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      style={{
                        background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-input)',
                        border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        color: isSelected ? '#ffffff' : '#cbd5e1'
                      }}
                    >
                      <div style={{ color: isSelected ? '#60a5fa' : '#94a3b8' }}>
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Auto Parts Catalog Section */}
          <section id="catalog-section" style={{
            padding: '4rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div className="container">
              {/* Section Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span className="badge badge-blue">
                      <Layers size={12} /> APESW E-Commerce Catalog
                    </span>
                  </div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    Precision <span className="gradient-text">Auto Parts</span> Store
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
                    Showing {sortedProducts.length} components matching your criteria
                  </p>
                </div>

                {/* Sort & Garage Fitment Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Garage filter toggle */}
                  {savedGarage && (
                    <button
                      onClick={() => setOnlyCompatibleWithGarage(!onlyCompatibleWithGarage)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        background: onlyCompatibleWithGarage ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: onlyCompatibleWithGarage ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                        color: onlyCompatibleWithGarage ? '#34d399' : '#cbd5e1',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Car size={15} />
                      <span>{onlyCompatibleWithGarage ? `Fit: ${savedGarage.make} ${savedGarage.model} (Active)` : `Filter for ${savedGarage.make} ${savedGarage.model}`}</span>
                    </button>
                  )}

                  {/* Brand Filter */}
                  <select
                    className="input-control"
                    value={selectedBrand || ''}
                    onChange={(e) => setSelectedBrand(e.target.value || null)}
                    style={{ width: 'auto', fontSize: '0.82rem', padding: '8px 12px' }}
                  >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    className="input-control"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{ width: 'auto', fontSize: '0.82rem', padding: '8px 12px' }}
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Customer Rating</option>
                    <option value="stock">In Stock First</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Badges */}
              {(selectedCategory || selectedBrand || searchTerm || onlyCompatibleWithGarage) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '1.8rem',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Active Filters:</span>

                  {selectedCategory && (
                    <span className="badge badge-blue">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory(null)} style={{ marginLeft: '4px' }}>✕</button>
                    </span>
                  )}

                  {selectedBrand && (
                    <span className="badge badge-blue">
                      Brand: {selectedBrand}
                      <button onClick={() => setSelectedBrand(null)} style={{ marginLeft: '4px' }}>✕</button>
                    </span>
                  )}

                  {searchTerm && (
                    <span className="badge badge-amber">
                      Search: &ldquo;{searchTerm}&rdquo;
                      <button onClick={() => setSearchTerm('')} style={{ marginLeft: '4px' }}>✕</button>
                    </span>
                  )}

                  {onlyCompatibleWithGarage && (
                    <span className="badge badge-emerald">
                      Fitment: {savedGarage?.make} {savedGarage?.model}
                      <button onClick={() => setOnlyCompatibleWithGarage(false)} style={{ marginLeft: '4px' }}>✕</button>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                      setSearchTerm('');
                      setOnlyCompatibleWithGarage(false);
                    }}
                    style={{
                      fontSize: '0.75rem',
                      color: '#f43f5e',
                      marginLeft: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={12} /> Clear All Filters
                  </button>
                </div>
              )}

              {/* Product Grid */}
              {sortedProducts.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'var(--bg-input)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>No Auto Parts Found</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                    No items in our catalog currently match all active filters. Try clearing your search term or brand selection.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                      setSearchTerm('');
                      setOnlyCompatibleWithGarage(false);
                    }}
                    className="btn-primary"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Promotional Deal Banner */}
          <section style={{
            padding: '2.5rem 0',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '6px' }}>
                  <Tag size={12} /> EXCLUSIVE COUPON CODE
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px' }}>
                  Get 10% Off Your First Auto Parts Order with code: <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>APESW10</span>
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                  Valid across all genuine OEM brake sets, filters, full-synthetic oils, and battery replacements.
                </p>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
                style={{ padding: '0.85rem 1.6rem' }}
              >
                Shop Discounted Parts Now
              </button>
            </div>
          </section>

          {/* Automotive Services & On-Demand Mechanics */}
          <ServicesSection />

          {/* Signed & Authorized Brands */}
          <BrandsSection />
        </main>
      )}

      <Footer />
    </div>
  );
}

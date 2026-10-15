'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Award } from 'lucide-react';

export const BrandsSection: React.FC = () => {
  const { brands, setSelectedBrand } = useApp();

  const handleSelectBrand = (brandName: string) => {
    setSelectedBrand(brandName);
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="brands-section" style={{
      padding: '4rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <Award size={12} /> Certified OEM Partnerships
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Authorized & Signed <span className="gradient-text">Automotive Brands</span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
            As highlighted in the APESW Brand Module (`tblbrand_list`): We source directly from authorized manufacturers to ensure 100% authenticity and full warranty validation.
          </p>
        </div>

        {/* Brands Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.4rem'
        }}>
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="glass-panel hover-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => handleSelectBrand(brand.name)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-blue">{brand.origin}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                    {brand.partsCount}+ Parts
                  </span>
                </div>

                <div style={{
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.01em', color: '#f8fafc' }}>
                    {brand.name}
                  </h3>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  {brand.description}
                </p>
              </div>

              <div style={{
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
                color: '#38bdf8',
                fontWeight: 600
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#34d399" /> Certified Partner
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Browse &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Truck,
  ArrowRight
} from 'lucide-react';
import { VEHICLE_DATABASE } from '../data/mockData';

export const Hero: React.FC = () => {
  const { setSavedGarage, setActiveModal } = useApp();

  const [selectedMake, setSelectedMake] = useState('Honda');
  const [selectedModel, setSelectedModel] = useState('Civic');
  const [selectedYear, setSelectedYear] = useState('2022');

  const handleFitmentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedGarage({
      make: selectedMake,
      model: selectedModel,
      year: selectedYear
    });

    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 3.5rem',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Background Accent Gradients */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.18) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Hero Headline & Action Points */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
              <span className="badge badge-blue">
                <Sparkles size={12} /> Next-Gen Automotive Hub
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                APESW Project Edition
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.2rem'
            }}>
              Precision <span className="gradient-text">Auto Parts</span> & On-Demand <span className="gradient-text-amber">Mechanics</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '540px'
            }}>
              Discover 100% genuine OEM & high-performance aftermarket parts with guaranteed vehicle compatibility. Need repair? Book certified doorstep mechanics with live job status.
            </p>

            {/* Quick Action Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '2.2rem',
              maxWidth: '520px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <span>100% Genuine OEM Warranty</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                <Truck size={16} color="#38bdf8" />
                <span>Express Doorstep Dispatch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                <Wrench size={16} color="#f59e0b" />
                <span>Certified Master Mechanics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="#a855f7" />
                <span>Exact Fitment Guarantee</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollToSection('catalog-section')}
                className="btn-primary"
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
              >
                Explore Auto Parts <ChevronRight size={18} />
              </button>

              <button
                onClick={() => scrollToSection('services-section')}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
              >
                <Wrench size={18} color="#f59e0b" /> Book Mechanic
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Fitment Finder Widget */}
          <div>
            <div className="glass-panel" style={{
              padding: '2rem',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(37, 99, 235, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #f59e0b)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Car size={20} color="#60a5fa" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Vehicle Fitment Finder</h3>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Select your vehicle to filter 100% compatible components
                  </p>
                </div>
              </div>

              <form onSubmit={handleFitmentSearch}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label className="label-control">1. Select Vehicle Make</label>
                    <select
                      className="input-control"
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        setSelectedModel(VEHICLE_DATABASE.modelsByMake[e.target.value]?.[0] || '');
                      }}
                    >
                      {VEHICLE_DATABASE.makes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-control">2. Select Vehicle Model</label>
                    <select
                      className="input-control"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                    >
                      {(VEHICLE_DATABASE.modelsByMake[selectedMake] || []).map((mod) => (
                        <option key={mod} value={mod}>{mod}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-control">3. Select Model Year</label>
                    <select
                      className="input-control"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {VEHICLE_DATABASE.years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      marginTop: '6px',
                      padding: '0.9rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em'
                    }}
                  >
                    Find Compatible Parts <ArrowRight size={18} />
                  </button>
                </div>
              </form>

              {/* Quick links under form */}
              <div style={{
                marginTop: '1.2rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem',
                color: '#94a3b8'
              }}>
                <span>Need immediate service?</span>
                <button
                  type="button"
                  onClick={() => setActiveModal('service-book')}
                  style={{ color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Book Instant Mechanic &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div style={{
          marginTop: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>14,500+</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.3 }}>
              Genuine OEM & Tuning Parts
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>100%</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.3 }}>
              Fitment Guarantee or Free Return
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>240+</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.3 }}>
              Certified On-Demand Mechanics
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>4.9 ★</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.3 }}>
              Customer Satisfaction Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

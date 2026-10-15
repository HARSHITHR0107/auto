'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  ShieldCheck,
  Package,
  FileText,
  MapPin,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react';
import { PROJECT_REPORT_METADATA } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setActiveModal, setTrackingOrderId } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      background: '#070a10',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      color: '#94a3b8',
      fontSize: '0.85rem',
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wrench size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                APEX<span style={{ color: '#38bdf8' }}>AUTO</span>
              </span>
              <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>APESW</span>
            </div>

            <p style={{ lineHeight: 1.6, marginBottom: '1.2rem', color: '#94a3b8' }}>
              The unified auto parts e-commerce and automotive mechanic dispatch platform. Verified OEM components with precision fitment and on-demand certified technician visits.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#38bdf8" />
                <span>Hennur Cross, Kalyan Nagar, Bangalore - 560043</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#34d399" />
                <span>+91 (080) 2544-2455 / +91 98450 12345</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="#f59e0b" />
                <span>support@apesw-automobiles.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: E-Commerce Catalog */}
          <div>
            <h4 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Auto Parts Catalog
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => scrollTo('catalog-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Engine & Powertrain Components
              </button>
              <button onClick={() => scrollTo('catalog-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Ceramic Brake Pads & Rotors
              </button>
              <button onClick={() => scrollTo('catalog-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Suspension Struts & Shocks
              </button>
              <button onClick={() => scrollTo('catalog-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Full-Synthetic Motor Oils
              </button>
              <button onClick={() => scrollTo('catalog-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Heavy-Duty Car Batteries
              </button>
              <button onClick={() => scrollTo('catalog-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                High-Flow Reusable Air Filters
              </button>
            </div>
          </div>

          {/* Col 3: Mechanic Services */}
          <div>
            <h4 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Mechanic Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => scrollTo('services-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Periodic 65-Point Maintenance
              </button>
              <button onClick={() => scrollTo('services-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                OBD-II Computerized Diagnostics
              </button>
              <button onClick={() => scrollTo('services-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Brake Overhaul & Fluid Bleed
              </button>
              <button onClick={() => scrollTo('services-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                Air Conditioning Disinfection & Gas
              </button>
              <button onClick={() => scrollTo('services-section')} style={{ textAlign: 'left', color: '#94a3b8' }}>
                3D Laser Wheel Alignment
              </button>
              <button
                onClick={() => {
                  setTrackingOrderId('ORD-84920');
                  setActiveModal('track-order');
                }}
                style={{ textAlign: 'left', color: '#38bdf8', fontWeight: 600 }}
              >
                Live Order & Dispatch Tracker &rarr;
              </button>
            </div>
          </div>

          {/* Col 4: Academic Project Attribution */}
          <div>
            <h4 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={16} color="#38bdf8" /> Academic Project
            </h4>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '10px', color: '#cbd5e1' }}>
              <strong>{PROJECT_REPORT_METADATA.title}</strong><br />
              {PROJECT_REPORT_METADATA.institution}<br />
              Academic Year 2024-25 • VI Sem BCA
            </p>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '12px' }}>
              Developed by:<br />
              • Sree Harish. P K (22IABCA071)<br />
              • Varun K S (22IABCA080)<br />
              • Venkat Bhanu Prasad (22IABCA083)
            </div>
            <button
              onClick={() => setActiveModal('report')}
              className="btn-outline"
              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            >
              <FileText size={13} /> View Full Report & Diagrams
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem'
        }}>
          <div>
            © 2024-2026 APESW Auto Parts Selling & Services Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#64748b' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>OEM Warranty Policy</span>
            <span>10-Day Return Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

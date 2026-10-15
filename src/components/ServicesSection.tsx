'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import {
  Wrench,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Disc,
  Cpu,
  Wind,
  CircleDot,
  Zap
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, setSelectedServiceForBooking, setActiveModal } = useApp();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Disc': return <Disc size={22} color="#f59e0b" />;
      case 'Cpu': return <Cpu size={22} color="#38bdf8" />;
      case 'Wind': return <Wind size={22} color="#06b6d4" />;
      case 'CircleDot': return <CircleDot size={22} color="#a855f7" />;
      case 'Zap': return <Zap size={22} color="#fbbf24" />;
      default: return <Wrench size={22} color="#3b82f6" />;
    }
  };

  const handleBookService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setActiveModal('service-book');
  };

  return (
    <section id="services-section" style={{
      padding: '4rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(15, 23, 42, 0.4)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span className="badge badge-amber">
              <Wrench size={12} /> Certified Workshop & Doorstep Care
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Automotive Repair & <span className="gradient-text-amber">Mechanic Services</span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Directly from the APESW Service Module: Book certified automotive mechanics for periodic maintenance, computerized engine scans, brake overhauls, and doorstep repairs.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-panel hover-card"
              style={{
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Header row with Icon and Duration */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {getServiceIcon(service.icon)}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#94a3b8' }}>
                    <Clock size={14} color="#64748b" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Service Name */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3 }}>
                  {service.name}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  {service.description}
                </p>

                {/* Inclusions Checklist */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '8px' }}>
                    Package Inclusions:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {service.includes.slice(0, 4).map((inc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <CheckCircle2 size={14} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div style={{
                paddingTop: '1.2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Service Charge</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f59e0b' }}>
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() => handleBookService(service)}
                  className="btn-amber"
                  style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}
                >
                  <Calendar size={15} /> Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doorstep Assurance Banner */}
        <div className="glass-panel" style={{
          marginTop: '3rem',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} color="#f59e0b" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Doorstep Mobile Van Service Available</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Equipped with pneumatic tools, diagnostic computers, and genuine spare parts dispatched directly to your home or office.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedServiceForBooking(services[0]);
              setActiveModal('service-book');
            }}
            className="btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            Request Doorstep Van <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

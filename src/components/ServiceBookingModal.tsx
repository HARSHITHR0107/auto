'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Wrench,
  Calendar,
  Clock,
  Car,
  CheckCircle2,
  MapPin,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { ServiceRequest } from '../types';
import { VEHICLE_DATABASE } from '../data/mockData';

export const ServiceBookingModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    services,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    bookServiceRequest,
    savedGarage
  } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState(
    selectedServiceForBooking?.id || services[0]?.id || ''
  );
  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98450 12345');
  const [customerEmail, setCustomerEmail] = useState('rahul.sharma@example.com');
  const [vehicleMake, setVehicleMake] = useState(savedGarage?.make || 'Honda');
  const [vehicleModel, setVehicleModel] = useState(savedGarage?.model || 'Civic');
  const [vehicleYear, setVehicleYear] = useState(savedGarage?.year || '2022');
  const [vehicleRegNo, setVehicleRegNo] = useState('KA-03-MK-7182');
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'EV' | 'Hybrid' | 'CNG'>('Petrol');
  const [serviceType, setServiceType] = useState<'Doorstep Mobile Mechanic' | 'Workshop Drop-off'>('Doorstep Mobile Mechanic');
  const [address, setAddress] = useState('42, 100 Feet Road, Indiranagar, Bangalore');
  const [scheduledDate, setScheduledDate] = useState('2026-10-16');
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState('10:00 AM - 12:30 PM');
  const [notes, setNotes] = useState('Check braking response and general periodic oil change.');

  const [confirmedBooking, setConfirmedBooking] = useState<ServiceRequest | null>(null);

  if (activeModal !== 'service-book') return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleClose = () => {
    setActiveModal(null);
    setConfirmedBooking(null);
    setSelectedServiceForBooking(null);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const request = bookServiceRequest({
      serviceId: currentService.id,
      serviceName: currentService.name,
      servicePrice: currentService.price,
      customerName,
      customerPhone,
      customerEmail,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehicleRegNo,
      fuelType,
      serviceType,
      address: serviceType === 'Doorstep Mobile Mechanic' ? address : undefined,
      scheduledDate,
      scheduledTimeSlot,
      notes
    });

    setConfirmedBooking(request);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px' }}
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
            <Wrench size={18} color="#f59e0b" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {confirmedBooking ? 'Service Request Booked!' : 'Send Service Request (APESW)'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            style={{ color: '#94a3b8', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        {confirmedBooking ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem',
              border: '2px solid rgba(245, 158, 11, 0.4)'
            }}>
              <CheckCircle2 size={36} color="#f59e0b" />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
              Service Appointment Scheduled!
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Our dispatch system has assigned a certified master mechanic to your request.
            </p>

            {/* Service Summary Card */}
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              maxWidth: '460px',
              margin: '0 auto 1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Request ID:</span>
                <strong style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>{confirmedBooking.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Service:</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{confirmedBooking.serviceName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Vehicle:</span>
                <span style={{ color: '#cbd5e1' }}>{confirmedBooking.vehicleYear} {confirmedBooking.vehicleMake} {confirmedBooking.vehicleModel} ({confirmedBooking.vehicleRegNo})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Assigned Mechanic:</span>
                <strong style={{ color: '#38bdf8' }}>{confirmedBooking.mechanicName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Date & Time:</span>
                <span style={{ color: '#cbd5e1' }}>{confirmedBooking.scheduledDate} | {confirmedBooking.scheduledTimeSlot}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>Service Mode:</span>
                <span className="badge badge-amber">{confirmedBooking.serviceType}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn-amber"
              style={{ padding: '0.8rem 2rem' }}
            >
              Done / Return to Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitBooking} style={{ padding: '1.8rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {/* Select Service */}
              <div>
                <label className="label-control">Select Automotive Service Package</label>
                <select
                  className="input-control"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — ₹{s.price.toLocaleString('en-IN')} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Information */}
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f59e0b', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Car size={16} /> Vehicle Specifications
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  <div>
                    <label className="label-control">Make</label>
                    <select
                      className="input-control"
                      value={vehicleMake}
                      onChange={(e) => {
                        setVehicleMake(e.target.value);
                        setVehicleModel(VEHICLE_DATABASE.modelsByMake[e.target.value]?.[0] || '');
                      }}
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
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                    >
                      {(VEHICLE_DATABASE.modelsByMake[vehicleMake] || []).map((mod) => (
                        <option key={mod} value={mod}>{mod}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-control">Year</label>
                    <select
                      className="input-control"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                    >
                      {VEHICLE_DATABASE.years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-control">Registration #</label>
                    <input
                      type="text"
                      className="input-control"
                      value={vehicleRegNo}
                      onChange={(e) => setVehicleRegNo(e.target.value)}
                      placeholder="KA-03-MK-7182"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Service Delivery Type & Slot */}
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f59e0b', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} /> Appointment Preferences
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div
                    onClick={() => setServiceType('Doorstep Mobile Mechanic')}
                    style={{
                      background: serviceType === 'Doorstep Mobile Mechanic' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-input)',
                      border: serviceType === 'Doorstep Mobile Mechanic' ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: serviceType === 'Doorstep Mobile Mechanic' ? '#fbbf24' : '#cbd5e1' }}>
                      Doorstep Mobile Van
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Mechanic arrives at your location
                    </div>
                  </div>

                  <div
                    onClick={() => setServiceType('Workshop Drop-off')}
                    style={{
                      background: serviceType === 'Workshop Drop-off' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-input)',
                      border: serviceType === 'Workshop Drop-off' ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: serviceType === 'Workshop Drop-off' ? '#fbbf24' : '#cbd5e1' }}>
                      Workshop Drop-off
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Bring car to Apex service center
                    </div>
                  </div>
                </div>

                {serviceType === 'Doorstep Mobile Mechanic' && (
                  <div style={{ marginBottom: '10px' }}>
                    <label className="label-control">Service Address</label>
                    <input
                      type="text"
                      className="input-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="label-control">Preferred Date</label>
                    <input
                      type="date"
                      className="input-control"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="label-control">Time Slot</label>
                    <select
                      className="input-control"
                      value={scheduledTimeSlot}
                      onChange={(e) => setScheduledTimeSlot(e.target.value)}
                    >
                      <option value="09:00 AM - 11:30 AM">09:00 AM - 11:30 AM</option>
                      <option value="10:00 AM - 12:30 PM">10:00 AM - 12:30 PM</option>
                      <option value="01:30 PM - 03:30 PM">01:30 PM - 03:30 PM</option>
                      <option value="04:00 PM - 06:30 PM">04:00 PM - 06:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="label-control">Specific Issues / Symptoms (Optional)</label>
                <textarea
                  rows={2}
                  className="input-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe weird sounds, dashboard check warnings, etc."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-amber"
                style={{
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                Confirm Appointment & Dispatch Mechanic (₹{currentService.price.toLocaleString('en-IN')}) <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

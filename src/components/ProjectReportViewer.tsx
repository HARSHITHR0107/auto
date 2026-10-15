'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  FileText,
  Database,
  GraduationCap,
  Layers,
  Code2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';
import { PROJECT_REPORT_METADATA } from '../data/mockData';

export const ProjectReportViewer: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'uml' | 'database' | 'team'>('overview');

  if (activeModal !== 'report') return null;

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: '940px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.2rem 1.8rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Academic Project Report Documentation
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Auto_Parts_Report_2.docx • Indian Academy Degree College Autonomous
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            style={{ color: '#94a3b8', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0 1.5rem'
        }}>
          {[
            { id: 'overview', label: 'Report Overview & Abstract', icon: FileText },
            { id: 'uml', label: 'UML & System Architecture', icon: Layers },
            { id: 'database', label: '14 MySQL Tables Schema', icon: Database },
            { id: 'team', label: 'Student Team & Guide', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  borderBottom: isActive ? '2px solid #38bdf8' : '2px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.8rem', maxHeight: '72vh', overflowY: 'auto' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Highlight Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem'
              }}>
                <span className="badge badge-amber" style={{ marginBottom: '8px' }}>
                  FINAL YEAR PROJECT VI SEMESTER BCA 2024-25
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
                  {PROJECT_REPORT_METADATA.title}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Submitted in partial fulfillment of the requirements for VI Semester Bachelor of Computer Applications (BCA) at <strong>{PROJECT_REPORT_METADATA.institution}</strong>.
                </p>
              </div>

              {/* Abstract */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: '#f8fafc' }}>
                  Project Abstract
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '12px' }}>
                  This project focuses on the development of an online auto parts selling website designed to simplify the buying process for customers and streamline inventory and order management for administrators. The platform allows users to browse a comprehensive catalog of auto parts, view detailed product descriptions, compare prices, and place orders securely. Simultaneously, administrators can manage products, monitor orders, and oversee mechanic assignments through a dedicated backend interface.
                </p>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.7 }}>
                  Originally architected with PHP, Apache, and MySQL with AdminLTE, this modern web application elevates the architecture to Next.js 16 with reactive client-side state, modern glassmorphic styling, doorstep mechanic dispatch workflows, and responsive fitment checking.
                </p>
              </div>

              {/* Comparison Table */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', color: '#f8fafc' }}>
                  System Analysis: Existing System vs Proposed Solution
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  <div style={{
                    background: 'rgba(244, 63, 94, 0.06)',
                    border: '1px solid rgba(244, 63, 94, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem'
                  }}>
                    <h5 style={{ color: '#fb7185', fontWeight: 700, marginBottom: '6px', fontSize: '0.9rem' }}>
                      Drawbacks of Traditional Retail
                    </h5>
                    <ul style={{ fontSize: '0.82rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                      <li>Manual processes leading to human error in stock counts</li>
                      <li>Lack of real-time package delivery tracking</li>
                      <li>Difficulty comparing OEM vs aftermarket prices</li>
                      <li>No direct mechanic service scheduling integration</li>
                    </ul>
                  </div>

                  <div style={{
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem'
                  }}>
                    <h5 style={{ color: '#34d399', fontWeight: 700, marginBottom: '6px', fontSize: '0.9rem' }}>
                      Proposed APESW Advantages
                    </h5>
                    <ul style={{ fontSize: '0.82rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                      <li>Dynamic vehicle fitment verification (Year/Make/Model)</li>
                      <li>End-to-end shopping cart and live dispatch pipeline</li>
                      <li>On-demand mechanic assignment for repair requests</li>
                      <li>Real-time admin dashboard with stock threshold alerts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UML DIAGRAMS */}
          {activeTab === 'uml' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  Architecture & Design Artifacts (From Auto_Parts_Report_2.docx)
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Extracted diagrams illustrating the Use Case workflows, ER Entity-Relationship data model, and Data Flow Diagrams (DFD Level 0 & 1).
                </p>
              </div>

              {/* Diagram 1: ER Diagram */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h5 style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.95rem' }}>
                    1. Entity Relationship (ER) Diagram
                  </h5>
                  <span className="badge badge-blue">Figure 3.2</span>
                </div>
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#0a0e17' }}>
                  <img
                    src="/report_images/image3.png"
                    alt="ER Diagram from Report"
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '8px' }}>
                  Shows relational connections between Users, Orders, Order Items, Products, Categories, Brands, Mechanics, and Service Requests.
                </p>
              </div>

              {/* Diagram 2: Use Case Diagram */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h5 style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.95rem' }}>
                    2. Use Case Diagram (User & Admin Actors)
                  </h5>
                  <span className="badge badge-amber">Figure 3.1</span>
                </div>
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#0a0e17' }}>
                  <img
                    src="/report_images/image2.png"
                    alt="Use Case Diagram"
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Diagram 3: Data Flow Diagrams */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.2rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h5 style={{ fontWeight: 700, color: '#34d399', fontSize: '0.95rem' }}>
                    3. Data Flow Diagram (DFD Level 0 & Level 1)
                  </h5>
                  <span className="badge badge-emerald">Figure 3.3</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: '#0a0e17', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <img
                      src="/report_images/image4.png"
                      alt="DFD Level 0"
                      style={{ width: '100%', height: '240px', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ background: '#0a0e17', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <img
                      src="/report_images/image5.png"
                      alt="DFD Level 1"
                      style={{ width: '100%', height: '240px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 14 MYSQL TABLES */}
          {activeTab === 'database' && (
            <div>
              <div style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
                  Relational Database Structure (14 Tables)
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Specified under Section 3.6 of the BCA Project Report:
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '10px'
              }}>
                {PROJECT_REPORT_METADATA.tablesList.map((t, i) => (
                  <div
                    key={t.name}
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>#{i + 1}</span>
                      <strong style={{ fontSize: '0.88rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                        {t.name}
                      </strong>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                      {t.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & GUIDE */}
          {activeTab === 'team' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                  Project Developers & Guidance
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Indian Academy Degree College - Autonomous, Bangalore • Department of Computer Science
                </p>
              </div>

              {/* Students Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {PROJECT_REPORT_METADATA.students.map((student) => (
                  <div
                    key={student.regNo}
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.4rem'
                    }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      marginBottom: '10px'
                    }}>
                      {student.name[0]}
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', marginBottom: '2px' }}>
                      {student.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', marginBottom: '6px' }}>
                      Reg No: {student.regNo}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {student.role}
                    </div>
                  </div>
                ))}
              </div>

              {/* Faculty Guides */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.4rem',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Internal Project Guide
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                    {PROJECT_REPORT_METADATA.internalGuide}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Assistant Professor</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Head of Department (CS)
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                    {PROJECT_REPORT_METADATA.headOfDepartment}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Department of Computer Science</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Principal
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                    {PROJECT_REPORT_METADATA.principal}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Indian Academy Autonomous</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

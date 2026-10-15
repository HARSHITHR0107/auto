'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  SlidersHorizontal,
  Package,
  Wrench,
  Users,
  AlertTriangle,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  RefreshCw,
  X
} from 'lucide-react';
import { OrderStatus, ServiceRequestStatus, Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    orders,
    updateOrderStatus,
    serviceRequests,
    updateServiceStatus,
    assignMechanicToService,
    mechanics,
    categories,
    brands,
    setUserRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'services' | 'inventory' | 'mechanics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Product Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Bosch');
  const [newProdCategory, setNewProdCategory] = useState('Brake Systems');
  const [newProdPartNo, setNewProdPartNo] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(2500);
  const [newProdStock, setNewProdStock] = useState(20);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=800&q=80');

  // KPI Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const activeServicesCount = serviceRequests.filter((s) => s.status !== 'Completed' && s.status !== 'Cancelled').length;
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPartNo) return;

    const matchedBrand = brands.find((b) => b.name === newProdBrand) || brands[0];
    const matchedCat = categories.find((c) => c.name === newProdCategory) || categories[0];

    addProduct({
      name: newProdName,
      brand: newProdBrand,
      brandId: matchedBrand.id,
      category: newProdCategory,
      categoryId: matchedCat.id,
      partNumber: newProdPartNo,
      price: Number(newProdPrice),
      originalPrice: Math.round(Number(newProdPrice) * 1.2),
      stock: Number(newProdStock),
      rating: 4.8,
      reviewsCount: 1,
      image: newProdImage,
      description: newProdDesc || 'Genuine high-grade automotive replacement component tested to OEM standards.',
      compatibleModels: ['Universal / Multi-model fitment'],
      specifications: {
        'Quality Standard': 'OEM Specification',
        'Manufacturer': newProdBrand,
        'Condition': 'Brand New 100% Genuine'
      }
    });

    setShowAddProductModal(false);
    setNewProdName('');
    setNewProdPartNo('');
    setNewProdDesc('');
  };

  return (
    <div style={{
      background: 'var(--bg-primary)',
      minHeight: '80vh',
      padding: '2.5rem 0 4rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        {/* Admin Header with Exit Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-amber">APESW ADMINISTRATOR CONTROL CONSOLE</span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Session: Admin Master</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
              Auto Parts & Service Operations Management
            </h2>
          </div>

          <button
            onClick={() => setUserRole('customer')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            &larr; Switch Back to Customer Storefront
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'overview', label: 'Executive KPI Overview', icon: TrendingUp },
            { id: 'products', label: `Products Catalog (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: CheckCircle2 },
            { id: 'services', label: `Service Requests (${serviceRequests.length})`, icon: Wrench },
            { id: 'inventory', label: `Inventory & Restock (${lowStockCount} Low)`, icon: AlertTriangle },
            { id: 'mechanics', label: `Mechanics Roster (${mechanics.length})`, icon: Users }
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
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: isActive ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.06)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* KPI Metrics Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem'
            }}>
              <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Sales Revenue
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#34d399' }}>
                  Across {totalOrdersCount} processed transactions
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Customer Orders
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>
                  {totalOrdersCount}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {orders.filter((o) => o.status === 'Delivered').length} completed deliveries
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Active Service Bookings
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', margin: '4px 0' }}>
                  {activeServicesCount}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                  Doorstep vans & workshop repairs
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f43f5e' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Stock Threshold Warning
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: lowStockCount > 0 ? '#f43f5e' : '#34d399', margin: '4px 0' }}>
                  {lowStockCount} Parts
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Items with under 10 units in stock
                </div>
              </div>
            </div>

            {/* Recent Orders & Live Service Dispatch split */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {/* Recent Orders summary */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Recent Customer Orders</h3>
                  <button onClick={() => setActiveTab('orders')} style={{ color: '#38bdf8', fontSize: '0.78rem', fontWeight: 600 }}>
                    View All &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {orders.slice(0, 3).map((o) => (
                    <div
                      key={o.id}
                      style={{
                        padding: '10px',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.82rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#f8fafc' }}>{o.id} • {o.customerName}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{o.items.length} auto parts • {o.dateCreated}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: '#f8fafc' }}>₹{o.totalAmount.toLocaleString('en-IN')}</div>
                        <span className={`badge ${
                          o.status === 'Delivered' ? 'badge-emerald' :
                          o.status === 'Cancelled' ? 'badge-rose' : 'badge-amber'
                        }`} style={{ fontSize: '0.65rem' }}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Service Requests summary */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Active Mechanic Service Requests</h3>
                  <button onClick={() => setActiveTab('services')} style={{ color: '#f59e0b', fontSize: '0.78rem', fontWeight: 600 }}>
                    Manage Dispatches &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {serviceRequests.slice(0, 3).map((s) => (
                    <div
                      key={s.id}
                      style={{
                        padding: '10px',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.82rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#f8fafc' }}>{s.id} • {s.vehicleMake} {s.vehicleModel}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{s.serviceName} • {s.scheduledDate}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.75rem' }}>{s.mechanicName || 'Unassigned'}</div>
                        <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG MANAGER */}
        {activeTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ maxWidth: '360px', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Filter products by name or part #..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.7rem 1.4rem' }}
              >
                <Plus size={16} /> Add New Auto Part
              </button>
            </div>

            {/* Products Table */}
            <div className="glass-panel" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '12px 16px' }}>Part Details</th>
                    <th style={{ padding: '12px 16px' }}>Category</th>
                    <th style={{ padding: '12px 16px' }}>Brand</th>
                    <th style={{ padding: '12px 16px' }}>Price</th>
                    <th style={{ padding: '12px 16px' }}>Stock</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', background: '#0a0e17' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#f8fafc' }}>{p.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{p.partNumber}</div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>{p.category}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span className="badge badge-blue">{p.brand}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 800, color: '#f8fafc' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span className={p.stock < 10 ? 'badge badge-rose' : 'badge badge-emerald'}>
                            {p.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            style={{ color: '#f43f5e', padding: '6px', cursor: 'pointer' }}
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '12px 16px' }}>Order ID</th>
                    <th style={{ padding: '12px 16px' }}>Customer & Destination</th>
                    <th style={{ padding: '12px 16px' }}>Items Summary</th>
                    <th style={{ padding: '12px 16px' }}>Total Amount</th>
                    <th style={{ padding: '12px 16px' }}>Payment</th>
                    <th style={{ padding: '12px 16px' }}>Status Pipeline</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>
                        {o.id}
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{o.dateCreated}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#f8fafc' }}>{o.customerName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{o.city} • {o.customerPhone}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>
                        {o.items.map((it) => `${it.quantity}x ${it.productName.slice(0, 18)}...`).join(', ')}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#f8fafc' }}>
                        ₹{o.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <select
                          className="input-control"
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          style={{ fontSize: '0.78rem', padding: '4px 8px', width: 'auto' }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICE REQUESTS MANAGER */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                    <th style={{ padding: '12px 16px' }}>Request ID</th>
                    <th style={{ padding: '12px 16px' }}>Customer & Vehicle</th>
                    <th style={{ padding: '12px 16px' }}>Service Name</th>
                    <th style={{ padding: '12px 16px' }}>Slot & Mode</th>
                    <th style={{ padding: '12px 16px' }}>Assigned Mechanic</th>
                    <th style={{ padding: '12px 16px' }}>Service Status</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f59e0b' }}>
                        {s.id}
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.dateCreated}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#f8fafc' }}>{s.customerName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          {s.vehicleYear} {s.vehicleMake} {s.vehicleModel} ({s.vehicleRegNo})
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#e2e8f0', fontWeight: 600 }}>
                        {s.serviceName}
                        <div style={{ fontSize: '0.72rem', color: '#f59e0b' }}>₹{s.servicePrice.toLocaleString('en-IN')}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{s.scheduledDate}</div>
                        <span className="badge badge-amber" style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                          {s.serviceType}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <select
                          className="input-control"
                          value={s.mechanicId || ''}
                          onChange={(e) => assignMechanicToService(s.id, e.target.value)}
                          style={{ fontSize: '0.78rem', padding: '4px 8px', width: 'auto' }}
                        >
                          <option value="">-- Assign Mechanic --</option>
                          {mechanics.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.specialty.split(' ')[0]})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <select
                          className="input-control"
                          value={s.status}
                          onChange={(e) => updateServiceStatus(s.id, e.target.value as ServiceRequestStatus)}
                          style={{ fontSize: '0.78rem', padding: '4px 8px', width: 'auto' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Assigned">Assigned</option>
                          <option value="Inspection">Inspection</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: INVENTORY & STOCK RESTOCK */}
        {activeTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                Inventory Management & Fast Restock Controller
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.2rem' }}>
                Manage physical stock across regional warehouses. Any quantity below 10 units triggers automated replenishment flags.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: 'var(--bg-input)',
                      border: p.stock < 10 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f8fafc' }}>{p.name.slice(0, 24)}...</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{p.brand} • {p.partNumber}</div>
                      <div style={{ marginTop: '4px' }}>
                        <span className={p.stock < 10 ? 'badge badge-rose' : 'badge badge-emerald'}>
                          Current Stock: {p.stock}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button
                        onClick={() => updateStock(p.id, p.stock + 10)}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#38bdf8' }}
                      >
                        +10 Restock
                      </button>
                      <button
                        onClick={() => updateStock(p.id, Math.max(0, p.stock - 5))}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#94a3b8' }}
                      >
                        -5 Audit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MECHANICS ROSTER */}
        {activeTab === 'mechanics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
              {mechanics.map((m) => (
                <div
                  key={m.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="badge badge-emerald">Certified Master Tech</span>
                      <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>
                        {m.rating} ★
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '2px' }}>
                      {m.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600, marginBottom: '8px' }}>
                      {m.specialty}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      Experience: <strong>{m.experienceYears} Years</strong><br />
                      Contact: <strong>{m.contact}</strong><br />
                      Email: <strong>{m.email}</strong>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '1.2rem',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem'
                  }}>
                    <span style={{ color: '#94a3b8' }}>
                      Current Jobs: <strong style={{ color: '#f8fafc' }}>{m.currentJobsCount} active</strong>
                    </span>
                    <span className="badge badge-blue">Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="modal-backdrop" onClick={() => setShowAddProductModal(false)}>
          <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Add New Auto Part to Catalog</h3>
              <button onClick={() => setShowAddProductModal(false)} style={{ color: '#94a3b8' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="label-control">Part Name</label>
                <input
                  type="text"
                  className="input-control"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Brembo High Performance Carbon Rotors"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="label-control">Brand</label>
                  <select
                    className="input-control"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                  >
                    {brands.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-control">Category</label>
                  <select
                    className="input-control"
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="label-control">Part # (SKU)</label>
                  <input
                    type="text"
                    className="input-control"
                    value={newProdPartNo}
                    onChange={(e) => setNewProdPartNo(e.target.value)}
                    placeholder="BOS-7729"
                    required
                  />
                </div>
                <div>
                  <label className="label-control">Price (₹)</label>
                  <input
                    type="number"
                    className="input-control"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="label-control">Initial Stock</label>
                  <input
                    type="number"
                    className="input-control"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label-control">Image URL</label>
                <input
                  type="text"
                  className="input-control"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                />
              </div>

              <div>
                <label className="label-control">Description</label>
                <textarea
                  rows={2}
                  className="input-control"
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Engineered specifications, material, and features."
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: '8px', padding: '0.8rem' }}
              >
                Add Product to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

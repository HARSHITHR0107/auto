'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = '#34d399';
        let borderColor = 'rgba(16, 185, 129, 0.4)';

        if (toast.type === 'error') {
          Icon = XCircle;
          iconColor = '#f43f5e';
          borderColor = 'rgba(244, 63, 94, 0.4)';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = '#f59e0b';
          borderColor = 'rgba(245, 158, 11, 0.4)';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = '#38bdf8';
          borderColor = 'rgba(56, 189, 248, 0.4)';
        }

        return (
          <div
            key={toast.id}
            className="toast-box"
            style={{ borderLeft: `4px solid ${iconColor}`, borderColor: borderColor }}
          >
            <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.85rem', color: '#f8fafc' }}>
              {toast.message}
            </span>
          </div>
        );
      })}
    </div>
  );
};

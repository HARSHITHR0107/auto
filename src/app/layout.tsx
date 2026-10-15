import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { Toast } from '../components/Toast';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { ServiceBookingModal } from '../components/ServiceBookingModal';
import { OrderTrackerModal } from '../components/OrderTrackerModal';
import { ProjectReportViewer } from '../components/ProjectReportViewer';

export const metadata: Metadata = {
  title: 'ApexAuto | Auto Parts E-Commerce & Certified Mechanic Hub (APESW)',
  description: '100% Genuine OEM & high-performance aftermarket auto parts with precision vehicle fitment guarantee. Book certified doorstep mechanics with real-time tracking.',
  keywords: ['Auto Parts', 'Car Spares', 'Doorstep Mechanic', 'Engine Oil', 'Brembo Brake Pads', 'Bosch Spark Plugs', 'Automotive Services', 'APESW Auto Hub'],
  authors: [{ name: 'ApexAuto Engineering Team' }],
  openGraph: {
    title: 'ApexAuto | Auto Parts E-Commerce & Mechanic Services (APESW)',
    description: '100% Genuine OEM & high-performance auto parts with certified mechanic service booking.',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProvider>
          {children}
          {/* Global Modals & Notifications */}
          <CartDrawer />
          <CheckoutModal />
          <ProductQuickViewModal />
          <ServiceBookingModal />
          <OrderTrackerModal />
          <ProjectReportViewer />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}

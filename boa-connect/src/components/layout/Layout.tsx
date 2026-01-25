import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { PageTransition } from '../PageTransition';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const location = useLocation();
  
  // Check if current page is registration page - disable PageTransition
  const isRegistrationPage = location.pathname.includes('/seminar-registration');
  
  return (
    <div className="flex min-h-screen flex-col">
      {isRegistrationPage ? (
        <main className="flex-1" style={{ animation: 'none', transition: 'none', opacity: 1, visibility: 'visible' }}>
          {children}
        </main>
      ) : (
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
      )}
      {!hideFooter && <Footer />}
    </div>
  );
}

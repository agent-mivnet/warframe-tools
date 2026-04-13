'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LABELS = {
  '/': 'Overview',
  '/health': 'Health',
  '/system': 'System',
  '/media': 'Media Recs',
  '/deals': 'Deals',
  '/mycelium': 'Mycelium',
  '/reports': 'Reports',
  '/activity': 'Activity',
  '/agents-office': 'Agent Office',
  '/pet': 'Pet',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [];
  crumbs.push({ label: 'Home', href: '/' });

  let path = '';
  for (const seg of segments) {
    path += `/${seg}`;
    crumbs.push({ label: LABELS[path] || seg, href: path });
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="breadcrumbItem">
          {i > 0 && <span className="breadcrumbSep">›</span>}
          {i < crumbs.length - 1 ? (
            <Link href={crumb.href} className="breadcrumbLink">{crumb.label}</Link>
          ) : (
            <span className="breadcrumbCurrent">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

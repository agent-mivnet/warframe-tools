'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Task Checklist', href: '/warframe-checklist' },
  { label: 'Collections', href: '/warframe-collections' },
];

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebarInner">
      <div className="brand brandRefined">
        <div className="brandMark" aria-hidden="true">WF</div>
        <div>
          <div className="brandText">Warframe Tools</div>
          <div className="brandSubtext">Tenno tracker</div>
        </div>
      </div>

      <nav className="navGroups" aria-label="Primary">
        <div className="navGroup">
          <div className="navGroupLabel">Tools</div>
          <div className="navGroupItems">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`navItem ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="navLabel">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="sidebarFooter">
        <div className="sidebarMetaLabel">Source</div>
        <a
          href="https://github.com/agent-mivnet/warframe-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebarEnvironmentPill"
          style={{ textDecoration: 'none' }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

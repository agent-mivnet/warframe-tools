"use client";

import { useState, useCallback } from 'react';

function HamburgerButton({ onClick, isOpen }) {
  return (
    <button
      type="button"
      className={`sidebarToggle ${isOpen ? 'sidebarToggleOpen' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      <span />
      <span />
      <span />
    </button>
  );
}

export default function Shell({ sidebar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <main className={`shell${sidebarOpen ? ' shellSidebarOpen' : ''}`}>
      <div className="sidebarToggleBar">
        <HamburgerButton onClick={toggleSidebar} isOpen={sidebarOpen} />
      </div>
      {sidebarOpen && <div className="sidebarOverlay" onClick={closeSidebar} />}
      <aside className={`sidebar${sidebarOpen ? ' sidebarVisible' : ''}`}>
        {sidebar}
      </aside>
      <div className="content">
        {children}
      </div>
    </main>
  );
}

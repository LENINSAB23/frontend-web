import React from 'react';
import { Bot, Wrench, Settings } from 'lucide-react';
import rhinoLogo from '../assets/logo_white.png';

export default function Navbar({ activeTab, setActiveTab, onOpenConfig }) {
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('catalog')}>
          <div className="logo-icon-wrapper">
            <img src={rhinoLogo} alt="Grupo Rino Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              GRUPO RINO <span className="brand-suffix">E.I.R.L.</span>
            </div>
            <div className="brand-subtitle">
              <span className="pulse-dot"></span>
              <span>Huánuco • Catálogo & Asistencia Técnica</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-nav">
          <button
            className={`nav-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <Wrench size={15} />
            <span>Catálogo</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <Bot size={15} />
            <span>Asistente RinoBot</span>
            <span className="ai-pill-badge">Online</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button
            className="config-btn"
            title="Configuración de IA & Servidor"
            onClick={onOpenConfig}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

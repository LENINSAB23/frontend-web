import React from 'react';
import { Bot, Wrench, Shield, Sparkles, Settings } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenConfig, onOpenAIChatWithPrompt }) {
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('catalog')}>
          <div className="logo-icon-wrapper">
            <span className="logo-emoji">🚗</span>
          </div>
          <div className="brand-text">
            <div className="brand-title">
              GRUPO RINO <span className="brand-suffix">E.I.R.L.</span>
            </div>
            <div className="brand-subtitle">
              <span className="pulse-dot"></span>
              <span>Huánuco • Repuestos & Asistente IA</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-nav">
          <button
            className={`nav-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <Wrench size={16} />
            <span>Catálogo de Repuestos</span>
          </button>

          <button
            className={`nav-tab-btn ai-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <Bot size={16} />
            <span>Asistente RinoBot IA</span>
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
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

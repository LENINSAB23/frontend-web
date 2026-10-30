import React, { useState } from 'react';
import { X, Key, Server, Save, Check } from 'lucide-react';
import { getDifyConfig, setDifyConfig } from '../services/difyService';

export default function ConfigModal({ onClose }) {
  const currentConfig = getDifyConfig();
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setDifyConfig(apiKey, baseUrl);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content config-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Key size={16} />
            <h3 style={{ fontSize: '15px', color: '#FFF', fontWeight: 600 }}>Configuración de API & Agente IA</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="config-form">
          <div className="form-group">
            <label className="form-label">
              <Server size={13} />
              <span>Dify API Base URL:</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.dify.ai/v1"
            />
            <span className="form-hint">
              Endpoint para consultar el Agente RinoBot en Dify Cloud o instancia privada.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Key size={13} />
              <span>Dify API Key (App Key):</span>
            </label>
            <input
              type="password"
              className="form-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="app-xxxxxxxxxxxxxxxxxxxxxxxx"
            />
            <span className="form-hint">
              Clave de aplicación provista por el workspace de Dify.
            </span>
          </div>

          <div className="guardrail-note-box">
            <div>
              <strong>Políticas y Guardrails Activos:</strong>
              <p>RinoBot restringe las respuestas exclusivamente a consultas de repuestos, lubricantes y servicios logísticos de Grupo Rino.</p>
            </div>
          </div>

          {savedSuccess && (
            <div className="saved-badge">
              <Check size={14} color="#22c55e" />
              <span>Configuración guardada correctamente</span>
            </div>
          )}

          <div className="modal-actions-bar" style={{ marginTop: '16px' }}>
            <button type="button" className="action-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="action-btn-primary">
              <Save size={14} />
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

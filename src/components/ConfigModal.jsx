import React, { useState } from 'react';
import { X, Key, Server, Save, CheckCircle2, ShieldAlert } from 'lucide-react';
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
            <Key size={18} color="#F59E0B" />
            <h3 style={{ fontSize: '16px', color: '#FFF' }}>Configuración del Agente IA & API</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="config-form">
          <div className="form-group">
            <label className="form-label">
              <Server size={14} />
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
              Endpoint oficial para consultar el Agente RinoBot en Dify Cloud.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Key size={14} />
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
              Clave de aplicación generada en la consola de Dify.
            </span>
          </div>

          <div className="guardrail-note-box">
            <ShieldAlert size={16} color="#3B82F6" />
            <div>
              <strong>Políticas de Seguridad y Guardrails:</strong>
              <p>RinoBot tiene activada la restricción de dominio: declinará automáticamente cualquier consulta no vinculada a la app, productos y servicios automotrices de Grupo Rino.</p>
            </div>
          </div>

          {savedSuccess && (
            <div className="saved-badge">
              <CheckCircle2 size={16} color="#10B981" />
              <span>Configuración guardada exitosamente</span>
            </div>
          )}

          <div className="modal-actions-bar" style={{ marginTop: '16px' }}>
            <button type="button" className="action-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="action-btn-primary">
              <Save size={16} />
              <span>Guardar Parámetros</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

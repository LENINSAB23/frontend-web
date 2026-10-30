import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { sendChatMessage } from '../services/difyService';
import rhinoLogo from '../assets/logo_white.png';

export default function FloatingChatWidget({ onOpenFullChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');
  const [quickMessages, setQuickMessages] = useState([
    {
      role: 'bot',
      text: 'Hola, soy RinoBot. Si tienes dudas sobre compatibilidad o stock de repuestos, consúltame aquí.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendQuick = async (e) => {
    e?.preventDefault();
    const text = quickInput.trim();
    if (!text || isTyping) return;

    setQuickMessages((prev) => [...prev, { role: 'user', text }]);
    setQuickInput('');
    setIsTyping(true);

    try {
      const res = await sendChatMessage(text);
      setQuickMessages((prev) => [...prev, { role: 'bot', text: res.answer }]);
    } catch (err) {
      setQuickMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'No fue posible conectar con el asistente en este momento.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="floating-widget-wrapper">
      {/* Floating Popup Window */}
      {isOpen && (
        <div className="floating-chat-popup animate-slide-up">
          <div className="floating-header">
            <div className="floating-bot-title">
              <span>RinoBot IA</span>
            </div>
            <div className="floating-header-btns">
              <button
                className="btn-full-chat-link"
                onClick={() => {
                  setIsOpen(false);
                  onOpenFullChat();
                }}
                title="Abrir chat completo"
              >
                Expandir
              </button>
              <button
                className="btn-close-floating"
                onClick={() => setIsOpen(false)}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="floating-messages-body">
            {quickMessages.map((msg, i) => (
              <div
                key={i}
                className={`floating-msg ${msg.role === 'user' ? 'floating-user' : 'floating-bot'}`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="floating-msg floating-bot typing-text">
                Consultando...
              </div>
            )}
          </div>

          <form className="floating-input-form" onSubmit={handleSendQuick}>
            <input
              type="text"
              placeholder="Consulta técnica..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
            />
            <button type="submit" disabled={isTyping || !quickInput.trim()}>
              <Send size={13} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        className="floating-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir asistente de Grupo Rino"
      >
        <div className="floating-btn-content">
          <img src={rhinoLogo} alt="Logo Rino" className="floating-btn-logo" />
          <span className="floating-btn-text">RinoBot</span>
        </div>
      </button>
    </div>
  );
}

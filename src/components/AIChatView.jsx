import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, User, AlertCircle } from 'lucide-react';
import { sendChatMessage, resetConversation } from '../services/difyService';
import rhinoLogo from '../assets/logo_white.png';

export default function AIChatView({ initialPrompt, onClearInitialPrompt }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    '¿Qué aceite recomiendan para mi vehículo?',
    '¿Tienen pastillas de freno y discos en stock?',
    '¿Qué batería recomiendan con garantía oficial?',
    '¿Cómo rastreo el despacho con GPS en tiempo real?',
    '¿Qué funciones de diagnóstico tiene el escáner OBD2?',
    '¿Cómo funciona la estimación de llegada ETA por IA?',
  ];

  // Mensaje de bienvenida inicial
  useEffect(() => {
    const savedChat = localStorage.getItem('rino_chat_messages_cache');
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
        return;
      } catch (e) {
        // Ignorar error de parsing
      }
    }

    const greeting = {
      id: 'msg_welcome',
      role: 'bot',
      content:
        'Bienvenido al Asistente Técnico Oficial de **Grupo Rino E.I.R.L.**\n\n' +
        'Puedo orientarte sobre compatibilidad de repuestos para automóviles y motocicletas, lubricantes con certificación API/JASO, sistema de frenos, baterías y el estado logístico de tus pedidos en Huánuco.\n\n' +
        '*Nota:* El servicio está restringido estrictamente al catálogo y consultas automotrices de Grupo Rino.\n\n' +
        '¿En qué pieza o especificación técnica puedo ayudarte?',
      time: getCurrentTime(),
    };
    setMessages([greeting]);
  }, []);

  // Guardar mensajes en caché local
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('rino_chat_messages_cache', JSON.stringify(messages));
    }
  }, [messages]);

  // Si se envió un prompt inicial desde una tarjeta o modal
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function getCurrentTime() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  const handleSendMessage = async (customText) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: textToSend,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(textToSend);
      const botMessage = {
        id: `bot_${Date.now()}`,
        role: 'bot',
        content: response.answer,
        time: getCurrentTime(),
        isCloud: response.is_cloud,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: `err_${Date.now()}`,
        role: 'bot',
        content: `No se pudo procesar la consulta en este momento: ${err.message}`,
        time: getCurrentTime(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    resetConversation();
    localStorage.removeItem('rino_chat_messages_cache');
    const greeting = {
      id: 'msg_welcome',
      role: 'bot',
      content:
        'Conversación reiniciada. Soy **RinoBot**, asistente técnico de **Grupo Rino E.I.R.L.**\n\n' +
        '¿Sobre qué repuesto, lubricante o consulta automotriz deseas orientación?',
      time: getCurrentTime(),
    };
    setMessages([greeting]);
  };

  const formatMarkdownText = (text) => {
    if (!text) return '';
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Formato para viñetas
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="md-bullet">
            <span className="md-bullet-dot">•</span>
            <span>{renderInlineStyles(line.replace(/^[•\-]\s*/, ''))}</span>
          </div>
        );
      }
      // Líneas normales
      return (
        <p key={idx} className="md-paragraph">
          {renderInlineStyles(line)}
        </p>
      );
    });
  };

  const renderInlineStyles = (str) => {
    const parts = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(<em key={match.index}>{token.slice(1, -1)}</em>);
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }
    return parts.length > 0 ? parts : str;
  };

  return (
    <div className="chat-view-container animate-fade-in">
      {/* Chat Header Bar */}
      <div className="chat-header-bar">
        <div className="chat-bot-info">
          <div className="bot-avatar-glow">
            <img src={rhinoLogo} alt="RinoBot" />
          </div>
          <div>
            <div className="bot-header-name">
              <span>RinoBot IA</span>
              <span className="bot-subtag">Asesor Automotriz</span>
            </div>
            <div className="bot-status-row">
              <span className="pulse-dot"></span>
              <span>Motor Inteligente Activo</span>
            </div>
          </div>
        </div>

        <button
          className="chat-action-btn"
          onClick={handleResetChat}
          title="Reiniciar chat"
        >
          <RefreshCw size={13} />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Guardrail Policy Info */}
      <div className="guardrail-banner">
        <span>
          Asistente especializado de Grupo Rino E.I.R.L. Consultas limitadas a repuestos, catálogo, especificaciones y seguimiento logístico.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="chat-messages-area">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${msg.role === 'user' ? 'message-row-user' : 'message-row-bot'}`}
          >
            <div
              className={`message-avatar ${
                msg.role === 'user'
                  ? 'avatar-user'
                  : msg.isError
                  ? 'avatar-error'
                  : 'avatar-bot'
              }`}
            >
              {msg.role === 'user' ? (
                <User size={15} />
              ) : msg.isError ? (
                <AlertCircle size={15} />
              ) : (
                <img src={rhinoLogo} alt="RinoBot" />
              )}
            </div>

            <div
              className={`message-bubble ${
                msg.role === 'user'
                  ? 'bubble-user'
                  : msg.isError
                  ? 'bubble-error'
                  : 'bubble-bot'
              }`}
            >
              <div className="message-text">{formatMarkdownText(msg.content)}</div>
              <div className="message-time">{msg.time}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-row message-row-bot">
            <div className="message-avatar avatar-bot">
              <img src={rhinoLogo} alt="RinoBot" />
            </div>
            <div className="message-bubble bubble-bot">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
                <span className="typing-text">Analizando consulta técnica...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="quick-prompts-wrapper">
        <div className="quick-prompts-title">
          <span>Consultas sugeridas:</span>
        </div>
        <div className="quick-prompts-scroll">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              className="prompt-chip"
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        className="chat-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          type="text"
          className="chat-input-field"
          placeholder="Escribe tu consulta sobre repuestos, aceites o piezas para tu vehículo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={!inputText.trim() || isLoading}
          title="Enviar consulta"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RefreshCw, Sparkles, ShieldAlert, Cpu, User, AlertCircle } from 'lucide-react';
import { sendChatMessage, resetConversation, getDifyConfig } from '../services/difyService';

export default function AIChatView({ initialPrompt, onClearInitialPrompt }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    '🛢️ ¿Qué aceite le hace a mi auto/moto?',
    '🛑 ¿Tienen pastillas de freno y discos en stock?',
    '⚡ ¿Qué batería me recomiendan con garantía?',
    '📦 ¿Cómo rastreo mi pedido con GPS en vivo?',
    '🔧 ¿Qué funciones tiene el escáner OBD2 Bluetooth?',
    '🤖 ¿Cómo calculan el tiempo de llegada ETA por IA?',
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
        '¡Hola! Soy **RinoBot**, el Asistente Técnico Oficial de **Grupo Rino E.I.R.L.** 🚗🏍️\n\n' +
        'Puedo ayudarte con la compatibilidad de repuestos para tu auto o motocicleta, asesoría de aceites Mobil/Motul, pastillas de freno, baterías Capsa/Yuasa y explicarte el funcionamiento del rastreo satelital GPS de tus pedidos en Huánuco.\n\n' +
        '🛡️ *Nota de servicio:* Por política de la empresa, respondo exclusivamente consultas sobre la aplicación, catálogo y servicios automotrices de Grupo Rino.\n\n' +
        '¿En qué repuesto o duda de tu vehículo te puedo orientar?',
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
    return `${d.getHours().toString().padLeft ? d.getHours().toString().padStart(2, '0') : d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
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
        content: `⚠️ Disculpa, ocurrió un error temporal al procesar tu consulta: ${err.message}`,
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
        '¡Conversación reiniciada! Soy **RinoBot**, tu asistente automotriz de **Grupo Rino E.I.R.L.** 🚗🏍️\n\n' +
        '¿Sobre qué repuesto, lubricante o consulta de la app deseas orientación?',
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
    // Negrita **texto**
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // Cursiva *texto*
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const { apiKey } = getDifyConfig();
  const isCloudConnected = apiKey && apiKey.trim().length > 0;

  return (
    <div className="chat-view-container animate-fade-in">
      {/* Chat Header Bar */}
      <div className="chat-header-bar glass-panel">
        <div className="chat-bot-info">
          <div className="bot-avatar-glow">
            <Bot size={22} color="#3B82F6" />
          </div>
          <div>
            <div className="bot-header-name">
              <span>RinoBot</span>
              <span className="bot-subtag">Asesor IA Especializado</span>
            </div>
            <div className="bot-status-row">
              <span className="pulse-dot"></span>
              <span className="status-label">
                {isCloudConnected ? 'Dify Cloud Conectado' : 'Motor Automotriz Local Rino'}
              </span>
            </div>
          </div>
        </div>

        <div className="chat-header-actions">
          <button
            className="chat-action-btn"
            onClick={handleResetChat}
            title="Reiniciar conversación"
          >
            <RefreshCw size={15} />
            <span>Nueva Consulta</span>
          </button>
        </div>
      </div>

      {/* Guardrail Info Banner */}
      <div className="guardrail-banner">
        <ShieldAlert size={16} color="#F59E0B" />
        <span>
          <strong>Alcance Especializado:</strong> RinoBot solo responderá preguntas relacionadas con la aplicación de Grupo Rino, repuestos automotrices, motos, pedidos y soporte técnico en Huánuco.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="chat-messages-area">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${msg.role === 'user' ? 'message-row-user' : 'message-row-bot'}`}
          >
            {msg.role === 'bot' && (
              <div className={`message-avatar ${msg.isError ? 'avatar-error' : 'avatar-bot'}`}>
                {msg.isError ? <AlertCircle size={16} /> : <Bot size={16} />}
              </div>
            )}

            <div className={`message-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-bot'} ${msg.isError ? 'bubble-error' : ''}`}>
              <div className="message-content">
                {formatMarkdownText(msg.content)}
              </div>
              <div className="message-time">{msg.time}</div>
            </div>

            {msg.role === 'user' && (
              <div className="message-avatar avatar-user">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="message-row message-row-bot">
            <div className="message-avatar avatar-bot">
              <Bot size={16} />
            </div>
            <div className="message-bubble bubble-bot typing-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">RinoBot está evaluando la consulta...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="quick-prompts-wrapper">
        <div className="quick-prompts-title">
          <Sparkles size={12} color="#3B82F6" />
          <span>Preguntas Frecuentes Sugeridas:</span>
        </div>
        <div className="quick-prompts-scroll">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              className="prompt-chip"
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Form */}
      <form
        className="chat-input-bar glass-panel"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          type="text"
          className="chat-input-field"
          placeholder="Escribe tu consulta sobre repuestos para tu vehículo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={isLoading || !inputText.trim()}
          title="Enviar consulta"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

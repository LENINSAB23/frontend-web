// Dify & Local AI Chat Service for Grupo Rino E.I.R.L.

const DEFAULT_DIFY_BASE_URL = 'https://api.dify.ai/v1';
const DEFAULT_DIFY_API_KEY = 'app-75iHcP4HXHu21h9YbiwSUcP9';

let currentConversationId = localStorage.getItem('rino_dify_conversation_id') || null;

export const getDifyConfig = () => {
  return {
    baseUrl: localStorage.getItem('rino_dify_base_url') || DEFAULT_DIFY_BASE_URL,
    apiKey: localStorage.getItem('rino_dify_api_key') || DEFAULT_DIFY_API_KEY,
  };
};

export const setDifyConfig = (apiKey, baseUrl) => {
  if (apiKey !== undefined) localStorage.setItem('rino_dify_api_key', apiKey.trim());
  if (baseUrl !== undefined) localStorage.setItem('rino_dify_base_url', baseUrl.trim());
};

export const resetConversation = () => {
  currentConversationId = null;
  localStorage.removeItem('rino_dify_conversation_id');
};

/**
 * Enviar mensaje al Agente Dify o motor inteligente local
 */
export const sendChatMessage = async (query) => {
  const { apiKey, baseUrl } = getDifyConfig();
  const trimmed = query.trim();

  // 1. Guardrail Estricto en Cliente:
  // Si la pregunta es claramente off-topic (receta, tarea, política, etc.), declinar de inmediato
  const offTopicDecline = checkOffTopicGuardrails(trimmed);
  if (offTopicDecline) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return {
      answer: offTopicDecline,
      conversation_id: currentConversationId || 'local-guardrail',
      is_cloud: false,
    };
  }

  // 2. Si hay clave API de Dify configurada, intentar llamar a la API de Dify
  if (apiKey && apiKey.trim().length > 0) {
    try {
      const response = await fetch(`${baseUrl}/chat-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          inputs: {},
          query: trimmed,
          response_mode: 'blocking',
          conversation_id: currentConversationId || '',
          user: 'web_customer_rino',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.conversation_id) {
          currentConversationId = data.conversation_id;
          localStorage.setItem('rino_dify_conversation_id', currentConversationId);
        }
        return {
          answer: data.answer || 'Sin respuesta del agente.',
          conversation_id: currentConversationId,
          is_cloud: true,
        };
      } else {
        console.warn(`Dify Cloud respondió con estado ${response.status}. Usando motor RinoBot local.`);
      }
    } catch (err) {
      console.warn('Error al conectar con servidor Dify Cloud, activando asistente local RinoBot:', err);
    }
  }

  // 3. Fallback inteligente al Motor de Conocimiento Local de Grupo Rino
  await new Promise((resolve) => setTimeout(resolve, 600));
  const localAnswer = generateLocalKnowledge(trimmed);

  return {
    answer: localAnswer,
    conversation_id: currentConversationId || 'local-session-rino',
    is_cloud: false,
  };
};

/**
 * Guardrail estricto: detecta temas no vinculados a la app ni al rubro automotriz
 */
function checkOffTopicGuardrails(text) {
  const q = text.toLowerCase();
  const bannedKeywords = [
    'comida', 'receta', 'cocina', 'restaurante', 'pizza', 'hamburguesa', 'almuerzo',
    'tarea', 'matematica', 'matemática', 'historia de', 'capital de', 'presidente',
    'politica', 'política', 'religion', 'religión', 'poema', 'poesía', 'chiste',
    'cancion', 'canción', 'futbol', 'fútbol', 'programar', 'codigo python',
    'medicina', 'dolor de cabeza', 'medico', 'médico', 'farmacia', 'remedio'
  ];

  for (const word of bannedKeywords) {
    if (q.includes(word)) {
      return '⚠️ **Consulta fuera de alcance:**\n\n' +
        'Disculpa, como asistente oficial de **Grupo Rino E.I.R.L.**, únicamente estoy capacitado para responder consultas directamente relacionadas con la **aplicación de Grupo Rino, repuestos para autos y motocicletas, catálogo, seguimiento satelital de pedidos y asesoría mecánica**.\n\n' +
        '¿En qué repuesto o función de la app te puedo orientar?';
    }
  }
  return null;
}

/**
 * Base de conocimiento automotriz de Grupo Rino con restricción de dominio
 */
function generateLocalKnowledge(query) {
  const q = query.toLowerCase();

  if (q.includes('aceite') || q.includes('lubricante') || q.includes('mobil') || q.includes('motul')) {
    return '🛢️ **Asesoría de Lubricación Automotriz & Motos - Grupo Rino:**\n\n' +
      '• **Para Autos / SUVs:** Recomendamos **Mobil 1 Sintético 5W-30 (1 Galón)** (S/ 145.00). Brinda máxima protección térmica y ahorro de combustible para motores Toyota, Kia, Hyundai y Nissan.\n' +
      '• **Para Motos Lineales / 4T:** Disponemos de **Motul 7100 4T 10W-40 100% Sintético con Ester (1L)** (S/ 58.00). Protege la caja de cambios y embragues húmedos en motos Pulsar, Honda CB y Yamaha FZ.\n' +
      '• **Líquido de Frenos:** Bosch DOT 4 (500ml) a S/ 28.00.\n' +
      '• **Refrigerante:** Prestone 50/50 listo para usar (1 Galón) a S/ 42.00.\n\n' +
      '¿Deseas conocer más detalles técnicos o especificaciones de algún lubricante?';
  }

  if (q.includes('freno') || q.includes('pastilla') || q.includes('disco') || q.includes('brembo') || q.includes('fras-le')) {
    return '🛑 **Sistema de Frenos de Alta Seguridad:**\n\n' +
      '• **Pastillas Delanteras Cerámicas Fras-le:** S/ 95.00 el juego. Frenado silencioso, sin chirridos y sin generación de polvo negro sobre los aros.\n' +
      '• **Discos de Freno Ranurados/Ventilados Brembo:** S/ 240.00 el par delantero para alto rendimiento en bajadas y carretera.\n' +
      '• **Pastillas de Cerámica para Motos:** S/ 35.00 (compatibles con Bajaj Pulsar, Honda y Yamaha).\n\n' +
      'Nuestros técnicos mecánicos recomiendan inspeccionar el grosor de las pastillas cada 10,000 km.';
  }

  if (q.includes('bateria') || q.includes('batería') || q.includes('electr') || q.includes('luz') || q.includes('led') || q.includes('yuasa') || q.includes('capsa')) {
    return '⚡ **Baterías & Sistema Eléctrico:**\n\n' +
      '• **Batería Capsa Gold 13 Placas (12V 65Ah):** S/ 280.00. Libre de mantenimiento con **18 meses de garantía** para autos y camionetas.\n' +
      '• **Batería de Gel Sellada Yuasa YTX9-BS (12V 8Ah):** S/ 115.00 con tecnología AGM sin derrames para motos lineales y cuatrimotos.\n' +
      '• **Focos LED Philips Ultinon Essential H4 (Par):** S/ 160.00. Luz blanca fría 6000K de alta penetración.\n' +
      '• **Kit de Fusibles Automotrices (50 unidades):** S/ 25.00 surtidos de 5A a 30A.';
  }

  if (q.includes('escaner') || q.includes('escáner') || q.includes('obd') || q.includes('herramienta') || q.includes('gata') || q.includes('rachet')) {
    return '🔧 **Herramientas de Mecánica & Diagnóstico:**\n\n' +
      '• **Escáner Automotriz OBD2 Bluetooth ELM327:** S/ 65.00. Se enlaza a tu smartphone Android o iOS para diagnosticar fallas de motor, apagar el testigo Check Engine y ver datos de sensores en vivo.\n' +
      '• **Gata Hidráulica Tipo Caimán 2.5 Toneladas:** S/ 195.00 con maletín transportable.\n' +
      '• **Juego de Llaves y Dados Cr-V (46 piezas):** S/ 85.00 de 4 a 14mm con rachet ergonómico de 72 dientes.\n' +
      '• **Manómetro Digital de Presión de Llantas 150 PSI:** S/ 32.00 con boquilla retroiluminada.';
  }

  if (q.includes('pedido') || q.includes('orden') || q.includes('rastre') || q.includes('donde') || q.includes('gps') || q.includes('mapa')) {
    return '📦 **Rastreo Satelital GPS en Tiempo Real:**\n\n' +
      '• Los repartidores de Grupo Rino cuentan con un **nodo IoT de telemetría GPS** en cada motocicleta.\n' +
      '• El sistema transmite coordenadas, velocidad en km/h y calzada vial en vivo por la ciudad de Huánuco.\n' +
      '• Puedes solicitar el estado de tu pedido proporcionando el código de tu orden.';
  }

  if (q.includes('eta') || q.includes('tiempo') || q.includes('ia') || q.includes('inteligencia') || q.includes('demora')) {
    return '⏱️ **Estimación de Tiempo de Entrega con Machine Learning (IA):**\n\n' +
      'El modelo de IA evalúa la distancia en kilómetros, la hora punta del tráfico en Huánuco, el clima y la velocidad del vehículo.\n\n' +
      'El tiempo promedio de despacho urbano es de **12 a 25 minutos**.';
  }

  if (q.includes('pago') || q.includes('yape') || q.includes('plin') || q.includes('tarjeta') || q.includes('efectivo') || q.includes('comprar')) {
    return '💳 **Medios de Pago y Despacho:**\n\n' +
      '• **Billeteras Digitales:** Yape y Plin con confirmación inmediata.\n' +
      '• **Tarjetas:** Débito y Crédito Visa/Mastercard.\n' +
      '• **Efectivo Contraentrega:** Pagas directamente al recibir tus repuestos en tu domicilio o taller mecánico en Huánuco, Amarilis o Pillco Marca.';
  }

  if (q.includes('quien') || q.includes('que eres') || q.includes('quién eres') || q.includes('rino') || q.includes('app') || q.includes('hola') || q.includes('buenos dias') || q.includes('buenas')) {
    return '👋 ¡Hola! Soy **RinoBot**, el Asistente Técnico Virtual oficial de **Grupo Rino E.I.R.L.** 🚗🏍️\n\n' +
      'Estoy capacitado exclusivamente para asesorarte en:\n' +
      '• Compatibilidad de repuestos para tu auto o motocicleta.\n' +
      '• Precios y especificaciones técnicas de aceites, frenos, bujías y herramientas.\n' +
      '• Información sobre despacho y rastreo satelital GPS en Huánuco.\n\n' +
      '¿Sobre qué repuesto o vehículo deseas consultar hoy?';
  }

  // Respuesta por defecto con estricto guardrail:
  return '👋 Disculpa, solo estoy capacitado para responder consultas relacionadas con la **aplicación de Grupo Rino**, repuestos de autos y motos, catálogo, seguimiento de pedidos y asesoría mecánica.\n\n' +
    '¿Deseas consultar sobre algún repuesto específico (aceites, frenos, bujías, baterías) o compatibilidad vehicular?';
}

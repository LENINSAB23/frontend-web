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
    await new Promise((resolve) => setTimeout(resolve, 300));
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
  await new Promise((resolve) => setTimeout(resolve, 500));
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
      return '**Consulta fuera de alcance:**\n\n' +
        'Como asistente técnico oficial de **Grupo Rino E.I.R.L.**, únicamente respondo consultas relacionadas con repuestos para vehículos (automóviles y motocicletas), lubricantes certificados, herramientas mecánicas, compatibilidad vehicular y seguimiento de pedidos en Huánuco.\n\n' +
        '¿Deseas orientación sobre alguna pieza o repuesto específico?';
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
    return '**Asesoría de Lubricación Automotriz & Motos - Grupo Rino:**\n\n' +
      '• **Para Autos / SUVs:** Disponemos de **Mobil 1 Sintético 5W-30 (1 Galón)** a S/ 145.00. Proporciona protección térmica avanzada para motores modernos Toyota, Kia, Hyundai y Nissan.\n' +
      '• **Para Motocicletas 4T:** Disponemos de **Motul 7100 4T 10W-40 100% Sintético con Ester (1L)** a S/ 58.00. Formulado para embrague húmedo en marcas como Pulsar, Honda CB y Yamaha FZ.\n' +
      '• **Líquido de Frenos:** Bosch DOT 4 (500ml) a S/ 28.00.\n' +
      '• **Refrigerante:** Prestone 50/50 listo para usar (1 Galón) a S/ 42.00.\n\n' +
      '¿Deseas verificar la compatibilidad exacta con el manual de tu modelo?';
  }

  if (q.includes('freno') || q.includes('pastilla') || q.includes('disco') || q.includes('brembo') || q.includes('fras-le')) {
    return '**Sistema de Frenos & Seguridad:**\n\n' +
      '• **Pastillas Delanteras Cerámicas Fras-le:** S/ 95.00 el juego. Frenado silencioso, libre de ruidos y con mínima adherencia de polvo sobre el aro.\n' +
      '• **Discos Ventilados Brembo:** S/ 240.00 el par delantero para alta disipación térmica en pendientes y carretera.\n' +
      '• **Pastillas de Cerámica para Motos:** S/ 35.00 compatibles con Bajaj Pulsar, Honda y Yamaha.\n\n' +
      'Recomendación técnica: Revisar el espesor del disco y pastillas cada 10,000 km o ante variaciones en el pedal.';
  }

  if (q.includes('bateria') || q.includes('batería') || q.includes('electr') || q.includes('luz') || q.includes('led') || q.includes('yuasa') || q.includes('capsa')) {
    return '**Baterías & Sistema Eléctrico:**\n\n' +
      '• **Batería Capsa Gold 13 Placas (12V 65Ah):** S/ 280.00. Libre de mantenimiento con 18 meses de garantía para autos y camionetas.\n' +
      '• **Batería Yuasa YTX9-BS Gel (12V 8Ah):** S/ 115.00 con tecnología AGM sin fugas para motocicletas.\n' +
      '• **Focos LED Philips Ultinon Essential H4:** S/ 160.00 el par. Luz blanca 6000K de alta proyección.\n' +
      '• **Kit de Fusibles Automotrices:** S/ 25.00 caja de 50 unidades de 5A a 30A.';
  }

  if (q.includes('escaner') || q.includes('escáner') || q.includes('obd') || q.includes('herramienta') || q.includes('gata') || q.includes('rachet')) {
    return '**Herramientas de Mecánica & Diagnóstico:**\n\n' +
      '• **Escáner OBD2 Bluetooth ELM327:** S/ 65.00. Compatible con Android y Windows para lectura y borrado de códigos de falla DTC (Check Engine) y sensores en tiempo real.\n' +
      '• **Gata Hidráulica Tipo Caimán 2.5T:** S/ 195.00 con estuche de protección.\n' +
      '• **Juego de Llaves y Dados Cr-V (46 piezas):** S/ 85.00 en medidas 4 a 14mm con matraca de 72 dientes.\n' +
      '• **Manómetro Digital de Neumáticos 150 PSI:** S/ 32.00 con pantalla iluminada.';
  }

  if (q.includes('pedido') || q.includes('orden') || q.includes('rastre') || q.includes('donde') || q.includes('gps') || q.includes('mapa')) {
    return '**Seguimiento Satelital GPS en Tiempo Real:**\n\n' +
      '• Las unidades de entrega de Grupo Rino integran telemetría GPS continua.\n' +
      '• El sistema transmite coordenadas geográficas, velocidad y estimación de llegada en la ciudad de Huánuco.\n' +
      '• Puedes consultar el avance indicando el código de tu pedido.';
  }

  if (q.includes('eta') || q.includes('tiempo') || q.includes('ia') || q.includes('inteligencia') || q.includes('demora')) {
    return '**Estimación de Tiempo de Entrega (ETA por Machine Learning):**\n\n' +
      'El modelo predictivo procesa la distancia euclidiana/vial, la franja horaria de tráfico en Huánuco y la velocidad media de la unidad.\n\n' +
      'El lapso promedio de distribución en zona urbana oscila entre 12 y 25 minutos.';
  }

  if (q.includes('pago') || q.includes('yape') || q.includes('plin') || q.includes('tarjeta') || q.includes('efectivo') || q.includes('comprar')) {
    return '**Métodos de Pago y Liquidación:**\n\n' +
      '• **Billeteras Digitales:** Yape y Plin con acreditación instantánea.\n' +
      '• **Tarjetas:** Débito y Crédito Visa / Mastercard.\n' +
      '• **Efectivo:** Pago contraentrega al recibir el repuesto en tu taller o domicilio en Huánuco, Amarilis y Pillco Marca.';
  }

  if (q.includes('quien') || q.includes('que eres') || q.includes('quién eres') || q.includes('rino') || q.includes('app') || q.includes('hola') || q.includes('buenos dias') || q.includes('buenas')) {
    return 'Hola, soy **RinoBot**, asistente técnico virtual de **Grupo Rino E.I.R.L.**\n\n' +
      'Estoy preparado para atender consultas técnicas sobre:\n' +
      '• Especificaciones y compatibilidad de repuestos para automóviles y motocicletas.\n' +
      '• Precios de catálogo y disponibilidad en tienda física y almacén Huánuco.\n' +
      '• Estado de órdenes de despacho y cobertura de entrega satelital.\n\n' +
      '¿Sobre qué pieza o requerimiento vehicular deseas consultar?';
  }

  return 'Como asistente de **Grupo Rino E.I.R.L.**, brindo soporte técnico exclusivo para repuestos automotrices, aceites certificados, baterías, frenos y seguimiento logístico en Huánuco.\n\n' +
    '¿Qué repuesto o especificación técnica requieres para tu vehículo?';
}

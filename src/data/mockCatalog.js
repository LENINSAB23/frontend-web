export const OFFICIAL_CATEGORIES = [
  { id: 'all', name: 'Todos los Repuestos', icon: 'Sparkles', count: 18 },
  { id: 'lubricantes', name: 'Lubricantes & Fluidos', icon: 'Droplets', count: 4 },
  { id: 'frenos', name: 'Frenos & Discos', icon: 'ShieldAlert', count: 3 },
  { id: 'baterias', name: 'Baterías & Eléctrico', icon: 'Zap', count: 3 },
  { id: 'motor', name: 'Motor, Bujías & Embrague', icon: 'Flame', count: 4 },
  { id: 'herramientas', name: 'Herramientas de Taller', icon: 'Wrench', count: 4 },
];

export const MOCK_PRODUCTS = [
  // --- LUBRICANTES Y FLUIDOS ---
  {
    id: 1,
    name: 'Aceite Sintético Mobil 1 5W-30 (1 Galón)',
    category_id: 'lubricantes',
    category_name: 'Lubricantes & Fluidos',
    vehicle_type: 'auto',
    vehicle_label: 'Auto / SUV',
    brand: 'Mobil 1',
    price: 145.0,
    stock: 24,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    description: 'Aceite de motor 100% sintético de avanzada tecnología. Excelente protección contra el desgaste térmico y ahorro de combustible para motores a gasolina y diésel.',
    specifications: [
      { label: 'Viscosidad', value: 'SAE 5W-30' },
      { label: 'Presentación', value: '1 Galón (3.785 L)' },
      { label: 'Normas', value: 'API SP, ILSAC GF-6A, dexos1 Gen 3' },
      { label: 'Compatibilidad', value: 'Toyota, Hyundai, Kia, Nissan, Honda' }
    ],
    highlight: 'Mayor vendido en Huánuco'
  },
  {
    id: 2,
    name: 'Aceite Motul 7100 4T 10W-40 Sintético con Ester (1L)',
    category_id: 'lubricantes',
    category_name: 'Lubricantes & Fluidos',
    vehicle_type: 'moto',
    vehicle_label: 'Motos 4T',
    brand: 'Motul',
    price: 58.0,
    stock: 45,
    rating: 5.0,
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    description: 'Lubricante sintético con tecnología Ester para motos de 4 tiempos de alto rendimiento. Protege la caja de cambios y embragues húmedos contra el desgaste severo.',
    specifications: [
      { label: 'Viscosidad', value: 'SAE 10W-40' },
      { label: 'Presentación', value: '1 Litro' },
      { label: 'Normas', value: 'JASO MA2 / API SN' },
      { label: 'Compatibilidad', value: 'Bajaj Pulsar, Yamaha FZ/R15, Honda CB190, KTM Duke' }
    ],
    highlight: 'Recomendado para motos lineales'
  },
  {
    id: 3,
    name: 'Líquido de Frenos Bosch DOT 4 (500ml)',
    category_id: 'lubricantes',
    category_name: 'Lubricantes & Fluidos',
    vehicle_type: 'universal',
    vehicle_label: 'Auto & Moto',
    brand: 'Bosch',
    price: 28.0,
    stock: 35,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    description: 'Fluido de frenos sintético de alto punto de ebullición (>260°C). Previene la formación de burbujas de vapor en frenados de emergencia en carretera y bajadas pronunciadas.',
    specifications: [
      { label: 'Punto de Ebullición Seco', value: '260 °C min.' },
      { label: 'Presentación', value: '500 ml' },
      { label: 'Norma', value: 'DOT 4 / SAE J1704' },
      { label: 'Compatibilidad', value: 'Sistemas ABS y frenos hidráulicos' }
    ]
  },
  {
    id: 4,
    name: 'Refrigerante / Anticongelante Prestone 50/50 (1 Galón)',
    category_id: 'lubricantes',
    category_name: 'Lubricantes & Fluidos',
    vehicle_type: 'universal',
    vehicle_label: 'Auto & SUV',
    brand: 'Prestone',
    price: 42.0,
    stock: 20,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
    description: 'Fórmula prediluida lista para usar con tecnología Cor-Guard. Protege el radiador y bomba de agua contra óxido, corrosión y sobrecalentamiento.',
    specifications: [
      { label: 'Dilución', value: '50% Anticongelante / 50% Agua Desionizada' },
      { label: 'Presentación', value: '1 Galón (3.78 L)' },
      { label: 'Color', value: 'Amarillo fluorescente' },
      { label: 'Duración', value: 'Hasta 10 años o 480,000 km' }
    ]
  },

  // --- FRENOS & DISCOS ---
  {
    id: 5,
    name: 'Pastillas de Freno Cerámicas Fras-le (Juego Delantero)',
    category_id: 'frenos',
    category_name: 'Frenos & Discos',
    vehicle_type: 'auto',
    vehicle_label: 'Automóvil',
    brand: 'Fras-le',
    price: 95.0,
    stock: 18,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=600&q=80',
    description: 'Pastillas de freno formuladas con compuesto 100% cerámico. Frenado silencioso, libre de chirridos y sin generación de polvo negro sobre los aros.',
    specifications: [
      { label: 'Material', value: 'Compuesto Cerámico Premium' },
      { label: 'Posición', value: 'Eje Delantero' },
      { label: 'Compatibilidad', value: 'Toyota Yaris, Corolla, Kia Rio, Hyundai Accent' },
      { label: 'Garantía', value: '12 meses / 20,000 km' }
    ],
    highlight: 'Frenado silencioso'
  },
  {
    id: 6,
    name: 'Discos de Freno Ventilados Brembo (Par Delantero)',
    category_id: 'frenos',
    category_name: 'Frenos & Discos',
    vehicle_type: 'auto',
    vehicle_label: 'Auto / Camioneta',
    brand: 'Brembo',
    price: 240.0,
    stock: 8,
    rating: 5.0,
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    description: 'Discos con revestimiento UV y fundición con alto contenido de carbono para reducir vibraciones y disipar rápidamente el calor en carretera.',
    specifications: [
      { label: 'Tipo', value: 'Ventilado con tratamiento térmico' },
      { label: 'Posición', value: 'Par Delantero (Izquierdo + Derecho)' },
      { label: 'Diámetro', value: '255 mm / 4 pernos' },
      { label: 'Marca', value: 'Brembo Italia' }
    ],
    highlight: 'Alto Rendimiento'
  },
  {
    id: 7,
    name: 'Pastillas de Freno Cerámica para Moto (Delantera/Trasera)',
    category_id: 'frenos',
    category_name: 'Frenos & Discos',
    vehicle_type: 'moto',
    vehicle_label: 'Motos',
    brand: 'Brembo Moto',
    price: 35.0,
    stock: 40,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    description: 'Pastillas de freno sinterizadas de alta fricción para motocicletas lineales y cuatrimotos. Frenado preciso en pista mojada o calzada seca.',
    specifications: [
      { label: 'Material', value: 'Sinterizado Cerámico' },
      { label: 'Compatibilidad', value: 'Bajaj Pulsar NS200, Honda CB160, Yamaha FZ 2.0' },
      { label: 'Duración Estimada', value: '12,000 a 15,000 km' }
    ]
  },

  // --- BATERÍAS & ELÉCTRICO ---
  {
    id: 8,
    name: 'Batería Capsa Gold 13 Placas Libre Mantenimiento (12V 65Ah)',
    category_id: 'baterias',
    category_name: 'Baterías & Eléctrico',
    vehicle_type: 'auto',
    vehicle_label: 'Auto & SUV',
    brand: 'Capsa Gold',
    price: 280.0,
    stock: 12,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    description: 'Batería automotriz sellada de libre mantenimiento con aleación de calcio-plata. Mayor amperaje de arranque en frío para climas de sierra y selva.',
    specifications: [
      { label: 'Voltaje / Capacidad', value: '12V - 65 Ah' },
      { label: 'Placas', value: '13 Placas reforzadas' },
      { label: 'CCA (-18°C)', value: '550 Amperios' },
      { label: 'Garantía', value: '18 meses oficial con tarjeta' }
    ],
    highlight: '18 Meses de Garantía'
  },
  {
    id: 9,
    name: 'Batería de Gel Sellada Yuasa YTX9-BS (12V 8Ah)',
    category_id: 'baterias',
    category_name: 'Baterías & Eléctrico',
    vehicle_type: 'moto',
    vehicle_label: 'Motos / Cuatrimoto',
    brand: 'Yuasa',
    price: 115.0,
    stock: 22,
    rating: 5.0,
    image_url: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=600&q=80',
    description: 'Batería sellada activada con electrolito en gel. Tecnología AGM totalmente a prueba de derrames y resistente a fuertes vibraciones de caminos accidentados.',
    specifications: [
      { label: 'Voltaje / Amperaje', value: '12V - 8Ah' },
      { label: 'Modelo', value: 'YTX9-BS Gel' },
      { label: 'Tecnología', value: 'AGM Libre Mantenimiento' },
      { label: 'Compatibilidad', value: 'Pulsar NS200, Dominar 400, Yamaha R3, KTM 390' }
    ],
    highlight: 'Sellada con Gel AGM'
  },
  {
    id: 10,
    name: 'Kit Focos LED H4 Philips Ultinon Essential 6000K (Par)',
    category_id: 'baterias',
    category_name: 'Baterías & Eléctrico',
    vehicle_type: 'universal',
    vehicle_label: 'Auto & Moto',
    brand: 'Philips',
    price: 160.0,
    stock: 15,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    description: 'Iluminación LED blanca brillante de 6000K. Patrón de haz nítido que no deslumbra a conductores en contraflujo. Disipación de calor por aluminio de aviación.',
    specifications: [
      { label: 'Socket', value: 'H4 (Luz Alta / Baja)' },
      { label: 'Temperatura de Color', value: '6000K Luz Blanca Fría' },
      { label: 'Voltaje', value: '12V / 24V compatible' },
      { label: 'Vida Útil', value: 'Hasta 30,000 horas' }
    ]
  },

  // --- MOTOR & BUJÍAS ---
  {
    id: 11,
    name: 'Juego 4 Bujías de Iridio NGK Laser Iridium',
    category_id: 'motor',
    category_name: 'Motor, Bujías & Embrague',
    vehicle_type: 'auto',
    vehicle_label: 'Automóvil',
    brand: 'NGK',
    price: 135.0,
    stock: 25,
    rating: 5.0,
    image_url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80',
    description: 'Punta de electrodo con aleación de iridio con soldadura láser. Chispa potente y estable que optimiza el consumo de gasolina y arranque inmediato.',
    specifications: [
      { label: 'Material', value: 'Electrodo Láser de Iridio' },
      { label: 'Cantidad', value: 'Pack de 4 Unidades' },
      { label: 'Duración', value: 'Hasta 100,000 km' },
      { label: 'Compatibilidad', value: 'Motores Toyota 1NZ/2NZ, Hyundai Gamma, Nissan HR16' }
    ],
    highlight: '100,000 km de vida útil'
  },
  {
    id: 12,
    name: 'Bujía Especial para Moto NGK CPR8EA-9',
    category_id: 'motor',
    category_name: 'Motor, Bujías & Embrague',
    vehicle_type: 'moto',
    vehicle_label: 'Motos',
    brand: 'NGK',
    price: 22.0,
    stock: 60,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    description: 'Bujía original recomendada por fabricantes japoneses e indios. Aislador de alúmina pura que disipa eficientemente el calor del cilindro.',
    specifications: [
      { label: 'Modelo', value: 'CPR8EA-9 con resistencia interna' },
      { label: 'Rosca', value: '10 mm / Hexagonal 16 mm' },
      { label: 'Compatibilidad', value: 'Honda XR150/190, Bajaj Discover, Yamaha FZ' }
    ]
  },
  {
    id: 13,
    name: 'Kit de Embrague Valeo (Disco, Plato y Collarín)',
    category_id: 'motor',
    category_name: 'Motor, Bujías & Embrague',
    vehicle_type: 'auto',
    vehicle_label: 'Automóvil',
    brand: 'Valeo',
    price: 380.0,
    stock: 5,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    description: 'Kit de embrague completo calidad equipo original (OEM). Pedal suave, acople preciso sin tirones y máxima durabilidad del forro de fricción.',
    specifications: [
      { label: 'Componentes', value: 'Disco de embrague + Prensa/Plato + Collarín de empuje' },
      { label: 'Compatibilidad', value: 'Toyota Yaris 1.3/1.5, Corolla 1.6/1.8' },
      { label: 'Garantía', value: '12 meses' }
    ]
  },
  {
    id: 14,
    name: 'Kit de Arrastre Reforzado Cadena con O-Ring 520 (Pulsar / FZ)',
    category_id: 'motor',
    category_name: 'Motor, Bujías & Embrague',
    vehicle_type: 'moto',
    vehicle_label: 'Motos',
    brand: 'Choho Racing',
    price: 125.0,
    stock: 14,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    description: 'Corona de acero al carbono tratado térmicamente, piñón de ataque y cadena dorada reforzada con retenes O-Ring para retener lubricante.',
    specifications: [
      { label: 'Paso de Cadena', value: '520 O-Ring reforzado' },
      { label: 'Eslabones', value: '108 eslabones con candado reforzado' },
      { label: 'Compatibilidad', value: 'Bajaj Pulsar NS200, AS200, Yamaha FZ25' }
    ]
  },

  // --- HERRAMIENTAS DE TALLER ---
  {
    id: 15,
    name: 'Escáner Automotriz OBD2 Bluetooth ELM327',
    category_id: 'herramientas',
    category_name: 'Herramientas de Taller',
    vehicle_type: 'universal',
    vehicle_label: 'Auto / Taller',
    brand: 'ELM Electronics',
    price: 65.0,
    stock: 30,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description: 'Diagnostica fallas de motor, apaga el testigo Check Engine, lee códigos DTC y visualiza datos de sensores en tiempo real vía Bluetooth desde tu smartphone.',
    specifications: [
      { label: 'Conexión', value: 'Bluetooth 4.0 (Android / iOS / PC)' },
      { label: 'Protocolos', value: 'ISO9141, KWP2000, J1850, CAN Bus' },
      { label: 'Apps Compatibles', value: 'Torque Pro, Car Scanner, OBD Auto Doctor' }
    ],
    highlight: 'Diagnóstico en Smartphone'
  },
  {
    id: 16,
    name: 'Gata Hidráulica Tipo Caimán 2.5 Toneladas con Maletín',
    category_id: 'herramientas',
    category_name: 'Herramientas de Taller',
    vehicle_type: 'universal',
    vehicle_label: 'Taller Mecánico',
    brand: 'Torin BigRed',
    price: 195.0,
    stock: 10,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=600&q=80',
    description: 'Chasis de acero extra pesado con ruedas giratorias para fácil posicionamiento debajo del vehículo. Válvula de sobrecarga de seguridad.',
    specifications: [
      { label: 'Capacidad de Carga', value: '2,500 kg (2.5 Toneladas)' },
      { label: 'Altura Mínima / Máxima', value: '85 mm / 380 mm' },
      { label: 'Incluye', value: 'Maletín rígido transportable' }
    ]
  },
  {
    id: 17,
    name: 'Juego de Llaves y Dados Mecánicos Cr-V 46 Piezas (4-14mm)',
    category_id: 'herramientas',
    category_name: 'Herramientas de Taller',
    vehicle_type: 'universal',
    vehicle_label: 'Taller & Garaje',
    brand: 'Stanley Works',
    price: 85.0,
    stock: 28,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80',
    description: 'Fabricado en acero Cromo-Vanadio forjado y tratado térmicamente. Rachet reversible ergonómico de 72 dientes para trabajar en espacios reducidos.',
    specifications: [
      { label: 'Material', value: 'Acero Cromo Vanadio (Cr-V)' },
      { label: 'Encastre', value: '1/4 de pulgada con rachet 72T' },
      { label: 'Piezas', value: '46 piezas con extensiones y puntas Torx/Allen' }
    ]
  },
  {
    id: 18,
    name: 'Manómetro Medidor Digital de Presión de Llantas 150 PSI',
    category_id: 'herramientas',
    category_name: 'Herramientas de Taller',
    vehicle_type: 'universal',
    vehicle_label: 'Auto & Moto',
    brand: 'Michelin Pro',
    price: 32.0,
    stock: 50,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    description: 'Boquilla iluminada y pantalla LCD retroiluminada para lectura precisa en condiciones de poca luz. Apagado automático en 30 segundos.',
    specifications: [
      { label: 'Rango de Medición', value: '0 - 150 PSI / 0 - 10 Bar' },
      { label: 'Precisión', value: '± 0.5 PSI' },
      { label: 'Pantalla', value: 'LCD digital iluminada' }
    ]
  }
];

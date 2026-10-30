# 🚗 Grupo Rino E.I.R.L. - Frontend Web & Asistente IA RinoBot

Portal web ligero de asistencia y catálogo interactivo de repuestos para automóviles y motocicletas en Huánuco, Perú. Cuenta con integración al agente de Inteligencia Artificial **RinoBot**.

---

## 🌟 Características Principales

1. **Catálogo Interactivo de Repuestos:**
   - Filtros por tipo de vehículo (🚗 Autos & SUVs, 🏍️ Motocicletas 4T, 🔧 Herramientas de Taller).
   - Filtros por categoría (Lubricantes, Frenos, Baterías, Bujías/Motor, Herramientas).
   - Buscador reactivo en tiempo real con resaltado de marcas oficiales (*Mobil 1, Motul, Brembo, Bosch, NGK, Yuasa, Capsa Gold, Philips*).
   - Modal de ficha técnica detallada con especificaciones, precios oficiales en Soles (S/) y stock.

2. **🤖 Asistente IA RinoBot con Restricción Estricta (Guardrails):**
   - Asesoría técnica sobre compatibilidad vehicular, viscosidad de aceites, sistema de frenos y baterías.
   - **Guardrails de Dominio Obligatorios:** Configurado para responder **únicamente** a preguntas vinculadas a la aplicación, repuestos, pedidos y soporte técnico automotriz. Cualquier pregunta ajena (recetas de cocina, tareas escolares, política, cultura general, etc.) es declinada cordialmente.
   - Chips con preguntas frecuentes automotrices preconfiguradas.
   - Widget flotante interactivo para consultar a la IA mientras navegas por el catálogo.

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- Node.js (v18+)
- npm

### Instalación de dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173/`.

### Compilación para producción
```bash
npm run build
```
Los archivos estáticos optimizados se generarán en la carpeta `dist/`.

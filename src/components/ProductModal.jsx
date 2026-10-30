import React from 'react';
import { X, Bot, ShieldCheck, CheckCircle2, Tag, Layers } from 'lucide-react';

export default function ProductModal({ product, onClose, onAskAI }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="badge badge-auto">{product.brand}</span>
            <span className="modal-category">{product.category_name}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-grid">
          {/* Visual Column */}
          <div className="modal-image-col">
            <div className="modal-img-container">
              <img
                src={product.image_url}
                alt={product.name}
                className="modal-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div className="modal-price-card">
              <div className="modal-price-label">Precio oficial en Huánuco</div>
              <div className="modal-price-val">
                S/ {Number(product.price).toFixed(2)}
              </div>
              <div className="modal-stock-badge">
                <CheckCircle2 size={14} color="#10B981" />
                <span>Stock asegurado en almacén ({product.stock ?? 12} un.)</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="modal-details-col">
            <h2 className="modal-product-title">{product.name}</h2>
            <p className="modal-product-desc">{product.description}</p>

            {/* Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="specifications-box">
                <h4 className="specs-title">
                  <Layers size={15} />
                  <span>Especificaciones Técnicas</span>
                </h4>
                <div className="specs-grid">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="spec-row">
                      <span className="spec-label">{spec.label}:</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantee note */}
            <div className="warranty-note">
              <ShieldCheck size={18} color="#3B82F6" />
              <div>
                <strong>Garantía de Autenticidad Grupo Rino:</strong>
                <p>Todos nuestros repuestos y lubricantes son 100% originales con sello de fábrica y garantía del distribuidor autorizado.</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="modal-actions-bar">
              <button
                className="btn-ask-ai-modal"
                onClick={() => {
                  onAskAI(product);
                  onClose();
                }}
              >
                <Bot size={18} />
                <span>Consultar Compatibilidad con RinoBot IA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

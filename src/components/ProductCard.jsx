import React from 'react';
import { Eye, Bot, Check } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct, onAskAI }) {
  const getBadgeClass = (type) => {
    switch (type) {
      case 'auto':
        return 'badge-auto';
      case 'moto':
        return 'badge-moto';
      default:
        return 'badge-universal';
    }
  };

  const getVehicleLabel = (type) => {
    switch (type) {
      case 'auto':
        return 'Auto';
      case 'moto':
        return 'Moto';
      default:
        return 'Universal';
    }
  };

  return (
    <div className="product-card">
      {/* Card Media */}
      <div className="card-media-wrapper">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="badges-overlay">
          <span className={`badge ${getBadgeClass(product.vehicle_type)}`}>
            {getVehicleLabel(product.vehicle_type)}
          </span>
          {product.highlight && (
            <span className="badge badge-highlight">
              {product.highlight.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, '').trim()}
            </span>
          )}
        </div>
        <div className="brand-tag">{product.brand}</div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="category-meta">{product.category_name}</div>
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>
        <p className="product-desc">{product.description}</p>

        {/* Pricing & Stock */}
        <div className="card-footer-info">
          <div className="price-box">
            <span className="currency">S/</span>
            <span className="amount">{Number(product.price).toFixed(2)}</span>
          </div>
          <div className="stock-box">
            <Check size={12} color="#22c55e" />
            <span>{product.stock ?? 15} unid.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          <button
            className="action-btn-secondary"
            onClick={() => onSelectProduct(product)}
          >
            <Eye size={14} />
            <span>Ficha</span>
          </button>
          <button
            className="action-btn-primary"
            onClick={() => onAskAI(product)}
            title="Preguntar a RinoBot sobre compatibilidad"
          >
            <Bot size={14} />
            <span>Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

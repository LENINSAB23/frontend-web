import React from 'react';
import { Eye, Bot, CheckCircle, Package } from 'lucide-react';

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

  return (
    <div className="product-card">
      {/* Card Header & Badges */}
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
            {product.vehicle_type === 'auto' && '🚗 Auto'}
            {product.vehicle_type === 'moto' && '🏍️ Moto'}
            {product.vehicle_type === 'universal' && '⚙️ Universal'}
          </span>
          {product.highlight && (
            <span className="badge badge-highlight">
              ⭐ {product.highlight}
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
            <CheckCircle size={13} className="text-emerald" />
            <span>{product.stock ?? 15} disponibles</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          <button
            className="action-btn-secondary"
            onClick={() => onSelectProduct(product)}
          >
            <Eye size={15} />
            <span>Ficha Técnica</span>
          </button>
          <button
            className="action-btn-primary"
            onClick={() => onAskAI(product)}
            title="Preguntar a RinoBot sobre compatibilidad"
          >
            <Bot size={15} />
            <span>Consultar IA</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Bot, CheckCircle2, Shield, Zap, Sparkles, X } from 'lucide-react';
import ProductCard from './ProductCard';

export default function CatalogView({
  products,
  categories,
  onSelectProduct,
  onAskAI,
  onSwitchToChat,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState('all');

  // Filtrado de productos en tiempo real
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Filtro de Categoría
      const matchesCategory =
        selectedCategory === 'all' || item.category_id === selectedCategory;

      // Filtro de Vehículo
      const matchesVehicle =
        selectedVehicle === 'all' ||
        item.vehicle_type === selectedVehicle ||
        item.vehicle_type === 'universal';

      // Filtro de Búsqueda
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        item.name.toLowerCase().includes(searchLower) ||
        item.brand.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category_name.toLowerCase().includes(searchLower);

      return matchesCategory && matchesVehicle && matchesSearch;
    });
  }, [products, selectedCategory, selectedVehicle, searchTerm]);

  return (
    <div className="catalog-view animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} color="#3B82F6" />
            <span>Plataforma Oficial de Grupo Rino E.I.R.L. Huánuco</span>
          </div>
          <h1 className="hero-title">
            Catálogo de Repuestos & <span className="gradient-text">Asistencia IA</span>
          </h1>
          <p className="hero-description">
            Consulta piezas originales, compatibilidad técnica, lubricantes certificados y herramientas para tu vehículo con entrega rápida en Huánuco.
          </p>

          {/* Quick value badges */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <Zap size={16} className="text-amber" />
              <span>Despacho promedio 12-25 min</span>
            </div>
            <div className="stat-item">
              <Shield size={16} className="text-blue" />
              <span>Garantía oficial y marcas líderes</span>
            </div>
            <div className="stat-item" onClick={onSwitchToChat} style={{ cursor: 'pointer' }}>
              <Bot size={16} className="text-cyan" />
              <span>Asesoría inmediata con RinoBot IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="filter-controls-section">
        {/* Search Input Box */}
        <div className="search-bar-wrapper glass-panel">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por repuesto, marca (Mobil 1, Motul, Brembo, NGK) o vehículo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Vehicle Tabs */}
        <div className="vehicle-tabs-row">
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('all')}
          >
            🚗🏍️ Todos los Vehículos
          </button>
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'auto' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('auto')}
          >
            🚗 Automóviles & SUVs
          </button>
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'moto' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('moto')}
          >
            🏍️ Motocicletas 4T
          </button>
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'universal' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('universal')}
          >
            🔧 Taller & Universal
          </button>
        </div>

        {/* Category Pills */}
        <div className="category-pills-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="results-header-row">
        <div className="results-counter">
          Mostrando <strong>{filteredProducts.length}</strong> de {products.length} repuestos
        </div>
        {searchTerm && (
          <div className="active-filter-indicator">
            Filtrando por: <em>"{searchTerm}"</em>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAskAI={onAskAI}
            />
          ))}
        </div>
      ) : (
        <div className="empty-catalog-state glass-panel">
          <div className="empty-icon-wrap">
            <Search size={36} color="#64748B" />
          </div>
          <h3>No encontramos repuestos que coincidan</h3>
          <p>
            No hay piezas con el término <strong>"{searchTerm}"</strong> en esta categoría.
          </p>
          <div className="empty-actions">
            <button
              className="btn-clear-filters"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedVehicle('all');
              }}
            >
              Restablecer filtros
            </button>
            <button
              className="btn-ask-ai-fallback"
              onClick={() => onAskAI({ name: searchTerm })}
            >
              <Bot size={16} />
              <span>Preguntar disponibilidad a RinoBot</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

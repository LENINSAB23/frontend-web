import React, { useState, useMemo } from 'react';
import { Search, Bot, Layers, Car, Bike, Wrench, X } from 'lucide-react';
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
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <span>Grupo Rino E.I.R.L. • Repuestos Automotrices & Motocicletas</span>
          </div>
          <h1 className="hero-title">
            Catálogo Oficial & <span className="gradient-text">Asistencia Técnica</span>
          </h1>
          <p className="hero-description">
            Consulta piezas originales, compatibilidad técnica, lubricantes certificados y herramientas automotrices con disponibilidad directa en Huánuco.
          </p>

          {/* Quick value badges */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span>Entrega urbana 12-25 min</span>
            </div>
            <div className="stat-item">
              <span>Garantía oficial y marcas líderes</span>
            </div>
            <div className="stat-item" onClick={onSwitchToChat} style={{ cursor: 'pointer' }}>
              <span>Consultar con RinoBot IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="filter-controls-section">
        {/* Search Input Box */}
        <div className="search-bar-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por repuesto, código, marca (Mobil 1, Motul, Brembo, NGK)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Vehicle Tabs */}
        <div className="vehicle-tabs-row">
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('all')}
          >
            <Layers size={14} />
            <span>Todos los Vehículos</span>
          </button>
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'auto' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('auto')}
          >
            <Car size={14} />
            <span>Automóviles & SUVs</span>
          </button>
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'moto' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('moto')}
          >
            <Bike size={14} />
            <span>Motocicletas 4T</span>
          </button>
          <button
            className={`vehicle-tab-btn ${selectedVehicle === 'universal' ? 'active' : ''}`}
            onClick={() => setSelectedVehicle('universal')}
          >
            <Wrench size={14} />
            <span>Taller & Universal</span>
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
              <span>{cat.name.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, '').trim()}</span>
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
            Búsqueda: <em>"{searchTerm}"</em>
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
        <div className="empty-catalog-state">
          <div className="empty-icon-wrap">
            <Search size={22} />
          </div>
          <h3>Sin resultados</h3>
          <p>
            No se encontraron piezas que coincidan con <strong>"{searchTerm}"</strong>.
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
              <Bot size={15} />
              <span>Consultar disponibilidad en RinoBot</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

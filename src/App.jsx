import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CatalogView from './components/CatalogView';
import AIChatView from './components/AIChatView';
import ProductModal from './components/ProductModal';
import ConfigModal from './components/ConfigModal';
import FloatingChatWidget from './components/FloatingChatWidget';
import { fetchProducts, fetchCategories } from './services/api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'chat'
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [chatPrompt, setChatPrompt] = useState('');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoadingCatalog(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error('Error cargando catálogo:', err);
      } finally {
        setIsLoadingCatalog(false);
      }
    }
    loadData();
  }, []);

  const handleAskAIAboutProduct = (product) => {
    const query = product
      ? `Hola RinoBot, ¿tienen disponibilidad de "${product.name}" y con qué vehículos es compatible?`
      : 'Hola RinoBot, deseo consultar sobre repuestos para mi vehículo.';
    setChatPrompt(query);
    setActiveTab('chat');
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Main View Area */}
      <main className="main-content-wrapper container">
        {activeTab === 'catalog' ? (
          <>
            <CatalogView
              products={products}
              categories={categories}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAskAI={handleAskAIAboutProduct}
              onSwitchToChat={() => setActiveTab('chat')}
            />
            {/* Quick Floating Chat for on-page assistance */}
            <FloatingChatWidget onOpenFullChat={() => setActiveTab('chat')} />
          </>
        ) : (
          <AIChatView
            initialPrompt={chatPrompt}
            onClearInitialPrompt={() => setChatPrompt('')}
          />
        )}
      </main>

      {/* Product Specification Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAskAI={handleAskAIAboutProduct}
        />
      )}

      {/* Configuration Modal */}
      {isConfigOpen && (
        <ConfigModal onClose={() => setIsConfigOpen(false)} />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-container">
          <div className="footer-left">
            <span className="footer-brand">GRUPO RINO E.I.R.L.</span>
            <span className="footer-city">Huánuco, Perú • Taller Mecánico, Refacciones y Delivery Satelital</span>
          </div>
          <div className="footer-right">
            <span>RinoBot IA v2.0 • Asistencia Automotriz Exclusiva</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

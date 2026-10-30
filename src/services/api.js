import { MOCK_PRODUCTS, OFFICIAL_CATEGORIES } from '../data/mockCatalog';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return { data: json.data, source: 'backend' };
      }
    }
  } catch (err) {
    console.info('Backend no disponible, cargando catálogo local de Grupo Rino:', err.message);
  }

  // Fallback con catálogo oficial completo
  return { data: MOCK_PRODUCTS, source: 'catalog-cache' };
};

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/categories`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return { data: json.data, source: 'backend' };
      }
    }
  } catch (err) {
    console.info('Cargando categorías locales de Grupo Rino.');
  }

  return { data: OFFICIAL_CATEGORIES, source: 'catalog-cache' };
};

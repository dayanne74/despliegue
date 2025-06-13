import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  Car,
  Utensils,
  Activity,
  Plus,
  Search,
  XCircle,
  Menu,
  X,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import './gestionreservas.css';

// Navegación profesional
function NavigationMenu({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'excursiones', label: 'Excursiones', icon: MapPin, path: '/ReservasGestion' },
    { id: 'paquetes', label: 'Paquetes', icon: Globe, path: '/PaquetesGestion' },
    { id: 'hoteles', label: 'Hoteles', icon: Activity, path: '/HotelesGestion' }
  ];

  const handleMenuClick = (id, path) => {
    setActiveSection(id);
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="nav-agencia-container">
      <div className="nav-agencia-content">
        <div className="nav-agencia-brand">
          <span className="nav-agencia-logo" />
          <span className="nav-agencia-title">Caminantes Por Colombia</span>
        </div>

        <div className="nav-agencia-desktop">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`nav-agencia-item ${activeSection === item.id ? 'nav-agencia-active' : ''}`}
              >
                <Icon className="nav-agencia-icon" />
                {item.label}
              </button>
            );
          })}
        </div>

        <button className="nav-agencia-mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="nav-agencia-mobile-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`nav-agencia-mobile-item ${activeSection === item.id ? 'nav-agencia-mobile-active' : ''}`}
              >
                <Icon className="nav-agencia-mobile-icon" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

// Filtros avanzados
function FiltrosExcursiones({ onFiltrar }) {
  const [destino, setDestino] = useState('');

  const handleBuscar = () => onFiltrar(destino.trim());
  const handleLimpiar = () => {
    setDestino('');
    onFiltrar('');
  };

  return (
    <div className="agencia-filters-wrapper">
      <div className="agencia-search-container">
        <div className="agencia-search-box">
          <Search className="agencia-search-icon" />
          <input
            type="text"
            placeholder="Buscar destino..."
            value={destino}
            onChange={e => setDestino(e.target.value)}
            className="agencia-search-input"
          />
          {destino && <XCircle className="agencia-clear-icon" onClick={handleLimpiar} />}
        </div>
        <button onClick={handleBuscar} className="agencia-search-button">
          Buscar
        </button>
      </div>
    </div>
  );
}

// Tarjeta visual de excursión
function ExcursionCard({ excursion }) {
  return (
    <div className="agencia-excursion-card">
      <div className="agencia-card-image-container">
        {excursion.imagen ? (
          <img
            src={`/uploads/${excursion.imagen}`}
            alt={excursion.nombre}
            className="agencia-card-image"
          />
        ) : (
          <div className="agencia-card-placeholder">
            <MapPin className="agencia-placeholder-icon" />
          </div>
        )}
        <div className="agencia-card-overlay">
          <span className="agencia-card-price">
            ${excursion.precio.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="agencia-card-content">
        <h3 className="agencia-card-title">{excursion.nombre}</h3>
        <div className="agencia-card-destination">
          <MapPin className="agencia-destination-icon" />
          <span>{excursion.destino}</span>
        </div>
        <p className="agencia-card-description">{excursion.descripcion}</p>

        <div className="agencia-card-details">
          <div className="agencia-detail-item">
            <Clock className="agencia-detail-icon" />
            <span className="agencia-detail-text">{excursion.duracion}</span>
          </div>
          <div className="agencia-detail-item">
            <Car className="agencia-detail-icon" />
            <span className="agencia-detail-text">{excursion.transporte}</span>
          </div>
          <div className="agencia-detail-item">
            <Utensils className="agencia-detail-icon" />
            <span className="agencia-detail-text">{excursion.comida}</span>
          </div>
          <div className="agencia-detail-item">
            <Activity className="agencia-detail-icon" />
            <span className="agencia-detail-text">{excursion.actividad}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Vista principal profesional
export default function ReservasGestion() {
  const { token } = useAuth();
  const [activeSection, setActiveSection] = useState('excursiones');
  const [excursiones, setExcursiones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) cargarExcursiones();
  }, [token]);

  const cargarExcursiones = async () => {
  if (!token) {
    setError('Debe iniciar sesión');
    return;
  }
  setCargando(true);
  setError(null);
  try {
    const res = await fetch('/api/excursiones', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    setExcursiones(data);
  } catch (err) {
    console.error('Error al cargar excursiones:', err);
    setError('No se pudo cargar las excursiones.');
  } finally {
    setCargando(false);
  }
};


  const filtrarExcursiones = async destino => {
    setCargando(true);
    setError(null);
    try {
      const endpoint = destino
        ? `/api/excursiones?destino=${encodeURIComponent(destino)}`
        : '/api/excursiones';
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setExcursiones(data);
    } catch (err) {
      console.error('Error al filtrar excursiones:', err);
      setError('No se pudo filtrar las excursiones.');
    } finally {
      setCargando(false);
    }
  };
const navigate = useNavigate();
  const handleReservar = () => {
    navigate('/ReservaForm');
   
  };

  return (
    <div className="agencia-app-container">
      <NavigationMenu activeSection={activeSection} setActiveSection={setActiveSection} />

      <header className="agencia-header">
        <div className="agencia-header-content">
          <h1 className="agencia-main-title">Excursiones Colombia</h1>
          <p className="agencia-subtitle">Descubre los destinos más hermosos del país</p>
        </div>
      </header>

      <main className="agencia-main-content">
        <FiltrosExcursiones onFiltrar={filtrarExcursiones} />

        {cargando && (
          <div className="agencia-loading-container">
            <div className="agencia-loading-spinner"></div>
            <p className="agencia-loading-text">Cargando excursiones...</p>
          </div>
        )}

        {error && (
          <div className="agencia-error-container">
            <p className="agencia-error-message">{error}</p>
          </div>
        )}

        {!cargando && !error && excursiones.length === 0 && (
          <div className="agencia-empty-state">
            <MapPin className="agencia-empty-icon" />
            <p className="agencia-empty-message">No hay excursiones disponibles</p>
            <p className="agencia-empty-subtitle">Intenta con otro destino o revisa más tarde</p>
          </div>
        )}

        <div className="agencia-excursions-grid">
          {excursiones.map(exc => (
            <ExcursionCard key={exc._id} excursion={exc} />
          ))}
        </div>

        {excursiones.length > 0 && (
          <div className="agencia-reserve-section">
            <div className="agencia-reserve-content">
              <h2 className="agencia-reserve-title">¿Listo para tu próxima aventura?</h2>
              <p className="agencia-reserve-subtitle">
                Reserva ahora y vive experiencias únicas en Colombia
              </p>
              <button onClick={handleReservar} className="agencia-reserve-button">
                <Phone className="agencia-reserve-icon" />
                Reservar Ahora
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="agencia-footer">
        <div className="agencia-footer-content">
          <div className="agencia-footer-info">
            <h3 className="agencia-footer-title">Caminantes Por Colombia</h3>
            <p className="agencia-footer-description">
              Tu compañía de confianza para explorar Colombia
            </p>
          </div>
          <div className="agencia-footer-contact">
            <div className="agencia-contact-item">
              <Phone className="agencia-contact-icon" />
              <span>+57 3122567578</span>
            </div>
            <div className="agencia-contact-item">
              <Mail className="agencia-contact-icon" />
              <span>CaminantesPorColombia@gmail.com</span>
            </div>
          </div>
          <p className="agencia-footer-text">
            &copy; {new Date().getFullYear()} Caminantes Por Colombia - Tu aventura comienza aquí
          </p>
        </div>
      </footer>
    </div>
  );
}

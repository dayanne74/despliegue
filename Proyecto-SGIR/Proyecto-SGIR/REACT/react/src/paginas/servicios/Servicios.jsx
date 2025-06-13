import React, { useState } from 'react';
import { MapPin, Calendar, Users, Star, Camera, Plane, Bed, X, Heart, Share2 } from 'lucide-react';

const TourismServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const services = [
    {
      id: 1,
      title: "Hoteles de Lujo",
      subtitle: "Hospedaje Premium",
      description: "Descubre los mejores hoteles boutique y resorts de lujo en destinos únicos de Colombia.",
      fullDescription: "Experimenta la hospitalidad colombiana en su máxima expresión. Nuestros hoteles seleccionados ofrecen vistas espectaculares, gastronomía local de primera clase, spas de relajación y servicios personalizados. Desde hoteles históricos en Cartagena hasta eco-lodges en el Amazonas, cada estancia será inolvidable.",
      icon: <Bed className="service-icon" />,
      price: "Desde $250.000 COP/noche",
      rating: 4.8,
      reviews: 234,
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      ],
      features: ["WiFi Gratis", "Desayuno Incluido", "Piscina", "Spa", "Concierge 24/7"],
      locations: ["Cartagena", "Bogotá", "Medellín", "Santa Marta"],
      category: "hotels"
    },
    {
      id: 2,
      title: "Paquetes Turísticos",
      subtitle: "Experiencias Completas",
      description: "Paquetes todo incluido diseñados para descubrir la magia de Colombia sin preocupaciones.",
      fullDescription: "Déjanos planificar tu aventura perfecta. Nuestros paquetes incluyen transporte, hospedaje, alimentación, guías especializados y actividades únicas. Desde la Costa Caribe hasta los Andes, pasando por el Pacífico y la Amazonía, tenemos el paquete ideal para cada tipo de viajero.",
      icon: <Plane className="service-icon" />,
      price: "Desde $1.200.000 COP/persona",
      rating: 4.9,
      reviews: 189,
      images: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop"
      ],
      features: ["Todo Incluido", "Guía Especializado", "Transporte", "Seguro de Viaje", "Actividades Premium"],
      locations: ["Eje Cafetero", "Costa Caribe", "Amazonas", "Llanos"],
      category: "packages"
    },
    {
      id: 3,
      title: "Excursiones Únicas",
      subtitle: "Aventuras Memorables",
      description: "Explora paisajes increíbles y vive experiencias auténticas en tours de un día o aventuras de varios días.",
      fullDescription: "Conecta con la naturaleza y la cultura colombiana a través de nuestras excursiones cuidadosamente diseñadas. Desde caminatas por la Ciudad Perdida hasta avistamiento de ballenas en el Pacífico, cada excursión es una oportunidad de crear recuerdos únicos con la seguridad de guías expertos locales.",
      icon: <Camera className="service-icon" />,
      price: "Desde $180.000 COP/día",
      rating: 4.7,
      reviews: 312,
      images: [
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
      ],
      features: ["Grupos Pequeños", "Equipo Incluido", "Guía Local", "Fotografía", "Certificado"],
      locations: ["Ciudad Perdida", "Cocora", "Tayrona", "Caño Cristales"],
      category: "excursions"
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedService.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedService.images.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star-filled" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="star-half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star-empty" />);
    }

    return stars;
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        /* Hero Header Styles */
        .hero-header {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 800px;
          padding: 2rem;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #fff, #f0f0f0, #fff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 2rem);
          opacity: 0.9;
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          top: 10%;
          right: 10%;
          width: 100px;
          height: 100px;
          animation-delay: 0s;
        }

        .element-2 {
          bottom: 10%;
          left: 10%;
          width: 150px;
          height: 150px;
          animation-delay: 3s;
        }

        /* Main Content Styles */
        .main-content {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 4rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 1rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .section-subtitle {
          font-size: 1.3rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .service-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .service-card:nth-child(1) {
          animation: slideInLeft 0.8s ease-out;
        }

        .service-card:nth-child(2) {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .service-card:nth-child(3) {
          animation: slideInRight 0.8s ease-out 0.4s both;
        }

        .card-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-card:hover .card-image img {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-card:hover .card-overlay {
          opacity: 1;
        }

        .service-icon {
          width: 60px;
          height: 60px;
          color: white;
        }

        .card-content {
          padding: 2rem;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .card-subtitle {
          font-size: 1rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .card-description {
          color: #718096;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #38a169;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star-filled {
          width: 16px;
          height: 16px;
          fill: #fbbf24;
          color: #fbbf24;
        }

        .star-half {
          width: 16px;
          height: 16px;
          fill: #fbbf24;
          color: #fbbf24;
          opacity: 0.5;
        }

        .star-empty {
          width: 16px;
          height: 16px;
          fill: #e5e7eb;
          color: #e5e7eb;
        }

        .rating-text {
          font-size: 0.9rem;
          color: #718096;
        }

        .card-cta {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .card-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideInUp 0.3s ease;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(35, 135, 134, 0.9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: white;
          transform: scale(1.1);
        }

        .modal-gallery {
          position: relative;
          height: 700px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }

        .modal-gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .gallery-prev {
          left: 1rem;
        }

        .gallery-next {
          right: 1rem;
        }

        .gallery-dots {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .gallery-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-dot.active {
          background: white;
          transform: scale(1.2);
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2d3748;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          background: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: #667eea;
          color: white;
          transform: scale(1.1);
        }

        .modal-subtitle {
          color: #667eea;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .modal-description {
          color: #4a5568;
          line-height: 1.8;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .modal-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .meta-section h4 {
          color: #2d3748;
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .feature-tag {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .locations-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .location-tag {
          background: #f0fff4;
          color: #38a169;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #c6f6d5;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        .btn-secondary {
          flex: 1;
          padding: 1rem 2rem;
          border: 2px solid #667eea;
          background: transparent;
          color: #667eea;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .btn-primary {
          flex: 2;
          padding: 1rem 2rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        /* Animations */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .modal-content {
            margin: 1rem;
            max-height: 95vh;
          }
          
          .modal-body {
            padding: 1.5rem;
          }
          
          .modal-meta {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .modal-footer {
            flex-direction: column;
          }
          
          .gallery-nav {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }
          
          .hero-content {
            padding: 1rem;
          }
          
          .card-content {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="app">
        {/* Hero Header */}
        <header className="hero-header">
          <div className="hero-bg"></div>
          <div className="hero-content">
            <h1 className="hero-title">Descubre Colombia</h1>
            <p className="hero-subtitle">Vive experiencias únicas en el país más acogedor del mundo</p>
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Nuestros Servicios</h2>
              <p className="section-subtitle">
                Selecciona el servicio perfecto para tu próxima aventura colombiana
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="service-card"
                  onClick={() => openModal(service)}
                >
                  <div className="card-image">
                    <img src={service.images[0]} alt={service.title} />
                    <div className="card-overlay">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{service.title}</h3>
                    <p className="card-subtitle">{service.subtitle}</p>
                    <p className="card-description">{service.description}</p>
                    
                    <div className="card-meta">
                      <div className="card-price">{service.price}</div>
                      <div className="card-rating">
                        <div className="stars">
                          {renderStars(service.rating)}
                        </div>
                        <span className="rating-text">({service.reviews})</span>
                      </div>
                    </div>
                    
                    <button className="card-cta">
                      Ver Detalles y Reservar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Modal */}
        {selectedService && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
              
              <div className="modal-gallery">
                <img 
                  src={selectedService.images[currentImageIndex]} 
                  alt={selectedService.title} 
                />
                
                {selectedService.images.length > 1 && (
                  <>
                    <button className="gallery-nav gallery-prev" onClick={prevImage}>
                      ‹
                    </button>
                    <button className="gallery-nav gallery-next" onClick={nextImage}>
                      ›
                    </button>
                    
                    <div className="gallery-dots">
                      {selectedService.images.map((_, index) => (
                        <div 
                          key={index}
                          className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-body">
                <div className="modal-header">
                  <div>
                    <h2 className="modal-title">{selectedService.title}</h2>
                    <p className="modal-subtitle">{selectedService.subtitle}</p>
                  </div>
                  <div className="modal-actions">
                    <button className="action-btn">
                      <Heart size={20} />
                    </button>
                    <button className="action-btn">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <p className="modal-description">{selectedService.fullDescription}</p>
                
                <div className="modal-meta">
                  <div className="meta-section">
                    <h4>Características Incluidas</h4>
                    <div className="features-list">
                      {selectedService.features.map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="meta-section">
                    <h4>Destinos Disponibles</h4>
                    <div className="locations-list">
                      {selectedService.locations.map((location, index) => (
                        <span key={index} className="location-tag">
                          <MapPin size={14} style={{display: 'inline', marginRight: '4px'}} />
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  
                  <button className="btn-primary">
                    <Users size={20} style={{marginRight: '2px'}} />
                    Reservar Ahora - {selectedService.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TourismServices;
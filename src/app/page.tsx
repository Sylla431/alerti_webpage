'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Option 1: Formspree (recommandé pour site vitrine)
      const response = await fetch('https://formspree.io/f/mzzjwrnv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Calculer la hauteur de navigation responsive
      const navElement = document.querySelector('nav');
      const navHeight = navElement ? navElement.offsetHeight : (window.innerWidth < 640 ? 64 : window.innerWidth < 1024 ? 80 : 96);
      let elementPosition = element.offsetTop - navHeight;
      
      // Ajustement spécial pour la section comment-ca-marche pour une meilleure transition
      if (elementId === 'comment-ca-marche') {
        elementPosition = elementPosition - 40; // Ajuster l'offset pour une transition plus fluide
      }
      
      // Utiliser requestAnimationFrame pour une animation plus fluide
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 800; // Durée de l'animation en ms
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function pour une transition plus naturelle
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    }
  };

  // Effet pour attendre que tout soit chargé
  useEffect(() => {
    const loadAllResources = async () => {
      try {
        // Attendre que le DOM soit complètement chargé
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true });
          });
        }

        // Attendre que les polices soient chargées
        await document.fonts.ready;

        // Attendre que toutes les images critiques soient chargées
        const criticalImages = ['/logo_long.png'];
        const imagePromises = criticalImages.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue même si une image échoue
            img.src = src;
          });
        });

        // Attendre un délai minimum réduit pour s'assurer que tout est prêt
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 500));

        // Attendre que toutes les promesses se résolvent
        await Promise.all([...imagePromises, minLoadTime]);

        // Attendre que les styles CSS soient appliqués et que les animations soient prêtes
        await new Promise(resolve => {
          // Forcer un reflow pour s'assurer que les styles sont appliqués
          document.body.offsetHeight;
          setTimeout(resolve, 200);
        });
        
        // Transition fluide vers le contenu
        setIsLoaded(true);
      } catch (error) {
        console.log('Erreur lors du chargement:', error);
        // Charger quand même après un délai minimum réduit
        setTimeout(() => setIsLoaded(true), 1000);
      }
    };

    loadAllResources();
  }, []);

  // Écran de chargement
  if (!isLoaded) {
  return (
      <div className="fixed inset-0 bg-[#004AAD] flex items-center justify-center z-50">
        {/* Effet de particules en arrière-plan optimisé */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float optimized-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="text-center relative z-10">
          {/* Logo de chargement */}
          <div className="mb-8 animate-fade-in-up">
            <Image
              src="/logo_long.png"
              alt="Alerti Logo"
              width={300}
              height={80}
              className="h-20 w-auto object-cover mx-auto drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Spinner moderne avec effet de glow */}
          <div className="relative mb-8 animate-fade-in-up">
            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto shadow-lg"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-white/50 rounded-full animate-spin mx-auto"></div>
          </div>
          
          {/* Texte de chargement */}
          <div className="text-white text-xl font-semibold mb-3 animate-fade-in-up">
            Chargement d&apos;Alerti...
          </div>
          <div className="text-white/80 text-sm max-w-sm mx-auto animate-fade-in-up">
            Préparation de l&apos;expérience complète avec animations et ressources
          </div>
          
          {/* Barre de progression animée */}
          <div className="w-72 h-2 bg-white/20 rounded-full mx-auto mt-8 overflow-hidden animate-fade-in-up">
            <div className="h-full bg-white rounded-full animate-pulse" style={{
              animation: 'shimmer 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white content-loaded">
      {/* Navigation moderne */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <Image
                  src="/logo_long.png"
                  alt="Alerti Logo"
                  width={400}
                  height={90}
                  className="h-8 sm:h-12 lg:h-16 w-auto object-cover"
                  priority
                />
              </div>
              <span className="hidden lg:block text-sm lg:text-base text-gray-700 font-semibold">L&apos;alerte qui sauve des vies</span>
            </div>
            
            {/* Menu desktop */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-2">
                <button onClick={() => smoothScrollTo('comment-ca-marche')} className="relative text-gray-800 hover:text-[#004AAD] px-3 lg:px-5 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-[#004AAD]/10 group">
                  <span className="relative z-10">Comment ça marche</span>
                  <div className="absolute inset-0 bg-[#004AAD]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button onClick={() => smoothScrollTo('fonctionnalites')} className="relative text-gray-800 hover:text-[#004AAD] px-3 lg:px-5 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-[#004AAD]/10 group">
                  <span className="relative z-10">Fonctionnalités</span>
                  <div className="absolute inset-0 bg-[#004AAD]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button onClick={() => smoothScrollTo('dispositif')} className="relative text-gray-800 hover:text-[#004AAD] px-3 lg:px-5 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-[#004AAD]/10 group">
                  <span className="relative z-10">Dispositif</span>
                  <div className="absolute inset-0 bg-[#004AAD]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button onClick={() => smoothScrollTo('application')} className="relative text-gray-800 hover:text-[#004AAD] px-3 lg:px-5 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-[#004AAD]/10 group">
                  <span className="relative z-10">Application</span>
                  <div className="absolute inset-0 bg-[#004AAD]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button onClick={() => smoothScrollTo('impact')} className="relative text-gray-800 hover:text-[#004AAD] px-3 lg:px-5 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-[#004AAD]/10 group">
                  <span className="relative z-10">Impact</span>
                  <div className="absolute inset-0 bg-[#004AAD]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button onClick={() => smoothScrollTo('contact')} className="relative bg-[#F54B4D] text-white px-4 lg:px-8 py-2 lg:py-3 rounded-full text-sm lg:text-base font-semibold hover:bg-[#d94345] hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <span className="relative z-10">Contact</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Bouton menu mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#004AAD] hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => {smoothScrollTo('comment-ca-marche'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#004AAD] hover:bg-[#004AAD]/10 transition-colors">
                  Comment ça marche
                </button>
                <button onClick={() => {smoothScrollTo('fonctionnalites'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#004AAD] hover:bg-[#004AAD]/10 transition-colors">
                  Fonctionnalités
                </button>
                <button onClick={() => {smoothScrollTo('dispositif'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#004AAD] hover:bg-[#004AAD]/10 transition-colors">
                  Dispositif
                </button>
                <button onClick={() => {smoothScrollTo('application'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#004AAD] hover:bg-[#004AAD]/10 transition-colors">
                  Application
                </button>
                <button onClick={() => {smoothScrollTo('impact'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#004AAD] hover:bg-[#004AAD]/10 transition-colors">
                  Impact
                </button>
                <button onClick={() => {smoothScrollTo('contact'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[#F54B4D] text-white hover:bg-[#d94345] hover:shadow-lg transition-all duration-300">
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Section Héros moderne */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
        {/* Vidéos en arrière-plan */}
        <div className="absolute inset-0 w-full h-full">
         
          
          {/* Vidéo principale */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/inondation.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay sombre pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-500"></div>
          
          {/* Effet de particules flottantes - optimisé */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full optimized-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              ></div>
            ))}
            {[...Array(4)].map((_, i) => (
              <div
                key={`rain-${i}`}
                className="absolute w-0.5 h-12 bg-white/40 optimized-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `pulse ${2 + Math.random() * 1.5}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="relative mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight relative">
                <span className="relative z-10">Ensemble, anticipons</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white relative">
                <span className="text-[#F54B4D]">
                  les inondations
                </span>
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-4xl mx-auto font-light leading-relaxed px-4">
              Imaginez un Mali où chaque pluie ne serait plus une menace, mais une <span className="text-[#004AAD] font-semibold">information utile</span>.
            </p>
            {/* <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Grâce à Alerti, les habitants des zones à risque reçoivent une alerte <span className="font-bold text-white">1 à 2 jours</span> avant une inondation prévue.
            </p> */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <button
                onClick={() => smoothScrollTo('comment-ca-marche')}
                className="group relative bg-[#F54B4D] text-white font-semibold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#d94345] hover:shadow-2xl hover:shadow-[#F54B4D]/30 w-full sm:w-auto"
              >
                <span className="relative z-10">Découvrir Alerti</span>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </button>
          <button
                onClick={() => smoothScrollTo('fonctionnalites')}
                className="group relative glass-morphism text-white font-semibold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-full text-sm sm:text-base lg:text-lg border border-white/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10">Voir comment ça marche</span>
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
        
      </section>

      {/* Section Comment ça marche */}
      <section id="comment-ca-marche" className="min-h-screen py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        {/* Éléments décoratifs animés */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200/20 rounded-full animate-float optimized-float"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-purple-200/20 rounded-full animate-float optimized-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-cyan-200/20 rounded-full animate-float optimized-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-center min-h-[80vh]">
          {/* Titre compact */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 animate-fade-in-up">
              Comment ça marche
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Chez Alerti, nous croyons qu&apos;<span className="font-bold text-[#004AAD]">une information reçue à temps peut sauver des vies</span>.
            </p>
          </div>


          {/* Processus horizontal avec données animées */}
          <div className="relative">
            {/* Ligne de connexion avec données animées */}
            <div className="hidden lg:block absolute top-10 left-1/10 right-1/10 h-1 z-0">
              {/* Ligne de base */}
            <div className="w-full h-full bg-[#004AAD]/20"></div>
              
              {/* Nœuds de connexion */}
              <div className="absolute inset-0">
                {/* Nœud 1 */}
                 <div className="absolute top-0 left-1/5 w-2 h-2 bg-[#004AAD] rounded-full animate-pulse"></div>
                {/* Nœud 2 */}
                 <div className="absolute top-0 left-2/5 w-2 h-2 bg-[#F54B4D] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                {/* Nœud 3 */}
                 <div className="absolute top-0 left-3/5 w-2 h-2 bg-[#004AAD] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                {/* Nœud 4 */}
                 <div className="absolute top-0 left-4/5 w-2 h-2 bg-[#F54B4D] rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              </div>
              
              {/* Particules de données animées */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Particule 1 - Capteurs vers Cloud */}
                 <div className="absolute w-3 h-3 bg-[#004AAD] rounded-full animate-data-travel shadow-lg" style={{
                  animationDelay: '0s',
                  animationDuration: '3s'
                }}></div>
                
                {/* Particule 2 - Cloud vers IA */}
                 <div className="absolute w-3 h-3 bg-[#F54B4D] rounded-full animate-data-travel shadow-lg" style={{
                  animationDelay: '1s',
                  animationDuration: '3s'
                }}></div>
                
                {/* Particule 3 - IA vers Alertes */}
                 <div className="absolute w-3 h-3 bg-[#004AAD] rounded-full animate-data-travel shadow-lg" style={{
                  animationDelay: '2s',
                  animationDuration: '3s'
                }}></div>
                
                {/* Particule 4 - Alertes vers Interface */}
                 <div className="absolute w-3 h-3 bg-[#F54B4D] rounded-full animate-data-travel shadow-lg" style={{
                  animationDelay: '3s',
                  animationDuration: '3s'
                }}></div>
                
                {/* Particule 5 - Interface vers Capteurs (boucle) */}
                 <div className="absolute w-3 h-3 bg-[#004AAD] rounded-full animate-data-travel shadow-lg" style={{
                  animationDelay: '4s',
                  animationDuration: '3s'
                }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
              {/* Étape 1 - Capteurs */}
              <div className="text-center group relative">
                <div className="bg-[#004AAD] rounded-3xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse-rotate relative z-10">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Capteurs</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Surveillance continue des niveaux d&apos;eau et pluviométrie
                </p>
                <div className="mt-3">
                  <svg className="w-10 h-10 mx-auto text-[#004AAD] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="12" rx="2" />
                        <circle cx="8" cy="10" r="1" fill="currentColor" />
                        <circle cx="12" cy="10" r="1" fill="currentColor" />
                        <circle cx="16" cy="10" r="1" fill="currentColor" />
                      </svg>
                    </div>
                </div>
                
              {/* Étape 2 - Cloud */}
              <div className="text-center group relative">
                <div className="bg-[#F54B4D] rounded-3xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse-rotate relative z-10" style={{animationDelay: '1s'}}>
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Cloud AWS</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Transmission et analyse automatique des données
                </p>
                <div className="mt-3">
                  <svg className="w-10 h-10 mx-auto text-[#F54B4D] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                  </div>
              </div>
              
              {/* Étape 3 - IA */}
              <div className="text-center group relative">
                <div className="bg-[#004AAD] rounded-3xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse-rotate relative z-10" style={{animationDelay: '2s'}}>
                  <span className="text-white font-bold text-2xl">3</span>
              </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">IA & Météo</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Calcul du risque d&apos;inondation par intelligence artificielle
                </p>
                <div className="mt-3">
                  <svg className="w-10 h-10 mx-auto text-[#004AAD] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
              </div>
            </div>

            {/* Étape 4 - Alertes */}
              <div className="text-center group relative">
                <div className="bg-[#F54B4D] rounded-3xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse-rotate relative z-10" style={{animationDelay: '3s'}}>
                  <span className="text-white font-bold text-2xl">4</span>
                  </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Alertes</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  SMS automatiques selon le niveau de risque détecté
                </p>
                <div className="mt-3">
                  <svg className="w-10 h-10 mx-auto text-[#F54B4D] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
            </div>

            {/* Étape 5 - Interface */}
            <div className="text-center group relative">
              <div className="bg-[#004AAD] rounded-3xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse-rotate relative z-10" style={{animationDelay: '4s'}}>
                <span className="text-white font-bold text-2xl">5</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Interface</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Application mobile et dashboard web pour utilisateurs
              </p>
              <div className="mt-3">
                <svg className="w-10 h-10 mx-auto text-[#004AAD] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <rect x="5" y="5" width="3" height="8" fill="currentColor" />
                      <rect x="10" y="7" width="3" height="6" fill="currentColor" />
                      <rect x="15" y="6" width="3" height="9" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
              
          {/* Flèches mobiles améliorées */}
          <div className="lg:hidden flex justify-center space-x-4 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <svg className="w-6 h-6 text-[#004AAD]/60 animate-arrow-pulse" fill="currentColor" viewBox="0 0 50 50" style={{animationDelay: `${i * 0.5}s`}}>
                  <path d="M25 8 L25 32 L18 32 L25 42 L32 32 L25 32" />
                </svg>
                {i < 3 && <div className="w-8 h-0.5 bg-[#004AAD]/40 ml-2"></div>}
              </div>
            ))}
          </div>

          {/* Section finale compacte */}
          <div className="mt-8 text-center">
            <div className="bg-[#004AAD] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <h3 className="text-lg sm:text-xl font-bold">Surveillance continue 24h/24</h3>
                </div>
                <p className="text-sm sm:text-base opacity-90 max-w-2xl mx-auto">
                  Système automatisé pour une surveillance continue des zones vulnérables
                </p>
              </div>
              <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
            </div>
          </div>
        </div>
        </div>
        
      </section>

      {/* Section Fonctionnalités */}
      <section id="fonctionnalites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fonctionnalités clés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une technologie de pointe au service de la sécurité des populations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-16 h-16 text-[#004AAD]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                ),
                title: "Capteurs intelligents connectés (IoT)",
                description: "Réseau de capteurs dernière génération pour un monitoring en temps réel"
              },
              {
                icon: (
                  <svg className="w-16 h-16 text-[#F54B4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                ),
                title: "Plateforme cloud AWS fiable",
                description: "Infrastructure scalable et sécurisée pour traiter les données rapidement"
              },
              {
                icon: (
                  <svg className="w-16 h-16 text-[#F54B4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Alertes automatiques par SMS",
                description: "Notifications instantanées pour protéger les populations à risque"
              },
              {
                icon: (
                  <svg className="w-16 h-16 text-[#004AAD]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Prévisions météo locales",
                description: "Données précises et localisées pour une meilleure anticipation"
              },
              {
                icon: (
                  <svg className="w-16 h-16 text-[#004AAD]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ),
                title: "Cartographie en temps réel",
                description: "Application mobile avec visualisation interactive des zones à risque"
              },
              {
                icon: (
                  <svg className="w-16 h-16 text-[#F54B4D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                ),
                title: "Deux rôles utilisateurs",
                description: "Interface administrateur et citoyen pour une gestion optimale"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-8 hover-lift border border-gray-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#004AAD] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="relative z-10">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#004AAD] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className="absolute inset-0 bg-[#004AAD]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Dispositif Électronique */}
      <section id="dispositif" className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Dispositif <span className="text-[#F54B4D]">Électronique</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Découvrez nos capteurs intelligents et dispositifs électroniques installés sur le terrain pour surveiller les zones à risque.
            </p>
          </div>

          {/* Collage photo avec images et vidéos */}
          <div className="overflow-x-auto md:overflow-x-visible -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-max md:min-w-0">
            {/* Image 1 - Grande */}
            {/* <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-1 lg:col-span-2 md:row-span-2 group">
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] rounded-2xl overflow-hidden shadow-xl hover-lift">
                <Image
                  src="/dispositif/IMG-20251007-WA0022.jpg"
                  alt="Dispositif électronique Alerti 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div> */}

            {/* Vidéo 1 */}
            {/* <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-1 group">
              <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] rounded-2xl overflow-hidden shadow-xl hover-lift">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                  <source src="/dispositif/VID-20251007-WA0025.mp4" type="video/mp4" />
                </video>
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div> */}

            {/* Image 2 */}
            {/* <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-1 group">
              <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] rounded-2xl overflow-hidden shadow-xl hover-lift">
                <Image
                  src="/dispositif/IMG-20251007-WA0024.jpg"
                  alt="Dispositif électronique Alerti 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div> */}

            {/* Vidéo 2 - Grande */}
            {/* <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-2 lg:col-span-1 group">
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] rounded-2xl overflow-hidden shadow-xl hover-lift">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                  <source src="/dispositif/VID-20251007-WA0025(1).mp4" type="video/mp4" />
                </video>
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div> */}
             {/* video 3 */}
            <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-2 lg:col-span-3 group">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl hover-lift">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                  <source src="/dispositif/VID-20251028-WA0021(1).mp4" type="video/mp4" />
                </video>
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            </div>
          </div>
         

          {/* Description du dispositif */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-[#004AAD] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Technologie IoT de pointe</h3>
                <p className="text-base sm:text-lg opacity-90 max-w-3xl mx-auto">
                  Nos capteurs intelligents sont installés dans les zones à haut risque pour mesurer en continu les niveaux d&apos;eau, 
                  la pluviométrie et la vitesse d&apos;écoulement, permettant une surveillance 24h/24.
                </p>
              </div>
              <div className="absolute inset-0 bg-white/10 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Application Mobile */}
      <section id="application" className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Application <span className="text-[#F54B4D]">Mobile Alerti</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Découvrez l&apos;application mobile Alerti qui permet aux utilisateurs de recevoir des alertes en temps réel et de visualiser les zones à risque.
            </p>
          </div>

          {/* Carousel des captures d'écran dans des frames iPhone */}
          <div className="relative overflow-hidden -mx-2 sm:-mx-4 lg:-mx-8">
            <div className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-6 sm:pb-8 snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 py-4">
              {[
                '/app_screens/Screenshot_20251017_141057.jpg',
                '/app_screens/Screenshot_20251017_141339.jpg',
                '/app_screens/Screenshot_20251017_141353.jpg',
                '/app_screens/Screenshot_20251017_141118.jpg',
                '/app_screens/Screenshot_20251017_141124.jpg',
                '/app_screens/Screenshot_20251017_141138.jpg',
                '/app_screens/Screenshot_20251017_141147.jpg',
                '/app_screens/Screenshot_20251017_141158.jpg',
                '/app_screens/Screenshot_20251017_141233.jpg',
                '/app_screens/Screenshot_20251017_141314.jpg',
                '/app_screens/Screenshot_20251017_141256.jpg',
                '/app_screens/Screenshot_20251017_211417.jpg',
                '/app_screens/Screenshot_20251017_211457.jpg',
                '/app_screens/Screenshot_20251017_211628.jpg'
              ].map((screenshot, index) => (
                <div key={index} className="flex-shrink-0 snap-center group px-1 sm:px-2">
                  {/* Container avec ombre externe */}
                  <div className="drop-shadow-xl sm:drop-shadow-2xl">
                    {/* Frame iPhone */}
                    <div className="relative w-56 sm:w-64 lg:w-72 h-[500px] sm:h-[550px] lg:h-[600px] mx-auto transform group-hover:scale-105 transition-transform duration-300 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
                    {/* iPhone Frame */}
                    <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl overflow-hidden">
                      {/* Bordure intérieure */}
                      <div className="w-full h-full bg-gray-900 rounded-[2rem] p-1 overflow-hidden">
                        <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
                          {/* Dynamic Island */}
                          {/* <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full z-10 flex items-center justify-center">
                            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                          </div> */}

                          {/* Screenshot */}
                          <div className="w-full h-full overflow-hidden rounded-[1.8rem]">
          <Image
                              src={screenshot}
                              alt={`Capture d&apos;écran Alerti ${index + 1}`}
                              width={280}
                              height={560}
                              className="w-full h-full object-cover rounded-[1.8rem]"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                          </div>

                          {/* Home indicator */}
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/60 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-white/10 pointer-events-none rounded-[2.5rem] overflow-hidden"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicateur de scroll */}
            <div className="text-center mt-6 sm:mt-8">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4 px-4">
                <div className="w-2 h-2 bg-[#004AAD] rounded-full animate-pulse hidden sm:block"></div>
                <p className="text-gray-500 text-xs sm:text-sm font-medium text-center">← Faites défiler horizontalement pour voir toutes les captures d&apos;écran →</p>
                <div className="w-2 h-2 bg-[#004AAD] rounded-full animate-pulse hidden sm:block"></div>
              </div>
            </div>
          </div>

          {/* Bouton de téléchargement de l'app */}
          <div className="mt-12 text-center">
            <a
              href="https://drive.google.com/file/d/1sNUYZ4Nn1xuYD0jBDY7yQ86fisIVZ7HY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center bg-[#004AAD] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#003b8a] hover:shadow-2xl hover:shadow-[#004AAD]/30"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative z-10">Télécharger l&apos;application Alerti</span>
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <p className="text-sm text-gray-500 mt-3">
              Version APK pour Android - Téléchargement gratuit
            </p>
          </div>

          {/* Description des fonctionnalités de l'app */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#004AAD] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-2.4 0-4.333 1.9-4.333 4.25v3.25l-2 1.546a2 2 0 00-.667 1.5v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 00-.667-1.5l-2-1.546V6.25C13.333 3.9 11.4 2 12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Alertes Push</h3>
              <p className="text-gray-600">Notifications instantanées sur votre téléphone</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F54B4D] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cartes Interactives</h3>
              <p className="text-gray-600">Visualisez les zones à risque en temps réel</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#004AAD] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Données Temps Réel</h3>
              <p className="text-gray-600">Informations météo et niveaux d&apos;eau actuels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Impact & Résultats */}
      <section id="impact" className="py-20 bg-[#004AAD] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Impact
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Des résultats concrets qui sauvent des vies chaque jour
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">+500</div>
              <div className="text-xl opacity-90">foyers protégés à Bamako</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">3</div>
              <div className="text-xl opacity-90">zones couvertes : Sebenikoro, Yirimadio, Missabougou</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">48h</div>
              <div className="text-xl opacity-90">temps d&apos;alerte moyen avant les inondations</div>
            </div>
          </div>

          {/* Témoignage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center max-w-4xl mx-auto">
            <blockquote className="text-xl italic mb-6">
              &quot;Parce qu&apos;une information à temps peut sauver des vies. Alerti nous a permis d&apos;évacuer notre maison avant la dernière grande inondation. Merci à toute l&apos;équipe !&quot;
            </blockquote>
            <div className="text-lg font-semibold">Mariam Traoré</div>
            <div className="opacity-75">Habitante de Sebenikoro</div>
          </div>

          {/* Partenaires */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-8">Nos partenaires</h3>
            <div className="flex justify-center items-center space-x-8 opacity-75">
              <div className="text-lg">Orange Digital Center</div>
              {/* <div className="w-px h-8 bg-white/50"></div> */}
              {/* <div className="text-lg">Marakadev</div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe moderne */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Notre <span className="text-[#F54B4D]">Équipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Une initiative portée par de <span className="font-semibold text-[#004AAD]">jeunes innovateurs maliens</span> engagés pour la sécurité des populations.
            </p>
          </div>

          {/* Grille des 5 membres de l'équipe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Mamadou Sylla",
                role: "Développeur Full-Stack",
                image: "/team/#"
              },
              {
                name: "Adama Sissoko",
                role: "Développeur Web & Mobile",
                image: "/team/adama.png"
              },
              {
                name: "Issa",
                role: "Electronicien",
                image: "/team/issa.png"
              },
              {
                name: "Mohamed Fane",
                role: "Le Designer",
                image: "/team/fane.png"
              },
              {
                name: "Fatoumata",
                role: "Porteuse de projets",
                image: "/team/fatoumata.png"
              }
            ].map((member, index) => (
              <div key={index} className="group text-center hover-lift">
                <div className="relative mb-6">
                  <div className="bg-white rounded-3xl w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mx-auto flex items-start justify-center shadow-2xl group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-2 overflow-hidden p-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={224}
                      height={224}
                      className="w-full h-[130%] object-cover object-top rounded-3xl"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#004AAD] transition-colors duration-300">{member.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Badge de l'équipe */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
              <div className="text-3xl">🇲🇱</div>
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">Équipe Alerti</div>
                <div className="text-sm text-gray-600">5 jeunes développeurs maliens passionnés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Rejoignez-nous dans la lutte contre les inondations
            </h2>
            <p className="text-xl text-gray-600">
              Contactez-nous pour en savoir plus ou participer au projet
            </p>
          </div>

          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#004AAD]/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F54B4D]/10 rounded-full -ml-12 -mb-12"></div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#004AAD]/20 focus:border-[#004AAD] transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder:text-gray-400 text-gray-900"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#004AAD]/20 focus:border-[#004AAD] transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder:text-gray-400 text-gray-900"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#004AAD]/20 focus:border-[#004AAD] transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder:text-gray-400 text-gray-900 resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <div className="text-center space-y-4">
                {/* Messages de statut */}
                {submitStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    ✅ Message envoyé avec succès ! Nous vous répondrons rapidement.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    ❌ Erreur lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#004AAD] hover:bg-[#003b8a] hover:scale-105 hover:shadow-2xl hover:shadow-[#004AAD]/30'
                  } text-white font-bold py-5 px-12 rounded-full text-lg transition-all duration-300 transform overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <span>Contactez-nous</span>
                    )}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
              <a href="mailto:alertino25@gmail.com" className="hover:text-[#004AAD] transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.93V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l7-4.666M21 19l-7-4.666M3 10.93V19m7-7.07V19" />
                </svg>
                <span>alertino25@gmail.com</span>
        </a>
        <a
                href="https://wa.me/22399961761?text=Bonjour%20Alerti,%20j'aimerais%20en%20savoir%20plus%20sur%20vos%20services%20d'alerte%20inondation"
          target="_blank"
          rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer moderne */}
      <footer className="relative bg-[#0f172a] text-white py-12 sm:py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative inline-block mb-6 sm:mb-8">
              <div className="relative">
          <Image
                  src="/logo_long.png"
                  alt="Alerti Logo"
                  width={500}
                  height={50}
                  className="h-32 sm:h-40 lg:h-50 w-auto object-cover mx-auto"
                />
              </div>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 font-light px-4">L&apos;alerte qui sauve des vies</p>
            <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-8 sm:w-12 h-px bg-[#004AAD]"></div>
              <span className="text-[#004AAD] text-xl sm:text-2xl">🇲🇱</span>
              <div className="w-8 sm:w-12 h-px bg-[#004AAD]"></div>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto px-4">
              © 2024 Alerti. Tous droits réservés. | Prévention des inondations au Mali<br />
              <span className="text-gray-500">Innovation technologique au service de la sécurité publique</span>
            </div>
          </div>
        </div>
        {/* Effets de particules optimisé */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#004AAD]/30 rounded-full animate-pulse-slow optimized-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </footer>
    </div>
  );
}
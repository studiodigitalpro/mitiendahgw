import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { BVProgressBar } from './components/BVProgressBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MembershipSection } from './components/MembershipSection';
import { BusinessSection } from './components/BusinessSection';
import { RegistrationModal } from './components/RegistrationModal';
import { CartDrawer } from './components/CartDrawer';
import { HealthProtocolsSection } from './components/HealthProtocolsSection';
import { CompanyCertifications } from './components/CompanyCertifications';
import { LeadershipSection } from './components/LeadershipSection';
import { VideoShortsGallery } from './components/VideoShortsGallery';
import { Footer } from './components/Footer';
import { NewsletterModal } from './components/NewsletterModal';
import { PRODUCTS } from './data/products';
import { SPONSOR_INFO, MEMBERSHIP_PLANS } from './data/memberships';
import { Product, CartItem, ProductCategory, MembershipPlan } from './types';
import { MessageCircle, Sparkles, Filter, X, ArrowUp, ShoppingBag } from 'lucide-react';

export default function App() {
  // Content protection against copying, downloading images, and context menu
  useEffect(() => {
    // Prevent right click / context menu
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right click if clicking on an input/textarea if needed, otherwise prevent
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
    };

    // Prevent dragging images or text
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Prevent copy/cut outside form controls
    const handleCopyCut = (e: ClipboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
      if (!isInput) {
        e.preventDefault();
      }
    };

    // Prevent shortcut keys like Ctrl+S (Save), Ctrl+U (Source), Ctrl+C (outside inputs), etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd) {
        const key = e.key.toLowerCase();
        // Prevent Save (Ctrl+S), View Source (Ctrl+U), Print (Ctrl+P)
        if (key === 's' || key === 'u' || key === 'p') {
          e.preventDefault();
        }
        // Prevent Copy (Ctrl+C) if not in an input
        if (key === 'c' && !isInput) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [healthFocusFilter, setHealthFocusFilter] = useState<string | null>(null);
  const [isPartnerMode, setIsPartnerMode] = useState<boolean>(false);

  // Business & Calculator Section tab state
  const [businessSectionTab, setBusinessSectionTab] = useState<'plan' | 'calculadora'>('plan');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [selectedMembershipPlan, setSelectedMembershipPlan] = useState<MembershipPlan | null>(null);

  // Cart Calculations
  const totalCartBV = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.bv * item.quantity, 0);
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // If cart has 50 BV or user explicitly toggled partner mode, consider partner tier
  const isPartnerPricingActive = isPartnerMode || totalCartBV >= 50;

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1, openCart = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Product View Detail
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Select Membership Plan -> Opens Registration Modal with video tutorial as required
  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedMembershipPlan(plan);
    setIsRegistrationModalOpen(true);
  };

  const handleOpenGeneralRegistration = () => {
    setSelectedMembershipPlan(null);
    setIsRegistrationModalOpen(true);
  };

  // Scroll Helpers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMemberships = () => {
    const el = document.getElementById('membresias-hgw-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBusiness = () => {
    setBusinessSectionTab('plan');
    const el = document.getElementById('negocio-hgw-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    setBusinessSectionTab('calculadora');
    const el = document.getElementById('negocio-hgw-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'todos') {
        if (selectedCategory === 'serie-candy' && product.category !== 'serie-candy') {
          return false;
        } else if (selectedCategory === 'serie-cafes' && product.category !== 'serie-cafes') {
          return false;
        } else if (selectedCategory !== 'serie-candy' && selectedCategory !== 'serie-cafes' && product.category !== selectedCategory) {
          return false;
        }
      }

      // Health Focus filter match
      if (healthFocusFilter) {
        if (!product.healthFocus || !product.healthFocus.includes(healthFocusFilter)) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inName = product.name.toLowerCase().includes(query);
        const inDesc = product.description.toLowerCase().includes(query) || product.shortDescription.toLowerCase().includes(query);
        const inCat = product.categoryLabel.toLowerCase().includes(query);
        const inIng = product.ingredients?.some((i) => i.toLowerCase().includes(query));
        return inName || inDesc || inCat || inIng;
      }

      return true;
    });
  }, [selectedCategory, healthFocusFilter, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        cartBV={totalCartBV}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMemberships={scrollToMemberships}
        onOpenBusiness={scrollToBusiness}
        onOpenCalculator={scrollToCalculator}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setHealthFocusFilter(null);
          if (cat !== 'todos') {
            scrollToCatalog();
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isPartnerMode={isPartnerMode}
        onTogglePartnerMode={setIsPartnerMode}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Section: Se oculta automáticamente cuando se busca, cuando se elige una categoría de productos o cuando se activa un filtro clínico */}
        {!searchQuery.trim() && selectedCategory === 'todos' && !healthFocusFilter && (
          <HeroBanner
            onExploreProducts={scrollToCatalog}
            onOpenMemberships={scrollToMemberships}
          />
        )}

        {/* Real-time Gamified BV Progress Bar */}
        <div className="my-6">
          <BVProgressBar
            currentBV={totalCartBV}
            onOpenMemberships={scrollToMemberships}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* Health Focus / Clinical Protocols (se muestra en vista general sin búsqueda ni categoría específica) */}
        {!searchQuery.trim() && selectedCategory === 'todos' && !healthFocusFilter && (
          <HealthProtocolsSection
            onSelectHealthFocus={(focusTitle) => {
              setHealthFocusFilter(focusTitle);
              scrollToCatalog();
            }}
          />
        )}

        {/* Main Products Catalog Section */}
        <section id="catalogo-section" className="my-10 space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 text-center sm:text-left">
            <div className="mx-auto sm:mx-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Catálogo Oficial HGW Panamá
                </span>
                {isPartnerPricingActive && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-slate-950">
                    PRECIO SOCIO (-30%) ACTIVO
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Productos Naturales & Bienestar
              </h2>
            </div>

            {/* Active filter pills & clear */}
            {(healthFocusFilter || searchQuery || selectedCategory !== 'todos') && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400">Filtros activos:</span>
                {healthFocusFilter && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                    {healthFocusFilter}
                    <button onClick={() => setHealthFocusFilter(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setHealthFocusFilter(null);
                    setSearchQuery('');
                  }}
                  className="text-rose-500 hover:underline font-bold"
                >
                  Restablecer
                </button>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                No se encontraron productos con los criterios seleccionados.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setHealthFocusFilter(null);
                  setSearchQuery('');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
              >
                Ver todos los productos ({PRODUCTS.length})
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={handleViewProduct}
                  onAddToCart={handleAddToCart}
                  isPartnerMode={isPartnerPricingActive}
                />
              ))}
            </div>
          )}
        </section>

        {/* Video Shorts Gallery */}
        <VideoShortsGallery />

        {/* Dedicated Business Opportunity & Compensation Simulator */}
        <BusinessSection 
          onOpenRegisterModal={handleOpenGeneralRegistration}
          activeTab={businessSectionTab}
          onTabChange={setBusinessSectionTab}
        />

        {/* Memberships & Compensation Plan Packages */}
        <MembershipSection onSelectPlan={handleSelectPlan} />

        {/* Quality Certifications & International Associations */}
        <CompanyCertifications />

        {/* Leadership & Founders Section */}
        <LeadershipSection onOpenRegisterModal={handleOpenGeneralRegistration} />
      </main>

      {/* Footer with Disclaimer & Country List */}
      <Footer
        onOpenMemberships={scrollToMemberships}
        onOpenRegisterModal={handleOpenGeneralRegistration}
      />

      {/* Floating WhatsApp Button */}
      <a
        id="btn-floating-whatsapp"
        href={`https://wa.me/${SPONSOR_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          `Hola Yamilka, te contacto desde la Tienda Online HGW Panamá. Me gustaría más información sobre los productos y cómo comprar con 30% de descuento.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/40 transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:pl-2 text-xs font-bold">
          Asistencia WhatsApp
        </span>
      </a>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        cartBV={totalCartBV}
      />

      {/* Registration Pop-up Modal with Video Tutorial */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          setIsRegistrationModalOpen(false);
          setSelectedMembershipPlan(null);
        }}
        selectedPlan={selectedMembershipPlan}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddToCart={handleAddToCart}
        onOpenMemberships={() => {
          setIsCartOpen(false);
          scrollToMemberships();
        }}
      />

      {/* Emerging Newsletter & Activities Subscription Pop-up */}
      <NewsletterModal />
    </div>
  );
}

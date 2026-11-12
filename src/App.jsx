import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import GamesSection from './components/games/GamesSection.jsx'
import PlatformsSection from './components/platforms/PlatformsSection.jsx'
import GenresSection from './components/genres/GenresSection.jsx'

export default function App() {
  const [section, setSection] = useState('games')
  
  // --- ESTADOS DEL CARRITO ---
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  // --- ESTADO DEL MODO ADMIN (NUEVO) ---
  const [isAdmin, setIsAdmin] = useState(false)

  const activarAdmin = () => {
    const password = prompt("🔒 Ingresa la contraseña de Administrador:")
    if (password === "admin123") {
      setIsAdmin(true)
      alert("✅ Modo Administrador activado. Ahora puedes agregar juegos.")
    } else if (password !== null) {
      alert("❌ Contraseña incorrecta")
    }
  }

  // Función para agregar juegos
  const addToCart = (juego) => {
    setCartItems([...cartItems, juego])
    setIsCartOpen(true) // Se abre el carrito solito al comprar
  }

  const removeFromCart = (index) => {
    const newCart = [...cartItems]
    newCart.splice(index, 1)
    setCartItems(newCart)
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(79,70,229,0.18),_transparent_60%)] bg-slate-950 text-white md:flex">
      
      {/* MENÚ LATERAL */}
      <Sidebar active={section} onChange={setSection} />

      {/* CONTENIDO PRINCIPAL */}
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-8 relative">
        
        {/* HEADER SUPERIOR */}
        <header className="flex justify-end items-center gap-4 mb-6">
          
          {/* BOTÓN DE ADMIN (NUEVO) */}
          <button 
            onClick={activarAdmin}
            className={`px-4 py-3 rounded-xl font-bold text-sm border transition-all ${
              isAdmin 
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isAdmin ? '👑 Modo Admin Activo' : '⚙️ Acceso Admin'}
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-slate-700 transition-all shadow-lg shadow-indigo-500/10"
          >
            🛒 Mi Carrito
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold animate-pulse text-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </header>

        {/* SECCIONES (Le pasamos addToCart e isAdmin) */}
        {section === 'games' && <GamesSection addToCart={addToCart} isAdmin={isAdmin} />}
        {section === 'platforms' && <PlatformsSection />}
        {section === 'genres' && <GenresSection />}
      </main>

      {/* ================= PANEL LATERAL DEL CARRITO ================= */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h2 className="text-xl font-bold text-white">Tu Carrito 🛒</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white text-3xl font-light leading-none">&times;</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-slate-500 mt-10 flex flex-col items-center">
              <span className="text-5xl mb-4">🛒</span>
              <p>Tu carrito está vacío.</p>
              <p className="text-sm">¡Explora el catálogo y encuentra tu próximo juego!</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3">
                  <img src={item.image_url} alt={item.title} className="w-12 h-16 object-cover rounded" />
                  <div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-indigo-400 font-bold">${item.price}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(index)} className="text-red-400 hover:text-red-300 p-2">🗑️</button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/90">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span className="text-slate-400">Total:</span>
            <span className="text-green-400 text-2xl">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => {
              if(cartItems.length > 0) {
                alert("Simulando pasarela de pago... ¡Compra exitosa!");
                setCartItems([]);
                setIsCartOpen(false);
              }
            }}
            disabled={cartItems.length === 0}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
      
      {/* Fondo oscuro cuando el carrito está abierto */}
      {isCartOpen && (
        <div onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"></div>
      )}

    </div>
  )
}
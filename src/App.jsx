import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { Games } from './pages/Games';
import { GamePlay } from './pages/GamePlay';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { AdminArticles } from './pages/AdminArticles';
import { AdminArticleForm } from './pages/AdminArticleForm';
import { AdminGames } from './pages/AdminGames';
import { AdminUsers } from './pages/AdminUsers';
import { UserLogin } from './pages/UserLogin';
import { UserProfile } from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clanky" element={<Articles />} />
              <Route path="/clanek/:slug" element={<ArticleDetail />} />
              <Route path="/hry" element={<Games />} />
              <Route path="/hra/:slug" element={<GamePlay />} />
              <Route path="/prihlaseni" element={<Login />} />
              <Route path="/uzivatel/prihlaseni" element={<UserLogin />} />
              <Route path="/muj-profil" element={<UserProfile />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/clanky"
                element={
                  <ProtectedRoute>
                    <AdminArticles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/clanky/novy"
                element={
                  <ProtectedRoute>
                    <AdminArticleForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/clanky/upravit/:id"
                element={
                  <ProtectedRoute>
                    <AdminArticleForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hry"
                element={
                  <ProtectedRoute>
                    <AdminGames />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/uzivatele"
                element={
                  <ProtectedRoute>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

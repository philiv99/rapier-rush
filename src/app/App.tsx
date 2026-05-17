import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';
import { TitleScreen } from '../game/scenes/TitleScreen';
import { PlayingScene } from '../game/scenes/PlayingScene';
import { ResultsScreen } from '../game/scenes/ResultsScreen';
import { HowToPlayScreen } from '../game/scenes/HowToPlayScreen';
import { Layout } from './Layout';
import '../theme/global.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <TitleScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/play"
        element={
          <ProtectedRoute>
            <Layout>
              <PlayingScene />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Layout>
              <ResultsScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/how-to-play"
        element={
          <ProtectedRoute>
            <Layout>
              <HowToPlayScreen />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div style={{ textAlign: 'center', padding: '2rem' }}>404 - Page Not Found</div>} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

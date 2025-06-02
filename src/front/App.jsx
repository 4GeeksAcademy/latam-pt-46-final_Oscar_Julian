import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Welcome } from "./pages/welcome";
import { Library } from "./pages/library";
import { OtherBooks } from "./pages/OtherBooks";
import { Favorites } from "./pages/Favorites";
import { Terms } from "./pages/Terms";
import { About } from "./pages/About";
import { Features } from "./pages/Features";
import { Help } from "./pages/Help";
import { Privacy } from "./pages/Privacy";
import { Stats } from "./pages/Stats";
import { NotFound } from "./pages/notFound";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { GlobalProvider, useGlobalReducer } from "./store/globalReducer";
import { ProtectedRoute } from "./component/protectedRoute";

// Componente para inicializar la validación de token
const AppInitializer = ({ children }) => {
    const { actions } = useGlobalReducer();

    useEffect(() => {
        // Validar token al cargar la aplicación
        actions.validateToken();
    }, []);

    return <>{children}</>;
};

const App = () => {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <AppInitializer>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            {/* Rutas públicas */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/privacy" element={<Privacy />} />

                            {/* Rutas protegidas */}
                            <Route path="/welcome" element={
                                <ProtectedRoute>
                                    <Welcome />
                                </ProtectedRoute>
                            } />
                            <Route path="/library" element={
                                <ProtectedRoute>
                                    <Library />
                                </ProtectedRoute>
                            } />
                            <Route path="/other-books" element={
                                <ProtectedRoute>
                                    <OtherBooks />
                                </ProtectedRoute>
                            } />
                            <Route path="/favorites" element={
                                <ProtectedRoute>
                                    <Favorites />
                                </ProtectedRoute>
                            } />
                            <Route path="/stats" element={
                                <ProtectedRoute>
                                    <Stats />
                                </ProtectedRoute>
                            } />

                            {/* Ruta 404 */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </AppInitializer>
            </BrowserRouter>
        </GlobalProvider>
    );
};

export default App;
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Welcome } from "./pages/welcome";
import { Library } from "./pages/library";
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
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/welcome" element={
                                <ProtectedRoute>
                                    <Welcome />
                                </ProtectedRoute>
                            } />
                            <Route path="/library" element={<Library />} />
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
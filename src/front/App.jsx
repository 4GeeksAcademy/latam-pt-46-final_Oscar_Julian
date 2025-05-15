import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Welcome } from "./pages/welcome";
import { NotFound } from "./pages/notFound";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { GlobalProvider } from "./store/globalReducer";
import { ProtectedRoute } from "./component/protectedRoute";

const App = () => {
    return (
        <GlobalProvider>
            <BrowserRouter>
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
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </GlobalProvider>
    );
};

export default App;
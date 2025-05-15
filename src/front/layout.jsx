import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import { ProtectedRoute } from "./component/protectedRoute";

import { Home } from "./pages/Home";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Welcome } from "./pages/welcome";
import { NotFound } from "./pages/notFound";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";

import injectContext from "./store/authContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = import.meta.env.BASENAME || "";  // Changed from process.env to import.meta.env

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route path="/welcome" element={
                            <ProtectedRoute>
                                <Welcome />
                            </ProtectedRoute>
                        } />
                        <Route element={<NotFound />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
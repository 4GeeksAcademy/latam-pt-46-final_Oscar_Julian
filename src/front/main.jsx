import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import Layout from './layout';  // Import the Layout component directly
import { BackendURL } from './component/BackendURL';

const Main = () => {

    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            <BackendURL />
        </React.StrictMode>
    );

    return (
        <React.StrictMode>
            <Layout />  {/* Render the Layout component which has context already injected */}
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
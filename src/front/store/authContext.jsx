import React, { useState, useEffect } from "react";
import getState from "./flux";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it
const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        //this will be passed as the context value
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            // Check if there's a token in sessionStorage on app load
            const token = sessionStorage.getItem("token");
            if (token) {
                state.actions.validateToken();
            }
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
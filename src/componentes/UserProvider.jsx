import React, { useState, useContext } from "react";

const movieContext = React.createContext();
const movieToggleContext = React.createContext();

export function useUserContext() {
    return useContext(movieContext);
}


export function UserProvider(props) {
    const [searchKey, setSearchKey]= useState (null);
    const searchMovies= (e) =>{
        e.preventDefault();
        fetchMovies(searchKey)
    }

    return (
        <movieContext.Provider value={searchKey}>
            <movieToggleContext.Provider value={searchMovies}>
            {props.children}
            </movieToggleContext.Provider>
        </movieContext.Provider>
    );
}
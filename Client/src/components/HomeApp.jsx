import React, { useEffect, useState } from "react";
import '../css/HomeApp.css';
import { LoginApp } from "./LoginApp/LoginApp";

export function HomeApp(){
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return(
        <div className="HomeApp">
            {loading ? (
                <div className="loading-screen">
                    <div className="spinner"></div>
                </div>
            ) : (
                <LoginApp/>
            )}
            
        </div>
    )
}
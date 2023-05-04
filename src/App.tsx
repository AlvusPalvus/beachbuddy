import React from "react";
import logo from "./logo.svg";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <p>Start! Hitta din badplats</p>
            <Link to={"/badplatser"}> Hitta badplatser </Link>
        </div>
    );
}

export default App;

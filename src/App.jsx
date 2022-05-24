import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import List from "./Pages/List/List";
import Store from "./Pages/Store/Store";
import Error404 from "./Pages/Error/Error404";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/list" element={<List />} exact />
                <Route path="/store" element={<Store />} exact />
                <Route path="*" element={<Error404 to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

import { Route, Routes } from "react-router-dom";
import { App } from "./pages/App";
import { AddPerson } from "./pages/AddPerson";

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/addPerson" element={<AddPerson />} />
        </Routes>
    )
}
import { BrowserRouter, Routes,Route } from "react-router-dom"
import Projets from "./projets"
import Dashbord from "./dashbord"
import Home_pr_fr from "./home_freelance"
import Form_pr_fr from "./form_pr_fr"
import Modifier from "./modifier"

function App_fr(){

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home_pr_fr/>}></Route>
            <Route path="/dash" element={<Dashbord/>}></Route>
            <Route path="/projets" element={<Projets/>}></Route>
            <Route path="/form" element={<Form_pr_fr/>}></Route>
            <Route path="/modifier/:id" element={<Modifier/>}></Route>




        </Routes>
        
        </BrowserRouter>
    )

}export default App_fr
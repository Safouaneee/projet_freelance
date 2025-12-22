import {  NavLink } from "react-router-dom";

export default function Menu_fr(){
    return(
        <nav className="menu">
            <div className="logo">
                <img src="/images_projets_freelance/freelance_logo.png"></img>
                <h1>Freelance</h1>
            </div>
            <div className="links">

                <NavLink to={"/"}>
                <button>Home</button>
                </NavLink>

                <NavLink to={"/dash"}>
                <button>Dashbord</button>
                </NavLink>

                <NavLink to={"/projets"}>
                <button>projets</button>
                </NavLink>
            </div>

        </nav>
    )
}
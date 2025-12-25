import { useSelector } from "react-redux"
import Menu_fr from "./menu_fr"
import "./projet_style.css"
import { Link } from "react-router-dom"


function Dashbord(){

    const terminer =useSelector(state=>state.terminer)
    const bd_encour =useSelector(state=>state.bd_enc)
    const encour =useSelector(state=>state.encour)
    const taux = useSelector(state=>state.taux_rs)

    const projets = useSelector(state=>state.projets)
    const dernier_projets = [...projets].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 5);
    const work_an =projets.filter(elm=>elm.status=="annuler") 
    const work_ter =projets.filter(elm=>elm.status=="terminer") 
    const work_to_do =projets.length - (work_an.length+work_ter.length)


     function getSatusClass(statuss){
        if(!statuss) return "status"

        switch(statuss.toLowerCase()){
            case "en cour":
            return "status status-encour"
            case "devis":
            return "status status-devis"
            case "terminer":
            return "status status-terminer"
            case "annuler":
            return "status status-annuler"
            case "en attente":
            return "status status-attente"
            default:
            return "status"
        }
    }
       function getprioriteClass(prioritee){
        if(!prioritee) return "priorite"

                switch(prioritee.toLowerCase()){
                    case "basse":
                    return "priorite priorite-basse"
                    case "moyenne":
                    return "priorite priorite-moyenne"
                    case "haute":
                    return "priorite priorite-haute"
                    case "urgente":
                    return "priorite priorite-urgente"
                  
                    default:
                    return "priorite"
                }
    }
    return(
        <div className="containerr">
        <Menu_fr/>
        <div>
            <div className="dash">

                <div className="morrning">

                        <h1>Good Morning Youssef</h1>
                        <p>You have {work_to_do} new applications it is a lot of work for today !</p>
                        <p>So lets start</p>
                        
                         <a href="#tabl_pr" ><button id="lets_go">Review it</button></a>   
                         

                </div>
                 <img id="bg" src={process.env.PUBLIC_URL +"/images_projets_freelance/bg_person.png"}></img>
                 <img id="hello" src={process.env.PUBLIC_URL +"/images_projets_freelance/morrning.png"} ></img>
            </div>
            <div className="statistiques">

                  
                    <div className="projets_terminer">
                        <div className="head_st">
                            <div className="cercle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash-register"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 15h-2.5c-.398 0 -.779 .158 -1.061 .439c-.281 .281 -.439 .663 -.439 1.061c0 .398 .158 .779 .439 1.061c.281 .281 .663 .439 1.061 .439h1c.398 0 .779 .158 1.061 .439c.281 .281 .439 .663 .439 1.061c0 .398 -.158 .779 -.439 1.061c-.281 .281 -.663 .439 -1.061 .439h-2.5" /><path d="M19 21v1m0 -8v1" /><path d="M13 21h-7c-.53 0 -1.039 -.211 -1.414 -.586c-.375 -.375 -.586 -.884 -.586 -1.414v-10c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h2m12 3.12v-1.12c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-2" /><path d="M16 10v-6c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-4c-.53 0 -1.039 .211 -1.414 .586c-.375 .375 -.586 .884 -.586 1.414v6m8 0h-8m8 0h1m-9 0h-1" /><path d="M8 14v.01" /><path d="M8 17v.01" /><path d="M12 13.99v.01" /><path d="M12 17v.01" /></svg>

                            </div>
                            <div className="cercle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                            </div>
                        </div>
                        <p id="rev_tot">Projets terminés</p>
                        <div className="chiffres">
                            <h2 id="st1">{terminer} <span>DH</span></h2>
                            <span id="tot">revenu Total</span>
                            <img id="stat_icon" src={process.env.PUBLIC_URL +"/images_projets_freelance/stat.png"}></img>
                        </div>

                    </div>

                     <div className="bd_encours">
                        <div className="head_st">
                            <div className="cercle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-category"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" /><path d="M20 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" /><path d="M10 13h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" /><path d="M17 13a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z" /></svg>
                            </div>
                            <div className="cercle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                            </div>
                        </div>
                        <p id="rev_tot">Budget en Cours</p>
                        <div className="chiffres">
                            <h2 id="st2">{bd_encour} <span>DH</span></h2>
                            <span id="tot">en cours + en attente</span>
                            <img id="stat_icon" src={process.env.PUBLIC_URL +"/images_projets_freelance/stat.png"}></img>
                        </div>

                    </div>

                     <div className="actifs">
                        <div className="head_st">
                            <div className="cercle">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-subtitles-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 19h-5.5a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v3" /><path d="M7 15h5" /><path d="M17 12h-3" /><path d="M11 12h-1" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3z" /></svg>
                            </div>
                            <div className="cercle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                            </div>
                        </div>
                        <p id="rev_tot">Projets Actifs</p>
                        <div className="chiffres">
                            <h2 id="st3">{encour} </h2>
                            <span id="tot">en cours actuellement</span>
                            <img id="stat_icon" src={process.env.PUBLIC_URL +"/images_projets_freelance/stat.png"}></img>
                        </div>

                    </div>
                     <div className="taux_rs">
                        <div className="head_st">
                            <div className="cercle">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-presentation-analytics"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 3a1 1 0 0 1 0 2v9a3 3 0 0 1 -3 3h-5v2h2a1 1 0 0 1 0 2h-6a1 1 0 0 1 0 -2h2v-2h-5a3 3 0 0 1 -3 -3v-9a1 1 0 1 1 0 -2zm-12 4a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1m6 2a1 1 0 0 0 -1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -1 -1m-3 1a1 1 0 0 0 -1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0 -1 -1" /></svg>
                            </div>
                            <div className="cercle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                            </div>
                        </div>
                        <p id="rev_tot">Taux de Réussite</p>
                        <div className="chiffres">
                            <h2 id="st4">{taux} <span>%</span></h2>
                            <span id="tot">Projets réussis</span>
                            <img id="stat_icon" src={process.env.PUBLIC_URL +"/images_projets_freelance/stat.png"}></img>
                        </div>

                    </div>



            </div>



           <section id="tabl_pr">

            <div className="progress_projects">
                <h2>Derniers projets</h2>
                <Link to={"/projets"}>
                
                      <button>View All</button>
                </Link>
            </div>


            <table id="list_prog">
                <thead>
                    <tr id="tr1">
                        <th>Projet</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>priorite</th>
                        <th>Budget</th>
                         
                    </tr>
                </thead>
                <tbody>
                    {dernier_projets.map((elm)=>(
                        <tr key={elm.id} id="tr">
                                <td>{elm.titre}</td>
                                <td>{elm.deadline}</td>
                                <td>
                                  <span className={getSatusClass(elm.status)}>
                                    {elm.status}
                                  </span>
                                </td>
                                <td>
                                    <span className={getprioriteClass(elm.priorite)}>
                                    {elm.priorite}
                                    </span>
                                </td>
                                <td id="budget">{elm.budget} DH</td>
                        </tr>
                    
                ))}

                </tbody>
            </table>
                


            
           </section>

        </div>
        </div>
    )

}export default Dashbord
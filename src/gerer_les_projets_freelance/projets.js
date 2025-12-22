import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProjects,setEncour,setbd_enc,settermine,setTaux_rs } from "./actions_fr"
import "./projet_style.css"
import Confirm from "./confirm_delete"

import axios from "axios"
import Menu_fr from "./menu_fr"
import { Link } from "react-router-dom"

function Projets(){

    
    const projets= useSelector(state=>state.projets)
    const [filter_projets,setfilter]=useState([])
    const dispatcher=useDispatch()
    
    useEffect(()=>{
        
        axios.get("https://6949a6871282f890d2d6b289.mockapi.io/projets")
        .then((res)=>{
            dispatcher(setProjects(res.data))
            setfilter(res.data)
        })
        .catch((eror)=>{
                console.log(eror)
            })
            
        },[dispatcher])

    const total_terminer =projets.filter(elm=>elm.status=="terminer").reduce((acc,val)=>acc+Number(val.budget),0)
    const total_Encour = projets.filter(elm=>elm.status=="en cour").reduce((acc,val)=>acc+Number(val.budget),0)
    const total_Enattente=projets.filter(elm=>elm.status=="en attente").reduce((acc,val)=>acc+Number(val.budget),0)

    const nbr_Encour=projets.filter(elm=>elm.status=="en cour").length
    const nbr_Eattente =projets.filter(elm=>elm.status=="en attente").length
    const nbr_devis = projets.filter(elm=>elm.status=="devis").length
    const nbr_terminer =projets.filter(elm=>elm.status=="terminer").length
    const nbr_annuler=projets.filter(elm=>elm.status=="annuler").length
    
    useEffect(()=>{
        
        dispatcher(settermine(Number(total_terminer)))
        dispatcher(setbd_enc(Number(total_Encour)+Number(total_Enattente) ))
        dispatcher(setEncour(nbr_Encour +nbr_Eattente  +nbr_devis))
        dispatcher(setTaux_rs(
            
            nbr_terminer + nbr_annuler === 0
            ? 0
            : ((nbr_terminer / (nbr_terminer + nbr_annuler)) * 100).toFixed(2)
        )
    )},[projets])
    
    const [status, setStatus] = useState("tous les status")
    const [priorite, setPriorite] = useState("tous les priorite")
    const [annee, setAnnee] = useState("toutes les annees")

   

    function applyFilters(statusValue, prioriteValue, anneeValue) {
                let result = projets;

                if(statusValue && statusValue !== "tous les status") {
                    result = result.filter(p => p.status === statusValue);
                }
                if(prioriteValue && prioriteValue !== "tous les priorite") {
                    result = result.filter(p => p.priorite === prioriteValue);
                }
                if(anneeValue && anneeValue !== "toutes les annees") {
                    result = result.filter(p => p.deadline.startsWith(anneeValue));
                }

    setfilter(result);
    setCurrentPage(1)
}
    function handleFilterStatus(e){
            setStatus(e.target.value)
            setfilter(projets.filter(elm=>elm.status.includes(e.target.value)))
            if(e.target.value=="tous les status"){
                setfilter(projets)
            }
            applyFilters(e.target.value, priorite, annee);
    }
    function handleFilterPriorite(e){
        setPriorite(e.target.value)
            setfilter(projets.filter(elm=>elm.priorite.includes(e.target.value)))
            if(e.target.value=="tous les priorite"){
                setfilter(projets)
            }
            applyFilters(status,e.target.value,annee);
    }
      function handleFilterAnnee(e){
            const value = e.target.value
            setAnnee(value)

            if(value === "toutes les annees"){
                setfilter(projets)
            }else{
                setfilter(
                projets.filter(p => p.deadline.startsWith(value))
                )
            }
            applyFilters(status, priorite, e.target.value);
}
    const annees = [...new Set(
           projets.map(p => p.deadline.split("-")[0])
)]

   function supprimmer(id){
        axios.delete(`https://6949a6871282f890d2d6b289.mockapi.io/projets/${id}`)
            .then(() => {
            const newList = projets.filter(elm => elm.id !== id)
            dispatcher(setProjects(newList))
            setfilter(newList)
            setShow(false)
            })
}
 const [show, setShow] = useState(false);
const [idToDelete, setIdToDelete] = useState(null)



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
    const array_status=["devis","en cour","en attente","terminer","annuler"]
    const array_Priorite=["basse","moyenne","haute","urgente"]


    function handleChangeStatus(id, newStatus) {
            const updatedProjets_st = projets.map(p =>
                p.id === id ? { ...p, status: newStatus } : p
            );

            dispatcher(setProjects(updatedProjets_st));
            setfilter(updatedProjets_st); 

            axios.put(`https://6949a6871282f890d2d6b289.mockapi.io/projets/${id}`, { ...updatedProjets_st.find(p => p.id === id) })
                .catch(err => console.log(err));
    }

    function handleChangepriorite(id, newPriorite) {
                const updatedProjets_pr = projets.map(p =>
                p.id === id ? { ...p, priorite: newPriorite } : p
            );

            dispatcher(setProjects(updatedProjets_pr));
            setfilter(updatedProjets_pr); 

            axios.put(`https://6949a6871282f890d2d6b289.mockapi.io/projets/${id}`,{ ...updatedProjets_pr.find(p => p.id === id) })
                .catch(err => console.log(err));
    }

    const [currentPage, setCurrentPage] = useState(1);
    const projetsPerPage = 5;
    const indexOfLastProjet = currentPage * projetsPerPage;
    const indexOfFirstProjet = indexOfLastProjet - projetsPerPage;
    const currentProjets = filter_projets.slice(indexOfFirstProjet, indexOfLastProjet);
    const totalPages = Math.ceil(filter_projets.length / projetsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);


    return(
        <div>
            <Menu_fr></Menu_fr>
        <div className="container">
              {show && (
                    <Confirm
                    message="Are you sure ?"
                    onYes={()=>supprimmer(idToDelete)}
                    onNo={() => setShow(false)}
                    />
      )}

            <div className="add_projet">
                <h1>Mes Projets</h1>
         
                <Link to={"/form"}><button className="nv">+ Nouveau Projet</button></Link>

            </div>
                  
            <div className="card_filter">
                <div className="svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-filter"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" /></svg>
                    <h6>Filtres</h6>
                </div>
                    <select value={status} onChange={handleFilterStatus} >
                        <option value={"tous les status"}>tous les status</option>
                        <option value={"devis"}>devis</option>
                        <option value={"en cour"}>en cours</option>
                        <option value={"en attente"}>en attente</option>
                        <option value={"terminer"}>termine</option>
                        <option value={"annuler"}>annuler</option>

                    </select>    
                    <select value={priorite} onChange={handleFilterPriorite}  >
                        <option value={"tous les priorite"}>tous les priorite</option>
                        <option value={"basse"}>basse</option>
                        <option value={"moyenne"}>moyenne</option>
                        <option value={"haute"}>haute</option>
                        <option value={"urgente"}>urgente</option>
                        

                    </select>
                    <select value={annee} onChange={handleFilterAnnee}>
                        <option value="toutes les annees">toutes les annees</option>
                        {annees.map(a => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>

                    {(status!== "tous les status" || priorite !== "tous les priorite" || annee !== "toutes les annees") ? (
                                <button
                                    className="button_ren"
                                    onClick={() => {
                                    setStatus("tous les status")
                                    setPriorite("tous les priorite")
                                    setAnnee("toutes les annees")
                                    setfilter(projets)
                                    }}
                                >
                                    Réinitialiser
                                </button>
        ):null}

               <p id="length_pr">{projets.length} projets</p>
            </div>
           
    

            <table className="table_projets">
                <thead>
                    <tr id="initial_tr">
                        <th>client</th>
                        <th>Projet</th>
                        <th>Budget</th>
                        <th>Deadline</th>
                        <th>Statut</th>
                        <th>priorite</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>
                
                </thead>   
                <tbody>
                     {currentProjets.length === 0 ? (
                                    <tr id="aucun">
                                      

                                            <td colSpan="10" className="aucun-projet">
        Aucun projet trouvé
                          </td>
                                      
                                        
                                    </tr>
                    ) :  
                     currentProjets.map((elm)=>(
                        <tr id="body_tr">
                            <td>{elm.nom}</td>
                            <td>{elm.titre}</td>
                            <td id="bud">{elm.budget} DH</td>
                            <td id="deadline">{elm.deadline}</td>
                            <td >
                                  <span className={getSatusClass(elm.status)}>
                                    <select id="selc_change1" value={elm.status} onChange={(e)=>handleChangeStatus(elm.id,e.target.value)}>
                                        <option value={elm.status}>{elm.status}</option>
                                        {array_status.filter(f=>f!==elm.status).map((elm_s)=>(
                                                <option value={elm_s}>{elm_s}</option>
                                               
                                        ))}
                                    </select>
                                      </span>
                            </td>
                            <td>
                                <span className={getprioriteClass(elm.priorite)}>
                                     <select id="selc_change2" value={elm.priorite} onChange={(e)=>handleChangepriorite(elm.id,e.target.value)}>
                                        <option value={elm.priorite}>{elm.priorite}</option>
                                        {array_Priorite.filter(f=>f!==elm.priorite).map((elm_s)=>(
                                                <option value={elm_s}>{elm_s}</option>
                                               
                                        ))}
                                    </select>
                                </span>
                            </td>
                            <td id="desc">{elm.description}</td>
                            <td id="actions">
                                <Link to={`/modifier/${elm.id}`}>
                                      <button className="modifier"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.192 17.966c-3.242 -.28 -5.972 -2.269 -8.192 -5.966c2.4 -4 5.4 -6 9 -6c3.326 0 6.14 1.707 8.442 5.122" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" /></svg></button>
                                </Link>
                                <button onClick={()=>{setIdToDelete(elm.id);setShow(true)}} className="supprimer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>

                            </td>

                        </tr>
                     ))
                      
                    }  
                </tbody> 
            </table> 
               <div className="pagination">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            className={number === currentPage ? "active" : ""}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div> 

           
        </div>
        </div>
    )

}export default Projets
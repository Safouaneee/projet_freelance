import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setProjects } from "./actions_fr"
import axios from "axios"
import "./projet_style.css"

function Form_pr_fr(){
    const [form,setForm]=useState({
          id:"",
          nom:"",
          titre:"",
          budget:"",
          deadline:"",
          status:"",
          priorite:"",
          description:"",

    })
    const navigate=useNavigate()
    const [ereur_nom,setereurNom]=useState("")
    const [ereur_titre,setereurTitre]=useState("")
    const [ereur_budget,setereurbudget]=useState("")
    const [ereur_deadline,setereurdeadline]=useState("")
    const [ereur_status,setereurStatus]=useState("")
    const [ereur_priorite,setereurPriorite]=useState("")
    const [ereur_description,setereurDescription]=useState("")

    const projets =useSelector(state=>state.projets)
    const dispatcher=useDispatch()


    function handlesubmit(e){
        const {name,value}=e.target
  
        setForm(
            {...form,[name]:value}
        )
    }
    function verifier(e){

        e.preventDefault()
        let valid=true
        const regex =/^[0-9 ]+$/


        if(!form.nom.trim()){
            setereurNom("invalid nom")
              valid=false
        } 
        else{
            setereurNom("")
        }

        if(!form.titre.trim()){
            setereurTitre("invalid titre")
         valid=false
        }
        else{
            setereurTitre("")
        }

        if(!form.budget.trim()|| !regex.test(form.budget)){
            setereurbudget("invalid budget")
            valid=false
        }
        else{
            setereurbudget("")
        }

         if(!form.deadline){
            setereurdeadline("invalid deadline")
            valid=false
        }
        else{
            setereurdeadline("")

        }

         if(!form.status){
            setereurStatus("invalid status")
            valid=false

        }
        else{
            setereurStatus("")
        }

         if(!form.priorite){
            setereurPriorite("invalid priorite")
            valid=false

        }
        else{
            setereurPriorite("")
        }

        
         if(!form.description.trim()){
            setereurDescription("invalid description")
            valid=false
        }
        else{
            setereurDescription("")
        }

        if(!valid){
            e.preventDefault()
        }
        else{
            const newProjet={
                id:String(Date.now()),
                nom:form.nom,
                titre:form.titre,
                budget:form.budget,
                deadline:form.deadline,
                status:form.status,
                priorite:form.priorite,
                description:form.description


            }
          axios.post("https://6949a6871282f890d2d6b289.mockapi.io/projets", newProjet)
                .then(res => {
                dispatcher(setProjects([...projets, res.data]))
                navigate("/projets")  
                })
                .catch(err => console.log(err))
}
}

    


   return(
   <div className="form-container">
    <div className="form-wrapper">
        <div className="form-header">
            <h2 className="form-title">Nouveau Projet</h2>
            <div className="form-subtitle">Créez un nouveau projet client</div>
        </div>
        
        <form onSubmit={verifier} className="modern-form">
            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">👤</span>
                        Nom du Client
                    </label>
                    <input 
                        name="nom" 
                        value={form.nom} 
                        onChange={handlesubmit} 
                        type="text" 
                        className="form-input"
                        placeholder="Entrez le nom du client"
                    />
                    {ereur_nom && <p className="error-message">{ereur_nom}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">📋</span>
                        Titre du Projet
                    </label>
                    <input 
                        name="titre" 
                        value={form.titre} 
                        onChange={handlesubmit} 
                        type="text" 
                        className="form-input"
                        placeholder="Entrez le titre du projet"
                    />
                    {ereur_titre && <p className="error-message">{ereur_titre}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">💰</span>
                        Budget
                    </label>
                    <input 
                        name="budget" 
                        value={form.budget} 
                        onChange={handlesubmit} 
                        type="text" 
                        className="form-input"
                        placeholder="0.00 MAD"
                    />
                    {ereur_budget && <p className="error-message">{ereur_budget}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">📅</span>
                        Deadline
                    </label>
                    <input 
                        name="deadline" 
                        value={form.deadline} 
                        onChange={handlesubmit} 
                        type="date" 
                        className="form-input"
                    />
                    {ereur_deadline && <p className="error-message">{ereur_deadline}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">📊</span>
                        Statut
                    </label>
                    <select 
                        name="status" 
                        value={form.status} 
                        onChange={handlesubmit} 
                        className="form-select"
                    >
                        <option disabled value="">Sélectionner un statut</option>
                        <option value="devis">Devis</option>
                        <option value="en cour">En cours</option>
                        <option value="en attente">En attente</option>
                        <option value="terminer">Terminé</option>
                        <option value="annuler">Annulé</option>
                    </select>
                    {ereur_status && <p className="error-message">{ereur_status}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">⚡</span>
                        Priorité
                    </label>
                    <select 
                        name="priorite" 
                        value={form.priorite} 
                        onChange={handlesubmit} 
                        className="form-select"
                    >
                        <option value="">Sélectionner une priorité</option>
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                        <option value="urgente">Urgente</option>
                    </select>
                    {ereur_priorite && <p className="error-message">{ereur_priorite}</p>}
                </div>
            </div>

            <div className="form-group full-width">
                <label className="form-label">
                    <span className="label-icon">📝</span>
                    Description
                </label>
                <textarea 
                    name="description" 
                    value={form.description} 
                    onChange={handlesubmit} 
                    className="form-textarea" 
                    rows={5}
                    placeholder="Décrivez votre projet en détail..."
                ></textarea>
                {ereur_description && <p className="error-message">{ereur_description}</p>}
            </div>

            <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                    <span className="btn-icon">✓</span>
                    Créer le projet
                </button>
                <Link to="/projets">
                    <button className="btn btn-secondary" type="button">
                        <span className="btn-icon">✕</span>
                        Annuler
                    </button>
                </Link>
            </div>
        </form>
    </div>
</div>
   ) 

}export default Form_pr_fr
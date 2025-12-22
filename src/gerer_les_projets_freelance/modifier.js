import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Modifier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nom: "",
        titre: "",
        budget: "",
        deadline: "",
        status: "",
        priorite: "",
        description: ""
    });

    const [erreurNom, setErreurNom] = useState("");
    const [erreurTitre, setErreurTitre] = useState("");
    const [erreurBudget, setErreurBudget] = useState("");
    const [erreurDeadline, setErreurDeadline] = useState("");
    const [erreurStatus, setErreurStatus] = useState("");
    const [erreurPriorite, setErreurPriorite] = useState("");
    const [erreurDescription, setErreurDescription] = useState("");

    useEffect(() => {
        axios.get(`https://6949a6871282f890d2d6b289.mockapi.io/projets/${id}`)
            .then(res => setForm(res.data))
            .catch(err => console.log(err));
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function verifier(e) {
        e.preventDefault();
        let valid = true;
        const regex = /^[0-9 ]+$/;

        if (!form.nom.trim()) { setErreurNom("Nom invalide"); valid = false; } 
        else { setErreurNom(""); }

        if (!form.titre.trim()) { setErreurTitre("Titre invalide"); valid = false; } 
        else { setErreurTitre(""); }

        if (!form.budget.trim() || !regex.test(form.budget)) { setErreurBudget("Budget invalide"); valid = false; } 
        else { setErreurBudget(""); }

        if (!form.deadline) { setErreurDeadline("Deadline invalide"); valid = false; } 
        else { setErreurDeadline(""); }

        if (!form.status) { setErreurStatus("Status invalide"); valid = false; } 
        else { setErreurStatus(""); }

        if (!form.priorite) { setErreurPriorite("Priorité invalide"); valid = false; } 
        else { setErreurPriorite(""); }

        if (!form.description.trim()) { setErreurDescription("Description invalide"); valid = false; } 
        else { setErreurDescription(""); }

        if (!valid) return;

        axios.put(`https://6949a6871282f890d2d6b289.mockapi.io/projets/${id}`, form)
            .then(() => navigate("/projets"))
            .catch(err => console.log(err));
    }

    return (
        <div className="form-container">
    <div className="form-wrapper">
        <div className="form-header">
            <h2 className="form-title">Modifier Projet</h2>
            <div className="form-subtitle">Mettez à jour les informations du projet</div>
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
                        onChange={handleChange} 
                        type="text" 
                        className="form-input"
                        placeholder="Entrez le nom du client"
                    />
                    {erreurNom && <p className="error-message">{erreurNom}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">📋</span>
                        Titre du Projet
                    </label>
                    <input 
                        name="titre" 
                        value={form.titre} 
                        onChange={handleChange} 
                        type="text" 
                        className="form-input"
                        placeholder="Entrez le titre du projet"
                    />
                    {erreurTitre && <p className="error-message">{erreurTitre}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">💰</span>
                        Budget
                    </label>
                    <input 
                        name="budget" 
                        value={form.budget} 
                        onChange={handleChange} 
                        type="text" 
                        className="form-input"
                        placeholder="0.00 MAD"
                    />
                    {erreurBudget && <p className="error-message">{erreurBudget}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">📅</span>
                        Deadline
                    </label>
                    <input 
                        name="deadline" 
                        value={form.deadline} 
                        onChange={handleChange} 
                        type="date" 
                        className="form-input"
                    />
                    {erreurDeadline && <p className="error-message">{erreurDeadline}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">📊</span>
                        Statut
                    </label>
                    <select 
                        name="status" 
                        value={form.status} 
                        onChange={handleChange} 
                        className="form-select"
                    >
                        <option value="">Sélectionner un statut</option>
                        <option value="devis">Devis</option>
                        <option value="en cour">En cours</option>
                        <option value="en attente">En attente</option>
                        <option value="terminer">Terminé</option>
                        <option value="annuler">Annulé</option>
                    </select>
                    {erreurStatus && <p className="error-message">{erreurStatus}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <span className="label-icon">⚡</span>
                        Priorité
                    </label>
                    <select 
                        name="priorite" 
                        value={form.priorite} 
                        onChange={handleChange} 
                        className="form-select"
                    >
                        <option value="">Sélectionner une priorité</option>
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                        <option value="urgente">Urgente</option>
                    </select>
                    {erreurPriorite && <p className="error-message">{erreurPriorite}</p>}
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
                    onChange={handleChange} 
                    className="form-textarea" 
                    rows={5}
                    placeholder="Décrivez votre projet en détail..."
                ></textarea>
                {erreurDescription && <p className="error-message">{erreurDescription}</p>}
            </div>

            <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                    <span className="btn-icon">💾</span>
                    Enregistrer
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => navigate("/projets")}>
                    <span className="btn-icon">✕</span>
                    Annuler
                </button>
            </div>
        </form>
    </div>
</div>
    );
}

export default Modifier;

import { configureStore } from "@reduxjs/toolkit"

const inisialeState={
    projets:[],
    terminer:"",
    encour:"",
    bd_enc:"",
    Actifs:"",
    taux_rs:""

}
function reduceStore(state=inisialeState,action){
    switch(action.type){
        case "setprojet":
            return {...state,projets:action.payload}

        case "terminer":
            return {...state,terminer:action.payload}

        case "encour":
            return {...state,encour:action.payload}

         case "bd_enc":
            return {...state,bd_enc:action.payload}

        case "taux":
            return {...state,taux_rs:action.payload}

        default :
        return state
    }

}

const store_fr =configureStore({reducer:reduceStore})
export default store_fr
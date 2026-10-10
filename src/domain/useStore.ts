import {useState} from 'react';
import {parseStore,seed,STORAGE_KEY,type Store} from './model';
export function useStore() {
 const [initial]=useState(()=>{try {const raw=localStorage.getItem(STORAGE_KEY);return {store:raw?parseStore(raw):seed(),warning:''};}catch{return {store:seed(),warning:'No se pudo cargar el almacenamiento local. Se muestran ejemplos; exporta antes de cerrar.'};}});
 const [store,setStore]=useState(initial.store); const [warning,setWarning]=useState(initial.warning);
 function save(next:Store) {try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));setWarning('');}catch{setWarning('No se pudo guardar en este navegador. Los cambios están solo en memoria; exporta una copia.');}setStore(next);}
 return {store,save,warning};
}

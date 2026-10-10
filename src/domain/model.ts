export type Employee = { id: string; name: string; department: string; active: boolean };
export type Punch = { id: string; employeeId: string; kind: 'entrada' | 'salida'; at: string; sync: 'pendiente' | 'simulado' };
export type Store = { version: 1; employees: Employee[]; punches: Punch[] };
export const STORAGE_KEY = 'rey-pez-laboratorio:v1';
export function seed(): Store {
 const exampleTime = (hoursAgo:number) => new Date(Date.now()-hoursAgo*3600000).toISOString();
 return { version:1, employees:[{id:'RP-001',name:'Ana Torres',department:'Bodega',active:true},{id:'RP-002',name:'Luis Mendoza',department:'Reparto',active:true},{id:'RP-003',name:'Sofía Ramos',department:'Administración',active:true},{id:'RP-004',name:'Carlos Vega',department:'Bodega',active:false}], punches:[{id:'demo-1',employeeId:'RP-001',kind:'entrada',at:exampleTime(3),sync:'simulado'},{id:'demo-2',employeeId:'RP-002',kind:'entrada',at:exampleTime(2.75),sync:'simulado'},{id:'demo-3',employeeId:'RP-003',kind:'entrada',at:exampleTime(2),sync:'simulado'}] };
}
export function lastPunch(store:Store,id:string) { return store.punches.filter(p=>p.employeeId===id).sort((a,b)=>Date.parse(b.at)-Date.parse(a.at))[0]; }
export function addPunch(store:Store,id:string,kind:Punch['kind'],at=new Date().toISOString(),eventId:string=crypto.randomUUID()):Store {
 if(store.punches.some(p=>p.id===eventId)) return store;
 const employee=store.employees.find(e=>e.id===id);
 if(!employee?.active) throw new Error('Selecciona un empleado activo.');
 const last=lastPunch(store,id);
 if(kind===last?.kind) throw new Error(`Ya registraste una ${kind}. El siguiente marcaje debe ser ${kind==='entrada'?'salida':'entrada'}.`);
 if(kind==='salida' && !last) throw new Error('Registra una entrada antes de la salida.');
 if(last && Date.parse(at)<Date.parse(last.at)) throw new Error('La hora es anterior al último marcaje. Revisa el reloj.');
 return {...store,punches:[...store.punches,{id:eventId,employeeId:id,kind,at,sync:'pendiente'}]};
}
export function editEmployee(store:Store,id:string,patch:Omit<Employee,'id'>):Store {
 if(!patch.name.trim() || !patch.department.trim()) throw new Error('Nombre y área son obligatorios.');
 return {...store,employees:store.employees.map(e=>e.id===id?{...patch,name:patch.name.trim(),department:patch.department.trim(),id:e.id}:e)};
}
export function nextId(store:Store) { return `RP-${String(Math.max(0,...store.employees.map(e=>Number(e.id.slice(3))))+1).padStart(3,'0')}`; }
export function parseStore(raw:string):Store {
 const s:unknown=JSON.parse(raw);
 if(!s || typeof s!=='object') throw new Error('Datos inválidos');
 const v=s as Store;
 if(v.version!==1 || !Array.isArray(v.employees) || !Array.isArray(v.punches) || !v.employees.every(e=>typeof e.id==='string' && typeof e.name==='string' && typeof e.department==='string' && typeof e.active==='boolean') || !v.punches.every(p=>typeof p.id==='string' && v.employees.some(e=>e.id===p.employeeId) && ['entrada','salida'].includes(p.kind) && Number.isFinite(Date.parse(p.at)) && ['pendiente','simulado'].includes(p.sync))) throw new Error('Formato local incompatible');
 return v;
}
export const dateText=(at:string)=>new Date(at).toLocaleString('es-MX',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});

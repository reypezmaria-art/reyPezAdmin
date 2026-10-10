import {test} from 'node:test';
import assert from 'node:assert/strict';
import {seed,addPunch,editEmployee,parseStore,nextId} from './model.ts';
test('el identificador permanece tras editar y desactivar',()=>{const s=editEmployee(seed(),'RP-001',{name:'Otra Ana',department:'Reparto',active:false});assert.equal(s.employees[0].id,'RP-001');assert.throws(()=>addPunch(s,'RP-001','salida'));});
test('alternancia y reintento del mismo evento sin duplicado local',()=>{let s=seed();s=addPunch(s,'RP-001','salida','2099-01-01T10:00:00Z','evento-1');assert.equal(addPunch(s,'RP-001','salida','2099-01-01T10:00:00Z','evento-1'),s);assert.throws(()=>addPunch(s,'RP-001','salida','2099-01-01T11:00:00Z'));assert.equal(addPunch(s,'RP-001','entrada','2099-01-01T12:00:00Z').punches.length,5);});
test('validación, carga local e ID siguiente',()=>{assert.throws(()=>parseStore('{"version":2}'));const original=seed();assert.deepEqual(parseStore(JSON.stringify(original)),original);assert.equal(nextId(seed()),'RP-005');assert.throws(()=>editEmployee(seed(),'RP-001',{name:' ',department:'Bodega',active:true}));});
test('no acepta salida inicial ni tiempo anterior',()=>{assert.throws(()=>addPunch(seed(),'RP-004','entrada'));assert.throws(()=>addPunch({...seed(),punches:[]},'RP-001','salida'));assert.throws(()=>addPunch(seed(),'RP-001','salida','2000-01-01T10:00:00Z'));});

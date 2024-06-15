import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonSelect, IonList, IonInput, IonButton, IonItem, IonLabel,
  IonBadge, IonSelectOption, IonText,
  IonIcon
} from '@ionic/react';
import './Tab1.css';
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';
import axios from 'axios';
import loadSQL from '../models/database';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Tab1: React.FC = () => {
  const params = useParams();
  const [tipovisita, settipovisita] = useState('');
  const [motivovisita, setmotivovisita] = useState('');
  const [bomberos, setbomberos] = useState('');


  const tipovisitafun = (event) => {
    settipovisita(event.target.value);

  };

  const motivovisitafun = (event) => {
    setmotivovisita(event.target.value);
   
  };

  const bomberosfun = (event) => {
    setbomberos(event.target.value);
  
  };

  function enviar(){
    console.log(motivovisita) 
    console.log(tipovisita)
     console.log(bomberos)
  }
  
  return (
    <IonPage>
      <IonHeader><div className='col-12'>
        <IonToolbar>
          <IonTitle slot="start">0 INFORMACION DEL EVENTO </IonTitle>
          <IonTitle slot="end">FICHA SOCIAL: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar></div>
      </IonHeader>
      <IonContent fullscreen>
        
        <div className="social-card">
          <span className="label">Ficha social:</span>
          <span className="value">{params.ficha}</span>
        </div>
        <div className="social-card2">
          <span className="label2">Informacion de la Ficha tecnica:</span>
          <span className="value2">Ficha tecnica encontrada en BITACORA de Emergencias. Las horas de Activacion y Llegada se llenaran automaticamente.</span>
        </div>
        <br />
        {/* <IonList> */}
          {/* <IonItem>
            <IonLabel  >Motivo visita</IonLabel>
            <IonSelect aria-label="fruit" placeholder="Motivo visita"> (Required)
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
            <IonLabel >Tipo visita</IonLabel>
            <IonSelect aria-label="fruit" placeholder="Tipo visita">
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>

          </IonItem>
          <IonItem>
            <IonLabel >Bomberos</IonLabel>
            <IonSelect aria-label="fruit" placeholder="Bomberos" >
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
          </IonItem> */}
      <div className=' shadow p-3 mb-5 bg-white rounded'>
<IonList>
<div className="row g-3 was-validated ">
        <div className="col-sm-4">
        <label  className="form-label">Motivo visita</label>
          <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
              <option  value=""> SELECCIONE </option>
              <option value="1"> EMERGENCIA </option>
              <option value="4"> POSTERIOR A EMERGENCIA </option>
              <option value="3"> REVISITA </option>
              <option value="2"> RIESGO </option> 
            </select>
          </div>
          <div className="col-sm-4">
          <label  className="form-label">Tipo visita</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
            <option value=""> SELECCIONE </option>
            <option value="2"> FALLIDA </option>
            <option value="5"> FALLIDA - INICIAL EN ACCESS (SOLO SI LA FALLIDA INICIAL ESTA EN ACCES) </option>
            <option value="1"> FICHA SOCIAL </option>
            <option value="4"> LOCAL COMERCIAL </option>
            <option value="3"> NO APLICA FICHA SOCIAL </option>
            </select>
          </div>
          <div className="col-sm-4">
          <label  className="form-label">Bomberos</label>
          <select value={bomberos} onInput={bomberosfun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
            <option  value="">Selecciona</option>
            <option value="14">SI</option>
            <option value="15">No</option>
            </select>
          </div>

         
          
        </div>
</IonList>

<IonList>
<div className="row g-3 was-validated">
          <div className="col-sm-4">
            <label  className="form-label"># Ficha tecnica</label>
            <input value={params.ficha} type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
          <div className="col-sm-4">
            <label  className="form-label">Hora activacion</label>
            <input disabled type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
          <div className="col-sm-4">
            <label  className="form-label">Hora de llegada</label>
            <input disabled type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
        </div>
</IonList>

<IonList>
<div className="row g-3 was-validated ">
          <div className="col-sm-6">
            <label  className="form-label">Hora atencion</label>
            <input type="time" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
          <div className="col-sm-6">
            <label  className="form-label">Fecha visita</label>
            <input type="date" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
        </div>
</IonList>
</div>

        {/* </IonList>
        <IonList>
          <IonItem>
            <IonInput labelPlacement="stacked" label="Ficha Técnica" aria-label="Primary input" color="primary" placeholder="Ficha Técnica"></IonInput>
            <IonInput labelPlacement="stacked" label="Hora activación" aria-label="Primary input" color="primary" placeholder="Hora activación" ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>

            <IonInput labelPlacement="stacked" label="Hora de llegada al evento" aria-label="Primary input" color="primary" placeholder="Hora de llegada al evento"></IonInput>
            <IonInput labelPlacement="stacked" label="Hora atención" aria-label="Primary input" color="primary" placeholder="Hora atención" ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Fecha visita</IonLabel>
            <IonInput aria-label="Primary input" color="primary" placeholder="Fecha visita"></IonInput>
          </IonItem>
        </IonList> */}

    <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab2/${params.ficha}`}>Siguiente</IonButton></div>

       
      </IonContent>
    </IonPage>

  );
};

export default Tab1;

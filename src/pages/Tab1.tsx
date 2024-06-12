import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, 
  IonIcon} from '@ionic/react';
import './Tab1.css';
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';
import axios from 'axios';
import loadSQL from '../models/database';
import { useHistory, useParams } from 'react-router-dom';

const Tab1: React.FC = () => {
  const params = useParams();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">0 INFORMACION DEL EVENTO </IonTitle>  
          <IonTitle slot="end">FICHA SOCIAL: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
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
      <IonList>
          <IonItem>
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
          </IonItem>



        </IonList>
        <IonList>
          <IonItem>
          <IonInput labelPlacement="stacked" label="Ficha Técnica" aria-label="Primary input" color="primary" placeholder="Ficha Técnica"></IonInput>
            <IonInput labelPlacement="stacked" label="Hora activación" aria-label="Primary input" color="primary" placeholder="Hora activación" ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            
            <IonInput labelPlacement="stacked" label="Hora de llegada al evento"  aria-label="Primary input" color="primary" placeholder="Hora de llegada al evento"></IonInput>
            <IonInput  labelPlacement="stacked" label="Hora atención"  aria-label="Primary input" color="primary" placeholder="Hora atención" ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
          <IonLabel position="stacked">Fecha visita</IonLabel>
          <IonInput aria-label="Primary input" color="primary" placeholder="Fecha visita"></IonInput>
          </IonItem>
        </IonList>

      <div><IonButton color="success">Guardar</IonButton><IonButton routerLink={`/tabs/tab2/${params.ficha}`}>Siguiente</IonButton></div>
         
      
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

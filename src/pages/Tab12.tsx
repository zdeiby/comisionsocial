import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React,{useState} from 'react';
import {Person} from '../models/person.model';
import EmployeeItem from '../components/EmployeeItem';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, IonDatetimeButton,IonModal,IonDatetime,
  IonIcon} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

const Tab12: React.FC = () => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">12 - AYUDAS HUMANITARIAS ENTREGADAS</IonTitle>  
        <IonTitle slot="end">FICHA SOCIAL: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>

    <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div>
    <div className="social-card2">
      <span className="label2">Dirección de residencia</span>
      <span className="value2">
      Ingrese la dirección según el siguiente ejemplo, diligenciando los campos requeridos que identifiquen la dirección actual; los campos que no requiera los pude dejar en blanco.
      Vaya verificando en el recuadro inferior "Dirección" el resultado.
      Ejemplo:
      </span>
      <span className="value2">
      Vía principal: CARRERA 42 B SUR
      </span>
      <span className="value2">
      Vía secundaria: 25 A ESTE - 135
      </span>
      <span className="value2">

      Complemento: Apartamento 101
      </span>
    </div> 
      <br />

    <IonList>
        <IonItem>
        <IonLabel color="primary">Vía principal:</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
            <IonSelectOption value="apples">Calle</IonSelectOption>
            <IonSelectOption value="oranges">Avenida</IonSelectOption>
            <IonSelectOption value="bananas">Circular</IonSelectOption>
          </IonSelect>
        </IonItem>
        </IonList>
    <IonList>
      <IonItem>
        <IonInput labelPlacement="stacked" color="success"label="Número" aria-label="Primary input" color="primary" placeholder="Número"></IonInput>
        <IonInput labelPlacement="stacked" color="success"label="Prefijo:" aria-label="Primary input" color="primary" placeholder="Prefijo"></IonInput>
      </IonItem>
    </IonList>
    <IonList>
        <IonItem>
        <IonLabel color="primary">Nombre de vía:</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
          <IonSelectOption value="apples">bis</IonSelectOption>
            <IonSelectOption value="apples">Sur</IonSelectOption>
            <IonSelectOption value="oranges">Norte</IonSelectOption>
            <IonSelectOption value="bananas">Este</IonSelectOption>
            <IonSelectOption value="car">Oeste</IonSelectOption>
          </IonSelect>
        </IonItem>
        </IonList>
        
        <IonList>
      <IonItem>
        <IonInput labelPlacement="stacked" color="success"label="Via secundaria:" aria-label="Primary input" color="primary" placeholder="Via secundaria:"></IonInput>
        <IonInput labelPlacement="stacked" color="success"label="Prefijo vía secundaria:" aria-label="Primary input" color="primary" placeholder="Prefijo vía secundaria:"></IonInput>
      </IonItem>
    </IonList>

    <IonList>
        <IonItem>
        <IonLabel color="primary">Nombre de vía secundaria</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
            <IonSelectOption value="apples">bis</IonSelectOption>
            <IonSelectOption value="apples">Sur</IonSelectOption>
            <IonSelectOption value="oranges">Norte</IonSelectOption>
            <IonSelectOption value="bananas">Este</IonSelectOption>
            <IonSelectOption value="car">Oeste</IonSelectOption>
          </IonSelect>
        </IonItem>
        </IonList>

        <IonList>
      <IonItem>
        <IonInput labelPlacement="stacked" color="success"label="Número casa" aria-label="Primary input" color="primary" placeholder="Número casa:"></IonInput>
        <IonInput labelPlacement="stacked" color="success"label="Complemento:" aria-label="Primary input" color="primary" placeholder="Complemento:"></IonInput>
      </IonItem>
    </IonList>
    <IonList>
    <IonItem>
        <IonInput disabled labelPlacement="stacked" color="success"label="Dirección:" aria-label="Primary input" color="primary" placeholder="Dirección"></IonInput>
      </IonItem>
    </IonList>

 
      <hr /><br />
      <IonList>
      <IonItem>
        <IonLabel color="primary">Rural/Urbano</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
            <IonSelectOption value="SI">SI</IonSelectOption>
            <IonSelectOption value="NO">NO</IonSelectOption>
          </IonSelect>
        </IonItem>
        </IonList>

        <IonList>
          <IonItem>
          <IonLabel  color="primary">Comuna</IonLabel>
            <IonSelect aria-label="fruit" placeholder="Seleccione"> (Required)
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
            <IonLabel color="primary">Barrio</IonLabel>
            <IonSelect aria-label="fruit" placeholder="Seleccione">
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
       
          </IonItem>

        </IonList>

        <IonList>
      <IonItem>
        <IonInput labelPlacement="stacked" color="success"label="Telefono1:" aria-label="Primary input" color="primary" placeholder="Telefono1:"></IonInput>
        <IonInput labelPlacement="stacked" color="success"label="Telefono2:" aria-label="Primary input" color="primary" placeholder="Telefono2"></IonInput>
      </IonItem>
    </IonList>
    <IonList>
      <IonItem>
        <IonInput labelPlacement="stacked" color="success"label="Latitud:" aria-label="Primary input" color="primary" placeholder="Longitud"></IonInput>
        <IonInput labelPlacement="stacked" color="success"label="Longitud:" aria-label="Primary input" color="primary" placeholder="Longitud"></IonInput>
      </IonItem>
    </IonList>
    <IonList>
      <IonItem>
        <IonInput labelPlacement="stacked" color="success"label="Correo electronico:" aria-label="Primary input" color="primary" placeholder="Correo electronico:"></IonInput>
      </IonItem>
    </IonList>
    <IonList>
      <IonItem>
        <IonLabel color="primary"> Estrato</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
            <IonSelectOption value="1">1</IonSelectOption>
            <IonSelectOption value="2">2</IonSelectOption>
            <IonSelectOption value="3">3</IonSelectOption>
            <IonSelectOption value="4">4</IonSelectOption>
            <IonSelectOption value="5">5</IonSelectOption>
            <IonSelectOption value="6">6</IonSelectOption>
          </IonSelect>
        </IonItem>
        </IonList>

        <br />

    <div><IonButton color="success">Guardar</IonButton><IonButton routerLink={`/tabs/tab13/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab12;

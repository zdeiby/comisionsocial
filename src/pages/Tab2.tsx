import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import React,{useState} from 'react';
import {Person} from './../models/person.model';
import EmployeeItem from './../components/EmployeeItem';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, IonDatetimeButton,IonModal,IonDatetime,
  IonIcon} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

const Tab2: React.FC = () => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">1 - IDENTIFICACION DEL EVENTO </IonTitle>  
        <IonTitle slot="end">FICHA SOCIAL: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>

    <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div>
    {/* <div className="social-card2">
      <span className="label2">Informacion de la Ficha tecnica:</span>
      <span className="value2">Ficha tecnica encontrada en BITACORA de Emergencias. Las horas de Activacion y Llegada se llenaran automaticamente.</span>
    </div> */}
      <br />
    <IonList>

        <>
        <IonItem>
            <IonLabel onClick={() => setShowModal(true)} color="primary">Fecha visita DAGRD:</IonLabel>
            {date && (
              <div className="">
                {new Date(date).toLocaleDateString()}
              </div>
            )}
          </IonItem>
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonDatetime
              presentation="date"
              onIonChange={e => {
                setDate(e.detail.value!);
                setShowModal(false);
              }}
            />
            <IonButton expand="full" onClick={() => setShowModal(false)}>Agregar fecha</IonButton>
          </IonModal>
    </>
    <IonList>
        <IonItem>
        <IonLabel color="primary">Tipo de evento:</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
            <IonSelectOption value="apples">Apples</IonSelectOption>
            <IonSelectOption value="oranges">Oranges</IonSelectOption>
            <IonSelectOption value="bananas">Bananas</IonSelectOption>
          </IonSelect>
        </IonItem>
        </IonList>


      </IonList>
      <IonList>
        <IonItem >
        <IonInput labelPlacement="stacked" color="success"label="Motivo:" aria-label="Primary input" color="primary" placeholder="Motivo"></IonInput>
        </IonItem>
      </IonList>

      <IonItem>
        <IonLabel color="primary">Es inquilinato:</IonLabel>
          <IonSelect aria-label="fruit" placeholder="Seleccione" >
            <IonSelectOption value="SI">SI</IonSelectOption>
            <IonSelectOption value="NO">NO</IonSelectOption>
          </IonSelect>
        </IonItem>
        <br />

    <div><IonButton color="success">Guardar</IonButton><IonButton routerLink={`/tabs/tab3/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab2;

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
import 'bootstrap/dist/css/bootstrap.min.css';


const Tab2: React.FC = () => {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
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
      
      <div className=' shadow p-3 mb-5 bg-white rounded'>
  <IonList>
  <div className="row g-3 was-validated ">
          <div className="col-sm-6">
              <label  className="form-label">Fecha visita DAGRD:</label>
              <input type="date" placeholder="" className="form-control form-control-sm  "  required/>
            </div>
            <div className="col-sm-6">
            <label  className="form-label">Tipo de evento:</label>
            <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option>
                <option value="10"> AVENIDA TORRENCIAL </option>
                <option value="6"> COLAPSO DE LA VIVIENDA </option>
                <option value="8"> DETERIORO ESTRUCTURAL </option>
                <option value="9"> HUMEDADES </option>
                <option value="1"> INCENDIO </option>
                <option value="12"> INUNDACION </option>
                <option value="2"> MOVIMIENTO EN MASA </option>
                <option value="13"> OTROS </option>
                <option value="7"> RIESGO </option>
                <option value="5"> TECNOLOGICO </option>
                <option value="4"> TERREMOTO </option>
                <option value="3"> TERRORISMO </option>
                <option value="11"> VOLADURA DE TECHO </option> 
              </select>
            </div>
            <div className="col-sm-12">
              <label  className="form-label">Cuales:</label>
              <input type="text" placeholder="" className="form-control form-control-sm  "  required/>
            </div>
            <div className="col-sm-12">
              <label  className="form-label">Motivo:</label>
              <input type="text" placeholder="" className="form-control form-control-sm  "  required/>
            </div>
          </div>
  </IonList>

  <IonList>
  <div className="row g-3 was-validated ">

            <div className="col-sm">
            <label  className="form-label">Es inquilinato:</label>
            <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option>
                <option value="1"> NO </option><option value="2"> SI </option>
              </select>
            </div>
            </div> 
  </IonList>

  
  </div>
   <br /><br />
    <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab3/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab2;

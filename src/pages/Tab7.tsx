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
import 'bootstrap/dist/css/bootstrap.min.css';

const Tab7: React.FC = () => {
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
        <IonTitle slot="start">6 - TIEMPO EN LA VIVIENDA</IonTitle>  
        <IonTitle slot="end">FICHA SOCIAL: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>

    <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div>
   
      <br />

      <div className=' shadow p-3 mb-5 bg-white rounded'>
<IonList>
<div className="row g-3 was-validated ">
          <div className="col-sm-6">
              <label  className="form-label" >Hace cuanto habita en esta vivienda: - Tiempo</label>
              <input type="number" placeholder="" className="form-control form-control-sm  "  required/>
            </div>
          <div className="col-sm-6">
          <label  className="form-label">Unidad de tiempo:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option>
          <option value="1"> AÑOS </option>
          <option value="3"> DÍAS </option>
          <option value="2"> MESES </option> 
          </select>
          </div>
        </div>
</IonList>
<IonList>
<div className="row g-3 was-validated ">
          <div className="col-sm-6">
              <label  className="form-label" >Hace cuanto habita en Medellín: - Tiempo</label>
              <input type="number" placeholder="" className="form-control form-control-sm  "  required/>
            </div>
          <div className="col-sm-6">
          <label  className="form-label">Unidad de tiempo:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option>
          <option value="1"> AÑOS </option>
          <option value="3"> DÍAS </option>
          <option value="2"> MESES </option>
          </select>
          </div>
        </div>
</IonList>
<IonList>
<div className="row g-3 was-validated ">
          <div className="col-sm">
          <label  className="form-label">Dónde vivía antes:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> MUNICIPIO DE ANTIOQUIA </option><option value="2"> OTRO BARRIO DE MEDELLIN </option><option value="5"> OTRO DEPARTAMENTO </option><option value="6"> OTRO PAIS </option><option value="1"> SIEMPRE HA VIVIDO EN ESTE BARRIO </option>
          </select>
          </div>
        </div>
</IonList>



  <br />  

</div>

        <br />

    <div><IonButton color="success">Guardar</IonButton><IonButton routerLink={`/tabs/tab8/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab7;

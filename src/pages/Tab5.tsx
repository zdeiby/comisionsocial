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

const Tab5: React.FC = () => {
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
        <IonTitle slot="start">4 - DATOS DE LA VIVIENDA</IonTitle>  
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
        <label  className="form-label">Tipo de evacuacion requerida:</label>
          <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
              <option  value=""> SELECCIONE </option>
              <option value="1"> EMERGENCIA </option>
              <option value="4"> POSTERIOR A EMERGENCIA </option>
              <option value="3"> REVISITA </option>
              <option value="2"> RIESGO </option> 
            </select>
          </div>
          <div className="col-sm-6">
          <label  className="form-label">Daños en la vivienda:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="2"> DEFINITIVA </option><option value="3"> NO SE REQUIERE </option><option value="5"> PENDIENTE </option><option value="4"> PREVENTIVA </option><option value="1"> TEMPORAL </option>
            </select>
          </div>
          <div className="col-sm-6">
          <label  className="form-label">Daños en los enseres:</label>
          <select value={bomberos} onInput={bomberosfun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="3"> NO AFECTADO </option><option value="2"> PARCIAL </option><option value="1"> TOTAL </option>
            </select>
          </div>
          <div className="col-sm-6">
          <label  className="form-label">Daños en los enseres:</label>
          <select value={bomberos} onInput={bomberosfun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="3"> NO AFECTADO </option><option value="2"> PARCIAL </option><option value="1"> TOTAL </option>
            </select>
          </div>

         
          
        </div>
</IonList>
</div>

        <br />

    <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab6/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab5;

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
        <label  className="form-label">Tipo de vivienda:</label>
          <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="2"> APARTAMENTO </option><option value="1"> CASA </option><option value="3"> HABITACION </option><option value="6"> LOCAL </option><option value="5"> PREFABRICADA </option><option value="4"> RANCHO </option>   
            </select>
          </div>
          <div className="col-sm-6">
          <label  className="form-label">Material predominante de pisos:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="2"> APARTAMENTO </option><option value="1"> CASA </option><option value="3"> HABITACION </option><option value="6"> LOCAL </option><option value="5"> PREFABRICADA </option><option value="4"> RANCHO </option> 
            </select>
          </div>
          <div className="col-sm-12">
              <label  className="form-label">Cuales:</label>
              <input type="text" placeholder="" className="form-control form-control-sm  "  required/>
            </div>
          <div className="col-sm-6">
          <label  className="form-label">Material predominante de paredes:</label>
          <select value={bomberos} onInput={bomberosfun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="3"> BAREQUE </option><option value="7"> DESECHOS(CARTON, LATAS, PLASTICO) </option><option value="1"> LADRILLO </option><option value="4"> MADERA </option><option value="6"> PREFABRICADA </option><option value="2"> TAPIA </option><option value="5"> ZINC </option>
            </select>
          </div>
          <div className="col-sm-6">
          <label  className="form-label">Material predominante de techos:</label>
          <select value={bomberos} onInput={bomberosfun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="6"> BAREQUE </option><option value="5"> DESECHOS(CARTON, LATA, PLASTICO) </option><option value="3"> ETERNIT </option><option value="1"> LOSA </option><option value="7"> MADERA </option><option value="2"> TEJA DE BARRO </option><option value="4"> ZINC </option> 
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

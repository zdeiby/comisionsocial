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

const Tab6: React.FC = () => {
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
        <IonTitle slot="start">5 - SERVICIOS PUBLICOS</IonTitle>  
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
        <div className="col-sm-4">
        <label  className="form-label">Energía:</label>
          <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="3"> PREPAGO </option><option value="5"> VEREDAL </option>
            </select>
          </div>
          <div className="col-sm-4">
          <label  className="form-label">Acueducto:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="3"> PREPAGO </option><option value="5"> VEREDAL </option>            </select>
          </div>
          <div className="col-sm-4">
          <label  className="form-label">Alcantarillado:</label>
          <select value={bomberos} onInput={bomberosfun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="5"> VEREDAL </option>            </select>
          </div>

          
        </div>
</IonList>
<IonList>
<div className="row g-3 was-validated ">
        <div className="col-sm">
        <label  className="form-label">Gas:</label>
          <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="6"> PIPETA </option><option value="7"> RED </option><option value="5"> VEREDAL </option> 
            </select>
          </div>
          <div className="col-sm">
          <label  className="form-label">Telefono:</label>
          <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="3"> PREPAGO </option><option value="5"> VEREDAL </option>            </select>
          </div>
  
        </div>
</IonList>
  <br />         <label htmlFor="">Indique en cada uno de los intems el tipo de suministro del servicio público.</label>

</div>

      

    <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab7/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab6;

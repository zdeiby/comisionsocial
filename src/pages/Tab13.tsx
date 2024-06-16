import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useState } from 'react';
import { Person } from '../models/person.model';
import EmployeeItem from '../components/EmployeeItem';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonSelect, IonList, IonInput, IonButton, IonItem, IonLabel,
  IonBadge, IonSelectOption, IonText, IonDatetimeButton, IonModal, IonDatetime,
  IonIcon
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tab13: React.FC = () => {
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

  function enviar() {
    console.log(motivovisita)
    console.log(tipovisita)
    console.log(bomberos)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">14 - MASCOTAS</IonTitle>
          <IonTitle slot="end">FICHA SOCIAL: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div>

        <div className=' shadow p-3 mb-5 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">14 - MASCOTAS</span>
            </div>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Tiene mascotas a su cuidado:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              <div className="col-sm">
                <label className="form-label" >Cuantos</label>
                <input type="number" placeholder="" className="form-control form-control-sm  " required/>
                <small  className="form-text text-muted">Solo numeros, minimo uno.</small>
              </div>
              <div className="col-sm-12">
                <label className="form-label" >Cuales:</label>
                <input type="text" placeholder="" className="form-control form-control-sm  " required/>
                <small  className="form-text text-muted">Por favor separa cada mascota por comas.</small>
              </div>
              <div className="col-sm-12">
                <label className="form-label">En caso de ser necesario, tiene donde albergarlos mientras se ubica en un lugar seguro:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              <div className="col-sm-12">
                <label className="form-label">¿Donde?</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="3"> OTRO </option><option value="1"> RED FAMILIAR </option><option value="2"> RED SOCIAL </option>
                </select>
              </div>
              <div className="col-sm">
                <label className="form-label" >Cual:</label>
                <input type="text" placeholder="" className="form-control form-control-sm  " required/>
                <small  className="form-text text-muted">Informa donde se van a albergar las mascotas.</small>
              </div>
              <div className="col-sm-12">
                <label className="form-label">Requiere albergue para su mascota?</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="3"> ABANDONO </option><option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
            </div>
          </IonList>
         

        </div>


        <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab14/${params.ficha}`}>Siguiente</IonButton></div>


      </IonContent>
    </IonPage>
  );
};

export default Tab13;

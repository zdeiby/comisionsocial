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

const Tab8: React.FC = () => {
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
          <IonTitle slot="start">7 - TENENCIA DE LA VIVIENDA</IonTitle>
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
              <span className="badge badge-secondary text-dark">7 - TENENCIA DE LA VIVIENDA</span>
            </div>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Tenencia de la vivienda:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="2"> ALQUILADA </option><option value="4"> INVADIDA </option><option value="5"> POSESION </option><option value="3"> PRESTADA </option><option value="1"> PROPIA </option><option value="6"> SUCESION </option>                </select>
              </div>
              <div className="col-sm">
                <label className="form-label" >Propietario/poseedor</label>
                <input type="text" placeholder="" className="form-control form-control-sm  " required/>
              </div>

            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label" >Telefono1 del propietario:</label>
                <input type="number" placeholder="" className="form-control form-control-sm  " />
              <small>Minimo 10 digitos, si es fijo debe incluir el 604.</small>
              </div>
            </div>
        </IonList>
        <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label" >Telefono2 del propietario:</label>
                <input type="number" placeholder="" className="form-control form-control-sm  " />
                <small>Minimo 10 digitos, si es fijo debe incluir el 604.</small>
              </div>
            </div>
        </IonList>
        </div>
        <div className=' shadow p-3 mb-2 pt-0 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">8 - DOCUMENTOS DE LA VIVIENDA</span>
            </div>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Escritura:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Compraventa:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Promesa de compraventa:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Posesion:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Impuesto predial:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Servicios Publicos:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Matricula predial:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Extrajuicio:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">Ninguno:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Otro:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
            <div className="col-sm">
                <label className="form-label">La vivienda cuenta con unidad productiva:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
            </div>
          </IonList>

        </div>


        <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab9/${params.ficha}`}>Siguiente</IonButton></div>


      </IonContent>
    </IonPage>
  );
};

export default Tab8;

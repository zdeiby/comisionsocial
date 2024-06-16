import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useState ,useMemo } from 'react';
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
import CustomDataTable from '../components/DataTable';


const Tab12: React.FC = () => {
  const params = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [tipovisita, settipovisita] = useState('');
  const [motivovisita, setmotivovisita] = useState('');
  const [bomberos, setbomberos] = useState('');


  const data = [
    { id: 1, title: 'Star Wars', year: '1977',year1: '1977',year2: '1977',year3: '1977' },
    { id: 2, title: 'Conan the Barbarian', year: '1982',year1: '1977',year2: '1977',year3: '1977' },
    { id: 3, title: 'The Lord of the Rings', year: '2001',year1: '1977',year2: '1977',year3: '1977' }
  ];
  
  const columns = [
    {
        name: 'Title',
        selector: row => <button className='btn btn-success btn-sm' onClick={() =>  history.push(`/tabs/tabayudas/${params.ficha}?idayuda=${params.ficha}01`)}>Editar</button>,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    }
    ,
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },,
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    }
  ];

  // Manejador para cambios en el campo de búsqueda
  const handleFilterChange = (event) => {
      setFilterText(event.target.value);
  };




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
          <IonTitle slot="start">12 - AYUDAS HUMANITARIAS ENTREGADAS</IonTitle>
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
              <span className="badge badge-secondary text-dark">12 - AYUDAS HUMANITARIAS ENTREGADAS</span>
            </div>
            <div className="row g-3 was-validated ">

            <div className="col-sm">
              <blockquote className="blockquote text-center">
                    <p className="mb-0">
                    </p><h6>Numero de ayudas entregadas:</h6>
                    <p></p>
                    <p className="mb-0">
                    </p><h5 id="numerointegrantes">1</h5>
                    <p></p>
                </blockquote>
              </div>

            </div>
          </IonList>
         
        </div>
        <div className=' shadow p-3 mb-2 pt-0 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">AYUDAS REGISTRADAS</span>
              <IonButton  routerLink={`/tabs/tabayudas/${params.ficha}`}>
                        Ingresar nueva ayuda
                        {/* <span className="badge badge-light">+</span>
                        <span className="sr-only"></span> */}
                        </IonButton>

            </div>
            <CustomDataTable  
                title="Ayudas"
                data={data}
                columns={columns}/>
          </IonList>


        </div>


        <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab13/${params.ficha}`}>Siguiente</IonButton></div>


      </IonContent>
    </IonPage>
  );
};

export default Tab12;

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


const Tab10: React.FC = () => {
  const params = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [tipovisita, settipovisita] = useState('');
  const [motivovisita, setmotivovisita] = useState('');
  const [bomberos, setbomberos] = useState('');


  const data = [
    { id: 1, title: 'Star Wars', year: 'ver observación',year1: '1977',year2: '1977',year3: '1977' },
    { id: 2, title: 'Conan the Barbarian', year: '1982',year1: '1977',year2: '1977',year3: '1977' },
    { id: 3, title: 'The Lord of the Rings', year: '2001',year1: '1977',year2: '1977',year3: '1977' }
  ];
  
  const columns = [
    {
        name: 'Eliminar',
        selector: row => <button className='btn btn-info btn-sm text-light' >eliminar</button> ,
        sortable: true,
    },
    {
        name: 'Observacion',
        selector: row =><button className='btn btn-info btn-sm text-light' >Observacion</button> ,
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
          <IonTitle slot="start">10 - DATOS GENERALES (REMISIONES)</IonTitle>
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
              <span className="badge badge-secondary text-dark">9 - CONFORMACION DEL HOGAR</span>
            </div>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">El caso es remitido?</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="3"> NO </option><option value="2"> SI - INSPECCION </option><option value="1"> SI - PROGRAMA </option>
               </select>
              </div>
            <div className="col-sm">
              <blockquote className="blockquote text-center">
                    <p className="mb-0">
                    </p><h6>Numero de remisiones:</h6>
                    <p></p>
                    <p className="mb-0">
                    </p><h5 id="numerointegrantes">1</h5>
                    <p></p>
                </blockquote>
              </div>

            </div>
          </IonList>
          <IonList>
  
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Nombre del programa / Inspeccion</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="4"> AID FOR AIDS </option><option value="3"> AMAUTTA </option><option value="5"> BUEN COMIENZO </option><option value="63"> CENTRO ADMINISTRATIVO MUNICIPAL CAM </option><option value="26"> CENTRO DIA </option><option value="6"> CENTRO INTEGRAL PARA LA FAMILIA </option><option value="8"> COMISARIA DE FAMILIA </option><option value="28"> COMUNA 1 - INSPECCIÓN 1 V. GUADALUPE </option><option value="42"> COMUNA 10 - INSPECCIÓN 10A PRADO CENTRO </option><option value="43"> COMUNA 10 - INSPECCIÓN 10B BOSTON </option><option value="44"> COMUNA 10 - INSPECCIÓN 10C MINORISTA </option><option value="45"> COMUNA 10 - INSPECCION 10D ALPUJARRA </option><option value="46"> COMUNA 11 - INSPECCIÓN 11A LA AMERICA </option><option value="47"> COMUNA 11 - INSPECCIÓN 11B SAN JUAQUIN </option><option value="48"> COMUNA 12 - INSPECCIÓN 12 SANTA MONICA </option><option value="49"> COMUNA 13 - INSPECCIÓN 13 SAN JAVIER </option><option value="50"> COMUNA 14 - INSPECCIÓN 14A  POBLADO CENTRO </option><option value="51"> COMUNA 14 - INSPECCIÓN 14B  POBLADO SUR </option><option value="52"> COMUNA 15 - INSPECCIÓN 15 GUAYABAL </option><option value="53"> COMUNA 16 - INSPECCIÓN 16A PARQUE BELEN </option><option value="54"> COMUNA 16 - INSPECCIÓN 16B PARQUE BELEN </option><option value="29"> COMUNA 2 - INSPECCIÓN 2 VILLA DEL SOCORRO </option><option value="30"> COMUNA 3 - INSPECCIÓN 3 PARQUE GAITAN </option><option value="31"> COMUNA 4 - INSPECCIÓN 4A ARANJUEZ </option><option value="32"> COMUNA 4 - INSPECCIÓN 4B CAMPO VALDEZ </option><option value="33"> COMUNA 5 - INSPECCIÓN 5 CASTILLA </option><option value="34"> COMUNA 6 - INSPECCIÓN 6A 12 DE OCTUBRE </option><option value="35"> COMUNA 6 - INSPECCIÓN 6B KENEDY </option><option value="36"> COMUNA 7 - INSPECCIÓN 7A ROBLEDO </option><option value="37"> COMUNA 7 - INSPECCIÓN 7B ROBLEDO </option><option value="38"> COMUNA 8 - INSPECCIÓN 8A VILLA HERMOSA </option><option value="39"> COMUNA 8 - INSPECCIÓN 8B VILLATINA </option><option value="40"> COMUNA 9 - INSPECCIÓN 9A BUENOS AIRES </option><option value="41"> COMUNA 9 - INSPECCIÓN 9B EL SALVADOR </option><option value="55"> CORREGIMIENTO 50 - CORREGIDURIA 50 SEBASTIAN DE PALMITAS </option><option value="56"> CORREGIMIENTO 60 - CORREGIDURIA 60 SAN CRISTOBAL </option><option value="57"> CORREGIMIENTO 70 - CORREGIDURIA 70 ALTAVISTA </option><option value="58"> CORREGIMIENTO 80 - CORREGIDURIA 80 SAN ANTONIO DE PRADO </option><option value="59"> CORREGIMIENTO 90 - CORREGIDURIA 90 SANTA ELENA </option><option value="9"> EMPLEABILIDAD Y CAPACITACION SENA </option><option value="10"> EQUIPO DE DISCAPACIDAD </option><option value="11"> EQUIPO MUNICIPAL DE VICTIMAS </option><option value="13"> GERENCIA DE ETNIAS </option><option value="61"> HOSPITAL INFANTIL SANTA  ANA VALORACION NUTRICIONAL  </option><option value="14"> INSPECCIÓN DE PROTECCION ANIMAL </option><option value="65"> Instituto Colombiano De Bienestar Familiar Centro Zonal Sur Oriente </option><option value="15"> INTEGRATE </option><option value="25"> MEDELLIN ME CUIDA </option><option value="2"> MEJORAMIENTO DE VIVIENDA </option><option value="17"> OFICINA PUBLICA DE EMPLEO </option><option value="18"> OPADI </option><option value="19"> PATRONATO MARIA AUXILIADORA </option><option value="64"> POR MIS DERECHOS POBLACION LGTBI </option><option value="1"> PROGRAMA ARRENDAMIENTO TEMPORAL </option><option value="20"> SECRETARIA DE EDUCACION </option><option value="21"> SECRETARIA DE SALUD PUBLICA </option><option value="22"> SECRETARIA DESARROLLO ECONOMICO </option><option value="23"> UNIDAD DE NIÑEZ </option><option value="24"> UNIDAD FAMILIAS MEDELLIN </option> 
               </select>
              </div>
              <div className="col-sm">
                <label className="form-label">Integrante del hogar:</label>
                <select value={motivovisita} onChange={motivovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="3"> NO </option><option value="2"> SI - INSPECCION </option><option value="1"> SI - PROGRAMA </option>
               </select>
              </div>
              
            </div><hr />
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">OBSERVACIONES</span>
            </div>
            <div className="row g-3 was-validated ">
            <div className="col-sm">
                <textarea placeholder="" className="form-control" rows="5" required/>
              </div>
              </div>
          </IonList>
         
        </div>
        <div className=' shadow p-3 mb-2 pt-0 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">INTEGRANTES REMITIDOS</span>
            </div>
            <CustomDataTable  
                title="Integrantes"
                data={data}
                columns={columns}/>
          </IonList>


        </div>


        <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab11/${params.ficha}`}>Siguiente</IonButton></div>


      </IonContent>
    </IonPage>
  );
};

export default Tab10;

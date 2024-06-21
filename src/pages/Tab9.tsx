import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonButton
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomDataTable from '../components/DataTable';
import loadSQL from '../models/database';

interface Person {
  fichasocial: string | null;
  tipodefamilia: string | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: string | null;
  tabla: string | null;
  observacion: string | null;
  nameFile: string | null;
}

const Tab9: React.FC = () => {
  const params = useParams();
  const history = useHistory();

  const [people, setPeople] = useState<Person[]>([]);
  const [integrantes, setIntegrantes] = useState([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    fichasocial: '',
    tipodefamilia: '',
    fecharegistro: '',
    usuario: '',
    estado: '',
    tabla: '',
    observacion: '',
    nameFile: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
  }, []);

  const saveDatabase = () => {
    if (db) {
      const data = db.export();
      localStorage.setItem('sqliteDb', JSON.stringify(Array.from(data)));
      const request = indexedDB.open('myDatabase', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('sqliteStore')) {
          db.createObjectStore('sqliteStore');
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['sqliteStore'], 'readwrite');
        const store = transaction.objectStore('sqliteStore');
        const putRequest = store.put(data, 'sqliteDb');

        putRequest.onsuccess = () => {
          console.log('Data saved to IndexedDB');
        };

        putRequest.onerror = (event) => {
          console.error('Error saving data to IndexedDB:', event.target.error);
        };
      };

      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event.target.error);
      };
    }
  };

  const fetchUsers = async (database = db) => {
    if (db) {
      const res = await database.exec(`SELECT * FROM c9_conformacionfamiliar WHERE fichasocial=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
      } else {
        setItems({
          fichasocial: params.ficha,
          tipodefamilia: '',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'c9_conformacionfamiliar',
          observacion: '',
          nameFile: '',
        });
      }

      const integrantesRes = await database.exec(`SELECT * FROM c131_integrante WHERE fichasocial=${params.ficha}`);
      if (integrantesRes[0]?.values && integrantesRes[0]?.columns) {
        const transformedIntegrantes = integrantesRes[0].values.map((row: any[]) => {
          return integrantesRes[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {});
        });
        setIntegrantes(transformedIntegrantes);
      }
    }
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (people.length > 0) {
      let data = people[0] || {};
      setItems({
        fichasocial: data.fichasocial || params.ficha,
        tipodefamilia: data.tipodefamilia || '',
        fecharegistro: data.fecharegistro || '',
        usuario: data.usuario || '',
        estado: data.estado || '',
        tabla: data.tabla || '',
        observacion: data.observacion || '',
        nameFile: data.nameFile || '',
      });
    }
  }, [people]);

  useEffect(() => {
    fetchUsers();
  }, [db]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setItems((prevItems) => ({
      ...prevItems,
      [field]: value,
    }));
    console.log(items);
  };

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  const enviar = async (database = db) => {
    console.log(items);
    try {
      await db.exec(`INSERT OR REPLACE INTO c9_conformacionfamiliar (fichasocial, tipodefamilia, fecharegistro, usuario, estado, tabla, observacion, nameFile)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          items.fichasocial, items.tipodefamilia, items.fecharegistro, items.usuario, items.estado, items.tabla, items.observacion, items.nameFile
        ]);

      const respSelect = db.exec(`SELECT * FROM "c9_conformacionfamiliar" WHERE fichasocial="${items.fichasocial}";`);
      setButtonDisabled(false);
      saveDatabase();
      alert('Datos Guardados con éxito');
    } catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
  };

  const columns = [
    {
      name: 'Editar',
      selector: row => <button className='btn btn-success btn-sm' onClick={() => history.push(`/tabs/tabintegrantes/${params.ficha}?idintegrante=${`${row.idintegrante}`}`)}>Editar</button>,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => `${row.nombre1} ${row.nombre2} ${row.apellido1} ${row.apellido2}`,
      sortable: true,
    },
    {
      name: 'Documento',
      selector: row => `${row.numerodedocumento}`,
      sortable: true,
    },
    {
      name: 'Fecha de Nacimiento',
      selector: row => `${row.fechadenacimiento}`,
      sortable: true,
    },
    {
      name: 'Sexo',
      selector: row => `${row.sexo}`,
      sortable: true,
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">9 - CONFORMACION DEL HOGAR</IonTitle>
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
                <label className="form-label">Tipo de Familia</label>
                <select onChange={(e) => handleInputChange(e, 'tipodefamilia')} value={items.tipodefamilia} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="9"> AMPLIADA (FAMILIA CON UN MIEMBRO NO CONSANGUÍNEO) </option>
                  <option value="4"> DÍADA CONYUGAL (PAREJA SIN HIJOS) </option>
                  <option value="8"> EXTENSA (GENERACIONES CON LAZOS CONSANGUÍNEOS) </option>
                  <option value="7"> FRATERNA (SOLO HERMANOS) </option>
                  <option value="10"> HOMOPARENTAL (PAREJAS DEL MISMO SEXO) </option>
                  <option value="1"> MONO PARENTAL MATERNA (MADRE E HIJOS) </option>
                  <option value="2"> MONO PARENTAL PATERNA (PADRE E HIJOS) </option>
                  <option value="5"> NUCLEAR (PADRE MADRE E HIJOS) </option>
                  <option value="6"> SIMULTÁNEA (HIJOS PADRE, HIJOS MADRE E HIJOS EN COMUN) </option>
                  <option value="3"> UNIPERSONAL (UNA SOLA PERSONA) </option>
                </select>
              </div>
              <div className="col-sm">
                <blockquote className="blockquote text-center">
                  <p className="mb-0"></p>
                  <h6>Numero de integrantes:</h6>
                  <p></p>
                  <p className="mb-0"></p>
                  <h5 id="numerointegrantes">{integrantes.length}</h5>
                  <p></p>
                </blockquote>
              </div>
            </div>
          </IonList>
        </div>
        <div className=' shadow p-3 mb-2 pt-0 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">13 - GRUPO FAMILIAR</span>
              <IonButton routerLink={`/tabs/tabintegrantes/${params.ficha}`}>
                Ingresar un nuevo integrante
              </IonButton>
            </div>
            <CustomDataTable
              title="Integrantes"
              data={integrantes}
              columns={columns}
            />
          </IonList>
        </div>

        <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab10/${params.ficha}`}>Siguiente</IonButton></div>

      </IonContent>
    </IonPage>
  );
};

export default Tab9;

import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React,{useEffect, useState} from 'react';
import EmployeeItem from '../components/EmployeeItem';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, IonDatetimeButton,IonModal,IonDatetime,
  IonIcon} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadSQL from '../models/database';

interface Person {
  fichasocial: string | null;
  energia: string | null;
  acueducto: string | null;
  alcantarillado: string | null;
  gas: string | null;
  telefono: string | null;
  telefonofijo: string | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: string | null;
  tabla: string | null;
}

const Tab6: React.FC = () => {
  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    fichasocial: '',
    energia: '',
    acueducto: '',
    alcantarillado: '',
    gas: '',
    telefono: '',
    telefonofijo: '',
    fecharegistro: '',
    usuario: '',
    estado: '',
    tabla: '',
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
      const res = await database.exec(`SELECT * FROM c5_serviciospublicos WHERE fichasocial=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].energia)?false:true);
      } else {
        setItems({
          fichasocial: params.ficha,
          energia: '',
          acueducto: '',
          alcantarillado: '',
          gas: '',
          telefono: '',
          telefonofijo: '',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'c5_serviciospublicos',
        });
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
        energia: data.energia || '',
        acueducto: data.acueducto || '',
        alcantarillado: data.alcantarillado || '',
        gas: data.gas || '',
        telefono: data.telefono || '',
        telefonofijo: data.telefonofijo || '',
        fecharegistro: data.fecharegistro || '',
        usuario: data.usuario || '',
        estado: data.estado || '',
        tabla: data.tabla || '',
      });
    }
  }, [people]);

  useEffect(() => {
    fetchUsers();
  }, [db]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setItems((prevItems) => {
      const newState = { ...prevItems, [field]: value };
      if (field === 'telefono') {
        newState.telefonofijo = value === '1' ? 'NO APLICA' : '';
      }
      return newState;
    });
  };

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  const enviar = async (database = db) => {
    console.log(items);
    try {
      await db.exec(`INSERT OR REPLACE INTO c5_serviciospublicos (fichasocial, energia, acueducto, alcantarillado, gas, telefono, telefonofijo, fecharegistro, usuario, estado, tabla)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          items.fichasocial, items.energia, items.acueducto, items.alcantarillado, items.gas, items.telefono, items.telefonofijo, items.fecharegistro, items.usuario, items.estado, items.tabla
        ]);

      const respSelect = db.exec(`SELECT * FROM "c5_serviciospublicos" WHERE fichasocial="${items.fichasocial}";`);
      setButtonDisabled(false);
      saveDatabase();
      alert('Datos Guardados con éxito');
    } catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
  };

  function sololectura() {
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
          <select onChange={(e) => handleInputChange(e, 'energia')} value={items.energia} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="3"> PREPAGO </option><option value="5"> VEREDAL </option> 
            </select>
          </div>
          <div className="col-sm-4">
          <label  className="form-label">Acueducto:</label>
          <select onChange={(e) => handleInputChange(e, 'acueducto')} value={items.acueducto} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="3"> PREPAGO </option><option value="5"> VEREDAL </option>
          </select>
          </div>
          <div className="col-sm-4">
          <label  className="form-label">Alcantarillado:</label>
          <select onChange={(e) => handleInputChange(e, 'alcantarillado')} value={items.alcantarillado} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="5"> VEREDAL </option>
           </select>
          </div>

          
        </div>
</IonList>
<IonList>
<div className="row g-3 was-validated ">
        <div className="col-sm">
        <label  className="form-label">Gas:</label>
          <select onChange={(e) => handleInputChange(e, 'gas')} value={items.gas} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="6"> PIPETA </option><option value="7"> RED </option><option value="5"> VEREDAL </option>
            </select>
          </div>
          <div className="col-sm">
          <label  className="form-label">Telefono:</label>
          <select onChange={(e) => handleInputChange(e, 'telefono')} value={items.telefono} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
          <option value=""> SELECCIONE </option><option value="4"> COMUNAL </option><option value="8"> CONVENCIONAL </option><option value="2"> FRAUDE </option><option value="1"> NO TIENE </option><option value="3"> PREPAGO </option><option value="5"> VEREDAL </option>
          </select>
          </div>
          {(items.telefono !='1' && items.telefono)? 
          <div className="col-sm">
              <label  className="form-label">Telefono fijo:</label>
              <input onChange={(e) => handleInputChange(e, 'telefonofijo')} value={items.telefonofijo} type="number" placeholder="" className="form-control form-control-sm  "  required/>
                        <small  className="form-text text-muted">Minimo 10 digitos, si es fijo debe incluir el 604.</small>
          </div> :'' }

        </div>
</IonList>
  <br />         <label htmlFor="">Indique en cada uno de los intems el tipo de suministro del servicio público.</label>

</div>

      

    <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton disabled={buttonDisabled} routerLink={`/tabs/tab7/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab6;

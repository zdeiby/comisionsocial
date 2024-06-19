import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import React,{useEffect, useState} from 'react';
import EmployeeItem from './../components/EmployeeItem';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, IonDatetimeButton,IonModal,IonDatetime,
  IonIcon} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadSQL from '../models/database';

interface Person {
  fichasocial: string | null;
  direccion: string | null;
  comuna: string | null;
  barrio: string | null;
  ruralurbano: string | null;
  sector: string | null;
  telefono1: string | null;
  telefono2: string | null;
  correo: string | null;
  estrato: string | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: string | null;
  tabla: string | null;
  dirCampo1: string | null;
  dirCampo2: string | null;
  dirCampo3: string | null;
  dirCampo4: string | null;
  dirCampo5: string | null;
  dirCampo6: string | null;
  dirCampo7: string | null;
  dirCampo8: string | null;
  dirCampo9: string | null;
  longitud: string | null;
  latitud: string | null;
}


const Tab3: React.FC = () => {

  const params = useParams();


  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    fichasocial: '',
    direccion: '',
    comuna: '',
    barrio: '',
    ruralurbano: '',
    sector: '',
    telefono1: '',
    telefono2: '',
    correo: '',
    estrato: '',
    fecharegistro: '',
    usuario: '',
    estado: '',
    tabla: '',
    dirCampo1: '',
    dirCampo2: '',
    dirCampo3: '',
    dirCampo4: '',
    dirCampo5: '',
    dirCampo6: '',
    dirCampo7: '',
    dirCampo8: '',
    dirCampo9: '',
    longitud: '',
    latitud: '',
    
  });

  const [items2, setItems2] = useState({
    fichasocial: '',
    direccion: '',
    comuna: '',
    barrio: '',
    ruralurbano: '',
    sector: '',
    telefono1: '',
    telefono2: '',
    correo: '',
    estrato: '',
    fecharegistro: '',
    usuario: '',
    estado: '',
    tabla: '',
    dirCampo1: '',
    dirCampo2: '',
    dirCampo3: '',
    dirCampo4: '',
    dirCampo5: '',
    dirCampo6: '',
    dirCampo7: '',
    dirCampo8: '',
    dirCampo9: '',
    longitud: '',
    latitud: '',
    
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
  }, []);

 


  const saveDatabase = () => {
    if (db) {
      const data = db.export();
      localStorage.setItem('sqliteDb', JSON.stringify(Array.from(data)));
      const request = indexedDB.open('myDatabase', 1); // Asegúrate de usar el mismo nombre de base de datos
  
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
      const res = await database.exec(`SELECT * FROM c2_localizaciondelevento  where fichasocial=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople); 
      }else{
        setItems({
          fichasocial: params.ficha,
          direccion: '',
          comuna: '',
          barrio: '',
          ruralurbano: '',
          sector: '',
          telefono1: '',
          telefono2: '',
          correo: '',
          estrato: '',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'c2_localizaciondelevento',
          dirCampo1: '',
          dirCampo2: '',
          dirCampo3: '',
          dirCampo4: '',
          dirCampo5: '',
          dirCampo6: '',
          dirCampo7: '',
          dirCampo8: '',
          dirCampo9: '',
          longitud: '',
          latitud: '',
        });
      }
    }

  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getCurrentDateTime = () => {
    const date = new Date();
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
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
      direccion: data.direccion || '',
      comuna: data.comuna || '',
      barrio: data.barrio || '',
      ruralurbano: data.ruralurbano || '',
      sector: data.sector || '',
      telefono1: data.telefono1 || '',
      telefono2: data.telefono2 || '',
      correo: data.correo || '',
      estrato: data.estrato || '',
      fecharegistro: data.fecharegistro || '',
      usuario: data.usuario || '',
      estado: data.estado || '',
      tabla: data.tabla || '',
      dirCampo1: data.dirCampo1 || '',
      dirCampo2: data.dirCampo2 || '',
      dirCampo3: data.dirCampo3 || '',
      dirCampo4: data.dirCampo4 || '',
      dirCampo5: data.dirCampo5 || '',
      dirCampo6: data.dirCampo6 || '',
      dirCampo7: data.dirCampo7 || '',
      dirCampo8: data.dirCampo8 || '',
      dirCampo9: data.dirCampo9 || '',
      longitud: data.longitud || '',
      latitud: data.latitud || '',
  
    });
  }
}, [people]); // Ejecuta este efecto cuando `people` cambia

// Llamar a `fetchUsers` en el momento adecuado
useEffect(() => {
  fetchUsers();
}, [db]); // Ejecuta este efecto cuando `db` cambia

  //saveDatabase();    para guardar la db






  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setItems((prevItems) => ({
      ...prevItems,
      [field]: value,
    }));
console.log(items)
  };

 useEffect(() => {
    console.log("Items updated:", items);
    // Aquí puedes realizar cualquier acción que dependa de que `items` esté actualizado
  }, [items]);



  const enviar = async (database = db) => {
    console.log(items)
    try {
      await db.exec(`INSERT OR REPLACE INTO c2_localizaciondelevento (fichasocial, direccion, comuna, barrio, ruralurbano, sector, telefono1, telefono2, correo, estrato, fecharegistro, usuario, estado, tabla, dirCampo1, dirCampo2, dirCampo3, dirCampo4, dirCampo5, dirCampo6, dirCampo7, dirCampo8, dirCampo9, longitud, latitud)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            items.fichasocial, items.direccion, items.comuna, items.barrio, items.ruralurbano, items.sector, items.telefono1, items.telefono2, items.correo, items.estrato,
            items.fecharegistro, items.usuario, items.estado, items.tabla, items.dirCampo1, items.dirCampo2, items.dirCampo3, items.dirCampo4, items.dirCampo5, items.dirCampo6,
            items.dirCampo7, items.dirCampo8, items.dirCampo9, items.longitud, items.latitud
          ]);

          // update ui
          const respSelect = db.exec(`SELECT * FROM "c2_localizaciondelevento" WHERE fichasocial="${items.fichasocial}";`);
          setButtonDisabled(false);
          saveDatabase();
          alert('Datos Guardados con éxito');
        }
           catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
  }

  const handleInputChange2 = (e, fieldName) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedText = selectedOption.innerHTML;
    setItems2((items2) => ({
      ...items2,
      [fieldName]: selectedText,
    }));
    // setItems2({
    //   ...items2,
    //   [fieldName]: selectedText // Actualiza el estado con el texto visible de la opción seleccionada
    // });

    console.log(items2, 'items 2')
    console.log(items2, 'items 2')
  };

  useEffect(() => {
    const newDireccion =items2.dirCampo1+items.dirCampo2+' '+items.dirCampo3
    +items2.dirCampo4+items.dirCampo5+' '+items.dirCampo6+items2.dirCampo7+items.dirCampo8
    +' || '+items.dirCampo9;
    setItems(prevItems => ({ ...prevItems, direccion: newDireccion }));
  }, [items.dirCampo1, items.dirCampo2, items.dirCampo3, items.dirCampo4, items.dirCampo5, items.dirCampo6, items.dirCampo7, items.dirCampo8, items.dirCampo9]);



  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">2 - LOCALIZACION DEL EVENTO </IonTitle>  
        <IonTitle slot="end">FICHA SOCIAL: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>

    <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div>
    <div className="social-card2">
      <span className="label2">Dirección de residencia</span>
      <span className="value2">
      Ingrese la dirección según el siguiente ejemplo, diligenciando los campos requeridos que identifiquen la dirección actual; los campos que no requiera los pude dejar en blanco.
      Vaya verificando en el recuadro inferior "Dirección" el resultado.
      Ejemplo:
      </span>
      <span className="value2">
      Vía principal: CARRERA 42 B SUR
      </span>
      <span className="value2">
      Vía secundaria: 25 A ESTE - 135
      </span>
      <span className="value2">

      Complemento: Apartamento 101
      </span>
    </div> 
      <br />

      <div className=' shadow p-3 mb-5 bg-white rounded'>
  <IonList>
  <div className="row g-3 was-validated ">
          <div className="col-sm">
                    <label  className="form-label">Via principal:</label>
                    <select  onChange={(e) => {
                        handleInputChange(e, 'dirCampo1');
                        handleInputChange2(e,'dirCampo1'); // Llama a otra función si es necesario
                      }} value={items.dirCampo1} className="form-control form-control-sm" id="vprincipal" aria-describedby="validationServer04Feedback" required>
                        <option value=""> SELECCIONE </option>
                        <option value="1"> AUTOPISTA </option>
                        <option value="2"> AVENIDA </option>
                        <option value="3"> AVENIDA CALLE </option>
                        <option value="4"> AVENIDA CARRERA </option>
                        <option value="5"> BULEVAR </option>
                        <option value="6"> CALLE </option>
                        <option value="7"> CARRERA </option>
                        <option value="8"> CIRCULAR </option>
                        <option value="10"> CIRCUNVALAR </option>
                        <option value="11"> CTAS CORRIDAS </option>
                        <option value="12"> DIAGONAL </option>
                        <option value="9"> KILOMETRO </option>
                        <option value="20"> OTRA </option>
                        <option value="13"> PASAJE </option>
                        <option value="14"> PASEO </option>
                        <option value="15"> PEATONAL </option>
                        <option value="16"> TRANSVERSAL </option>
                        <option value="17"> TRONCAL </option>
                        <option value="18"> VARIANTE </option>
                        <option value="19"> VIA </option> 
                    </select>
                    </div>
          
            <div className="col-sm">
              <label  className="form-label" style={{color: 'white'}}>.</label>
              <input type="text" placeholder="" onChange={(e) =>
                        handleInputChange(e, 'dirCampo2')
                       } value={items.dirCampo2} className="form-control form-control-sm  "  required/>
            </div>
            <div className="col-sm">
              <label  className="form-label" style={{color: 'white'}}>.</label>
              <input type="text" onChange={(e) => 
                        handleInputChange(e, 'dirCampo3')}  value={items.dirCampo3} placeholder="" className="form-control form-control-sm  "  />
            </div>
            <div className="col-sm">
                    <label  className="form-label" style={{color: 'white'}}>.</label>
                    <select onChange={(e) => {
                        handleInputChange(e, 'dirCampo4');
                        handleInputChange2(e,'dirCampo4'); // Llama a otra función si es necesario
                      }}  value={items.dirCampo4} className="form-control form-control-sm"  aria-describedby="validationServer04Feedback" >
                    <option value=""> SELECCIONE </option>
                    <option value="5"> BIS </option>
                    <option value="3"> ESTE </option>
                    <option value="2"> NORTE </option>
                    <option value="4"> OESTE </option>
                    <option value="1"> SUR </option>   
                    </select>
                    </div>

                <div className="simbolo col-sm-1">
                <label ><br/></label>
                <h4>#</h4>
            </div>    
          </div>
          
         
  </IonList>

  <IonList>
  <div className="row g-3 was-validated ">
  <div className="col-sm">
              <label  className="form-label" >Via secundaria:</label>
              <input type="number" onChange={(e) => 
                        handleInputChange(e, 'dirCampo5')
                      }  value={items.dirCampo5} placeholder="" className="form-control form-control-sm  "  />
            </div>

            
          
            <div className="col-sm">
              <label  className="form-label" style={{color: 'white'}}>.</label>
              <input type="text" onChange={(e) => 
                        handleInputChange(e, 'dirCampo6')
                   // Llama a otra función si es necesario
                      }  value={items.dirCampo6} placeholder="" className="form-control form-control-sm  "  />
            </div>


            <div className="col-sm">
                    <label  className="form-label" style={{color: 'white'}}>.</label>
                    <select onChange={(e) => {
                        handleInputChange(e, 'dirCampo7');
                        handleInputChange2(e,'dirCampo7'); // Llama a otra función si es necesario
                      }}  value={items.dirCampo7} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                    <option value=""> SELECCIONE </option>
                    <option value="5"> BIS </option>
                    <option value="3"> ESTE </option>
                    <option value="2"> NORTE </option>
                    <option value="4"> OESTE </option>
                    <option value="1"> SUR </option> 
                    </select>
              </div>

              <div className="simbolo col-sm-1 ">
                <label ><br/></label>
                <h4>-</h4>
            </div>


            <div className="col-sm">
              <label  className="form-label" style={{color: 'white'}}>.</label>
              <input type="number" onChange={(e) => 
                        handleInputChange(e, 'dirCampo8')
                      }  value={items.dirCampo8} placeholder="" className="form-control form-control-sm  "  />
            </div>
            
          </div>
  </IonList>

  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
              <label  className="form-label" >Complemento</label>
              <input type="text" onChange={(e) => 
                        handleInputChange(e, 'dirCampo9')}  value={items.dirCampo9} placeholder="" className="form-control form-control-sm  "  required/>
            </div>
          </div>
  </IonList>
<hr />
  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
              <label  className="form-label" >Direccion:</label>
              <input disabled type="text"  value={items.direccion}   placeholder="" className="form-control form-control-sm  "  required/>
            </div>
          </div>
  </IonList>
  <hr />

  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
                    <label  className="form-label" >Rural/Urbano</label>
                    <select onChange={(e) => handleInputChange(e, 'ruralurbano')}  value={items.ruralurbano} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                    <option value=""> SELECCIONE </option>
                    <option value="2"> RURAL </option>
                    <option value="1"> URBANO </option>
                    </select>
              </div>

                <div className="col-sm">
                  <label  className="form-label" >Sector:</label>
                  <input type="text" onChange={(e) => handleInputChange(e, 'sector')} value={items.sector} placeholder="" className="form-control form-control-sm  "  />
                </div>

          </div>
  </IonList>


  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
                    <label  className="form-label" >Comuna</label>
                    <select onChange={(e) => handleInputChange(e, 'comuna')} value={items.comuna} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                    <option value=""> SELECCIONE </option>
                    <option value="1"> 1 Popular </option>
                    <option value="10"> 10 La Candelaria </option>
                    <option value="11"> 11 Laureles Estadio </option>
                    <option value="12"> 12 La América </option>
                    <option value="13"> 13 San Javier </option>
                    <option value="14"> 14 El Poblado </option>
                    <option value="15"> 15 Guayabal </option>
                    <option value="16"> 16 Belén </option>
                    <option value="17"> 17 Ciudadela </option>
                    <option value="2"> 2 Santa Cruz </option>
                    <option value="120"> 20 - FUERA DE MEDELLIN </option>
                    <option value="121"> 21 - FUERA DE ANTIOQUIA </option>
                    <option value="3"> 3 Manrique </option>
                    <option value="4"> 4 Aranjuez </option>
                    <option value="5"> 5 Castilla </option>
                    <option value="50"> 50 Palmitas </option>
                    <option value="6"> 6 Doce de Octubre </option>
                    <option value="60"> 60 San Cristóbal </option>
                    <option value="7"> 7 Robledo </option>
                    <option value="70"> 70 Altavista </option>
                    <option value="8"> 8 Villa Hermosa </option>
                    <option value="80"> 80 San Antonio de Prado </option>
                    <option value="9"> 9 Buenos Aires </option>
                    <option value="90"> 90 Santa Elena </option>
                    <option value="91"> Otro </option>
                    </select>
              </div>
            <div className="col-sm">
                    <label  className="form-label" >Barrio</label>
                    <select onChange={(e) => handleInputChange(e, 'barrio')} value={items.barrio} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                    <option value=""> SELECCIONE </option><option value="12001"> 20 - FUERA DE MEDELLIN </option><option value="12101"> 21 - FUERA DE ANTIOAUIA </option><option value="7002"> Aguas Frías-7002 </option><option value="1416"> Alejandría-1416 </option><option value="905"> Alejandro Echavarría-905 </option><option value="514"> Alfonso López-514 </option><option value="708"> Altamira-708 </option><option value="7005"> Altavista Central-7005 </option><option value="1613"> Altavista-1613 </option><option value="1408"> Altos del Poblado-1408 </option><option value="206"> Andalucia-206 </option><option value="1318"> Antonio Nariño-1318 </option><option value="413"> Aranjuez-413 </option><option value="914"> Asomadera Nº 1-914 </option><option value="915"> Asomadera Nº 2-915 </option><option value="916"> Asomadera Nº 3-916 </option><option value="8005"> Astillero-8005 </option><option value="1420"> Astorga-1420 </option><option value="713"> Aures Nº 1-713 </option><option value="712"> Aures Nº 2-712 </option><option value="906"> Barrio Caicedo-906 </option><option value="1401"> Barrio Colombia-1401 </option><option value="1013"> Barrio Colón-1013 </option><option value="1210"> Barrio Cristóbal-1210 </option><option value="902"> Barrios de Jesús-902 </option><option value="9004"> Barro Blanco-9004 </option><option value="805"> Batallón Girardot-805 </option><option value="508"> Belalcázar-508 </option><option value="1603"> Belén-1603 </option><option value="1311"> Belencito-1311 </option><option value="9101"> BELLO </option><option value="714"> Bello Horizonte-714 </option><option value="401"> Berlín-401 </option><option value="404"> Bermejal-404 </option><option value="1312"> Betania-1312 </option><option value="1302"> Blanquizal-1302 </option><option value="1107"> Bolivariana-1107 </option><option value="1015"> Bomboná Nº 1-1015 </option><option value="903"> Bomboná Nº 2-903 </option><option value="6006"> Boquerón-6006 </option><option value="707"> Bosques de San Pablo-707 </option><option value="1016"> Bostón-1016 </option><option value="505"> Boyaca-505 </option><option value="414"> Brasilia-414 </option><option value="907"> Buenos Aires-907 </option><option value="7001"> Buga Patio Bonito-7001 </option><option value="7000"> Cabecera Altavista-7000 </option><option value="5000"> Cabecera Palmitas-5000 </option><option value="8000"> Cabecera San Ant de Pr.-8000 </option><option value="6000"> Cabecera San Cristóbal-6000 </option><option value="9000"> Cabecera Sta Elena-9000 </option><option value="1213"> Calasanz Parte Alta-1213 </option><option value="1202"> Calasanz-1202 </option><option value="1011"> Calle Nueva-1011 </option><option value="1208"> Campo Alegre-1208 </option><option value="1507"> Campo Amor-1507 </option><option value="410"> Campo Valdés Nº 1-410 </option><option value="303"> Campo Valdés Nº 2-303 </option><option value="517"> Caribe-517 </option><option value="1101"> Carlos E. Restrepo-1101 </option><option value="112"> Carpinelo-112 </option><option value="511"> Castilla-511 </option><option value="1404"> Castropol-1404 </option><option value="909"> Cataluña-909 </option><option value="515"> Cementerio Universal-515 </option><option value="1010"> Centro Administrativo-1010 </option><option value="702"> Cerro el Volador-702 </option><option value="1621"> Cerro Nutibara-1621 </option><option value="1701"> Ciudadela-1701 </option><option value="1008"> Corazón de Jesús-1008 </option><option value="709"> Córdoba-709 </option><option value="1509"> Cristo Rey-1509 </option><option value="1115"> Cuarta Brigada-1115 </option><option value="1607"> Diego Echavarría-1607 </option><option value="602"> Doce de Octubre Nº 1-602 </option><option value="603"> Doce de Octubre Nº 2-603 </option><option value="1317"> Eduardo Santos-1317 </option><option value="6010"> El Carmelo-6010 </option><option value="1414"> El Castillo-1414 </option><option value="9007"> El Cerro-9007 </option><option value="1004"> El Chagualo-1004 </option><option value="108"> El Compromiso-108 </option><option value="7003"> El Corazón El Morro-7003 </option><option value="1313"> El Corazón-1313 </option><option value="718"> El Cucaracho-718 </option><option value="1207"> El Danubio-1207 </option><option value="1413"> El Diamante Nº 2-1413 </option><option value="711"> El Diamante-711 </option><option value="7008"> El Jardín-7008 </option><option value="6017"> El Llano-6017 </option><option value="9008"> El Llano-9008 </option><option value="610"> El Mirador del Doce-610 </option><option value="1620"> El Nogal Los Almendros-1620 </option><option value="6002"> El Patio-6002 </option><option value="1301"> El Pesebre-1301 </option><option value="6011"> El Picacho-6011 </option><option value="810"> El Pinal-810 </option><option value="9005"> El Placer-9005 </option><option value="9009"> El Plan-9009 </option><option value="202"> El Playón de Los Comuneros-202 </option><option value="1418"> El Poblado-1418 </option><option value="306"> El Pomar-306 </option><option value="611"> El Progreso Nº 2-611 </option><option value="305"> El Raizal-305 </option><option value="1610"> El Rincón-1610 </option><option value="1501"> El Rodeo-1501 </option><option value="1316"> El Salado-1316 </option><option value="8006"> El Salado-8006 </option><option value="912"> El Salvador-912 </option><option value="1319"> El Socorro-1319 </option><option value="1409"> El Tesoro-1409 </option><option value="612"> El Triunfo-612 </option><option value="6003"> El Uvito-6003 </option><option value="1112"> El Velódromo-1112 </option><option value="6009"> El Yolombó-6009 </option><option value="808"> Enciso-808 </option><option value="9103"> ENVIGADO </option><option value="1005"> Estación Villa-1005 </option><option value="1113"> Estadio-1113 </option><option value="518"> Everfit-518 </option><option value="705"> Facultad de Minas Universidad Nacional-705 </option><option value="1601"> Fátima-1601 </option><option value="1201"> Ferrini-1201 </option><option value="503"> Florencia-503 </option><option value="1117"> Florida Nueva-1117 </option><option value="513"> Francisco Antonio Zea-513 </option><option value="719"> Fuente Clara-719 </option><option value="911"> Gerona-911 </option><option value="509"> Girardot-509 </option><option value="1604"> Granada-1604 </option><option value="104"> Granizal-104 </option><option value="1510"> Guayabal-1510 </option><option value="1007"> Guayaquil-1007 </option><option value="507"> Héctor Abad Gómez-507 </option><option value="1609"> Hondonada-1609 </option><option value="1002"> Hospital San Vicente-1002 </option><option value="9102"> ITAGUI </option><option value="416"> Jardín Botánico-416 </option><option value="1003"> Jesús Nazareno-1003 </option><option value="901"> Juan Pablo II-901 </option><option value="1307"> Juan XXIII - La Queibra-1307 </option><option value="607"> Kennedy-607 </option><option value="1422"> La Aguacatala-1422 </option><option value="109"> La Aldea Pablo VI-109 </option><option value="5007"> La Aldea-5007 </option><option value="1009"> La Alpujarra-1009 </option><option value="1204"> La América-1204 </option><option value="111"> La Avanzada-111 </option><option value="1019"> La Candelaria-1019 </option><option value="1110"> La Castellana-1110 </option><option value="1511"> La Colina-1511 </option><option value="311"> La Cruz-311 </option><option value="6004"> La Cuchilla-6004 </option><option value="110"> La Esperanza Nº 2-110 </option><option value="605"> La Esperanza-605 </option><option value="7006"> La Esperanza-7006 </option><option value="9104"> LA ESTRELLA </option><option value="1205"> La Floresta-1205 </option><option value="1417"> La Florida-1417 </option><option value="8001"> La Florida-8001 </option><option value="205"> La Francia-205 </option><option value="5006"> La Frisola-5006 </option><option value="204"> La Frontera-204 </option><option value="1320"> La Gabriela-1320 </option><option value="1612"> La Gloria-1612 </option><option value="6008"> La Ilusión-6008 </option><option value="201"> La Isla-201 </option><option value="804"> La Ladera-804 </option><option value="812"> La Libertad-812 </option><option value="1611"> La Loma de los Bernal-1611 </option><option value="6014"> La Loma-6014 </option><option value="802"> La Mansión-802 </option><option value="910"> La Milagrosa-910 </option><option value="1608"> La Mota-1608 </option><option value="1614"> La Palma-1614 </option><option value="6001"> La Palma-6001 </option><option value="706"> La Pilarica-706 </option><option value="412"> La Piñuela-412 </option><option value="1306"> La Pradera-1306 </option><option value="211"> La Rosa-211 </option><option value="301"> La Salle-301 </option><option value="817"> La Sierra-817 </option><option value="5002"> La Sucia-5002 </option><option value="5001"> La Suiza-5001 </option><option value="8007"> La Verde-8007 </option><option value="1405"> Lalinde-1405 </option><option value="1109"> Las Acacias-1109 </option><option value="502"> Las Brisas-502 </option><option value="411"> Las Esmeraldas-411 </option><option value="815"> Las Estancias-815 </option><option value="302"> Las Granjas-302 </option><option value="1314"> Las Independencias-1314 </option><option value="1406"> Las Lomas Nº 1-1406 </option><option value="1407"> Las Lomas Nº 2-1407 </option><option value="1617"> Las Mercedes-1617 </option><option value="1014"> Las Palmas-1014 </option><option value="9001"> Las Palmas-9001 </option><option value="1606"> Las Playas-1606 </option><option value="6015"> Las Playas-6015 </option><option value="1616"> Las Violetas-1616 </option><option value="1108"> Laureles-1108 </option><option value="704"> Liceo Universidad de Antioquia-704 </option><option value="806"> Llanaditas-806 </option><option value="710"> López de Mesa-710 </option><option value="1111"> Lorena-1111 </option><option value="913"> Loreto-913 </option><option value="1304"> Los Alcázares-1304 </option><option value="1615"> Los Alpes-1615 </option><option value="1017"> Los Angeles-1017 </option><option value="1411"> Los Balsos Nº 1-1411 </option><option value="1415"> Los Balsos Nº 2-1415 </option><option value="904"> Los Cerros - El Vergel-904 </option><option value="1114"> Los Colores-1114 </option><option value="1105"> Los Conquistadores-1105 </option><option value="807"> Los Mangos-807 </option><option value="1410"> Los Naranjos-1410 </option><option value="1203"> Los Pinos-1203 </option><option value="1419"> Manila-1419 </option><option value="307"> Manrique Central-307 </option><option value="409"> Manrique Central-409 </option><option value="308"> Manrique Oriental-308 </option><option value="313"> María Cano-Carambolas-313 </option><option value="9011"> Mazo-9011 </option><option value="9002"> Media Luna-9002 </option><option value="1305"> Metropolitano-1305 </option><option value="908"> Miraflores-908 </option><option value="415"> Miranda-415 </option><option value="1619"> Miravalle-1619 </option><option value="8003"> Montañita-8003 </option><option value="724"> Monteclaro-724 </option><option value="405"> Moravia-405 </option><option value="209"> Moscú Nº 1-209 </option><option value="105"> Moscú Nº 2-105 </option><option value="1103"> Naranjal-1103 </option><option value="6005"> Naranjal-6005 </option><option value="721"> Nazareth-721 </option><option value="1508"> Noel-1508 </option><option value="1618"> Nueva Villa de Aburrá-1618 </option><option value="725"> Nueva Villa de la Iguana-725 </option><option value="1315"> Nuevos Conquistadores-1315 </option><option value="917"> Ocho de Marzo-917 </option><option value="722"> Olaya Herrera-722 </option><option value="512"> Oleoducto-512 </option><option value="312"> Oriente-312 </option><option value="9105"> OTRO MUNICIPIO FUERA DEL VALLE DEL ABURRA </option><option value="203"> Pablo VI-203 </option><option value="6012"> Pajarito-6012 </option><option value="723"> Pajarito-723 </option><option value="716"> Palenque-716 </option><option value="403"> Palermo-403 </option><option value="1506"> Parque Juan Pablo II-1506 </option><option value="417"> Parque Norte-417 </option><option value="1421"> Patio Bonito-1421 </option><option value="6013"> Pedregal Alto-6013 </option><option value="604"> Pedregal-604 </option><option value="1012"> Perpetuo Socorro-1012 </option><option value="609"> Picachito-609 </option><option value="608"> Picacho-608 </option><option value="9010"> Piedra Gorda-9010 </option><option value="9003"> Piedras Blancas-9003 </option><option value="506"> Plaza de Ferias-506 </option><option value="103"> Popular-103 </option><option value="5008"> Potrera Miserenga-5008 </option><option value="8002"> Potrerito-8002 </option><option value="1001"> Prado-1001 </option><option value="519"> Progreso-519 </option><option value="717"> Robledo-717 </option><option value="1602"> Rosales-1602 </option><option value="9106"> SABANETA </option><option value="814"> San Antonio-814 </option><option value="1006"> San Benito-1006 </option><option value="1605"> San Bernardo-1605 </option><option value="6018"> San Cristóbal-6018 </option><option value="1020"> San Diego-1020 </option><option value="703"> San Germán-703 </option><option value="402"> San Isidro-402 </option><option value="1309"> San Javier Nº 1-1309 </option><option value="1308"> San Javier Nº 2-1308 </option><option value="1104"> San Joaquín-1104 </option><option value="6007"> San José de La Montaña-6007 </option><option value="7007"> San José del Manzanillo-7007 </option><option value="314"> San José la Cima Nº 1-314 </option><option value="315"> San José la Cima Nº 2-315 </option><option value="8008"> San José-8008 </option><option value="1412"> San Lucas-1412 </option><option value="606"> San Martín de Porres-606 </option><option value="803"> San Miguel-803 </option><option value="107"> San Pablo-107 </option><option value="7004"> San Pablo-7004 </option><option value="408"> San Pedro-408 </option><option value="210"> Santa Cruz-210 </option><option value="1504"> Santa Fé-1504 </option><option value="304"> Santa Inés-304 </option><option value="818"> Santa Lucía Las Estancias-818 </option><option value="1206"> Santa Lucía-1206 </option><option value="720"> Santa Margarita-720 </option><option value="1423"> Santa María de los Angeles-1423 </option><option value="1209"> Santa Mónica-1209 </option><option value="1303"> Santa Rosa de Lima-1303 </option><option value="1212"> Santa Teresita-1212 </option><option value="601"> Santander-601 </option><option value="101"> Santo Domingo Savio Nº 1-101 </option><option value="102"> Santo Domingo Savio Nº 2-102 </option><option value="5004"> Sector Central-5004 </option><option value="9006"> Sector Central-9006 </option><option value="407"> Sevilla-407 </option><option value="1505"> Shellmar-1505 </option><option value="1402"> SIMESA-1402 </option><option value="1211"> Simón Bolivar-1211 </option><option value="809"> Sucre-809 </option><option value="1102"> Suramericana-1102 </option><option value="504"> Tejelo-504 </option><option value="1502"> Tenche-1502 </option><option value="516"> Terminal de Transporte-516 </option><option value="501"> Toscana-501 </option><option value="6016"> Travesías-6016 </option><option value="811"> Trece de Noviembre-811 </option><option value="510"> Tricentenario-510 </option><option value="1503"> Trinidad-1503 </option><option value="1116"> U.D. Atanasio Girardot-1116 </option><option value="406"> Universidad de Antioquia-406 </option><option value="701"> Universidad Nacional-701 </option><option value="1106"> Universidad Pontificia-1106 </option><option value="5003"> Urquita-5003 </option><option value="1310"> Veinte de Julio-1310 </option><option value="309"> Versalles Nº 1-309 </option><option value="310"> Versalles Nº 2-310 </option><option value="1403"> Villa Carlota-1403 </option><option value="106"> Villa de Guadalupe-106 </option><option value="207"> Villa del Socorro-207 </option><option value="715"> Villa Flora-715 </option><option value="801"> Villa Hermosa-801 </option><option value="819"> Villa Lilliam-819 </option><option value="208"> Villa Niza-208 </option><option value="1018"> Villa Nueva-1018 </option><option value="816"> Villa Turbay-816 </option><option value="813"> Villatina-813 </option><option value="5005"> Volcana Guayabal-5005 </option><option value="8004"> Yarumalito-8004 </option>         
                    </select>
              </div>
          </div>
  </IonList>

  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
              <label  className="form-label" >Telefono1:</label>
              <input type="number" onChange={(e) => handleInputChange(e, 'telefono1')} value={items.telefono1} placeholder="" className="form-control form-control-sm  "  required/>
            <small  className="form-label">Minimo 10 digitos, si es fijo debe incluir el 604.</small>
            </div>

            <div className="col-sm">
              <label  className="form-label" >Telefono2:</label>
              <input  type="number" onChange={(e) => handleInputChange(e, 'telefono2')} value={items.telefono2} placeholder="" className="form-control form-control-sm  "  />
              <small  className="form-label">Minimo 10 digitos, si es fijo debe incluir el 604.</small>
            </div>
          </div>
  </IonList>

  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
              <label  className="form-label" >Latitud:</label>
              <input onChange={(e) => handleInputChange(e, 'latitud')} value={items.latitud} type="text" placeholder="" className="form-control form-control-sm  "  />
            </div>

            <div className="col-sm">
              <label  className="form-label" >Longitud:</label>
              <input  type="text" onChange={(e) => handleInputChange(e, 'longitud')} value={items.longitud} placeholder="" className="form-control form-control-sm  "  />
            </div>
          </div>
  </IonList>

  <IonList>
  <div className="row g-3 was-validated ">
            <div className="col-sm">
              <label  className="form-label" >Correo electronico:</label>
              <input type="text" onChange={(e) => handleInputChange(e, 'correo')} value={items.correo} placeholder="" className="form-control form-control-sm  "  />
            </div>

            <div className="col-sm">
                    <label  className="form-label" >Estrato:</label>
                    <select onChange={(e) => handleInputChange(e, 'estrato')} value={items.estrato} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                    <option value=""> SELECCIONE </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    </select>
              </div>
          </div>
  </IonList>


  </div>

        <br />

    <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton routerLink={`/tabs/tab4/${params.ficha}`}>Siguiente</IonButton></div>
       
    
    </IonContent>
  </IonPage>
  );
};

export default Tab3;

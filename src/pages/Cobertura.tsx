import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, useIonViewDidEnter, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import loadSQL from '../models/database';


interface Person {
  fichasocial: number;
  fichatecnia: string;
  motivovisita: number;
  tipovisita: string;
  horaactivacion: string;
  horaatencion: string;
  fechavisita: string;
  fecharegistro: string;
  usuario: number;
  estado: string;
  tabla: string;
  tipo: number;
  declaradafallida: string | null;
  ficharecuperda: string | null;
  horallegadaalevento: string;
  remitir: string | null;
  remitir2: string | null;
}

// Luego, define tu estado usando esta interfaz


const Cobertura: React.FC = () => {



  const [db, setDb] = useState<any>(null);
  const [people, setPeople] = useState<Person[]>([]);



  // hook for sqlite db


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
    if (database) {
      const res = await database.exec('SELECT * FROM "c0_informaciondelevento";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
       
      }
    }

  };


  const sincronizacion = async () => {
    fetchUsers();
    saveDatabase();
    console.log(people)
    // const addUser = () => {
    //   if (db) {
    //     db.run('INSERT OR REPLACE INTO users (id, name, surname, age) VALUES (?, ?, ?, ?);', [id, name, surname, age]);
    //     fetchUsers();
    //     saveDatabase();
    //     clearInputFields();
    //   }
    // };

    // try {
    //   const response = await axios.get('/public/jsonstablas/datos.json');
    //   const jsonData = response.data;
    //   const jsonString = JSON.stringify(jsonData);
    //   setPeople(jsonData);
    //       for (const item of jsonData) {
    //         const fichaSocial = item.fichasocial;
    //         const fichatecnia = item.fichatecnia;
    //         await db.run(`INSERT OR REPLACE INTO c0_informaciondelevento (fichasocial,fichatecnia, motivovisita,tipovisita,horaactivacion
    //                       ,horaatencion,fechavisita,fecharegistro,usuario,estado,tabla,tipo,declaradafallida,ficharecuperda,horallegadaalevento,
    //                       remitir,remitir2
    //                       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, [fichaSocial, fichatecnia, item.motivovisita, item.tipovisita, item.horaactivacion
    //           , item.horaatencion, item.fechavisita, item.fecharegistro, item.usuario, item.estado, item.tabla, item.tipo, item.declaradafallida, item.ficharecuperda, item.horallegadaalevento,
    //           item.remitir, item.remitir2]);
    //           fetchUsers();
    //           saveDatabase();
    //       // update ui
    //       const respSelect =  await db.run(`SELECT * FROM "c0_informaciondelevento"  ;`);
    //      // setItems(respSelect[0]?.columns);
    //     }
   
    // } catch (err) {
    //   console.error('Error al exportar los datos JSON: c0_informaciondelevento', err);
    // }

    try {
      const response = await axios.get('/jsonstablas/t1_programas.json');
      const jsonData = response.data;
     // setProgramas(jsonData);

      for (const item of jsonData) {
        await db.run(`INSERT OR REPLACE INTO t1_programas (id, descripcion, estado, tipo, usuario, tabla, fecharegistro) VALUES (?, ?, ?, ?, ?, ?, ?);`, [
          item.id, item.descripcion, item.estado, item.tipo, item.usuario, item.tabla, item.fecharegistro
        ]);
      }

      saveDatabase();
      fetchUsers();
    } catch (err) {
      console.error('Error al exportar los datos JSON: t1_programas', err);
    }

    try {
      const response = await axios.get('/jsonstablas/t1_parentesco.json');
      const jsonData = response.data;
     // setProgramas(jsonData);

      for (const item of jsonData) {
        await db.run(`INSERT OR REPLACE INTO t1_parentesco  (id, descripcion, estado) VALUES (?, ?, ?);`, [
          item.id, item.descripcion, item.estado
        ]);
      }

      saveDatabase();
      fetchUsers();
    } catch (err) {
      console.error('Error al exportar los datos JSON: t1_parentesco ', err);
    }

    try {
      const response = await axios.get('/jsonstablas/t1_comunas.json');
      const jsonData = response.data;
     // setProgramas(jsonData);

      for (const item of jsonData) {
        await db.run(`INSERT OR REPLACE INTO t1_comunas  (id, descripcion, estado) VALUES (?, ?, ?);`, [
          item.id, item.descripcion, item.estado
        ]);
      }

      saveDatabase();
      fetchUsers();
    } catch (err) {
      console.error('Error al exportar los datos JSON: t1_comunas ', err);
    }
    
    
    try {
      const response = await axios.get('/jsonstablas/t1_barrios.json');
      const jsonData = response.data;
     // setProgramas(jsonData);

      for (const item of jsonData) {
        await db.run(`INSERT OR REPLACE INTO t1_barrios   (id, descripcion, comuna, estado) VALUES (?, ?, ?, ?);`, [
          item.id, item.descripcion, item.comuna, item.estado, 
        ]);
      }

      saveDatabase();
      fetchUsers();
    } catch (err) {
      console.error('Error al exportar los datos JSON: t1_barrios  ', err);
    }


    try {
      const response = await axios.get('/jsonstablas/t1_ubicacionposterior.json');
      const jsonData = response.data;
     // setProgramas(jsonData);

      for (const item of jsonData) {
        await db.run(`INSERT OR REPLACE INTO t1_ubicacionposterior (id, descripcion, estado) VALUES (?, ?, ?);`, [
          item.id, item.descripcion, item.estado, 
        ]);
      }

      saveDatabase();
      fetchUsers();
      window.alert('sincronizacion exitosa')
    } catch (err) {
      console.error('Error al exportar los datos JSON: t1_ubicacionposterior  ', err);
    }





  }

  


  const history = useHistory();
  const cedula = localStorage.getItem('cedula'); // Obtener 'cedula' de localStorage

  useEffect(() => {
    // Comprobar si 'cedula' existe, si no, redirigir a 'login'
    if (!cedula) {
      history.push('/login');
    }
  }, [cedula, history]); // Dependencias del efecto



  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const toggleAccordion = () => {
    if (!accordionGroup.current) {
      return;
    }
    const nativeEl = accordionGroup.current;

    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  const handleEditClick = (fichasocial: string) => {
    window.location.href = `/tabs/tab1/${fichasocial}`;
  };

  const [searchText, setSearchText] = useState('');


 const filteredPeople = people.filter((person) => {
   return (
     (person.estado || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.fichasocial || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.fichatecnia || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.name || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.motivovisita || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.fechavisita || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.tipo || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
     (person.usuario || '').toString().toLowerCase().includes(searchText.toLowerCase())
   );
 });


  return (
    <IonPage>
     {cedula ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle slot="start">Cobertura</IonTitle>
              <IonButton color="danger" slot="end" onClick={() => {
                //localStorage.removeItem('cedula');
                window.location.href = `/tabs/tab1/${Math.random().toString().substr(2, 7)}${cedula}`;
              }}>Crear Ficha</IonButton>
              <IonButton slot="end" onClick={() => {
                localStorage.removeItem('cedula');
                history.push('/login'); // Redirigir a login después de borrar 'cedula'
              }}>Cerrar Sesión</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonList>
              <IonItem lines="none">
                <div className="ion-align-items-center" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <IonLabel style={{ width: '20%' }}>Opciones</IonLabel>
                  <IonLabel style={{ width: '25%' }}>Estado ficha</IonLabel>
                  <IonLabel style={{ width: '25%' }}>Ficha social</IonLabel>
                  <IonLabel style={{ width: '25%' }}>Ficha tecnica</IonLabel>
                </div>
              </IonItem>
            </IonList>

            <IonList>
            {filteredPeople.map((person, idx) => 
                  <IonAccordionGroup key={idx}>
                    <IonAccordion value="first">
                      <IonItem slot="header" color="light">
                        <IonLabel>
                          <IonButton onClick={()=>handleEditClick(person.fichasocial)}>
                            Editar
                          </IonButton>
                        </IonLabel>
                        <IonLabel>
                          <h2>{person.estado}</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>{person.fichasocial}</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>{person.fichatecnia}</h2>
                        </IonLabel>


                      </IonItem>

                      <div className="ion-padding" slot="content">
                        <IonList>

                          <IonItem>
                            <IonLabel>
                              <p>Recupera Fallida</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Inquilinato</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Remisión aprobada</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Motivo visita</p>
                              <h2>{person.motivovisita}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Fecha visita</p>
                              <h2>{person.fechavisita}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Tipo de evento</p>
                              <h2>{person.tipo}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Comuna</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Barrio</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Sector</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Dirección</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Profesional</p>
                              <h2>{person.usuario}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Digitador</p>
                              <h2>{person.name}</h2>
                            </IonLabel>
                          </IonItem>
                        </IonList>
                      </div>
                    </IonAccordion>

                  </IonAccordionGroup>


              )}
            </IonList>
          </IonContent>
          <IonSearchbar
        value={searchText}
        onIonInput={(e) => setSearchText(e.detail.value)}
        placeholder="Buscar por estado, ficha, nombre, etc."
      />
      <IonButton onClick={sincronizacion}>Sincronización subida de información</IonButton>

        </>
      ) : ''}
 


    </IonPage>
  );
};

export default Cobertura;

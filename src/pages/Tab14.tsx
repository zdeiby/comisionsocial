import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonButton
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomDataTable from '../components/DataTable';
import loadSQL from '../models/database';

interface Integrante {
  idintegrante: number;
  fichasocial: number | null;
  ubicacionposterior: number | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}

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

const Tab14: React.FC = () => {
  const params = useParams<any>();
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [comunas, setComunas] = useState<any[]>([]);
  const [barrios, setBarrios] = useState<any[]>([]);
  const [db, setDb] = useState<any>(null);
  const [selectedIntegrantes, setSelectedIntegrantes] = useState<{ idintegrante: number, ubicacionposterior: number }[]>([]);
  const [selectedUbicacionPosterior, setSelectedUbicacionPosterior] = useState<number | null>(null);
  const [numUbicaciones, setNumUbicaciones] = useState(0);

  

  const [items, setItems] = useState({
    fichasocial: params.ficha,
    ubicacionposterior: 1,
    cualtemporal: '',
    dondeauxilio: '',
    nombreauto: '',
    parentesco: '',
    prestada: '',
    cuallugardistinto: '',
    direccion: '',
    comuna: '',
    barrio: '',
    ruralurbano: '',
    sector: '',
    telefono1: '',
    telefono2: '',
    dirCampo1: '',
    dirCampo2: '',
    dirCampo3: '',
    dirCampo4: '',
    dirCampo5: '',
    dirCampo6: '',
    dirCampo7: '',
    dirCampo8: '',
    dirCampo9: '',
    ubicacion: '',
    pais: '',
    departamento: '',
    municipio: '',
    fecharegistro: getCurrentDateTime(),
    usuario: localStorage.getItem('cedula') || '',
    estado: 1,
    tabla: 'c15_ubicacionposterioratencionsocial',
  });

  const [showModal, setShowModal] = useState(false);
  const [newIntegrantes, setNewIntegrantes] = useState([]);
  const [allIntegrantes, setAllIntegrantes] = useState([]);


  const handleShowModal = (ubicacionposterior: number) => {
    setSelectedUbicacionPosterior(ubicacionposterior);
    fetchSelectedIntegrantes(ubicacionposterior);
    setShowModal(true);
  };
  

  useEffect(() => {
    async function initDbAndFetchData() {
      await loadSQL(setDb,fetchIntegrantes);
      fetchSelectedIntegrantes(1); 
    }
  
    initDbAndFetchData();
  }, []);
  
  useEffect(() => {
    if (db) {
      fetchIntegrantes();
      fetchBarrios();
      fetchComunas();
      fetchAllIntegrantes(); // Fetch all integrantes
      fetchSelectedIntegrantes(1);
    }
  }, [db, params.ficha]);

  const fetchSelectedIntegrantes = async (ubicacionposterior = selectedUbicacionPosterior) => {
    if (db && ubicacionposterior !== null) {
      const res = await db.exec(`SELECT idintegrante, ubicacionposterior FROM c151_integrantesubicaciopos WHERE fichasocial=${params.ficha} AND ubicacionposterior=${ubicacionposterior}`);
      if (res[0]?.values) {
        const selected = res[0].values.map((row: any[]) => ({
          idintegrante: row[0],
          ubicacionposterior: row[1]
        }));
        setSelectedIntegrantes(selected);
      }
    }
  };
  

  const saveDatabase = () => {
    if (db) {
      const data = db.export();
      localStorage.setItem('sqliteDb', JSON.stringify(Array.from(data)));
      const request = indexedDB.open('myDatabase', 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('sqliteStore')) {
          db.createObjectStore('sqliteStore');
        }
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(['sqliteStore'], 'readwrite');
        const store = transaction.objectStore('sqliteStore');
        const putRequest = store.put(data, 'sqliteDb');

        putRequest.onsuccess = () => {
          console.log('Data saved to IndexedDB');
        };

        putRequest.onerror = (event: any) => {
          console.error('Error saving data to IndexedDB:', event.target.error);
        };
      };

      request.onerror = (event: any) => {
        console.error('Failed to open IndexedDB:', event.target.error);
      };
    }
  };

  const fetchIntegrantes = async () => {
    if (db) {
      const res = await db.exec(`
        SELECT 
            upas.fichasocial, 
            upas.ubicacionposterior, 
            tu.descripcion AS ubicacion_descripcion, 
            upas.nombreauto, 
            upas.telefono1, 
            upas.telefono2, 
            COUNT(iup.idintegrante) AS numero_integrantes
        FROM 
            c15_ubicacionposterioratencionsocial upas
        LEFT JOIN 
            c151_integrantesubicaciopos iup ON upas.fichasocial = iup.fichasocial AND upas.ubicacionposterior = iup.ubicacionposterior
        LEFT JOIN 
            t1_ubicacionposterior tu ON upas.ubicacionposterior = tu.id
        WHERE 
            upas.fichasocial = ${params.ficha}
        GROUP BY 
            upas.fichasocial, upas.ubicacionposterior, upas.nombreauto, upas.telefono1, upas.telefono2, tu.descripcion;
      `);
      
      if (res[0]?.values && res[0]?.columns) {
        const transformedIntegrantes = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {});
        });
        setIntegrantes(transformedIntegrantes);
        setNumUbicaciones(transformedIntegrantes.length);
      }
    }
  };
  

  const fetchBarrios = async () => {
    if (db) {
      const res = await db.exec(`SELECT * FROM t1_barrios`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedBarrios = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {});
        });
        setBarrios(transformedBarrios);
      }
    }
  };

  const fetchComunas = async () => {
    if (db) {
      const res = await db.exec(`SELECT * FROM t1_comunas`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedComunas = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {});
        });
        setComunas(transformedComunas);
      }
    }
  };

  const fetchAllIntegrantes = async () => {
    if (db) {
      const res = await db.exec(`SELECT * FROM c131_integrante`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedAllIntegrantes = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {});
        });
        setAllIntegrantes(transformedAllIntegrantes);
      }
    }
  };

  const handleInputChange = (event: any, field: string) => {
    const { value } = event.target;
    setItems((prevItems) => ({
      ...prevItems,
      [field]: value,
    }));
  };

  useEffect(() => {
    const newDireccion = `${items.dirCampo1} ${items.dirCampo2} ${items.dirCampo3} ${items.dirCampo4} ${items.dirCampo5} ${items.dirCampo6} ${items.dirCampo7} ${items.dirCampo8} || ${items.dirCampo9}`;
    setItems((prevItems) => ({ ...prevItems, direccion: newDireccion }));
  }, [items.dirCampo1, items.dirCampo2, items.dirCampo3, items.dirCampo4, items.dirCampo5, items.dirCampo6, items.dirCampo7, items.dirCampo8, items.dirCampo9]);

  const enviar = async () => {
    try {
      await db.exec(`INSERT OR REPLACE INTO c15_ubicacionposterioratencionsocial (
        fichasocial, ubicacionposterior, cualtemporal, dondeauxilio, nombreauto, 
        parentesco, prestada, cuallugardistinto, direccion, comuna, barrio, ruralurbano, 
        sector, telefono1, telefono2, dirCampo1, dirCampo2, dirCampo3, dirCampo4, dirCampo5, 
        dirCampo6, dirCampo7, dirCampo8, dirCampo9, ubicacion, pais, departamento, municipio, 
        fecharegistro, usuario, estado, tabla
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          items.fichasocial, items.ubicacionposterior, items.cualtemporal, items.dondeauxilio, items.nombreauto, 
          items.parentesco, items.prestada, items.cuallugardistinto, items.direccion, items.comuna, 
          items.barrio, items.ruralurbano, items.sector,
          items.telefono1, items.telefono2, 
          items.dirCampo1, items.dirCampo2, items.dirCampo3, items.dirCampo4, items.dirCampo5, 
          items.dirCampo6, items.dirCampo7, items.dirCampo8, items.dirCampo9, items.ubicacion, 
          items.pais, items.departamento, items.municipio, items.fecharegistro, items.usuario, 
          items.estado, items.tabla
        ]);

      // Inserta los nuevos integrantes
      for (const integrante of newIntegrantes) {
        const existingIntegrantes = await db.exec(`SELECT * FROM c151_integrantesubicaciopos WHERE fichasocial = ? AND idintegrante = ?`, [params.ficha, integrante]);
        if (existingIntegrantes[0]?.values.length === 0) {
          await db.exec(`INSERT INTO c151_integrantesubicaciopos (fichasocial, idintegrante) VALUES (?, ?)`, [params.ficha, integrante]);
        }
      }

      saveDatabase();
      alert('Datos Guardados con éxito');
      fetchIntegrantes(); // Asegúrate de que esta línea esté aquí para actualizar la lista de integrantes después de guardar
    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
  };

  const guardarIntegrantes = async () => {
    console.log(selectedIntegrantes, 'aca select')
    try {
      for (const { idintegrante, ubicacionposterior } of selectedIntegrantes) {
        await db.exec(
          `INSERT OR REPLACE INTO c151_integrantesubicaciopos (idintegrante, fichasocial, ubicacionposterior, fecharegistro, usuario, estado, tabla) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [idintegrante, params.ficha, ubicacionposterior, getCurrentDateTime(), localStorage.getItem('cedula'), 1, '151_integrantesubicaciopos']
        );
      }
      saveDatabase();
      alert('Datos Guardados con éxito');
      fetchIntegrantes();
    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
  };
 
  const eliminarIntegrante = async (fichasocial: number, ubicacionposterior: number) => {
    console.log(fichasocial, ubicacionposterior, 'eliminar');
    try {
      // Eliminar de c15_ubicacionposterioratencionsocial por fichasocial y ubicacionposterior
      await db.exec(`DELETE FROM c15_ubicacionposterioratencionsocial WHERE fichasocial = ? AND ubicacionposterior = ?`, [fichasocial, ubicacionposterior]);
  
      // Eliminar de c151_integrantesubicaciopos por fichasocial y ubicacionposterior
      await db.exec(`DELETE FROM c151_integrantesubicaciopos WHERE fichasocial = ? AND ubicacionposterior = ?`, [fichasocial, ubicacionposterior]);
  
      // Actualizar la lista de integrantes en el estado
      setIntegrantes((prevIntegrantes) => prevIntegrantes.filter(integrante => integrante.fichasocial !== fichasocial || integrante.ubicacionposterior !== ubicacionposterior));
      saveDatabase();
      alert('Integrante eliminado con éxito');
      fetchIntegrantes(); // Volver a cargar los integrantes desde la base de datos
    } catch (err) {
      console.error('Error al eliminar el integrante:', err);
    }
  };
  
  

  const columns = [
    {
      name: 'Eliminar',
      selector: (row: Integrante) => <><button className='btn btn-info btn-sm text-light' onClick={() => eliminarIntegrante(row.fichasocial=params.ficha, row.ubicacionposterior)}>Eliminar</button>&nbsp;
                  <button className='btn btn-info btn-sm text-light' onClick={() => handleShowModal(row.ubicacionposterior)}>Agregar Integrantes</button>
                  </>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: 'Ubicación Posterior',
      selector: (row: any) => row.ubicacion_descripcion,
      sortable: true,
    },
    {
      name: 'Número de Integrantes',
      selector: (row: any) => row.numero_integrantes,
      sortable: true,
    }
  ];

  const handleCheckboxChange = (idintegrante: number) => {
    setSelectedIntegrantes((prevSelected) => {
      if (prevSelected.some((i) => i.idintegrante === idintegrante && i.ubicacionposterior === selectedUbicacionPosterior)) {
        // Si el integrante ya está seleccionado, elimínalo
        return prevSelected.filter((i) => i.idintegrante !== idintegrante || i.ubicacionposterior !== selectedUbicacionPosterior);
      } else {
        // Si no está seleccionado, agrégalo
        return [...prevSelected, { idintegrante, ubicacionposterior: selectedUbicacionPosterior }];
      }
    });
  };
  
  
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">15 - UBICACION DE LA FAMILIA POSTERIOR A LA ATENCION SOCIAL</IonTitle>
          <IonTitle slot="end">FICHA SOCIAL: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="social-card">
          <span className="label">Ficha social:</span>
          <span className="value">{params.ficha}</span>
        </div>
  
        <div className='shadow p-3 mb-5 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">15 - UBICACION DE LA FAMILIA POSTERIOR A LA ATENCION SOCIAL</span>
            </div>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Cual es la ubicacion de la familia posterior a la atencion social:</label>
                <select onChange={(e) => handleInputChange(e, 'ubicacionposterior')} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="7"> LA FAMILIA CONTINÚA EN LA VIVIENDA AFECTADA </option>
                  <option value="1"> LA FAMILIA SE TRASLADA A ALBERGUE TEMPORAL </option>
                  <option value="3"> LA FAMILIA SE TRASLADA A AUTO ALBERGE </option>
                  <option value="2"> LA FAMILIA SE TRASLADA A AUXILIO HABITACIONAL </option>
                  <option value="4"> LA FAMILIA SE TRASLADA A PAGAR ARRENDAMIENTO POR CUENTA PROPIA </option>
                  <option value="5"> LA FAMILIA SE TRASLADA A VIVIENDA PRESTADA </option>
                  <option value="6"> LA FAMILIA SE UBICA EN OTRO LUGAR DISTINTO A LOS RELACIONADOS ANTERIORMENTE </option>
                </select>
              </div>
              <div className="col-sm">
                <blockquote className="blockquote text-center">
                  <p className="mb-0"><label>Número de Ubicaciones:</label></p>
                  <h5 id="numerointegrantes">{numUbicaciones}</h5>
                </blockquote>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Cual:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'cualtemporal')} value={items.cualtemporal || ''} placeholder="" className="form-control form-control-sm" required />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Donde:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'dondeauxilio')} value={items.dondeauxilio || ''} placeholder="" className="form-control form-control-sm" required />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Nombre:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'nombreauto')} value={items.nombreauto || ''} placeholder="" className="form-control form-control-sm" required />
              </div>
              <div className="col-sm">
                <label className="form-label">Parentesco:</label>
                <select onChange={(e) => handleInputChange(e, 'parentesco')} value={items.parentesco || ''} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="6"> ABUELO(A) </option>
                  <option value="10"> BISABUELO(A) </option>
                  <option value="11"> BISNIETO(A) </option>
                  <option value="3"> CÓNYUGE O COMPAÑERO(A) PERMANENTE </option>
                  <option value="18"> CUÑADO(A) </option>
                  <option value="5"> HERMANO(A) </option>
                  <option value="15"> HIJASTRO(A) </option>
                  <option value="4"> HIJO(A) </option>
                  <option value="20"> HIJOS(A) ADOPTIVOS </option>
                  <option value="1"> JEFE DEL HOGAR </option>
                  <option value="17"> MADRASTRA </option>
                  <option value="7"> NIETO(A) </option>
                  <option value="14"> NUERA </option>
                  <option value="22"> OTROS NO PARIENTES </option>
                  <option value="21"> OTROS PARIENTES </option>
                  <option value="16"> PADRASTRO </option>
                  <option value="2"> PADRES </option>
                  <option value="19"> PADRES ADOPTANTES </option>
                  <option value="9"> SOBRINO(A) </option>
                  <option value="12"> SUEGRO(A) </option>
                  <option value="8"> TÍO(A) </option>
                  <option value="13"> YERNO </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Cual:</label>
                <input type="text" id="cuallugardistinto" onChange={(e) => handleInputChange(e, 'cuallugardistinto')} value={items.cuallugardistinto || ''} placeholder="" className="form-control form-control-sm" required />
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Donde se ubica:</label>
                <select onChange={(e) => handleInputChange(e, 'ubicacion')} value={items.ubicacion ||                   ''} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="1"> EN MEDELLIN </option>
                  <option value="3"> OTRO DEPARTAMENTO </option>
                  <option value="2"> OTRO MUNICIPIO DE ANTIOQUIA </option>
                  <option value="4"> OTRO PAIS </option>
                </select>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Cual departamento:</label>
                <select onChange={(e) => handleInputChange(e, 'departamento')} value={items.departamento || ''} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="28"> AMAZONAS </option>
                  <option value="24"> ARAUCA </option>
                  <option value="27"> ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA </option>
                  <option value="1"> ATLÁNTICO </option>
                  <option value="2"> BOGOTÁ, D.C. </option>
                  <option value="3"> BOLÍVAR </option>
                  <option value="4"> BOYACÁ </option>
                  <option value="5"> CALDAS </option>
                  <option value="6"> CAQUETÁ </option>
                  <option value="25"> CASANARE </option>
                  <option value="7"> CAUCA </option>
                  <option value="8"> CESAR </option>
                  <option value="11"> CHOCÓ </option>
                  <option value="9"> CÓRDOBA </option>
                  <option value="10"> CUNDINAMARCA </option>
                  <option value="29"> GUAINÍA </option>
                  <option value="30"> GUAVIARE </option>
                  <option value="12"> HUILA </option>
                  <option value="13"> LA GUAJIRA </option>
                  <option value="14"> MAGDALENA </option>
                  <option value="15"> META </option>
                  <option value="16"> NARIÑO </option>
                  <option value="17"> NORTE DE SANTANDER </option>
                  <option value="26"> PUTUMAYO </option>
                  <option value="18"> QUINDIO </option>
                  <option value="19"> RISARALDA </option>
                  <option value="20"> SANTANDER </option>
                  <option value="21"> SUCRE </option>
                  <option value="22"> TOLIMA </option>
                  <option value="23"> VALLE DEL CAUCA </option>
                  <option value="31"> VAUPÉS </option>
                  <option value="32"> VICHADA </option>
                </select>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Cual municipio:</label>
                <select onChange={(e) => handleInputChange(e, 'municipio')} value={items.municipio || ''} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="1"> ABEJORRAL </option>
                  <option value="2"> ABRIAQUÍ </option>
                  <option value="3"> ALEJANDRÍA </option>
                  <option value="4"> AMAGÁ </option>
                  <option value="5"> AMALFI </option>
                  <option value="6"> ANDES </option>
                  <option value="7"> ANGELÓPOLIS </option>
                  <option value="8"> ANGOSTURA </option>
                  <option value="9"> ANORÍ </option>
                  <option value="11"> ANZÁ </option>
                  <option value="12"> APARTADÓ </option>
                  <option value="13"> ARBOLETES </option>
                  <option value="14"> ARGELIA </option>
                  <option value="15"> ARMENIA </option>
                  <option value="16"> BARBOSA </option>
                  <option value="18"> BELLO </option>
                  <option value="17"> BELMIRA </option>
                  <option value="19"> BETANIA </option>
                  <option value="20"> BETULIA </option>
                  <option value="22"> BRICEÑO </option>
                  <option value="23"> BURITICÁ </option>
                  <option value="24"> CÁCERES </option>
                  <option value="25"> CAICEDO </option>
                  <option value="26"> CALDAS </option>
                  <option value="27"> CAMPAMENTO </option>
                  <option value="28"> CAÑASGORDAS </option>
                  <option value="29"> CARACOLÍ </option>
                  <option value="30"> CARAMANTA </option>
                  <option value="31"> CAREPA </option>
                  <option value="33"> CAROLINA </option>
                  <option value="34"> CAUCASIA </option>
                  <option value="35"> CHIGORODÓ </option>
                  <option value="36"> CISNEROS </option>
                  <option value="21"> CIUDAD BOLÍVAR </option>
                  <option value="37"> COCORNÁ </option>
                  <option value="38"> CONCEPCIÓN </option>
                  <option value="39"> CONCORDIA </option>
                  <option value="40"> COPACABANA </option>
                  <option value="41"> DABEIBA </option>
                  <option value="42"> DONMATÍAS </option>
                  <option value="43"> EBÉJICO </option>
                  <option value="44"> EL BAGRE </option>
                  <option value="32"> EL CARMEN DE VIBORAL </option>
                  <option value="103"> EL SANTUARIO </option>
                  <option value="45"> ENTRERRÍOS </option>
                  <option value="46"> ENVIGADO </option>
                  <option value="47"> FREDONIA </option>
                  <option value="48"> FRONTINO </option>
                  <option value="49"> GIRALDO </option>
                  <option value="50"> GIRARDOTA </option>
                  <option value="51"> GÓMEZ PLATA </option>
                  <option value="52"> GRANADA </option>
                  <option value="53"> GUADALUPE </option>
                  <option value="54"> GUARNE </option>
                  <option value="55"> GUATAPÉ </option>
                  <option value="56"> HELICONIA </option>
                  <option value="57"> HISPANIA </option>
                  <option value="58"> ITAGÜÍ </option>
                  <option value="59"> ITUANGO </option>
                  <option value="60"> JARDÍN </option>
                  <option value="61"> JERICÓ </option>
                  <option value="62"> LA CEJA </option>
                  <option value="63"> LA ESTRELLA </option>
                  <option value="64"> LA PINTADA </option>
                  <option value="65"> LA UNIÓN </option>
                  <option value="66"> LIBORINA </option>
                  <option value="67"> MACEO </option>
                  <option value="68"> MARINILLA </option>
                  <option value="69"> MONTEBELLO </option>
                  <option value="70"> MURINDÓ </option>
                  <option value="71"> MUTATÁ </option>
                  <option value="72"> NARIÑO </option>
                  <option value="74"> NECHÍ </option>
                  <option value="73"> NECOCLÍ </option>
                  <option value="75"> OLAYA </option>
                  <option value="76"> PEÑOL </option>
                  <option value="77"> PEQUE </option>
                  <option value="78"> PUEBLORRICO </option>
                  <option value="79"> PUERTO BERRÍO </option>
                  <option value="80"> PUERTO NARE </option>
                  <option value="81"> PUERTO TRIUNFO </option>
                  <option value="82"> REMEDIOS </option>
                  <option value="83"> RETIRO </option>
                  <option value="84"> RIONEGRO </option>
                  <option value="85"> SABANALARGA </option>
                  <option value="86"> SABANETA </option>
                  <option value="87"> SALGAR </option>
                  <option value="88"> SAN ANDRÉS DE CUERQUÍA </option>
                  <option value="89"> SAN CARLOS </option>
                  <option value="90"> SAN FRANCISCO </option>
                  <option value="91"> SAN JERÓNIMO </option>
                  <option value="92"> SAN JOSÉ DE LA MONTAÑA </option>
                  <option value="93"> SAN JUAN DE URABÁ </option>
                  <option value="94"> SAN LUIS </option>
                  <option value="95"> SAN PEDRO DE LOS MILAGROS </option>
                  <option value="96"> SAN PEDRO DE URABÁ </option>
                  <option value="97"> SAN RAFAEL </option>
                  <option value="98"> SAN ROQUE </option>
                  <option value="99"> SAN VICENTE FERRER </option>
                  <option value="100"> SANTA BÁRBARA </option>
                  <option value="10"> SANTA FÉ DE ANTIOQUIA </option>
                  <option value="101"> SANTA ROSA DE OSOS </option>
                  <option value="102"> SANTO DOMINGO </option>
                  <option value="104"> SEGOVIA </option>
                  <option value="105"> SONSÓN </option>
                  <option value="106"> SOPETRÁN </option>
                  <option value="107"> TÁMESIS </option>
                  <option value="108"> TARAZÁ </option>
                  <option value="109"> TARSO </option>
                  <option value="110"> TITIRIBÍ </option>
                  <option value="111"> TOLEDO </option>
                  <option value="112"> TURBO </option>
                  <option value="113"> URAMITA </option>
                  <option value="114"> URRAO </option>
                  <option value="115"> VALDIVIA </option>
                  <option value="116"> VALPARAÍSO </option>
                  <option value="117"> VEGACHÍ </option>
                  <option value="118"> VENECIA </option>
                  <option value="119"> VIGÍA DEL FUERTE </option>
                  <option value="120"> YALÍ </option>
                  <option value="121"> YARUMAL </option>
                  <option value="122"> YOLOMBÓ </option>
                  <option value="123"> YONDÓ </option>
                  <option value="124"> ZARAGOZA </option>
                </select>
              </div>
            </div>
          </IonList>

          <div className='shadow p-3 mb-2 pt-0 bg-white rounded'>
            <div className="social-card2">
              <span className="label2">Dirección de residencia</span>
              <span className="value2">
                Ingrese la dirección según el siguiente ejemplo, diligenciando los campos requeridos que identifiquen la dirección actual; los campos que no requiera los puede dejar en blanco.
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

            <IonList>
              <div className="row g-3 was-validated">
                <div className="col-sm">
                  <label className="form-label">Via principal:</label>
                  <select onChange={(e) => handleInputChange(e, 'dirCampo1')} value={items.dirCampo1} className="form-control form-control-sm" required>
                    <option value=""> SELECCIONE </option>
                    <option value="AUTOPISTA"> AUTOPISTA </option>
                    <option value="AVENIDA"> AVENIDA </option>
                    <option value="AVENIDA CALLE"> AVENIDA CALLE </option>
                    <option value="AVENIDA CARRERA"> AVENIDA CARRERA </option>
                    <option value="BULEVAR"> BULEVAR </option>
                    <option value="CALLE"> CALLE </option>
                    <option value="CARRERA"> CARRERA </option>
                    <option value="CIRCULAR"> CIRCULAR </option>
                    <option value="CIRCUNVALAR"> CIRCUNVALAR </option>
                    <option value="CTAS CORRIDAS"> CTAS CORRIDAS </option>
                    <option value="DIAGONAL"> DIAGONAL </option>
                    <option value="KILOMETRO"> KILOMETRO </option>
                    <option value="OTRA"> OTRA </option>
                    <option value="PASAJE"> PASAJE </option>
                    <option value="PASEO"> PASEO </option>
                    <option value="PEATONAL"> PEATONAL </option>
                    <option value="TRANSVERSAL"> TRANSVERSAL </option>
                    <option value="TRONCAL"> TRONCAL </option>
                    <option value="VARIANTE"> VARIANTE </option>
                    <option value="VIA"> VIA </option>
                  </select>
                </div>
                <div className="col-sm">
                  <label className="form-label" style={{color: 'white'}}>.</label>
                  <input type="text" placeholder="" onChange={(e) => handleInputChange(e, 'dirCampo2')} value={items.dirCampo2} className="form-control form-control-sm" required />
                </div>
                <div className="col-sm">
                  <label className="form-label" style={{color: 'white'}}>.</label>
                  <input type="text" onChange={(e) => handleInputChange(e, 'dirCampo3')} value={items.dirCampo3} placeholder="" className="form-control form-control-sm" />
                </div>
                <div className="col-sm">
                  <label className="form-label" style={{color: 'white'}}>.</label>
                  <select onChange={(e) => handleInputChange(e, 'dirCampo4')} value={items.dirCampo4} className="form-control form-control-sm">
                    <option value=""> SELECCIONE </option>
                    <option value="BIS"> BIS </option>
                    <option value="ESTE"> ESTE </option>
                    <option value="NORTE"> NORTE </option>
                    <option value="OESTE"> OESTE </option>
                    <option value="SUR"> SUR </option>
                  </select>
                </div>
                <div className="simbolo col-sm-1">
                  <label><br/></label>
                  <h4>#</h4>
                </div>
              </div>
            </IonList>

            <IonList>
              <div className="row g-3 was-validated">
                <div className="col-sm">
                  <label className="form-label">Via secundaria:</label>
                  <input type="number" onChange={(e) => handleInputChange(e, 'dirCampo5')} value={items.dirCampo5} placeholder="" className="form-control form-control-sm" />
                </div>
                <div className="col-sm">
                  <label className="form-label" style={{color: 'white'}}>.</label>
                  <input type="text" onChange={(e) => handleInputChange(e, 'dirCampo6')} value={items.dirCampo6} placeholder="" className="form-control form-control-sm" />
                </div>
                <div className="col-sm">
                  <label className="form-label" style={{color: 'white'}}>.</label>
                  <select onChange={(e) => handleInputChange(e, 'dirCampo7')} value={items.dirCampo7} className="form-control form-control-sm">
                    <option value=""> SELECCIONE </option>
                    <option value="BIS"> BIS </option>
                    <option value="ESTE"> ESTE </option>
                    <option value="NORTE"> NORTE </option>
                    <option value="OESTE"> OESTE </option>
                    <option value="SUR"> SUR </option>
                  </select>
                </div>
                <div className="simbolo col-sm-1">
                  <label><br/></label>
                  <h4>-</h4>
                </div>
                <div className="col-sm">
                  <label className="form-label" style={{color: 'white'}}>.</label>
                  <input type="number" onChange={(e) => handleInputChange(e, 'dirCampo8')} value={items.dirCampo8} placeholder="" className="form-control form-control-sm" />
                </div>
              </div>
            </IonList>

            <IonList>
              <div className="row g-3 was-validated">
                <div className="col-sm">
                  <label className="form-label">Complemento</label>
                  <input type="text" onChange={(e) => handleInputChange(e, 'dirCampo9')} value={items.dirCampo9} placeholder="" className="form-control form-control-sm" required />
                </div>
              </div>
            </IonList>
            <hr />
            <IonList>
              <div className="row g-3 was-validated">
                <div className="col-sm">
                  <label className="form-label">Direccion:</label>
                  <input disabled type="text"
                  value={items.direccion} placeholder="" className="form-control form-control-sm" required />
                </div>
              </div>
            </IonList>
            <hr />
            <IonList>
              <div className="row g-3 was-validated">
                <div className="col-sm">
                  <label className="form-label">Rural/Urbano</label>
                  <select onChange={(e) => handleInputChange(e, 'ruralurbano')} value={items.ruralurbano} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                    <option value=""> SELECCIONE </option>
                    <option value="RURAL"> RURAL </option>
                    <option value="URBANO"> URBANO </option>
                  </select>
                </div>
                <div className="col-sm">
                  <label className="form-label">Sector:</label>
                  <input type="text" onChange={(e) => handleInputChange(e, 'sector')} value={items.sector} placeholder="" className="form-control form-control-sm" />
                </div>
              </div>
            </IonList>
            <IonList>
              <div className="row g-3 was-validated">
                <div className="col-sm">
                  <label className="form-label">Comuna</label>
                  <select onChange={(e) => handleInputChange(e, 'comuna')} value={items.comuna} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                    <option value="">Seleccione</option>
                    {comunas.map((comuna) => (
                      <option key={comuna.id} value={comuna.id}>{comuna.descripcion}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm">
                  <label className="form-label">Barrio</label>
                  <select onChange={(e) => handleInputChange(e, 'barrio')} value={items.barrio} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                    <option value="">Seleccione</option>
                    {barrios.filter(barrio => barrio.comuna == parseInt(items.comuna)).map((barrio) => (
                      <option key={barrio.id} value={barrio.id}>{barrio.descripcion}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Telefono1:</label>
                  <input onChange={(e) => handleInputChange(e, 'telefono1')} value={items.telefono1 || ''} type="number" placeholder="" className="form-control form-control-sm" />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Telefono2:</label>
                  <input onChange={(e) => handleInputChange(e, 'telefono2')} value={items.telefono2 || ''} type="number" placeholder="" className="form-control form-control-sm" />
                </div>
              </div>
            </IonList>
          </div>

          <div className='shadow p-3 mb-2 pt-0 bg-white rounded'>
            <IonList>
              <div className="alert alert-primary" role="alert">
                <span className="badge badge-secondary text-dark">INTEGRANTES DE LA UBICACIÓN POSTERIOR A LA ATENCIÓN</span>
              </div>
              {integrantes.length > 0 ? (
                <CustomDataTable
                  title="Integrantes"
                  data={integrantes}
                  columns={columns} 
                />
              ) : (
                <p>No hay integrantes disponibles.</p>
              )}
            </IonList>
          </div>

          <br />

          <div>
            <IonButton color="success" onClick={enviar}>Guardar</IonButton>
            <IonButton routerLink={`/tabs/tab15/${params.ficha}`}>Siguiente</IonButton>
          </div>


          {showModal && (
          <>
            {/* Bootstrap Modal */}
            <div className={`modal ${showModal ? "d-block" : "d-none"} modalnew modal-backdropnew `}  tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document"><br /><br /><br />
                <div className="modal-content">
                  <div className="modal-header d-flex justify-content-between">
                    <div className='start'>
                    <label>Agregar Integrantes</label>
                    </div>
                    <div className='end'>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
               
                    
                  </div>
                  <div className="modal-body  ">
                  {allIntegrantes.map((integrante) => (
                  <div key={integrante.idintegrante} className='d-flex align-items-center'>
                    <div className='mr-2'>
                    <input
                      type="checkbox"
                      id={`integrante-${integrante.idintegrante}`}
                      checked={selectedIntegrantes.some((i) => i.idintegrante === integrante.idintegrante && i.ubicacionposterior === selectedUbicacionPosterior)}
                      onChange={() => handleCheckboxChange(integrante.idintegrante)}
                    /> 
                    </div>
                    <div className='flex-grow-1 text-center'>
                      <label htmlFor={`integrante-${integrante.idintegrante}`}>
                      {integrante.nombre1} {integrante.apellido1}
                      </label>
                      </div>
                  </div>
                ))}<hr/>
                <div className='text-center'>
                <IonButton color="success"  onClick={guardarIntegrantes }>Guardar</IonButton>
                </div>
               
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

       
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab14;




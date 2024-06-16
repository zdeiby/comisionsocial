import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useState, useRef, useEffect } from 'react';
import { Person } from '../models/person.model';
import EmployeeItem from '../components/EmployeeItem';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonSelect, IonList, IonInput, IonButton, IonItem, IonLabel,
  IonBadge, IonSelectOption, IonText, IonDatetimeButton, IonModal, IonDatetime,
  IonIcon
} from '@ionic/react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TouchPad from '../components/TouchPad';
import SubirImagenes from '../components/SubirImagenes';


const Tab16: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);
  const idayuda = queryParams.get('idayuda');
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [tipovisita, settipovisita] = useState('');
  const [motivovisita, setmotivovisita] = useState('');
  const [bomberos, setbomberos] = useState('');
  const [inputValue, setInputValue] = useState(0);
  const [image, setImage] = useState(null);  // Estado para almacenar la imagen
  const [preview, setPreview] = useState('');  // Estado para la URL de previsualización de la imagen

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Obtiene el archivo de la entrada del usuario
    if (file && file.type.startsWith("image")) {
      setImage(file);  // Actualiza el estado de la imagen
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);  // Establece la URL de previsualización de la imagen
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);


  const tipovisitafun = (event) => {
    settipovisita(event.target.value);

  };

  const motivovisitafun = (event) => {
    setmotivovisita(event.target.value);

  };

  const bomberosfun = (event) => {
    setbomberos(event.target.value);

  };

  const handleChange = (event) => {
    setInputValue(event.target.value); // Permite la entrada libre del usuario
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
          <IonTitle slot="start">17 - INFORMACION DE QUIEN RESPONDE LA ENCUENTA</IonTitle>
          <IonTitle slot="end">FICHA SOCIAL: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="social-card">
          <span className="label">Ficha social: {params.ficha}</span>
          <span className="value"></span>
        </div>

        <br />

        <div className=' shadow p-3 mb-5 bg-white rounded'>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Nombre de quien responde la entrevista:</label>
                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="7327"> YEISON  BEDOYA  - JEFE DEL HOGAR </option>
                </select>
              </div>

              <div className="form-group col-sm">
                <label>Adjuntar archivo:</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button onClick={() => fileInputRef.current.click()} className="btn btn-info btn-sm text-light">
                      Cargar Imagen
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <button className="btn btn-info btn-sm text-light" type="button" onClick={() => (preview) ? setShowModal(true) : alert('Cargar un archivo')}>
                      Ver
                    </button>
                  </div>
                  <input type="text" id="nameFile" className="form-control form-control-sm" placeholder="" value={image ? image.name : ''} disabled />
                </div>
              </div>
              <div>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-4">
                <label className="form-label">Quien diligencia la ficha:</label>
                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="76"> ANA BEATRIZ FIGUEROA TORRES </option><option value="24"> APOYO  SOCIAL </option><option value="34"> APOYO SOCIAL DOS </option><option value="8"> BEATRIZ EUGENIA MONCADA GONZALEZ </option><option value="6"> DANIEL  TORO VASQUEZ </option><option value="29"> DANIELA SANDOVAL GARZON </option><option value="7"> DEISY YOHANA GIRALDO ZULUAGA </option><option value="5"> ESTER LUCIA ROJAS ARENAS </option><option value="13"> JOHANA ANDREA CIFUENTES LONGAS </option><option value="21"> LINA MARCELA PEREZ ARAQUE </option><option value="87"> MARITZA  OROZCO MARTINEZ </option><option value="4"> MARYORY LINDEY ABELLO LONDOÑO </option><option value="32"> PAULA ANDREA MIRA MENESES </option><option value="33"> SANDRA JULIANA HERRERA HENAO </option><option value="88"> VIVIANA YANET CALLEJAS DUQUE </option><option value="22"> YEIDY TATIANA HIGUITA </option><option value="9"> YULIET ANDREA LOPEZ RODRIGUEZ </option> 
                </select>
              </div>
              <div className="col-sm-4">
                <label className="form-label" >Nombre apoyo social:</label>
                <input type="text" placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="col-sm-4">
                <label className="form-label" >Entidad:</label>
                <input type="text" placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="col-sm">
                <label className="form-label">Requiere seguimiento:</label>
                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              <div className="col">
                <label className="form-label" >Fecha probable:</label>
                <input type="date" placeholder="" className="form-control form-control-sm  " required />
                <small  className="form-text text-muted">La fecha para el primer seguimiento no puede ser superior a un mes.</small>
              </div>
              
            </div>
          </IonList>
        </div>
        <div className=' shadow p-3 mb-5 bg-white rounded'>
          <IonList>
            <div className="social-card2">
              <span className="label2">AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES:</span>
              <span className="value2">
                El titular de los datos personales consignados en este documento, da su consentimiento de manera libre, espontánea, consciente, expresa, inequívoca, previa e informada, para que la Alcaldía de Medellín realice la recolección, almacenamiento, uso, circulación, indexación, analítica, supresión, procesamiento, compilación, intercambio, actualización y disposición de los datos que ha suministrado y, en general, realice el tratamiento de los datos personales conforme lo dispone la Ley 1581 del 17 de octubre de 2021, el Decreto 1377 del 27 de junio de 2013 y el Decreto 1096 del 28 de diciembre de 2018 (política para el tratamiento de datos personales en el Municipio de Medellín distrito especial). La Alcaldía de Medellín, como responsable del tratamiento de los datos personales aquí consignados, en cumplimiento de las normas mencionadas, informa al titular de los datos personales que le asisten los siguientes derechos: acceder a sus datos personales; conocer, actualizar y rectificar sus datos personales; solicitar prueba de la autorización otorgada; revocar la autorización y/o solicitar la supresión del dato; presentar quejas ante la Superintendencia de Industria y Comercio y; en general, todos los derechos consignados en el artículo 8 de la Ley 1581 de 2012.
                <br /><br />
                Con la firma de este documento se garantiza que la información consignada en la atención es veraz y corresponde a la brindada por mí.
              </span>
            </div>
            <br />
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Autorizo el tratamiento de datos:</label>
                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Firma el representante del hogar:</label>
                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
            </div>
          </IonList>
        </div>

        <div className=' shadow p-3 mb-5 bg-white rounded'><div className="col-sm">
                <div className="alert alert-info" role="alert">
                     <strong>FIRMA DEL USUARIO:</strong> En este módulo puedes pedir al usuario que realice su firma a mano alzada, esta informacion se visualizara en el PDF. En el siguiente cuadro realiza la firma y cuando este fimado oprime el boton <strong>Cargar Firma</strong>
                </div>
            </div> <TouchPad></TouchPad>
            </div> 
        
   

        <div><IonButton color="success">Guardar</IonButton><IonButton routerLink={'/cobertura'}>Siguiente</IonButton></div>

<br />
        {preview && (
          <>
            {/* Bootstrap Modal */}
            <div className={`modal ${showModal ? "d-block" : "d-none"} modalnew modal-backdropnew `} tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document"><br /><br /><br />
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <img src={preview} alt="Preview" style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab16;

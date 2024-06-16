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
import { useHistory, useParams,useLocation  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TouchPad from '../components/TouchPad';


const IngresarAyudas: React.FC = () => {
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
                    <IonTitle slot="start">12 - INGRESAR NUEVA AYUDA HUMANITARIA</IonTitle>
                    <IonTitle slot="end">FICHA SOCIAL: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className="social-card">
                    <span className="label">Ficha social: {params.ficha}</span>
                    <span className="value">ID Ayuda: {idayuda}</span>
                    <span className="value"></span>
                </div>

                <br />

                <div className=' shadow p-3 mb-5 bg-white rounded'>
                    <IonList>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm-6">
                                <label className="form-label">Paquete alimentario:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cantidad:</label>
                                <input type="number" max={4} placeholder="" className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Paquete 1</label>
                                <input type="text" placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Paquete 2</label>
                                <input type="text" placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Paquete 3</label>
                                <input type="text" placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Paquete 4</label>
                                <input type="text" placeholder="" className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm-6">
                                <label className="form-label">Que entidad:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cual:</label>
                                <input type="text" placeholder="" className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>

                    

                    <IonList>
                    <div className="alert alert-primary" role="alert">
                    <span className="badge badge-secondary text-dark">ASISTENCIA ALIMENTARIA EN EMERGENCIA</span>
                    </div>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm-6">
                                <label className="form-label">Asistencia alimentaria en emergencia:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cuantos:</label>
                                <input type="number"  placeholder="" className="form-control form-control-sm  " required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Que entidad:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> COMISIÓN SOCIAL </option><option value="2"> OTRA </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cual:</label>
                                <input type="text"  placeholder="" className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>
            


                    <IonList>
                    <div className="alert alert-primary" role="alert">
                    <span className="badge badge-secondary text-dark">AYUDAS NO ALIMENTARIAS</span>
                    </div>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm-12">
                                <label className="form-label">No alimentarias:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Factura:</label>
                                <input type="text"  placeholder="" className="form-control form-control-sm  " required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Quien entrega (DAGRD - OIM - ACNUR):</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                    <option value=""> SELECCIONE </option><option value="3"> ACNUR </option><option value="1"> DAGRD </option><option value="2"> OIM </option>
                                 </select>
                            </div>
                        </div>
                    </IonList>
                    {/*ACNUR */}
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Hombre:</label>
                                <input type="number" placeholder=""  value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Dama:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Niño:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe con Pañales:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Abrigo:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Almohada:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 1:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 2:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 3:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 4:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>

                    {/*DAGRD */}

                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit de cocina:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Aseo Hogar:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Familiar:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Hombre:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Mujer:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Niño (a):</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Especial:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Colchonetas:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Cobijas:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Sabanas:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Almohadas:</label>
                                <input type="number" min={0} placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>

                {/*OIM */}

                <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit de cocina:</label>
                                <input type="number" placeholder=""  value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Hábitat:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Menaje Familiar:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit climatico Adultos y Adolescentes:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit climatico NN:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Hombre:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Mujer y Adolescentes:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene NN:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Gestantes:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit escolar Primaria:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Escolar Bachillerato:</label>
                                <input type="number" placeholder="" value={inputValue}  onChange={handleChange} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>

                    <IonList>
                    <div className="alert alert-primary" role="alert">
                    <span className="badge badge-secondary text-dark">OTRAS AYUDAS</span>
                    </div>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm-6">
                                <label className="form-label">Otras ayudas:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Que entidad:</label>
                                <input type="text"  placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cuales:</label>
                                <input type="text"  placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cuantos:</label>
                                <input type="number"  placeholder=""  value={inputValue}  onChange={handleChange} className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>

                    <IonList>
                    <div className="alert alert-primary" role="alert">
                    <span className="badge badge-secondary text-dark">ENTREGA DE AYUDA</span>
                    </div>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm-6">
                                <label className="form-label">Quien recibe la ayuda:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> INTEGRANTE DEL HOGAR </option><option value="2"> RED FAMILIAR O RED SOCIAL </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Integrante que recibe o autotiza:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="7327"> YEISON  BEDOYA  - JEFE DEL HOGAR </option> 
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Nombre de quién recibe ayuda</label>
                                <input type="text"  placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Documento de identidad de quién recibe ayuda</label>
                                <input type="number"  placeholder=""   className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>

                    
                    <IonList>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm">
                                <label className="form-label" >Fecha de entrega:</label>
                                <input type="date"  placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label">La ayuda fue entregada:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option> 
                                </select>
                            </div>
                            <div className="col-sm">
                                <label className="form-label">Tipo de entrega:</label>
                                <select value={tipovisita} onInput={tipovisitafun} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> PRIMERA ENTREGA </option><option value="2"> SEGUIMIENTO </option>
                                </select>
                            </div>
                        </div>
                    </IonList>

                    <IonList>
                    <div className="alert alert-primary" role="alert">
                    <span className="badge badge-secondary text-dark">OBSERVACIONES</span>
                    </div>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <textarea type="text" rows="5" placeholder="" className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                    <div className="alert alert-primary" role="alert">
                    <span className="badge badge-secondary text-dark">FIRMA DEL USUARIO QUIÉN RECIBE LA AYUDA:</span>
                    <span className='badge text-dark'>En este módulo puedes pedir al usuario que realice su firma a mano alzada, esta informacion se visualizara en el PDF. En el siguiente cuadro realiza la firma y cuando este fimado oprime el boton</span>
                   <br /> <span className="badge badge-secondary text-dark">Cargar Firma</span>
                    </div>
   
                    </IonList>

<TouchPad></TouchPad>
                    <br />

                </div>

                <br />

                <div><IonButton color="success">Guardar</IonButton><IonButton routerLink={`/tabs/tab12/${params.ficha}`}>Siguiente</IonButton></div>


            </IonContent>
        </IonPage>
    );
};

export default IngresarAyudas;

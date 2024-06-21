import './Tab4.css';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadSQL from '../models/database';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonList, IonButton
  } from '@ionic/react';
import TouchPad from '../components/TouchPad';

interface Ayudas {
    idayudas: number | null;
    fichasocial: number;
    paquetealimentario: number | null;
    tipoa: number | null;
    tipob: number | null;
    tipoc: number | null;
    noalimentarias: number | null;
    quienoa: string | null;
    factura: string | null;
    dcocina: number | null;
    daseohogar: number | null;
    daseofamiliar: number | null;
    dasehombre: number | null;
    daseomujer: number | null;
    daseonna: number | null;
    daseoinfantil: number | null;
    daseoespecial: number | null;
    dcolchonetas: number | null;
    dcobijas: number | null;
    dsabanas: number | null;
    dalmohadas: number | null;
    enitdad: string | null;
    otros: number | null;
    cuales: string | null;
    entidadotros: string | null;
    fechadeentrega: string | null;
    idintegrante: string | null;
    fecharegistro: string | null;
    usuario: number | null;
    estado: number | null;
    tabla: string | null;
    tipoentraga: number | null;
    ococina: number | null;
    acocina: number | null;
    oaseohogar: number | null;
    aaseohogar: number | null;
    oaseofamiliar: number | null;
    aaseofamiliar: number | null;
    oasehombre: number | null;
    aasehombre: number | null;
    oaseomujer: number | null;
    aaseomujer: number | null;
    oaseonna: number | null;
    aaseonna: number | null;
    oaseoinfantil: number | null;
    aaseoinfantil: number | null;
    oaseoespecial: number | null;
    aaseoespecial: number | null;
    ocolchonetas: number | null;
    acolchonetas: number | null;
    ocobijas: number | null;
    acobijas: number | null;
    osabanas: number | null;
    asabanas: number | null;
    oalmohadas: number | null;
    aalmohadas: number | null;
    quienpaq: string | null;
    cualpaq: string | null;
    quienasis: string | null;
    cualasis: string | null;
    asistencialiamentaria: number | null;
    redentrega: number | null;
    entregado: number | null;
    observacion: string | null;
    paquete1: string | null;
    paquete2: string | null;
    paquete3: string | null;
    paquete4: string | null;
    documentorecibeayuda: string | null;
    nombrerecibeayuda: string | null;
    nameFirma: string | null;
    draw_dataUrl: Blob | null;
}

const IngresarAyudas: React.FC = () => {
    const location = useLocation();
    const params = useParams();
    const queryParams = new URLSearchParams(location.search);
    const idayudas = queryParams.get('idayudas');
    const [ayudas, setAyudas] = useState<Ayudas[]>([]);
    const [db, setDb] = useState<any>(null);
    const [items, setItems] = useState<Ayudas>({
        idayudas: null,
        fichasocial: parseInt(params.ficha),
        paquetealimentario: null,
        tipoa: null,
        tipob: null,
        tipoc: null,
        noalimentarias: null,
        quienoa: '',
        factura: '',
        dcocina: null,
        daseohogar: null,
        daseofamiliar: null,
        dasehombre: null,
        daseomujer: null,
        daseonna: null,
        daseoinfantil: null,
        daseoespecial: null,
        dcolchonetas: null,
        dcobijas: null,
        dsabanas: null,
        dalmohadas: null,
        enitdad: '',
        otros: null,
        cuales: '',
        entidadotros: '',
        fechadeentrega: '',
        idintegrante: '',
        fecharegistro: '',
        usuario: parseInt(localStorage.getItem('cedula') || '0', 10),
        estado: 1,
        tabla: 'c12_ayudasentregadas',
        tipoentraga: null,
        ococina: null,
        acocina: null,
        oaseohogar: null,
        aaseohogar: null,
        oaseofamiliar: null,
        aaseofamiliar: null,
        oasehombre: null,
        aasehombre: null,
        oaseomujer: null,
        aaseomujer: null,
        oaseonna: null,
        aaseonna: null,
        oaseoinfantil: null,
        aaseoinfantil: null,
        oaseoespecial: null,
        aaseoespecial: null,
        ocolchonetas: null,
        acolchonetas: null,
        ocobijas: null,
        acobijas: null,
        osabanas: null,
        asabanas: null,
        oalmohadas: null,
        aalmohadas: null,
        quienpaq: '',
        cualpaq: '',
        quienasis: '',
        cualasis: '',
        asistencialiamentaria: null,
        redentrega: null,
        entregado: null,
        observacion: '',
        paquete1: '',
        paquete2: '',
        paquete3: '',
        paquete4: '',
        documentorecibeayuda: '',
        nombrerecibeayuda: '',
        nameFirma: '',
        draw_dataUrl: null,
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        loadSQL(setDb, fetchAyudas);
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

    const fetchAyudas = async (database = db) => {
        if (db) {
            const res = await database.exec(`SELECT * FROM c12_ayudasentregadas WHERE fichasocial=${params.ficha} and idayudas=${idayudas}`);
            if (res[0]?.values && res[0]?.columns) {
                const transformedAyudas: Ayudas[] = res[0].values.map((row: any[]) => {
                    return res[0].columns.reduce((obj, col, index) => {
                        obj[col] = row[index];
                        return obj;
                    }, {} as Ayudas);
                });
                setAyudas(transformedAyudas);
            } else {
                setItems({
                    idayudas: null,
                    fichasocial: parseInt(params.ficha),
                    paquetealimentario: null,
                    tipoa: null,
                    tipob: null,
                    tipoc: null,
                    noalimentarias: null,
                    quienoa: '',
                    factura: '',
                    dcocina: null,
                    daseohogar: null,
                    daseofamiliar: null,
                    dasehombre: null,
                    daseomujer: null,
                    daseonna: null,
                    daseoinfantil: null,
                    daseoespecial: null,
                    dcolchonetas: null,
                    dcobijas: null,
                    dsabanas: null,
                    dalmohadas: null,
                    enitdad: '',
                    otros: null,
                    cuales: '',
                    entidadotros: '',
                    fechadeentrega: '',
                    idintegrante: '',
                    fecharegistro: getCurrentDateTime(),
                    usuario: parseInt(localStorage.getItem('cedula') || '0', 10),
                    estado: 1,
                    tabla: 'c12_ayudasentregadas',
                    tipoentraga: null,
                    ococina: null,
                    acocina: null,
                    oaseohogar: null,
                    aaseohogar: null,
                    oaseofamiliar: null,
                    aaseofamiliar: null,
                    oasehombre: null,
                    aasehombre: null,
                    oaseomujer: null,
                    aaseomujer: null,
                    oaseonna: null,
                    aaseonna: null,
                    oaseoinfantil: null,
                    aaseoinfantil: null,
                    oaseoespecial: null,
                    aaseoespecial: null,
                    ocolchonetas: null,
                    acolchonetas: null,
                    ocobijas: null,
                    acobijas: null,
                    osabanas: null,
                    asabanas: null,
                    oalmohadas: null,
                    aalmohadas: null,
                    quienpaq: '',
                    cualpaq: '',
                    quienasis: '',
                    cualasis: '',
                    asistencialiamentaria: null,
                    redentrega: null,
                    entregado: null,
                    observacion: '',
                    paquete1: '',
                    paquete2: '',
                    paquete3: '',
                    paquete4: '',
                    documentorecibeayuda: '',
                    nombrerecibeayuda: '',
                    nameFirma: '',
                    draw_dataUrl: null,
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
        if (ayudas.length > 0) {
            let data = ayudas[0] || {};
            setItems({
                idayudas: data.idayudas || null,
                fichasocial: data.fichasocial || parseInt(params.ficha),
                paquetealimentario: data.paquetealimentario || null,
                tipoa: data.tipoa || null,
                tipob: data.tipob || null,
                tipoc: data.tipoc || null,
                noalimentarias: data.noalimentarias || null,
                quienoa: data.quienoa || '',
                factura: data.factura || '',
                dcocina: data.dcocina || null,
                daseohogar: data.daseohogar || null,
                daseofamiliar: data.daseofamiliar || null,
                dasehombre: data.dasehombre || null,
                daseomujer: data.daseomujer || null,
                daseonna: data.daseonna || null,
                daseoinfantil: data.daseoinfantil || null,
                daseoespecial: data.daseoespecial || null,
                dcolchonetas: data.dcolchonetas || null,
                dcobijas: data.dcobijas || null,
                dsabanas: data.dsabanas || null,
                dalmohadas: data.dalmohadas || null,
                enitdad: data.enitdad || '',
                otros: data.otros || null,
                cuales: data.cuales || '',
                entidadotros: data.entidadotros || '',
                fechadeentrega: data.fechadeentrega || '',
                idintegrante: data.idintegrante || '',
                fecharegistro: data.fecharegistro || '',
                usuario: data.usuario || parseInt(localStorage.getItem('cedula') || '0', 10),
                estado: data.estado || 1,
                tabla: data.tabla || 'c12_ayudasentregadas',
                tipoentraga: data.tipoentraga || null,
                ococina: data.ococina || null,
                acocina: data.acocina || null,
                oaseohogar: data.oaseohogar || null,
                aaseohogar: data.aaseohogar || null,
                oaseofamiliar: data.oaseofamiliar || null,
                aaseofamiliar: data.aaseofamiliar || null,
                oasehombre: data.oasehombre || null,
                aasehombre: data.aasehombre || null,
                oaseomujer: data.oaseomujer || null,
                aaseomujer: data.aaseomujer || null,
                oaseonna: data.oaseonna || null,
                aaseonna: data.aaseonna || null,
                oaseoinfantil: data.oaseoinfantil || null,
                aaseoinfantil: data.aaseoinfantil || null,
                oaseoespecial: data.oaseoespecial || null,
                aaseoespecial: data.aaseoespecial || null,
                ocolchonetas: data.ocolchonetas || null,
                acolchonetas: data.acolchonetas || null,
                ocobijas: data.ocobijas || null,
                acobijas: data.acobijas || null,
                osabanas: data.osabanas || null,
                asabanas: data.asabanas || null,
                oalmohadas: data.oalmohadas || null,
                aalmohadas: data.aalmohadas || null,
                quienpaq: data.quienpaq || '',
                cualpaq: data.cualpaq || '',
                quienasis: data.quienasis || '',
                cualasis: data.cualasis || '',
                asistencialiamentaria: data.asistencialiamentaria || null,
                redentrega: data.redentrega || null,
                entregado: data.entregado || null,
                observacion: data.observacion || '',
                paquete1: data.paquete1 || '',
                paquete2: data.paquete2 || '',
                paquete3: data.paquete3 || '',
                paquete4: data.paquete4 || '',
                documentorecibeayuda: data.documentorecibeayuda || '',
                nombrerecibeayuda: data.nombrerecibeayuda || '',
                nameFirma: data.nameFirma || '',
                draw_dataUrl: data.draw_dataUrl || null,
            });
        }
    }, [ayudas]);

    useEffect(() => {
        fetchAyudas();
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
            await db.exec(`INSERT OR REPLACE INTO c12_ayudasentregadas (idayudas, fichasocial, paquetealimentario, tipoa, tipob, tipoc, noalimentarias, quienoa, factura, dcocina, daseohogar, daseofamiliar, dasehombre, daseomujer, daseonna, daseoinfantil, daseoespecial, dcolchonetas, dcobijas, dsabanas, dalmohadas, enitdad, otros, cuales, entidadotros, fechadeentrega, idintegrante, fecharegistro, usuario, estado, tabla, tipoentraga, ococina, acocina, oaseohogar, aaseohogar, oaseofamiliar, aaseofamiliar, oasehombre, aasehombre, oaseomujer, aaseomujer, oaseonna, aaseonna, oaseoinfantil, aaseoinfantil, oaseoespecial, aaseoespecial, ocolchonetas, acolchonetas, ocobijas, acobijas, osabanas, asabanas, oalmohadas, aalmohadas, quienpaq, cualpaq, quienasis, cualasis, asistencialiamentaria, redentrega, entregado, observacion, paquete1, paquete2, paquete3, paquete4, documentorecibeayuda, nombrerecibeayuda, nameFirma, draw_dataUrl)
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    items.idayudas, items.fichasocial, items.paquetealimentario, items.tipoa, items.tipob, items.tipoc, items.noalimentarias, items.quienoa, items.factura, items.dcocina, items.daseohogar, items.daseofamiliar, items.dasehombre, items.daseomujer, items.daseonna, items.daseoinfantil, items.daseoespecial, items.dcolchonetas, items.dcobijas, items.dsabanas, items.dalmohadas, items.enitdad, items.otros, items.cuales, items.entidadotros, items.fechadeentrega, items.idintegrante, items.fecharegistro, items.usuario, items.estado, items.tabla, items.tipoentraga, items.ococina, items.acocina, items.oaseohogar, items.aaseohogar, items.oaseofamiliar, items.aaseofamiliar, items.oasehombre, items.aasehombre, items.oaseomujer, items.aaseomujer, items.oaseonna, items.aaseonna, items.oaseoinfantil, items.aaseoinfantil, items.oaseoespecial, items.aaseoespecial, items.ocolchonetas, items.acolchonetas, items.ocobijas, items.acobijas, items.osabanas, items.asabanas, items.oalmohadas, items.aalmohadas, items.quienpaq, items.cualpaq, items.quienasis, items.cualasis, items.asistencialiamentaria, items.redentrega, items.entregado, items.observacion, items.paquete1, items.paquete2, items.paquete3, items.paquete4, items.documentorecibeayuda, items.nombrerecibeayuda, items.nameFirma, items.draw_dataUrl
                ]);

            saveDatabase();
            alert('Datos Guardados con éxito');
            fetchAyudas(); // Actualizar la lista de ayudas después de guardar
        } catch (err) {
            console.error('Error al exportar los datos JSON:', err);
        }
    };

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
                    <span className="value">ID Ayuda: {idayudas}</span>
                    <span className="value"></span>
                </div>

                <br />

                <div className=' shadow p-3 mb-5 bg-white rounded'>
                    <IonList>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm-6">
                                <label className="form-label">Paquete alimentario:</label>
                                <select onChange={(e) => handleInputChange(e, 'paquetealimentario')} value={items.paquetealimentario || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cantidad:</label>
                                <input type="number" max={4} onChange={(e) => handleInputChange(e, 'tipoa')} value={items.tipoa || ''} placeholder="" className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Paquete 1</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'paquete1')} value={items.paquete1 || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Paquete 2</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'paquete2')} value={items.paquete2 || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Paquete 3</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'paquete3')} value={items.paquete3 || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Paquete 4</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'paquete4')} value={items.paquete4 || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm-6">
                                <label className="form-label">Que entidad:</label>
                                <select onChange={(e) => handleInputChange(e, 'quienpaq')} value={items.quienpaq || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cual:</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'cualpaq')} value={items.cualpaq || ''}  placeholder="" className="form-control form-control-sm  " required />
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
                                <select onChange={(e) => handleInputChange(e, 'asistencialiamentaria')} value={items.asistencialiamentaria || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cuantos:</label>
                                <input type="number" onChange={(e) => handleInputChange(e, 'tipob')} value={items.tipob || ''} placeholder="" className="form-control form-control-sm  " required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Que entidad:</label>
                                <select onChange={(e) => handleInputChange(e, 'quienasis')} value={items.quienasis || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> COMISIÓN SOCIAL </option><option value="2"> OTRA </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cual:</label>
                                <input type="text"  onChange={(e) => handleInputChange(e, 'cualasis')} value={items.cualasis || ''} placeholder="" className="form-control form-control-sm  " required />
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
                                <select onChange={(e) => handleInputChange(e, 'noalimentarias')} value={items.noalimentarias || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Factura:</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'factura')} value={items.factura || 'NO APLICA'} placeholder="" className="form-control form-control-sm  " required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Quien entrega (DAGRD - OIM - ACNUR):</label>
                                <select onChange={(e) => handleInputChange(e, 'quienoa')} value={items.quienoa || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
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
                                <input type="number" placeholder=""  onChange={(e) => handleInputChange(e, 'acocina')} value={items.acocina || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Dama:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aaseohogar')} value={items.aaseohogar || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Niño:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aaseofamiliar')} value={items.aaseofamiliar || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aasehombre')} value={items.aasehombre || '0'} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe con Pañales:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aaseomujer')} value={items.aaseomujer || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Abrigo:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aaseonna')} value={items.aaseonna || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Colchonetas:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aaseoinfantil')} value={items.aaseoinfantil || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Almohada:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aaseoespecial')} value={items.aaseoespecial || '0'} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 1:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'acolchonetas')} value={items.acolchonetas || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 2:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'acobijas')} value={items.acobijas || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 3:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'asabanas')} value={items.asabanas || '0'} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Pañales etapa 4:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'aalmohadas')} value={items.aalmohadas || '0'} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>

                    {/*DAGRD */}

                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit de cocina:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'dcocina')} value={items.dcocina || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Aseo Hogar:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseohogar')} value={items.daseohogar || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Familiar:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseofamiliar')} value={items.daseofamiliar || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Hombre:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'dasehombre')} value={items.dasehombre || ''} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Mujer:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseomujer')} value={items.daseomujer || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Niño (a):</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseonna')} value={items.daseonna || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseoinfantil')} value={items.daseoinfantil || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Especial:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseoespecial')} value={items.daseoespecial || ''} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Colchonetas:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'daseoespecial')} value={items.daseoespecial || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Cobijas:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'dcobijas')} value={items.dcobijas || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Sabanas:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'dsabanas')} value={items.dsabanas || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Almohadas:</label>
                                <input type="number" min={0} placeholder="" onChange={(e) => handleInputChange(e, 'dalmohadas')} value={items.dalmohadas || ''} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>

                {/*OIM */}

                <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit de cocina:</label>
                                <input type="number" placeholder=""  onChange={(e) => handleInputChange(e, 'ococina')} value={items.ococina || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Hábitat:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oaseohogar')} value={items.oaseohogar || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Menaje Familiar:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oaseofamiliar')} value={items.oaseofamiliar || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit climatico Adultos y Adolescentes:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oasehombre')} value={items.oasehombre || ''} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit climatico NN:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oaseomujer')} value={items.oaseomujer || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Hombre:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oaseonna')} value={items.oaseonna || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Mujer y Adolescentes:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oaseoinfantil')} value={items.oaseoinfantil || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene NN:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oaseoespecial')} value={items.oaseoespecial || ''} className="form-control form-control-sm  "  />
                            </div>
                        </div>
                    </IonList>
                    <IonList>
                        <div className="row g-3 was-validated ">
                            <div className="col-sm">
                                <label className="form-label" >Kit Higiene Bebe:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'ocolchonetas')} value={items.ocolchonetas || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Gestantes:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'ocobijas')} value={items.ocobijas || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit escolar Primaria:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'osabanas')} value={items.osabanas || ''} className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label" >Kit Escolar Bachillerato:</label>
                                <input type="number" placeholder="" onChange={(e) => handleInputChange(e, 'oalmohadas')} value={items.oalmohadas || ''} className="form-control form-control-sm  "  />
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
                                <select onChange={(e) => handleInputChange(e, 'otros')} value={items.otros || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Que entidad:</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'entidadotros')} value={items.entidadotros || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cuales:</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'cuales')} value={items.cuales || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Cuantos:</label>
                                <input type="number"  placeholder=""  onChange={(e) => handleInputChange(e, 'tipoc')} value={items.tipoc || ''} className="form-control form-control-sm  " required />
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
                                <select onChange={(e) => handleInputChange(e, 'redentrega')} value={items.redentrega || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> INTEGRANTE DEL HOGAR </option><option value="2"> RED FAMILIAR O RED SOCIAL </option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Integrante que recibe o autotiza:</label>
                                <select onChange={(e) => handleInputChange(e, 'idintegrante')} value={items.idintegrante || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="7327"> YEISON  BEDOYA  - JEFE DEL HOGAR </option> 
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Nombre de quién recibe ayuda</label>
                                <input type="text" onChange={(e) => handleInputChange(e, 'nombrerecibeayuda')} value={items.nombrerecibeayuda || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label" >Documento de identidad de quién recibe ayuda</label>
                                <input type="number"  placeholder="" onChange={(e) => handleInputChange(e, 'documentorecibeayuda')} value={items.documentorecibeayuda || ''} className="form-control form-control-sm  " required />
                            </div>
                        </div>
                    </IonList>

                    
                    <IonList>
                        <div className="row g-3 was-validated ">
                        <div className="col-sm">
                                <label className="form-label" >Fecha de entrega:</label>
                                <input type="date" onChange={(e) => handleInputChange(e, 'fechadeentrega')} value={items.fechadeentrega || ''} placeholder="" className="form-control form-control-sm  "  />
                            </div>
                            <div className="col-sm">
                                <label className="form-label">La ayuda fue entregada:</label>
                                <select onChange={(e) => handleInputChange(e, 'entregado')} value={items.entregado || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option> 
                                </select>
                            </div>
                            <div className="col-sm">
                                <label className="form-label">Tipo de entrega:</label>
                                <select onChange={(e) => handleInputChange(e, 'tipoentraga')} value={items.tipoentraga || ''} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
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
                                <textarea type="text" rows="5" onChange={(e) => handleInputChange(e, 'observacion')} value={items.observacion || ''} placeholder="" className="form-control form-control-sm  "  />
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

                <div><IonButton onClick={enviar} color="success">Guardar</IonButton><IonButton routerLink={`/tabs/tab12/${params.ficha}`}>Siguiente</IonButton></div>


            </IonContent>
        </IonPage>
    );
};

export default IngresarAyudas;

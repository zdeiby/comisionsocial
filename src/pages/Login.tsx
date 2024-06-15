import React, { useState, useEffect } from 'react';
import { IonApp, IonPage, IonContent, IonImg, IonInput, IonButton, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';
import './Login.css';
import LogoCAH from '../imagenes/logocah.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //   const handleLogin = () => {
    //     // Aquí puedes manejar el inicio de sesión
    //     console.log(`Username: ${username}`);
    //     console.log(`Password: ${password}`);
    //   };

    const handleLogin = () => {
        if (username === '123' && password === '123') {
            localStorage.setItem('cedula', username);
            window.location.href = '/cobertura'; // Redirige a la página de inicio
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (

        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar >
                        <IonTitle >Comision Social</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonCol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img height="50%" width="50%" src={LogoCAH} alt="Logo" />
                    </IonCol>

                    <IonRow>
                        <IonCol>
                            <IonItem >
                                <IonInput label="Usuario" labelPlacement="floating" fill="outline" placeholder="Ingrese Usuario"
                                    value={username}
                                    onIonInput={(e) => setUsername(e.detail.value)}
                                    type="text"
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>  <hr />
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput type="password" label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Ingrese Contraseña"
                                    value={password}
                                    onIonInput={(e) => setPassword(e.detail.value)}

                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>  <hr></hr>
                    <IonButton expand="full" color="secondary" onClick={handleLogin}>Iniciar Sesión</IonButton>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;


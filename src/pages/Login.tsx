import React, { useState, useEffect } from 'react';
import { IonApp, IonPage, IonContent, IonImg, IonInput, IonButton, IonItem, IonLabel ,IonGrid, IonRow, IonCol, IonHeader, IonToolbar,IonTitle} from '@ionic/react';
import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';
import './Login.css';

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
        localStorage.setItem('cedula',username);
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
                    <IonTitle >Secretaría de Inclusión</IonTitle>
                    </IonToolbar>
            </IonHeader>
                <IonGrid>

                        <IonCol><img height="50%" width="100%" src="https://vivirenelpoblado.com/wp-content/uploads/2022/04/La-alcaldia-de-Medellin-instala-un-Centro-Integral-de-Familia-en-la-UdeA-03-1200x800.jpg"/></IonCol>
                            <hr></hr><hr></hr>
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
                    </IonRow>  <hr></hr>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                    <IonInput type="password" label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Ingrese Contraseña"
                                        value={password}
                                        onIonInput={(e) =>  setPassword(e.detail.value)}
                                       
                                    />
                            </IonItem>
                        </IonCol>
                    </IonRow>  <hr></hr><hr></hr>
                    <IonButton expand="full" color="secondary"  onClick={handleLogin}>Iniciar Sesión</IonButton>
                </IonGrid>
            </IonContent>
        </IonPage>
  );
};

export default Login;


//https://vivirenelpoblado.com/wp-content/uploads/2022/04/La-alcaldia-de-Medellin-instala-un-Centro-Integral-de-Familia-en-la-UdeA-03-1200x800.jpg


<div class="container">
    <div class="row">
        <div class="col">A</div>
        <div class="col">B</div>
    </div>
</div>
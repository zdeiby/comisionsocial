import { Redirect, Route,useParams } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact, IonButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab1Copia from './pages/Tab1copia';
import Login from './pages/Login';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import Cobertura from './pages/Cobertura';
import MenuLat from './components/MenuLat';

setupIonicReact();

const App: React.FC = () => {
  
  return(
  <IonApp>
    <IonReactRouter>
      <MenuLat />
      <IonRouterOutlet >
        <Route exact path="/cobertura">
          <Cobertura />
        </Route>
        <Route exact path="/copia">
          <Tab1Copia />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/tabs" >
          <IonPage id="main">
            <IonHeader>
              <IonToolbar>
                <IonMenuButton slot="start" />
                <IonTitle>Numerales Realizados</IonTitle> <IonButton slot="end" onClick={() => {
                localStorage.removeItem('cedula');
                window.location.href = '/login';
              }}>Cerrar Sesión</IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonRouterOutlet>
                <Route exact path="/tabs/tab1/:ficha">
                  <Tab1 />
                </Route>
                <Route exact path="/tabs/tab2/:ficha">
                  <Tab2 />
                </Route>
                <Route exact path="/tabs/tab3/:ficha">
                  <Tab3 />
                </Route>
                <Route exact path="/tabs/tab4/:ficha">
                  <Tab4 />
                </Route>
                <Route exact path="/tabs">
                  <Redirect to="/login" />
                </Route>
              </IonRouterOutlet>
            </IonContent>
          </IonPage>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
};

export default App;

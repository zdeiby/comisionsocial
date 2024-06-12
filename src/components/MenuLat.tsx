import React from "react";
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
import { Redirect, Route,useParams } from 'react-router-dom';
import { ellipse, square, triangle } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

const MenuLat: React.FC = () => {
  const location = useLocation();
  const ficha2 = location.pathname.split('/').pop(); 
  console.log(ficha2)
    return(
<IonMenu contentId="main" type="overlay">
<IonHeader>
  <IonToolbar>
    <IonTitle>Menu</IonTitle>
  </IonToolbar>
</IonHeader>
<IonContent>
  <IonList>
    <IonMenuToggle auto-hide="false">
      <IonItem button routerLink={`/tabs/tab1/${ficha2}`}>
        <IonIcon slot="start" icon={triangle} />
        <IonLabel>0 INFORMACION DEL EVENTO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab2/${ficha2}`}>
        <IonIcon slot="start" icon={ellipse} />
        <IonLabel>1 IDENTIFICACION DEL EVENTO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab3/${ficha2}`}>
        <IonIcon slot="start" icon={square} />
        <IonLabel>2 LOCALIZACION DEL EVENTO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab4/${ficha2}`}>
        <IonIcon slot="start" icon={square} />
        <IonLabel>4 - DATOS DE LA VIVIENDA</IonLabel>
      </IonItem>
    </IonMenuToggle>
  </IonList>
</IonContent>
</IonMenu>
);
};
export default MenuLat;
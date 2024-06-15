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
import { analytics, chatbox, clipboard, ellipse, heart, home, information, logoOctocat, navigate, newspaper, people, peopleCircle, square, text, time, triangle, warning } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

const MenuLat: React.FC = () => {
  const location = useLocation();
  const ficha2 = location.pathname.split('/').pop(); 
  console.log(ficha2)
    return(
<IonMenu contentId="main" type="overlay">
<IonHeader>
  <IonToolbar>
    <IonTitle>Numerales Realizados</IonTitle>
  </IonToolbar>
</IonHeader>
<IonContent>
  <IonList>
    <IonMenuToggle auto-hide="false">
      <IonItem button routerLink={`/tabs/tab1/${ficha2}`}>
        <IonIcon slot="start" icon={information} />
        <IonLabel>0 INFORMACION DEL EVENTO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab2/${ficha2}`}>
        <IonIcon slot="start" icon={chatbox} />
        <IonLabel>1 IDENTIFICACION DEL EVENTO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab3/${ficha2}`}>
        <IonIcon slot="start" icon={navigate} />
        <IonLabel>2 LOCALIZACION DEL EVENTO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab4/${ficha2}`}>
        <IonIcon slot="start" icon={warning} />
        <IonLabel>3 - EVALUACION Y DAÑOS</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab5/${ficha2}`}>
        <IonIcon slot="start" icon={analytics} />
        <IonLabel>4 - DATOS DE LA VIVIENDA</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab5/${ficha2}`}>
        <IonIcon slot="start" icon={newspaper} />
        <IonLabel>5 - SERVICIOS PUBLICOS</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab6/${ficha2}`}>
        <IonIcon slot="start" icon={time} />
        <IonLabel>6 - TIEMPO EN LA VIVIENDA</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab7/${ficha2}`}>
        <IonIcon slot="start" icon={home} />
        <IonLabel>7 y 8- TENENCIA DE LA VIVIENDA</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab8/${ficha2}`}>
        <IonIcon slot="start" icon={people} />
        <IonLabel>9 - CONFORMACION DEL HOGAR</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab9/${ficha2}`}>
        <IonIcon slot="start" icon={clipboard} />
        <IonLabel>10 - DATOS GENERALES (REMISIONES)</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab10/${ficha2}`}>
        <IonIcon slot="start" icon={peopleCircle} />
        <IonLabel>11 - RED DE APOYO</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab11/${ficha2}`}>
        <IonIcon slot="start" icon={heart} />
        <IonLabel>12 - AYUDAS HUMANITARIAS ENTREGADAS</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab12/${ficha2}`}>
        <IonIcon slot="start" icon={logoOctocat} />
        <IonLabel>14 - MASCOTAS</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab13/${ficha2}`}>
        <IonIcon slot="start" icon={home} />
        <IonLabel>15 - UBICACION DE LA FAMILIA POSTERIOR A LA ATENCION SOCIAL</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab14/${ficha2}`}>
        <IonIcon slot="start" icon={text} />
        <IonLabel>16 - OBSERVACIONES</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab15/${ficha2}`}>
        <IonIcon slot="start" icon={information} />
        <IonLabel>17 - INFORMACION DE QUIEN RESPONDE LA ENCUENTA</IonLabel>
      </IonItem>

    </IonMenuToggle>
  </IonList>
</IonContent>
</IonMenu>
);
};
export default MenuLat;
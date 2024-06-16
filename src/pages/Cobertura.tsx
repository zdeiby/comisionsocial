import React, { useEffect , useState, useRef} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList ,useIonViewDidEnter, IonLabel,IonItem,IonAccordion, IonAccordionGroup, } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import {Person} from './../models/person.model';
import EmployeeItem from './../components/EmployeeItem';

const Cobertura: React.FC = () => {

    const [people, setPeople] = useState<Person[]>([]);

    useIonViewDidEnter( () => {
        const result = [
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'1234'
            
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'345'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'324435'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'345342'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'345345'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'156'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'5674'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'456454'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'45645'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'456456'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'78556'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'12343'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'45645'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'7856'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'12234'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'1234'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'1234'
          },
          {
            name: 'Incompleta',  
            email:'blablala',
            position: '1',
            photo: 'https://curul26.com/wp-content/uploads/2023/01/Foto-imagen.jpg',
            ficha:'1234'
          }
        ];
        const data = result;//await result.json();
        setPeople(data);
      });
    




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


  return (
    <IonPage>
      {cedula ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle slot="start">Cobertura</IonTitle>
              <IonButton color="danger" slot="end" onClick={() => {
                //localStorage.removeItem('cedula');
                window.location.href = `/tabs/tab1/${Math.random().toString(36).substr(2, 7)}`;
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
                {people.map((person, idx) => <EmployeeItem key={idx} person={person} />)}
            </IonList>
            </IonContent>
        </>
      ) : ''}



    </IonPage>






  );
};

export default Cobertura;

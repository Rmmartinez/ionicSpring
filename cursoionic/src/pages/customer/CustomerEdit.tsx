import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory} from 'react-router';
import { useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import {checkmark,trash,pencil} from 'ionicons/icons';
import {searchCustomers,saveCustomer,removeCustomer, searchCustomerByID} from './CustomerApi';
import Customer from './Customer';

const CustomerEdit: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string; }>();
  const [customer,setCustomer] = useState<Customer>({});
  const [clientes,setClientes] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
     search();
  }, [history.location.pathname]);   //Si entre corchetes pusiera clientes, se llamaría a la API cada vez que clientes se modifica


  const search = async () => {
    if(id !== 'new'){
        let result  = await searchCustomerByID(id);
        setCustomer(result);
    }

  }

  const save = async () => {
    await saveCustomer(customer);
    //window.location.href = '/page/Customers';
    history.push('/page/Customers');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>

          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />


        <IonCard>
              <IonTitle>{id == 'new' ? 'Agregar Cliente' : 'Editar Cliente'}</IonTitle>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Nombre" labelPlacement="stacked" onIonChange={e => customer.firstname = String(e.detail.value)} value={customer.firstname}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Apellido" labelPlacement="stacked" onIonChange={e => customer.lastname = String(e.detail.value)} value={customer.lastname}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Email" labelPlacement="stacked" onIonChange={e => customer.email = String(e.detail.value)} value={customer.email}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Dirección" labelPlacement="stacked" onIonChange={e => customer.address = String(e.detail.value)} value={customer.address}></IonInput>
                           </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Teléfono" labelPlacement="stacked" onIonChange={e => customer.phone = String(e.detail.value)} value={customer.phone}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                        </IonCol>
                    </IonRow>

              <IonItem>
                <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                <IonIcon icon={checkmark}/>
                Guardar
                </IonButton>
              </IonItem>

            </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;

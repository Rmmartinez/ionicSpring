import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory} from 'react-router';
import { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonRow, IonCard, IonIcon, IonItem, IonButton } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import {add,trash,pencil} from 'ionicons/icons';
import {searchCustomers,saveCustomer,removeCustomer} from './CustomerApi';
import Customer from './Customer'

const CustomerList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [clientes,setClientes] = useState<Customer[]>([]);
  //cook, para el addCustomer
  const history  = useHistory();

  useEffect(() => {
     search();
  }, [history.location.pathname]);   //Si entre corchetes pusiera clientes, se llamaría a la API cada vez que clientes se modifica


  const search = async () => {
    let result = await searchCustomers();
    setClientes(result);

  }

  const remove = async (id: string) => {
    await removeCustomer(id);
    search(); //actualizar clientes mostrados
  }

    const addCustomer =() =>{
        //history.push('/page/customer/new');
        window.location.href = '/page/customer/new';
    }

    const editCustomer =(id: string) =>{
            //history.push('/page/customer/' + id);
            window.location.href = '/page/customer/' + id;
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
              <IonTitle>Gestión de Clientes</IonTitle>

              <IonItem>
                <IonButton onClick={addCustomer} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add}/>
                Agregar Cliente
                </IonButton>
              </IonItem>

              <IonGrid className="table">
                <IonRow>
                  <IonCol>Nombre</IonCol>
                  <IonCol>Email</IonCol>
                  <IonCol>Teléfono</IonCol>
                  <IonCol>Dirección</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>

                {clientes.map((cliente:Customer) =>

                    <IonRow>
                      <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
                      <IonCol>{cliente.email}</IonCol>
                      <IonCol>{cliente.phone}</IonCol>
                      <IonCol>{cliente.address}</IonCol>
                      <IonCol>
                        <IonCol>
                            <IonButton onClick={() => editCustomer(String(cliente.id))}color="dark" fill="clear"><IonIcon icon={pencil} slot="icon-only"/></IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => remove(String(cliente.id))} color="danger" fill="clear"><IonIcon icon={trash} slot="icon-only"/></IonButton>
                        </IonCol>
                      </IonCol>
                    </IonRow>

                )}

              </IonGrid>
            </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default CustomerList;

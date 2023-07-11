import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory} from 'react-router';
import { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonRow, IonCard, IonIcon, IonItem, IonButton } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import {add,trash,pencil} from 'ionicons/icons';
import {searchSuppliers,saveSupplier,removeSupplier} from './SupplierApi';
import Supplier from './Supplier'

const SupplierList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [clientes,setClientes] = useState<Supplier[]>([]);
  //cook, para el addSupplier
  const history  = useHistory();

  useEffect(() => {
     search();
  }, [history.location.pathname]);   //Si entre corchetes pusiera clientes, se llamaría a la API cada vez que clientes se modifica


  const search = async () => {
    let result = await searchSuppliers();
    setClientes(result);

  }

  const remove = async (id: string) => {
    await removeSupplier(id);
    search(); //actualizar clientes mostrados
  }

    const addSupplier =() =>{
        //history.push('/page/supplier/new');
        window.location.href = '/page/supplier/new';
    }

    const editSupplier =(id: string) =>{
            //history.push('/page/supplier/' + id);
            window.location.href = '/page/supplier/' + id;
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
              <IonTitle>Gestión de Proveedores</IonTitle>

              <IonItem>
                <IonButton onClick={addSupplier} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add}/>
                Agregar Proveedor
                </IonButton>
              </IonItem>

              <IonGrid className="table">
                <IonRow>
                  <IonCol>Nombre</IonCol>
                  <IonCol>Contacto</IonCol>
                  <IonCol>Teléfono</IonCol>
                  <IonCol>Email</IonCol>
                  <IonCol>Dirección</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>

                {clientes.map((cliente:Supplier) =>

                    <IonRow>
                      <IonCol>{cliente.name}</IonCol>
                      <IonCol>{cliente.contact}</IonCol>
                      <IonCol>{cliente.phone}</IonCol>
                      <IonCol>{cliente.email}</IonCol>
                      <IonCol>{cliente.address}</IonCol>
                      <IonCol>
                        <IonCol>
                            <IonButton onClick={() => editSupplier(String(cliente.id))}color="dark" fill="clear"><IonIcon icon={pencil} slot="icon-only"/></IonButton>
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

export default SupplierList;

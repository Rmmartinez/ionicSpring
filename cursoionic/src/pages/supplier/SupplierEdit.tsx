import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory} from 'react-router';
import { useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import {checkmark,trash,pencil} from 'ionicons/icons';
import {searchSuppliers,saveSupplier,removeSupplier, searchSupplierByID} from './SupplierApi';
import Supplier from './Supplier';

const SupplierEdit: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string; }>();
  const [supplier,setSupplier] = useState<Supplier>({});
  const [clientes,setClientes] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
     search();
  }, []);   //Si entre corchetes pusiera clientes, se llamaría a la API cada vez que clientes se modifica


  const search = async () => {
    if(id !== 'new'){
        let result  = await searchSupplierByID(id);
        setSupplier(result);
    }

  }

  const save = async () => {
    await saveSupplier(supplier);
    //window.location.href = '/page/Suppliers';
    history.push('/page/Suppliers');
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
              <IonTitle>{id == 'new' ? 'Agregar Proveedor' : 'Editar Proveedor'}</IonTitle>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Nombre" labelPlacement="stacked" onIonChange={e => supplier.name = String(e.detail.value)} value={supplier.name}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Contacto" labelPlacement="stacked" onIonChange={e => supplier.contact = String(e.detail.value)} value={supplier.contact}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Email" labelPlacement="stacked" onIonChange={e => supplier.email = String(e.detail.value)} value={supplier.email}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Dirección" labelPlacement="stacked" onIonChange={e => supplier.address = String(e.detail.value)} value={supplier.address}></IonInput>
                           </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Teléfono" labelPlacement="stacked" onIonChange={e => supplier.phone = String(e.detail.value)} value={supplier.phone}></IonInput>
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

export default SupplierEdit;

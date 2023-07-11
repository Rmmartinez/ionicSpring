import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory} from 'react-router';
import { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonRow, IonCard, IonIcon, IonItem, IonButton } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import {add,trash,pencil} from 'ionicons/icons';
import {searchEmployees,saveEmployee,removeEmployee} from './EmployeeApi';
import Employee from './Employee'

const EmployeeList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [clientes,setClientes] = useState<Employee[]>([]);
  //cook, para el addEmployee
  const history  = useHistory();

  useEffect(() => {
     search();
  }, [history.location.pathname]);   //Si entre corchetes pusiera clientes, se llamaría a la API cada vez que clientes se modifica


  const search = async () => {
    let result = await searchEmployees();
    setClientes(result);

  }

  const remove = async (id: string) => {
    await removeEmployee(id);
    search(); //actualizar clientes mostrados
  }

    const addEmployee =() =>{
        //history.push('/page/employee/new');
        window.location.href = '/page/employee/new';
    }

    const editEmployee =(id: string) =>{
            //history.push('/page/employee/' + id);
            window.location.href = '/page/employee/' + id;
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
              <IonTitle>Gestión de Empleados</IonTitle>

              <IonItem>
                <IonButton onClick={addEmployee} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add}/>
                Agregar Empleado
                </IonButton>
              </IonItem>

              <IonGrid className="table">
                <IonRow>
                  <IonCol>Nombre</IonCol>
                  <IonCol>Email</IonCol>
                  <IonCol>Teléfono</IonCol>
                  <IonCol>Dirección</IonCol>
                  <IonCol>Salario</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>

                {clientes.map((cliente:Employee) =>

                    <IonRow>
                      <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
                      <IonCol>{cliente.email}</IonCol>
                      <IonCol>{cliente.phone}</IonCol>
                      <IonCol>{cliente.address}</IonCol>
                      <IonCol>{cliente.salary}</IonCol>
                      <IonCol>
                        <IonCol>
                            <IonButton onClick={() => editEmployee(String(cliente.id))}color="dark" fill="clear"><IonIcon icon={pencil} slot="icon-only"/></IonButton>
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

export default EmployeeList;

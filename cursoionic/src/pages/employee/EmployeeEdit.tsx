import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory} from 'react-router';
import { useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import {checkmark,trash,pencil} from 'ionicons/icons';
import {searchEmployees,saveEmployee,removeEmployee, searchEmployeeByID} from './EmployeeApi';
import Employee from './Employee';

const EmployeeEdit: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string; }>();
  const [employee,setEmployee] = useState<Employee>({});
  const [clientes,setClientes] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
     search();
  }, []);   //Si entre corchetes pusiera clientes, se llamaría a la API cada vez que clientes se modifica


  const search = async () => {
    if(id !== 'new'){
        let result  = await searchEmployeeByID(id);
        setEmployee(result);
    }

  }

  const save = async () => {
    await saveEmployee(employee);
    //window.location.href = '/page/Employees';
    history.push('/page/Employees');
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
              <IonTitle>{id == 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Nombre" labelPlacement="stacked" onIonChange={e => employee.firstname = String(e.detail.value)} value={employee.firstname}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Apellido" labelPlacement="stacked" onIonChange={e => employee.lastname = String(e.detail.value)} value={employee.lastname}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Email" labelPlacement="stacked" onIonChange={e => employee.email = String(e.detail.value)} value={employee.email}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Dirección" labelPlacement="stacked" onIonChange={e => employee.address = String(e.detail.value)} value={employee.address}></IonInput>
                           </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Teléfono" labelPlacement="stacked" onIonChange={e => employee.phone = String(e.detail.value)} value={employee.phone}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonInput label="Salario" labelPlacement="stacked" onIonChange={e => employee.salary = Number(e.detail.value)} value={employee.salary}></IonInput>
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

export default EmployeeEdit;

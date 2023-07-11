import Employee from "./Employee"

export async function searchEmployees() {
  //let url = process.env.REACT_APP_API + 'employees'
  let response = await fetch('http://localhost:8080/api/employees', {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

export async function removeEmployee(id: string){
      await fetch('http://localhost:8080/api/employees/'+ id, {
        "method": 'DELETE',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
}

//Guardar y editar
export async function saveEmployee(employee:any){
    await fetch('http://localhost:8080/api/employees', {
        "method": 'POST',
        "body": JSON.stringify(employee),
        "headers": {
          "Content-Type": 'application/json'
        }
      })

}

//buscar por ID
export async function searchEmployeeByID(id: string){
   let response = await fetch('http://localhost:8080/api/employees/'+id, {
       "method": 'GET',
       "headers": {
         "Content-Type": 'application/json'
       }
     })

     return await response.json();
}
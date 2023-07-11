import Customer from "./Customer"

export async function searchCustomers() {
  //let url = process.env.REACT_APP_API + 'customers'
  let response = await fetch('http://localhost:8080/api/customers', {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

export async function removeCustomer(id: string){
      await fetch('http://localhost:8080/api/customers/'+ id, {
        "method": 'DELETE',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
}

//Guardar y editar
export async function saveCustomer(customer:any){
    await fetch('http://localhost:8080/api/customers', {
        "method": 'POST',
        "body": JSON.stringify(customer),
        "headers": {
          "Content-Type": 'application/json'
        }
      })

}

//buscar por ID
export async function searchCustomerByID(id: string){
   let response = await fetch('http://localhost:8080/api/customers/'+id, {
       "method": 'GET',
       "headers": {
         "Content-Type": 'application/json'
       }
     })

     return await response.json();
}
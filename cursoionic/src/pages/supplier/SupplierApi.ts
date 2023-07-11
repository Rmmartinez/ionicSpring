import Supplier from "./Supplier"

export async function searchSuppliers() {
  //let url = process.env.REACT_APP_API + 'suppliers'
  let response = await fetch('http://localhost:8080/api/suppliers', {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

export async function removeSupplier(id: string){
      await fetch('http://localhost:8080/api/suppliers/'+ id, {
        "method": 'DELETE',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
}

//Guardar y editar
export async function saveSupplier(supplier:any){
    await fetch('http://localhost:8080/api/suppliers', {
        "method": 'POST',
        "body": JSON.stringify(supplier),
        "headers": {
          "Content-Type": 'application/json'
        }
      })

}

//buscar por ID
export async function searchSupplierByID(id: string){
   let response = await fetch('http://localhost:8080/api/suppliers/'+id, {
       "method": 'GET',
       "headers": {
         "Content-Type": 'application/json'
       }
     })

     return await response.json();
}
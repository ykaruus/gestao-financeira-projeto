

class Data {
    send(name,value,type) {
        fetch('/registro', 
        {
            headers: {
                "Content-Type": "application/json",
            }, 
            method: "POST", 
            body: JSON.stringify({nome:name,valor:value,tipo:type})
        }).then(response => {
            if(response.ok) {
                console.log('sucess');
            }
            console.log(response.body);
        }).catch(error => {
            console.log(error);
        });
    }
    async get_logs() {
        const response = await fetch('/registro', {
            headers: {
                "Content-Type": "application/json",
            },
            method:"GET"
        }).then(response => {
            return response.json()
        }).then((responseJson) => {
            return responseJson;
        });
        return response;
    }
    delete_item(nome){
        fetch('/delete-item/', {
            headers: {
                "Content-type": "application/x-form-urlencoded"
            },
            method: "DELETE",
            body: JSON.stringify({
                id: nome
            })
        })
    }
}
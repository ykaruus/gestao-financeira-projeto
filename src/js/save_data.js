

class DataBackEnd {
    async send(name,value,type) {
        await fetch('/registro', 
        {
            headers: {
                "Content-Type": "application/json",
            }, 
            method: "POST", 
            body: JSON.stringify({nome:name,valor:value,tipo:type})
        }).then(response => {
            if(response.ok) {
                console.log("Requisição HTTP POST -> '/registro' ");
            }
            return response.json();
        }).then(responseJson => {
            console.log(responseJson)
        })
        .catch(error => {
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
        fetch('/delete-item', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(
                {
                    id : nome
                }
            )
        }).then(response => {
            if(response.ok) console.log("request success");
            return response.json()
        }).then(responseJson => {
            console.log(responseJson.sucess)
        }).catch(err => {
            console.log(err);
        });
    }
}
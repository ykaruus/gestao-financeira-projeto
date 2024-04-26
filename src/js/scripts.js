









let VeArray = []; // Valores de entrada
let VsArray = []; // Valores de saida
let Ve_sum = 0;
let Vs_sum = 0;
let VsTotal = 0;

const boxManager = new BoxValue();
const data = new DataBackEnd();
const list = new List(data, VsArray, VeArray, Vs_sum, Ve_sum,VsTotal);



function filtrar() {
    switch (getTextOfitembox()) {
        case "Entradas":
            remove_invisible(document.querySelectorAll('.type_saida'));
            set_invisible(document.querySelectorAll('.type_entrada'));
            break;
        case "Todos":
            remove_invisible(document.querySelectorAll('.type_entrada'));
            remove_invisible(document.querySelectorAll('.type_saida'));
            break;
        case "Saidas":
            remove_invisible(document.querySelectorAll('.type_entrada'));
            set_invisible(document.querySelectorAll('.type_saida'));
            break;
    }
}

function set_invisible(obj) {
    obj.forEach(item => {
        let pai = item.parentElement;
        pai.classList.add("invisible");
    });
}
function remove_invisible(obj) {
    obj.forEach(item => {
        let pai = item.parentElement;
        pai.classList.remove("invisible");
    });
}




/*========================= ELEMENTOS DA PAGINA =========================*/

document.querySelectorAll('.item-box').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.ativo').forEach(ativo => {
            ativo.classList.remove('ativo')
        });
        item.classList.add('ativo');
    });
});



document.querySelectorAll('.option').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.on').forEach(ativo => {
            ativo.classList.remove('on')
        });
        item.classList.add('on')
    });
});


document.querySelector("#btn_new_value").addEventListener('click', () => {
    boxManager.mostrar();
});

document.querySelector("#save_btn").addEventListener('click', () => {
    if (boxManager.validarInput()) {
        list.create_list_item({
            nome: boxManager.pegarValores().nome,
            value: boxManager.pegarValores().valor,
            tipo: boxManager.pegarValores().tipo
        }, true);
        list.updateTotal();
        list.deleteBtnItems();
        boxManager.esconder();

    } else {
        alert("Cheque os dados :)");
    }
});

function getSelected() {
    let resul = false;
    tipo_val.forEach(item => {
        resul = item.classList.contains("type_entrada");
    });

    return resul
}
function getTextOfitembox() {
    let resul = "";
    document.querySelectorAll(".ativo").forEach(item => {
        resul = item.textContent;
    });

    return resul
}

// LOAD LOGS 


/*(async () => {
    const rows= await data.get_logs();
    rows.forEach(item => {
        list.create_list_item({item.nome:})
    })
})();*/
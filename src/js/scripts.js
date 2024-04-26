



const boxManager = new BoxValue();
const data = new DataBackEnd();
const list = document.querySelector("#list");
const $list_item = document.querySelectorAll('.container');
const $value = document.getElementsByClassName("val-box");
const tipo_val = document.querySelectorAll(".tipo");
let VeArray = []; // Valores de entrada
let VsArray = []; // Valores de saida
let Ve_sum = 0;
let Vs_sum = 0;
let VsTotal = 0;
function create_list_item({ nome, value, tipo }, save = false) {
    const $item_list = document.createElement("li");
    const $span_campo_nome = document.createElement("span");
    const $span_campo_valor = document.createElement("span");
    const $span_campo_type = document.createElement("span");
    const $span_delete_icon = document.createElement("span");
    let fomatted_value = parseFloat(value)
    let tipo_string = ""

    $item_list.classList.add('container');
    $span_campo_nome.classList.add("title-box");
    $span_campo_valor.classList.add("val-box");
    $span_campo_type.classList.add("tipo");
    $span_delete_icon.classList.add("delete-icon");




    if (tipo) {
        $span_campo_type.classList.add("type_entrada");
        $span_campo_type.innerText = "Entrou";
        $span_campo_valor.classList.add("color_entrada");
        tipo_string = "entrada";
        // array 

        VeArray.push(fomatted_value)
    } else {
        $span_campo_type.classList.add("type_saida");
        $span_campo_type.innerText = "Saiu";
        $span_campo_valor.classList.add("color_saida");
        tipo_string = "saida";

        VsArray.push(fomatted_value)
    }
    $span_campo_nome.innerText = nome;
    $span_campo_valor.innerText = "R$" + " " + value;

    $item_list.append($span_campo_nome);
    $item_list.append($span_campo_valor);
    $item_list.append($span_campo_type);
    $item_list.append($span_delete_icon);

    list.append($item_list);

    if (save) {
        data.send(nome, value, tipo_string);
    }

}
function deleteBtnItems() {

    document.querySelectorAll(".delete-icon").forEach(item => {
        item.addEventListener('click', () => {
            let pai = item.parentElement;
            let tipo = pai.children[2];
            let nome = pai.children[0];
            let value = pai.children[1].textContent.replace(/[0-9]/g, '').split(" ");
            let value_formt = parseFloat(value);
            if (tipo.classList.contains("type_entrada")) {
                delete_item_from_array(value_formt);
            } else {
                delete_item_from_array(value_formt, VsArray)
            }
            updateTotal();
            pai.remove();
            console.log(`${nome.textContent} foi clicacado`)
            data.delete_item(nome.textContent);
        });
    });
}

function delete_item_from_array(item, array=VeArray) 
{
    let index = array.indexOf(item);
    if(index > -1) 
    {
        array.splice(index, 1);
    }
}

function filtrar() {
    if (getTextOfitembox() == "Entradas") {
        remove_invisible(document.querySelectorAll('.type_saida'));
        set_invisible(document.querySelectorAll('.type_entrada'));
    }
    if (getTextOfitembox() == "Todos") {
        remove_invisible(document.querySelectorAll('.type_entrada'));
        remove_invisible(document.querySelectorAll('.type_saida'));
    }
    if (getTextOfitembox() == "Saidas") {
        remove_invisible(document.querySelectorAll('.type_entrada'));
        set_invisible(document.querySelectorAll('.type_saida'));
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

function updateTotal() {
    if (VsArray == undefined || VsArray.length == 0) {
        Vs_sum = 0;
    } else {
        Vs_sum = VsArray.reduce((zero, item) => {
            return zero + item;
        })
    }
    if (VeArray == undefined || VeArray.length == 0) {
        Ve_sum = 0
    } else {
        Ve_sum = VeArray.reduce((zero, item) => {
            return zero + item;
        });
    }
    VsTotal = Ve_sum - Vs_sum;
    document.querySelector("#total_span").textContent = `R$ ${Intl.NumberFormat().format(VsTotal)}`
}

document.querySelectorAll('.item-box').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.ativo').forEach(ativo => {
            ativo.classList.remove('ativo')
        });
        item.classList.add('ativo');
        filtrar();
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
document.querySelector("#cancel_btn").addEventListener('click', () => {
    boxManager.input_nome.value = "";
    boxManager.input_valor.value = "";
    boxManager.esconder()
});
document.querySelector(".close-icon").addEventListener('click', () => {
    boxManager.esconder()
});
document.querySelector("#save_btn").addEventListener('click', () => {
    if (boxManager.validarInput()) {
        create_list_item({
            nome: boxManager.pegarValores().nome,
            value: boxManager.pegarValores().valor,
            tipo: boxManager.pegarValores().tipo
        }, true);
        updateTotal();
        console.log(VeArray, VsArray);
        boxManager.esconder();
        filtrar();
        deleteBtnItems();
    } else {
        alert("CHEQUE OS DADOS!");
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

(async () => {
    try {
        const rows = await data.get_logs()
        rows.forEach(item => {
            create_list_item({nome: item.nome,value:item.value,tipo:item.tipo}, false);
        });
    } catch (error) {
        console.error(error);
    }
    deleteBtnItems();
    updateTotal();
})();

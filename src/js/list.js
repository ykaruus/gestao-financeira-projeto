class List {
    constructor(data, VsArray, VeArray, Vs_sum, Ve_sum, VsTotal)
    {
        this.data = data;
        this.VeArray = VeArray;
        this.VsArray = VsArray;
        this.Ve_sum = Ve_sum;
        this.Vs_sum = Vs_sum;
        this.VsTotal = VsTotal;
        this.list_element = document.querySelector("#list");
    }
    create_list_item({ nome, value, tipo }, save = false) {
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

            this.VeArray.push(fomatted_value)
        } else {
            $span_campo_type.classList.add("type_saida");
            $span_campo_type.innerText = "Saiu";
            $span_campo_valor.classList.add("color_saida");
            tipo_string = "saida";

            this.VsArray.push(fomatted_value)
        }
        $span_campo_nome.innerText = nome;
        $span_campo_valor.innerText = "R$" + " " + value;

        $item_list.append($span_campo_nome);
        $item_list.append($span_campo_valor);
        $item_list.append($span_campo_type);
        $item_list.append($span_delete_icon);

        this.list_element.append($item_list);

        if (save) {
            this.data.send(nome, value, tipo_string);
        }

    }
    delete_item_from_array(item, array = []) {
        let index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    updateTotal() {
        if (this.VsArray == undefined || this.VsArray.length == 0) {
            this.Vs_sum = 0;
        } else {
            this.Vs_sum = this.VsArray.reduce((zero, item) => {
                return zero + item;
            })
        }
        if (this.VeArray == undefined || this.VeArray.length == 0) {
            this.Ve_sum = 0;
        } else {
            this.Ve_sum = this.VeArray.reduce((zero, item) => {
                return zero + item;
            });
        }

        console.log((this.Ve_sum - this.Vs_sum),this.VsArray, this.VeArray);
        this.VsTotal = (this.Ve_sum - this.Vs_sum);
        document.querySelector("#total_span").textContent = `R$ ${Intl.NumberFormat().format(this.VsTotal)}`
    }
    deleteBtnItems() {
        document.querySelectorAll(".delete-icon").forEach(item => {
            item.addEventListener('click', () => {
                let pai = item.parentElement;
                let tipo = pai.children[2];
                let nome = pai.children[0];
                let value = pai.children[1].textContent.match(/(\d+)/).slice(" ");
                let value_formt = parseFloat(value[0]);
                console.log(value_formt, value)
                if (tipo.classList.contains("type_entrada")) {
                    this.delete_item_from_array(value_formt, this.VeArray);
                } else {
                    this.delete_item_from_array(value_formt, this.VsArray);
                }
                this.updateTotal();
                pai.remove();
                this.data.delete_item(value);
            });
        });
    }

}

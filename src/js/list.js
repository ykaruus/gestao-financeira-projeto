class List {
    constructor(data, VsArray = [], VeArray = [])
    {
        this.data = data;
        this.VeArray = VeArray;
        this.VsArray = VsArray;
        this.Ve_sum = 0;
        this.Vs_sum = 0;
        this.VsTotal = 0;
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

        list.append($item_list);

        if (save) {
            this.data.send(nome, value, tipo_string);
        }

    }
    deleteBtnItems() {
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
                this.data.delete_item(nome.textContent);
            });
        });
    }
    updateTotal() {
        if (VsArray == undefined || VsArray.length == 0) {
            this.Vs_sum = 0;
        } else {
            this.Vs_sum = VsArray.reduce((zero, item) => {
                return zero + item;
            })
        }
        if (VeArray == undefined || VeArray.length == 0) {
            this.Ve_sum = 0
        } else {
            this.Ve_sum = VeArray.reduce((zero, item) => {
                return zero + item;
            });
        }
        this.VsTotal = Ve_sum - Vs_sum;
        document.querySelector("#total_span").textContent = `R$ ${Intl.NumberFormat().format(this.VsTotal)}`
    }
}

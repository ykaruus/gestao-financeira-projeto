

class BoxValue {
    constructor()
    {
        this.fundo = document.querySelector('.fundo');
        this.caixa = document.querySelector('.caixa');
        this.input_nome = this.caixa.querySelector('#nome');
        this.input_valor = this.caixa.querySelector('#valor');
        this.ToggleBtn = this.caixa.querySelector('.option');
        this.inputs = this.caixa.querySelectorAll('.form-control');

        document.querySelector("#cancel_btn").addEventListener('click', () => {
            this.input_nome.value = "";
            this.input_valor.value = "";
            this.esconder()
        });
        document.querySelector(".close-icon").addEventListener('click', () => {
            this.esconder()
        });
    }
    mostrar() {
        this.caixa.classList.add('aparecer')
        this.fundo.classList.remove("esconder");
    } 
    esconder() {
        this.fundo.classList.add('esconder');
        
    }
    validarInput() {
        let validy;
        this.inputs.forEach(item => {
            console.log()
            if(!item.value)
            {
                validy = false;
            }else if(item.value.length > 10){
                validy = false;
            } else {
                validy =true;
            }
        });

        return validy;
    }
    pegarValores() {
        return {nome:this.input_nome.value,valor:this.input_valor.value, tipo:this.ToggleBtn.classList.contains("on")};
    }
}


class boxAlert {
    constructor() {
    }
}
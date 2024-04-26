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

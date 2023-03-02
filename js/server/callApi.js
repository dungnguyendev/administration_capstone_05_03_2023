function callApi () {
    this.addProduct = function(prod){
        return axios ({
            url:"https://63f4913e2213ed989c458946.mockapi.io/lan7/product",
            method:"POST",
            data:prod
        })
    }
    this.getList = function(){
        return axios ({
            url:"https://63f4913e2213ed989c458946.mockapi.io/lan7/product",
            method:"GET"
        })
    }
    this.getListById = function(id){
        return axios ({
            url:"https://63f4913e2213ed989c458946.mockapi.io/lan7/product/"+id,
            method:"GET"
        })
    }
    this.deleteProduct = function(id){
        return axios ({
            url:"https://63f4913e2213ed989c458946.mockapi.io/lan7/product/"+id,
            method:"DELETE"
        })
    }
    this.upDateProduct = function(item){
        return axios({
            url: "https://63f4913e2213ed989c458946.mockapi.io/lan7/product/" + item.id,
            method: "PUT",
            data: item
        })
    }
}
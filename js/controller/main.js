var callApi1 = new callApi()
var validation = new Validation()
var imgServer = ""
var typeServer = ""
// define getQry
const getQry = (id) => {
    return document.querySelector(id)

}
// format price
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})
getListProd()
function getListProd() {
    getQry("#renDer").style.display = "block"
    getQry("#nav-home").style.display = "none"
    callApi1.getList()
        .then(function (result) {
            getQry("#renDer").style.display = "none"
            getQry("#nav-home").style.display = "block"
            renDerProd(result.data)
        })
        .catch(function (err) { console.log(err); })
}

const renDerProd = (item) => {
    console.log(item);
    let renderListProd = ""
    let i = 0
    for (let [i, prod] of item.entries()) {
        renderListProd += `
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${prod.name}</td>
                    <td>${formatter.format(prod.price)}</td>
                    <td><img src="./img/product_tet/${prod.img}" alt=""></td>
                    <td>${prod.screen}</td>
                    <td>${prod.backCamera}</td>
                    <td>${prod.frontCamera}</td>
                    <td>${prod.description}</td>
                    <td class="text-center"><i onclick="checkUPdate(${prod.id})"  class="fa-regular fa-pen-to-square" data-bs-toggle="modal"
                    data-bs-target="#exampleModalUpdate"></i></td>
                    <td class="text-center"><i onclick="notification(${prod.id})" class="fa-regular fa-trash-can" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></td>
                </tr>
            `
    }
    getQry("#renDerProduct").innerHTML = renderListProd
}
getQry("#btnAdd").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm"
    var btnAdd = `<button class="btn btn-success" onclick= "handelAdd()">Add</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd

})
const handelAdd = () => {
    let type = ""
    let img = ""
    let name = getQry("#nameSp").value
    let price = getQry("#priceSp").value
    let screen = getQry("#screenSp").value
    let backCam = getQry("#backCameraSp").value
    let frontCam = getQry("#frontCameraSp").value

    if (getQry("#ImgSp").files.length > 0) {
        img = getQry("#ImgSp").files[0].name
    }
    let description = getQry("#descriptionSp").value
    let category = getQry("#category").value * 1
    if (category === 1) {
        type = "iPhone"
    } else if (category === 2) {
        type = "MacBook"
    } else if (category === 3) {
        type = "Apple Watch"
    }

    var isValid = true

    isValid &= validation.checkEmpty(name, "#tbName", "(*) Tên sản phẩm không để trống")
        && validation.checkCharacterLength(name, "#tbName", "(*) Vui lòng nhập từ 5 - 30 ký tự", 5, 30)
    isValid &= validation.checkEmpty(price, "#tbPrice", "(*) Giá tiền đang trống")
        && validation.checkPriceNumber(price, "#tbPrice", "(*) Vui lòng nhập dẫy số ")
    isValid &= validation.checkEmpty(screen, "#tbScreen", "(*) Màn hình đang trống")
    isValid &= validation.checkEmpty(backCam, "#tbBackCamera", "(*) Camera sau đang trống")
    isValid &= validation.checkEmpty(frontCam, "#tbFrontCamera", "(*) Camera trước đang trống")
    isValid &= validation.checkEmpty(img, "#tbImg", "(*) Hình sản phẩm không để trống")
    isValid &= validation.checkEmpty(category, "#tbCategory", "(*) Phân loại hàng không để trống")
    isValid &= validation.checkEmpty(description, "#tbdescriptionSp", "(*) Thông tin sản phẩm không để trống")
        && validation.checkCharacterLength(description, "#tbdescriptionSp", "(*) Vui lòng nhập từ 10 - 250 ký tự", 10, 250)
    if (!isValid) {
        return null
    } else {
        let prod = new product("", name, price, screen, backCam, frontCam, img, type, description)
        callApi1.addProduct(prod)
            .then(function () {
                getListProd()
                document.getElementsByClassName("btn-close")[0].click()
            })
    }

}
const notification = (id) => {
    getQry("#staticBackdropLabel").innerHTML = "Thông báo"
    getQry("#renderTb").innerHTML = `Bạn có muấn xoá mã sản phẩm:${id} này không ?`
    let btn1 = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" onclick="deleteProd(${id})" class="btn btn-primary">Delete</button>`
    getQry("#deleteProd").innerHTML = btn1

}
const deleteProd = (id) => {
    if (id) {
        callApi1.deleteProduct(id)
            .then(function () {
                getQry("#close").click()
                getListProd()
            })
    }
}
const checkUPdate = (id) => {
    document.getElementsByClassName("modal-title")[1].innerHTML = "Chỉnh sửa sản phẩm"
    var btnUpdate = `<button class="btn btn-success" onclick= "upDateProduct(${id})">Update</button>`
    document.getElementsByClassName("modal-footer")[1].innerHTML = btnUpdate
    callApi1.getListById(id)
        .then(function (result) {
            let product = result.data
            getQry("#nameSp1").value = product.name
            getQry("#priceSp1").value = product.price
            getQry("#screenSp1").value = product.screen
            getQry("#backCameraSp1").value = product.backCamera
            getQry("#frontCameraSp1").value = product.frontCamera
            getQry("#descriptionSp1").value = product.description
            getQry("#category1").value = product.name
            typeServer = product.category
            imgServer = product.img
        })

}

const upDateProduct = (id) => {
    let name = getQry("#nameSp1").value
    let price = getQry("#priceSp1").value
    let screen = getQry("#screenSp1").value
    let backCam = getQry("#backCameraSp1").value
    let frontCam = getQry("#frontCameraSp1").value
    let description = getQry("#descriptionSp1").value
    let category = getQry("#category1").value * 1
    let img = ""
    if (getQry("#ImgSp1").files.length > 0) {
        img = getQry("#ImgSp1").files[0].name
    } else if (img === "") {
        img = imgServer
    }
    let type = ""
    if (category === 1) {
        type = "iPhone"
    } else if (category === 2) {
        type = "MacBook"
    } else if (category === 3) {
        type = "Apple Watch"
    } else if (category === 0) {
        type = typeServer
    }

    var isValid = true
    isValid &= validation.checkCharacterLength(name, "#tbName1", "(*) Vui lòng nhập từ 5 - 30 ký tự", 5, 30)
    isValid &= validation.checkPriceNumber(price, "#tbPrice1", "(*) Vui lòng nhập dẫy số ")
    if (!isValid) {
        return null
    } else {

        let prod = new product(id, name, price, screen, backCam, frontCam, img, type, description)
        callApi1.upDateProduct(prod)
            .then(function () {
                getListProd()
                document.getElementsByClassName("btn-close")[1].click()
            })
    }
}
let carProducts = [
    { id: 1, name: "创意现代简约干花花瓶摆件", price: 20, num: 2, imgSrc: "./../img/sec102.jpg" },
    { id: 2, name: "白瓶绿植", price: 16, num: 1, imgSrc: "./../img/vase01.jpg" },
    { id: 3, name: "香薰1", price: 22.5, num: 3, imgSrc: "./../img/vase03.jpg" },
    { id: 4, name: "酒瓶干花", price: 12, num: 1, imgSrc: "./../img/xx103.jpg" }

]

let tbody = document.querySelector(".main .table tbody")
let tfoot = document.querySelector(".main .table tfoot")
let checkbox = document.querySelectorAll(".main .table table tbody .checkbox")
let count = 0;

main();
function main() {
    render();

}
function render() {   //渲染页面
    let str = ""
    carProducts.forEach(value => {
        str = str + `                    
        <tr>
        <td data-id="${value.id}">
            <input type="checkbox" class="checkbox">
        </td>
        <td class="second clearfix">
            <img src="${value.imgSrc}" alt="">
            <div class="text">
                <p class="p1">${value.name}</p>
                <p class="p">颜色分类：</p>
                <p class="p">白色瓷瓶+白色串枚</p>
            </div>
        </td>
        <td class="td3">￥${value.price}</td>
        <td class="td4">
            <div class="td4-con clearfix" data-id="${value.id}">
            <button class="sub" >-</button>
            <span>${value.num}</span>
            <button class="add" ">+</button>
            </div>
        </td>
        <td class=td5>${value.price * value.num}</td>
        <td class="del" data-id="${value.id}"><span>删除</span></td>
    </tr>`
    })
    tbody.innerHTML = str
    tfoot.innerHTML = `                    
    <tr>
    <td>
        <input type="checkbox">
    </td>
    <td class="tf-second" colspan="2">删除</td>
    <td class="tf-third" colspan="3">
        <div class="tf3-1">
            共<span>${count}</span>件商品
        </div>
        <div class="tf3-2">
            合计:
            &nbsp;
            <span>￥${sum()}</span>
        </div>
        <div class="tf3-3">结算</div>
    </td>
</tr>`
    del();
    add();
    sub();
}
debugger
checkbox.forEach(element => {
    console.log(element);
    element.onclick = function () {
        console.log(11111);
        if (element.checked) {
            carProducts.forEach(value => {
                if (this.parentElement.getAttribute("data-id") == value.id) {
                    count += value.num
                }
            })
            render();
        }
    }
})
function del() { //删除
    let dels = document.querySelectorAll(".main .table table tbody .del span")
    dels.forEach(element => {
        element.onclick = function () {
            carProducts.forEach((value, index) => {
                if (this.parentElement.getAttribute("data-id") == value.id) {
                    carProducts.splice(index, 1)
                    render();
                }
            })
        }
    })
}
function add() { //加按钮
    let adds = document.querySelectorAll(".main .table table tbody .td4 .td4-con .add")
    adds.forEach(element => {
        element.onclick = function () {
            carProducts.forEach(value => {
                if (this.parentElement.getAttribute("data-id") == value.id) {
                    value.num++
                    render();
                }
            })
        }
    })
}
function sub() {  //减按钮
    let subs = document.querySelectorAll(".main .table table tbody .td4 .td4-con .sub")
    subs.forEach(element => {
        element.onclick = function () {
            carProducts.forEach(value => {
                if (this.parentElement.getAttribute("data-id") == value.id) {
                    if (value.num >= 1) {
                        value.num--
                        render();
                    } else {
                        alert("商品不能为负")
                    }
                }
            })
        }
    })
}



function sum() { //共计多少元
    let sum = 0
    carProducts.forEach(value => {
        sum += value.num * value.price
    })
    return sum
}
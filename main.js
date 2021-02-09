
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCiB6qol9Q_XNOYlCh7znYUw6IzxJ4-3-g",
    authDomain: "romblonpebblesstore.firebaseapp.com",
    databaseURL: "https://romblonpebblesstore-default-rtdb.firebaseio.com",
    projectId: "romblonpebblesstore",
    storageBucket: "romblonpebblesstore.appspot.com",
    messagingSenderId: "1018602179391",
    appId: "1:1018602179391:web:40b02645e208a9793be18a",
    measurementId: "G-6QVE848BRD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  document.addEventListener('DOMContentLoaded', function(){
      
    var url = new URL(window.location.href);
    var data = url.searchParams.get("data");
    console.log(window.location.href);
    console.log('data',data)
    alert('data'+data)
  });

 // add to cart functions
function buy() {
    var productsFirebase=[];
    for (let index = 0; index < products.length; index++) {
         if (products[index].cart) {
              var product ={
                  name: products[index].name,
                  price: products[index].price,
                  quantity: products[index].quantity,
                  total: products[index].name,
              }
              productsFirebase.push(product);
         }
    }
    // check data if exists
    if(productsFirebase.length){
        
        const serialize = JSON.stringify(productsFirebase); // serialize data first
        window.location.href = `checkout.html?data=${serialize}`; // go to checkout.html
        
    }else{
        console.log('no product added');
    }

    /*
     Swal.fire({
         type: 'success',
         title: 'success',
         text: 'Order Successfully'

     });
     clean();*/
}



var products =[
    {
        id:1,
        img:'./img-pro-01.jpg',
        name: 'Beach Pebbles #25',
        price: 150.00,
        cart:false,
        quantity:1,
        total:0
    },
    {
      id:2,
      img:'./img-pro-02.jpg',
      name: 'Beach Pebbles #20',
      price: 150.00,
      cart:false,
      quantity:1,
      total:0
    },
    {
      id:3,
      img:'./img-pro-03.jpg',
      name: 'Beach Pebbles #30',
      price: 150.00,
      cart:false,
      quantity:1,
      total:0
    },
    {
      id:4,
      img:'./img-pro-04.jpg',
      name: 'Mountain Pebbles #10',
      price: 150.00,
      cart:false,
      quantity:1,
      total:0
    },
    {
      id:5,
      img:'./img-pro-05.jpg',
      name: 'Beach Pebbles #03',
      price: 150.00,
      cart:false,
      quantity:1,
      total:0
    },
    {
      id:6,
      img:'./img-pro-06.jpg',
      name: 'Beach Pebbles #10',
      price: 150.00,
      cart:false,
      quantity:1,
      total:0
    },
    {
      id:7,
      img:'./img-pro-07.jpg',
      name: 'Beach Pebbles #15',
      price: 150.00,
      cart:false,
      quantity:1,
      total:0
    },
];

function total() {
    let total=0;
    for (let index = 0; index < products.length; index++) {
        if (products[index].cart) {
            total+= products[index].total;
        }
        
    }
    return total
}

var con=0;
var con2=[]; // position at table

function clean() {
    for (let index = 0; index < products.length; index++) {
        products[index].cart=false;
        products[index].quantity=1;
        products[index].total=0;
        con2=[];
        updateCart();
        
    }
    
}

function add(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id != id || products[index].cart==true) {
            
        } else {
            products[index].cart=true;
            con2.push(products[index].id);
            document.getElementById('tableProducts').innerHTML+=`
            <tr>
            <th scope="row">${con+1}</th>
            <td><button class="btn btn-danger" onclick="remove(${products[index].id})
            ">x</button></td>
            <td><img style="width: 5rem;" src="${products[index].img}"></td>
            <td>${products[index].name}</td>
            <td>
            <button class="btn btn-primary" onclick="reduceAmount(${products[index].id})
            ">-</button> 
            <input style="width: 2rem;" id="${products[index].id}" 
            value="${products[index].quantity}" disabled>
            <button class="btn btn-primary" onclick="addAmount(${products[index].id})
            ">+</button> 
            </td>
            <td>PHP ${products[index].price*products[index].quantity}.00</td>
            </tr>        
            `
            con++;
            products[index].total=products[index].price*products[index].quantity
        }  
    } 
    document.getElementById('total').innerHTML=`
          <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td>
              <h4>Total: </h4>
          </td>
          <td>
              <h4>PHP ${total()}.00</h4>
          </td>
          </tr>
          <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
          <button onclick="buy()" class="btn btn-success">Buy</button>
          </td>
          </tr>
    
    `
}

function remove(id) {
   for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
            products[index].cart = false;
            products[index].total = 0;
            products[index].quantity = 1;
            total();
            for (let index2 = 0; index2 < con2.length; index2++) {
              if (products[index].id == con2[index2]) {
                  con2.splice(index2,1);  
              } else {  

              }
            
          }
          updateCart();
        } else {
          updateCart();
        
        }
    
      }
  
}
function updateCart() {
  con=0;
  
  document.getElementById('tableProducts').innerHTML='';
  for (let index = 0; index < con2.length; index++) {
      var position = con2[index];
      for (let index3 = 0; index3 < products.length; index3++) {
          if (position == products[index3].id) {
            document.getElementById('tableProducts').innerHTML+=`
            <tr>
            <th scope="row">${con+1}</th>
            <td><button class="btn btn-danger" onclick="remove(${products[index3].id})
            ">x</button></td>
            <td><img style="width: 5rem;" src="${products[index3].img}"></td>
            <td>${products[index3].name}</td>
            <td>
            <button class="btn btn-primary" onclick="reduceAmount(${products[index3].id})
            ">-</button> 
            <input style="width: 2rem;" id="${products[index3].id}" 
            value="${products[index3].quantity}" disabled>
            <button class="btn btn-primary" onclick="addAmount(${products[index3].id})
            ">+</button> 
            </td>
            <td>PHP ${products[index3].price*products[index3].quantity}.00</td>
            </tr>        
            `
            products[index3].total=products[index3].price*products[index3].quantity                     
          } else {

          }    
        
      }
      con=con+1;
  }
  if (total()==0) {
      document.getElementById('total').innerHTML='';
  } else {
    document.getElementById('total').innerHTML=`
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        Total: 
    </td>
    <td>
        PHP ${total()}.00
    </td>
    </tr>
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <button onclick="buy()" class="btn btn-success">Buy</button>
    </td>
    </tr>
    `
  }
    
}
function reduceAmount(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
              if (products[index].quantity >1) {
                  products[index].quantity = products[index].quantity-1;
                  updateCart();
              } else {
           }           
        } else {

        }
      
    }

  
}
function addAmount(id) {
    for (let index = 0; index < products.length; index++) {
          if (products[index].id == id) {
                if (products[index].quantity >0) {
                    products[index].quantity = products[index].quantity+1;
                    updateCart();
                } else {
              }           
          } else {

          }
    }

}



//render
(()=>{
    for (let index = 0; index < products.length; index++) {
       document.getElementById('row1').innerHTML+=`
            <div class="card m-2" style="width:20rem;">
            <img src="${products[index].img}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${products[index].name}</h5>
            <p class="card-text">PHP ${products[index].price}.00</p>
            <button class="btn btn-primary" onclick="add('${products[index].id}')">Add to cart</button>
            </div>
            </div>
       `;
        
    }

})();
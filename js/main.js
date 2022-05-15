class Product {
  constructor(name, description, id, price, stock) {
    this.name = name;
    this.description = description;
		this.id = id;
    this.price = price;
    this.stock = stock;
  }

	sellProduct(amount) {
		if(this.stock > amount) {
			document.querySelector("#sellProducts").innerHTML += `
			<div class="card" style="width: 18rem;" id="sellCard">
  		<div class="card-body">
    	<h5 class="card-title">${this.name.toUpperCase()}</h5>
    	<h6 class="card-subtitle mb-2 text-muted">Venta exitosa.</h6>
    	<p class="card-text">Felicitaciones! Vendio ${amount} unidad/es.</p>
			<p class="card-text">Le quedan ${this.stock - amount} unidad/es disponibles.</p>
    	<a href="./index.html" class="card-link" onclick="document.reload()">Aceptar</a>
  		</div>
		</div>
			`
		} else {
			document.querySelector("#sellProducts").innerHTML += `
			<div class="card" style="width: 18rem;" id="sellCard">
  		<div class="card-body">
    	<h5 class="card-title">${this.name.toUpperCase()}</h5>
    	<h6 class="card-subtitle mb-2 text-muted">Error.</h6>
    	<p class="card-text">No pudimos realizar la venta por falta de stock.</p>
			<p class="card-text">Le quedan ${this.stock} unidad/es disponibles.</p>
    	<a href="./index.html" class="card-link" onclick="document.reload()">Aceptar</a>
  		</div>
		</div>
			`
		}
	}
}

let productsArray = [];

let $form = document.querySelector("#form");
let $addButton = document.querySelector("#addBtn");
let $showButton = document.querySelector("#showBtn");

let $name = $form.name;
let $description = $form.description;
let $id = $form.id;
let $price = $form.price;
let $stock = $form.stock;

let $allProducts = document.querySelector("#allProducts");

let $sellForm = document.querySelector("#sell-form");
let $sellInput = document.querySelector("#sellName");
let $sellAmount = document.querySelector("#sellAmount");

let productsInStorage;

$form.addEventListener("submit", (e) => {
  e.preventDefault();
	if(validateForm()) {
		let item = new Product($name.value, $description.value, $id.value, $price.value, $stock.value);
		productsArray.push(item);
		localStorage.setItem('Products', JSON.stringify(productsArray));
		resetForm();
	} else {
		validateForm();
	}
});

$showButton.addEventListener('click', () => {
	productsInStorage = JSON.parse(localStorage.getItem('Products'));
	if(productsInStorage) {
		document.querySelector("#products").className = "";
		$allProducts.innerHTML = "";
  	productsInStorage.forEach(p => {
		$allProducts.innerHTML += `
				<div class="card border-secondary mb-3" style="max-width: 20rem;">
						<div class="card-header">Nombre: ${p.name}</div>
								<div class="card-body">
								<p class="card-text">Descripcion: ${p.description}</p>
								<p class="card-text">ID: ${p.id}</p>
								<p class="card-text">Precio: $${p.price}</p>
								<p class="card-text">Stock: ${p.stock}</p>
						</div>
				</div>
		`
	})
	} else {
		$allProducts.innerHTML = `
		<p>No hay productos que mostrar.</p>
		`
	}
	showSellForm();
});

let filterProduct;

$sellInput.addEventListener('change', () => {
	let search = $sellInput.value;
	for(let i = 0; i < productsInStorage.length; i++) {
		productsArray.push(productsInStorage[i]);
	}
	filterProduct = productsArray.filter(product => product.name.includes(search.toLowerCase()));
})


$sellForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let amount = $sellAmount.value;
	filterProduct = new Product(filterProduct[0].name, filterProduct[0].description, filterProduct[0].id, filterProduct[0].price, filterProduct[0].stock)
	filterProduct.sellProduct(amount);
	$sellForm.reset();
})


function showSellForm() {
	document.querySelector("#sellProducts").className = "";
}

function validateForm() {
	if(validateName() && validateDescription() && validateId() && validatePrice() && validateStock()) {
		return true;
	} else {
		validateName();
		validateDescription();
		validateId();
		validatePrice();
		validateStock();
		return false;
	}
}

function resetForm() {
	$name.value = '';
	$description.value = '';
	$id.value = '';
	$price.value = '';
	$stock.value = '';
}


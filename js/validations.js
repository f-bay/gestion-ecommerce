function validateName() {
	if($name.value) {
		$name.style.border = "";
		return true;
	} else {
		$name.style.border = "2px solid red";
		return false;
	}
}

function validateDescription() {
	if($description.value) {
		$description.style.border = "";
		return true;
	} else {
		$description.style.border = "2px solid red";
		return false;
	}
}

function validatePrice() {
	if($price.value) {
		$price.style.border = "";
		return true;
	} else {
		$price.style.border = "2px solid red";
		return false;
	}
}

function validateStock() {
	if($stock.value) {
		$stock.style.border = "";
		return true;
	} else {
		$stock.style.border = "2px solid red";
		return false;
	}
}

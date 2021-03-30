import { getLoggedInUser, } from "../data/apiManager.js"


export const NavBar = () => {
	//only show navItems and addTypeButton if user is logged in
	
	const navItems = getLoggedInUser().id ? `
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
	<ul class="navbar-nav me-auto mb-2 mb-lg-0">
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="allSnacks">All Snacks</button>
		</li>
		<li class="nav-item ms-1">
			<select class="form-select form-select btn-info" id="navList" aria-label="Select A Topping">
				<option selected>Select A Topping</option>
				
			</select>
		</li>
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="logout">Logout</button>
		</li>
	</ul>
	</div>` : ""

	const addTypeButton = getLoggedInUser().admin ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid">
		<form class= "new-input-container">
		<div class="typeForm">
		<input placeholder= "Enter Type Name"name ="type"></input>
		<button id ="submitType" class="btn btn-outline-primary" type="button">Add A Type</button>
		</div>
		<div class = "toppingForm">
		<input placeholder=" Enter Topping Name"name ="topping"></input>
		<button id ="submitTopping" class="btn btn-outline-primary" type="button">Add A Topping</button>
		<h4> Enter New Snack </h4>
		<label for ="snackname">Snack Name: </label>
		<input type ="text" id= "snackName" placeholder ="enter snack name here" name = "snack">
		<label for ="snackUrl">Snack Image URL: </label>
		<input type ="text" id= "snackUrl" placeholder ="enter snack URL here" name = "snackUrl">
		<label for ="snackCount">Snack Count: </label>
		<input type ="number" id= "snackCount" placeholder ="enter snack count" name = "snackCount">
		<label for ="topping selector"> Topping Select </label>
		<select id ="toppingSelect" name ="toppingSelect"><select>
		<label for ="snackDescription">Snack Description: </label>
		<input type ="text" id= "snackDescription" placeholder ="enter snack description" name = "snackDescription">
		<button id ="submitSnack" class="btn btn-outline-primary" type="button">Add A Snack</button>
		</form>
		</div>
	</nav>` : ""

	return `
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  		<div class="container-fluid">
		  <span class="navbar-brand mb-0 h1">LDCC
		  	<span class="navbar-text">Little Debbie Collector Club</span>
		  </span>
		${navItems}
  		</div>
	</nav>
	${addTypeButton}
	`
}
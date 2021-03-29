console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser,
	addASnack,getSnacks, getSingleSnack, getSnackToppings, getToppings, filterSnackTopping,addATopping, addAType
} from "./data/apiManager.js";




const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

// snack listeners

applicationElement.addEventListener("click", event => {
	if(event.target.id === "submitType") {
		event.preventDefault();
		const typeEntry = document.querySelector("input[name='type']").value
		const typeObject ={
			name:typeEntry
		}
		addAType(typeObject)
		.then(response => {
			location.reload(true);
		})
	}
})
applicationElement.addEventListener("click", event => {
	if(event.target.id === "submitTopping") {
		event.preventDefault();
		const toppingEntry = document.querySelector("input[name='topping']").value
		const toppingObject ={
			name:toppingEntry
		}
		addATopping(toppingObject)
		.then(response => {
			location.reload(true);
		})
	}
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "submitSnack") {
		event.preventDefault();
		const snackEntry = document.querySelector("input[name='snack']").value
		const snackObject ={
			name:toppingEntry
		}
		addATopping(toppingObject)
		.then(response => {
			location.reload(true);
		})
	}
})
applicationElement.addEventListener("change", event => {
	if (event.target.id === "navList") {
		 let toppingValue = event.target.value
		 filterSnackTopping(toppingValue)
		 .then(response =>{
			 let snackArray = [];
			 response.forEach(topping => {
				 snackArray.push(topping.snack)
			 })
			 const toppingElement = document.querySelector("#mainContent")
			toppingElement.innerHTML = SnackList(snackArray);
		 })
	}
})
applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
		.then(snackObj => {
				getSnackToppings(snackId)
				.then(snackToppings =>{
					console.log(snackToppings); 
					snackToppings
					showDetails(snackObj, snackToppings);
				})
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

const showDetails = (snackObj, snackToppings) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj,snackToppings);
}
//end snack listeners

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}
const createToppingList = () => {
	const entryHTMLSelector = document.querySelector(".form-select");
	getToppings().then(response =>{
		response.forEach((toppingObj,index)=>{
			entryHTMLSelector.options[index+1] = new Option(toppingObj.name,toppingObj.id)
		})
	})
}

//  const showFilteredTopping =() =>{
// 	 const filteredTopping = makeToppingList().filter(singleTopping =>{
// 		 if (singleTopping === toppingValue){
// 			 return singleTopping
// 		 }
// 	 })
// 	 makeToppingList(filteredTopping)
//  }

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	showNavBar();
	applicationElement.innerHTML += `<div id="mainContent"></div>`;
	showSnackList();
	showFooter();
	createToppingList();

}

checkForUser();
window.onload = () => {
	onContactFormSubmit();
	validateForm();
}

function validateForm(){
	// Regular expressions to check the format of email, full name and message feilds input
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	const nameFormat = /^[a-zA-Z]+[a-z ,.'-]+$/i;
	const msgFormat = /\S/;

	let sendBtn = contactForm.send;
	// Store the regular expression format and flag
	let formFields = {
		email: {matchFormat: mailformat, isValid: false},
		fullname: {matchFormat: nameFormat, isValid: false},
		message: {matchFormat: msgFormat, isValid: false}
	};

	// Every time the input changes, check if the input is valid in real time
	contactForm.oninput = event => {
		let target = event.target;
		if(target.value.match(formFields[target.name].matchFormat)){
			formFields[target.name].isValid = true;
			target.classList.add('valid');
			target.classList.remove('invalid');
		}
		else {
			formFields[target.name].isValid = false;
			target.classList.add('invalid');
			target.classList.remove('valid');
		}		

		validateForm();		
	}

	// Check if all of form fields are valid
	function validateForm(){
		if(formFields.email.isValid && formFields.fullname.isValid && formFields.message.isValid){
			sendBtn.classList.remove('inactiveSendBtn');
			sendBtn.classList.add('activeSendBtn');
			sendBtn.disabled = false;
		}
		else{
			sendBtn.classList.remove('activeSendBtn');
			sendBtn.classList.add('inactiveSendBtn');
			sendBtn.disabled = true;			
		}
	}
}

/*
*  The event handler of form submit is to show the success message.
*/
function onContactFormSubmit(){
	let contactForm = document.contactForm;
	contactForm.onsubmit = event => {	
		event.preventDefault();

		// Show the stamp and success message.
		contactForm.classList.add('hidden');
		document.getElementById('successMsg').classList.remove('hidden');
	}
}
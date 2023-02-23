// import swal from 'sweetalert';

myFunction = () => {
  const x = document.getElementById("myPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  const eye = document.getElementById("eye");
  eye.classList.toggle("fa-eye-slash");
}
myFunction1 = () => {
  const y = document.getElementById("myPassword1");
  if (y.type === "password") {
    y.type = "text";
  } else {
    y.type = "password";
  }
  const eye1 = document.getElementById("eye1");
  eye1.classList.toggle("fa-eye-slash");
}


const registerForm = document.querySelector("#register")

registerForm.addEventListener('submit', function (e) {
  // geting form data
  const formData = Object.fromEntries([...new FormData(this)])


  // validating email
  if (formData.email !== formData.confirmEmail) {
    swal({
      text: "The email and confirm email do not match. Please try again.",
      icon: "error",
    })
      .then(() => {
        document.querySelector('#email').scrollIntoView({ behavior: "smooth" })
      })

    return e.preventDefault();

    // validating password
  } else if (formData.password !== formData.confirmPassword) {
    swal({
      text: "The password and confirm password do not match. Please try again.",
      icon: "error",
    })
      .then(() => {
        document.querySelector('#email').scrollIntoView({ behavior: "smooth" })
      })
    return e.preventDefault()
  }
})
// Password Validation
  // required = () =>{
  //  const input = document.getElementById("myPassword");
  //   const password = input.value;
  //   let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
  //   reg.test(password) ? alert("Password is valid") : alert("Password is not valid");






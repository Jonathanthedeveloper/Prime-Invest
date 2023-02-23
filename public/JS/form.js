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
  myFunction1 = () =>{
    const y = document.getElementById("myPassword1");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
    const eye1 = document.getElementById("eye1");
    eye1.classList.toggle("fa-eye-slash");
  }
  // Password Validation
  // required = () =>{
  //  const input = document.getElementById("myPassword");
  //   const password = input.value;
  //   let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
  //   reg.test(password) ? alert("Password is valid") : alert("Password is not valid");
  // }
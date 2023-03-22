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

//For the moving particles
var particles = Particles.init({
  selector: ".background",
  maxParticles: 100,
  sizeVariations: 7,
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        maxParticles: 50,
        sizeVariations: 2,
        connectParticles: true,
      },
    },
  ],
});




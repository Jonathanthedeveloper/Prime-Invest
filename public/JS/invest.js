document.addEventListener('DOMContentLoaded', function () {
    const investStatus = document.querySelector('.invest-status').textContent.trim()

    console.log(investStatus);


    if (investStatus === 'success') {
        swal({
            icon: "success",
            title: "Success",
            text: "Your request has been summitted successfully",
            button: "Go To dashboard"
        })
    } else if (investStatus === 'fail') {
        swal({
            icon: "error",
            title: "Failed",
            text: "Payment failed, please try again later",
            buttons: ["try again", "Go to Dashboard"]
        })
    }
})

const form = document.getElementById("form")
form.addEventListener("submit", function (event) {
    const {plan , amount} = Object.fromEntries([...new FormData(this)])
    if (!plan || !amount) {
        return event.preventDefault()
    }
    if (plan === "starter" && (amount < 100 || amount >= 5000) ){
        alert("Invalid Amount")
        event.preventDefault()
    } else if(plan === "platinum" && (amount < 5000 || amount >=10000) ){
        alert("Invalid Amount")
        event.preventDefault()
    }else if(plan === "premium" && (amount < 10000 || amount >=20000) ){
        alert("Invalid Amount")
        event.preventDefault()
    }else if(plan === "zenith" && amount < 20000 ){
        alert("Invalid Amount")
        event.preventDefault()
    }
})
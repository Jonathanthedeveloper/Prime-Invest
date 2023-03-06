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
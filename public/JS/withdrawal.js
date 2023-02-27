
function showRelevantPlaceholder() {

}

document.addEventListener('DOMContentLoaded', function () {
    const withdrawalStatus = document.querySelector('.withdrawal-status').textContent.trim()

    console.log(withdrawalStatus);


    if (withdrawalStatus === 'success') {
        swal({
            icon: "success",
            title: "Success",
            text: "Your request has been summitted successfully",
            button: "Go To dashboard"
        })
    } else if (withdrawalStatus === 'fail') {
        swal({
            icon: "error",
            title: "Failed",
            text: "Payment failed, please try again later",
            buttons: ["Retry", "Go To Dashboard"]
        })
    }
})
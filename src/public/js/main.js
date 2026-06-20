
//close toast-message
function closeToast(id) {
    const toast = document.getElementById(id);

    if (toast) {
        toast.remove();
    }
}

setTimeout(() => {
    document.querySelectorAll(".toast-message").forEach(toast => {
        toast.remove();
    });
}, 5000);
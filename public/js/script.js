window.onload = function () {
    let crawlForm = document.getElementById("crawlForm");
    let crawlButton = document.getElementById("crawlButton");
    crawlButton.addEventListener('click', () => {
        crawlButton.disabled = true;
        crawlButton.innerHTML = "Loading...";
        crawlForm.submit();
    })
};
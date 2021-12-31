//插入图书
const submit = document.querySelector("form input[type='submit']");
const message = document.querySelector(".message");
submit.addEventListener("click", addBook);
function addBook() {
    const inputs = document.querySelectorAll("input");
    console.log(inputs[0].value);
    let newBook = {
        title: inputs[0].value,
        author: inputs[1].value,
        publisher: inputs[2].value,
        price: inputs[3].value,
        place: inputs[4].value
    }
    fetch("/admin/add-book", {
        method: "POST",
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newBook)
    }).then(result => result.json()).then(result => checkAddStatus(result, inputs));
}

function checkAddStatus(result,inputs) {
    if (result.status === true) {
        message.innerHTML = "Book added &#x2713;";
        message.style.opacity = "1";
        setTimeout(function () {message.style.removeProperty("opacity");}, 3000)
        inputs.forEach(input =>{input.value = "";})
        window.location.replace("/main.html");
    } else {
        message.innerHTML = "添加失败！只有管理员能操作";
        message.style.opacity = "1";
        setTimeout(function () {message.style.removeProperty("opacity");}, 3000)
    }
};

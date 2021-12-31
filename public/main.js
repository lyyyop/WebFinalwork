//显示书本
const table = document.querySelector("table");
fetch("/get-books").then(result => result.json()).then(data => displayBooks(data));
function displayBooks(data) {
    data.books.forEach(item => {
        addBookToTable(item);
    })
    console.log(data);
}

function addBookToTable(item) {
    let tree = document.createElement("tr");

    let title = document.createElement("td");
    title.textContent = item.title;
    let author = document.createElement("td");
    author.textContent = item.author;
    let publisher = document.createElement("td");
    publisher.textContent = item.publisher;
    let place = document.createElement("td");
    place.textContent = item.place;
    let price = document.createElement("td");
    price.textContent = item.price;

    tree.appendChild(title);
    tree.appendChild(author);
    tree.appendChild(publisher);
    tree.appendChild(place);
    tree.appendChild(price);
    tree.className = item._id;
    table.appendChild(tree);
}

const searchButton = document.querySelector("input[type='submit']");

searchButton.addEventListener("click", searchBook);
function searchBook() {
    const search=document.querySelector("input[name='title']").value;

    let searchtitle = {
        search: search
    }
    fetch("/search", {
        method: "POST",
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(searchtitle)
    }).then(result => result.json()).then(data => displayBooks(data));
    function displayBooks(data) {
        data.books.forEach(item => {
            for (var i = table.childNodes.length - 1; i >= 0; i--) { // 一定要倒序，正序是删不干净的，可自行尝试
                table.removeChild(table.childNodes[i]);
            }
            addBookToTable(item);
        })
        console.log(data);
    }
}
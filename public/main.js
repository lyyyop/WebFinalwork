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

    let author = document.createElement("td");
    author.textContent = item.author;
    let title = document.createElement("td");
    title.textContent = item.title;
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

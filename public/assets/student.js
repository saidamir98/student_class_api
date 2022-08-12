let studentListEl = document.getElementById("student-list")
let searchBtn = document.getElementById("search")
const registerBtn = document.getElementById("register-student")

const SERVER_URL = "http://localhost:3000/student"

async function getData(url) {
    try {
        const response = await fetch(url);
        var data = await response.json();
        return data
    } catch(err) {
        console.log(err)
        throw err
    } 
}

async function loadData(url) {
    try {
        let studentList = await getData(url)
        let html = '' 
        studentList.forEach(el => {
            html = html + `
            <div id="student-${el.id}" class="student-el">
                <p>id: ${el.id}</p>
                <p>name: ${el.name}</p>
                <p>email: ${el.email}</p>
                <p>created_at: ${el.created_at}</p>
                <p>updated_at: ${el.updated_at}</p>
            </div>
            `
        });

        studentListEl.innerHTML = html
    } catch(err) {
        console.log(err)
    }
}

loadData(`${SERVER_URL}`)

searchBtn.addEventListener("click", (e) => {
    let studentSearchValue = document.getElementById("student-search-input").value

    let url = `${SERVER_URL}?search=${studentSearchValue}`

    console.log(url)

    loadData(url)
})


registerBtn.addEventListener("click", async (e) => {
    try {
        let form = document.getElementById("student-form");

        let formData = new FormData(form);

        let data = Object.fromEntries(formData)

        await sendPostRequest(`${SERVER_URL}`, data)
        await loadData(`${SERVER_URL}`)
    } catch (err) {
        console.log(err)
    }
})

function sendPostRequest(url, data) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}
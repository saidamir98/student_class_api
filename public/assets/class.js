let classListEl = document.getElementById("class-list")
let classDetailedView = document.getElementById("class-detailed-view")
let searchBtn = document.getElementById("search")
const registerBtn = document.getElementById("register-class")

const SERVER_URL = "http://localhost:3000/class"

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
        let classList = await getData(url)
        let html = '' 
        classList.forEach(el => {
            html = html + `
            <div id="class-${el.id}" class="class-el">
                <p>id: ${el.id}</p>
                <p>title: ${el.title}</p>
                <input type="button" class="item-detail-view" onclick="loadDetailedData(${el.id})" value="${el.id}">
            </div>
            `
        });

        classListEl.innerHTML = html
    } catch(err) {
        console.log(err)
    }
}

loadData(`${SERVER_URL}`)

searchBtn.addEventListener("click", (e) => {
    let classSearchValue = document.getElementById("class-search-input").value

    let url = `${SERVER_URL}?search=${classSearchValue}`

    console.log(url)

    loadData(url)
})


registerBtn.addEventListener("click", async (e) => {
    try {
        let form = document.getElementById("class-form");

        let formData = new FormData(form);

        let data = Object.fromEntries(formData)

        await sendPostRequest(`${SERVER_URL}`, data)
        loadData(`${SERVER_URL}`)
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

async function loadDetailedData(id) {
    document.getElementById('class-view').hidden = true
    classDetailedView.hidden = false

    loadClassData(`http://localhost:3000/class_student/${id}`)
}

async function back() {
    document.getElementById('class-view').hidden = false
    classDetailedView.hidden = true
}


async function loadClassData(url) {
    try {
        console.log(url)
        let data = await getData(url)
        console.log(data)
        let studentList = data.students
        let html = `
        <div id="class-${data.class.id}" class="class-el">
                <p>id: ${data.class.id}</p>
                <p>title: ${data.class.title}</p>
                <input type="button" class="item-detail-view" onclick="loadDetailedData(${data.class.id})" value="${data.class.id}">
            </div>
        ` 
        studentList.forEach(elData => {
            let el = elData.student
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

        classDetailedView.innerHTML = html
    } catch(err) {
        console.log(err)
    }
}


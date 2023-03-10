const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone_container");
    phoneContainer.innerText = "";
    // display 10 phone only
    const showAll = document.getElementById("show_all");
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0,10);
        // const showAll = document.getElementById("show_all");
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");

    }

    
    // display no phone
    const noPhone = document.getElementById("no-phone-message");
    if(phones.length === 0 ) {
        noPhone.classList.remove("d-none");
    }
    else {
        noPhone.classList.add("d-none");
    }

    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
            <img src="${phone.image}"{" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                  to additional content. This content is a little bit longer.</p>
                  <button onclick= "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone_details_modal">Show Details</button>
                
                </div>
            </div>
        
        `;
        phoneContainer.appendChild(phoneDiv)



    });
    // stop loader
    toggleSpinner(false);

}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search_field");
    const searchText = searchField.value;
    loadPhone(searchText);
}
// handle search button click
document.getElementById("btn_search").addEventListener("click", function() {
    // start loading
    processSearch(10);
})
// add search button event handler
document.getElementById('search_field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
      // code for enter
    }
});


const toggleSpinner = isloading => {
    const loaderSection = document.getElementById("loader");
    if(isloading){
        loaderSection.classList.remove("d-none")
    }
    else {
        loaderSection.classList.add("d-none")
    }

}
// not the best way to load show all data
document.getElementById("btn_show_all").addEventListener("click", function() {
    processSearch()
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);


}

const displayPhoneDetails = phone => {
    console.log(phone);
    
    
}


// loadPhone();
const loadPhones = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, dataLimit));
};

const displayPhones = (phones, dataLimit) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";

  // display 20 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-block");
  }

  // display no phone found message
  const phoneNotFound = document.getElementById("phone-not-found");
  if (phones.length === 0) {
    phoneNotFound.classList.remove("d-none");
  } else {
    phoneNotFound.classList.add("d-none");
  }

  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
      <div class="card p-3" style="width: 18rem">
         <img class="w-full" src=${phone.image} alt="Card image cap" />
         <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
            </p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-toggle="modal"
            data-target="#phoneDetailsModal">Show Details</button>
        </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });

  // stop spinner
  toggleSpinner(false);
};

const proessSearch = (dataLimit) => {
  // start spinner
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// handle search box
document.getElementById("btn-search").addEventListener("click", function () {
  proessSearch(12);
});

// search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    console.log(e.key);
    if (e.key === "Enter") {
      proessSearch(12);
    }
  });

// spinner
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// not the best solution to show all products
document.getElementById("btn-show-all").addEventListener("click", function () {
  proessSearch();
});

const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const phoneModalContent = document.getElementById("phone-modal-content");
  phoneModalContent.innerHTML = `
  <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="phoneDetailsModalLabel">
                 ${phone.name}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
              <img class="image-fluid" src=${phone.image} />
                <p>Release Date: ${
                  phone.releaseDate
                    ? phone.releaseDate
                    : "No release date found"
                }</p>  
                <p>Cheapset: ${
                  phone.mainFeatures.chipSet
                    ? phone.mainFeatures.chipSet
                    : "No cheapset found"
                }</p>  
                <p>Display: ${
                  phone.mainFeatures.displaySize
                    ? phone.mainFeatures.displaySize
                    : "No display information found"
                }</p>  
                <p>Memory: ${
                  phone.mainFeatures.memory
                    ? phone.mainFeatures.memory
                    : "No memory information found"
                }</p>  
                  
              </div>
              
            </div>
          </div>
  `;
};

loadPhones("apple");

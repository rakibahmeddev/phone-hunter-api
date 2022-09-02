const loadPhones = (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

const displayPhones = (phones) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";

  // display 20 phones
  phones = phones.slice(0, 12);

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
        </div>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });

  // stop spinner
  toggleSpinner(false);
};

document.getElementById("btn-search").addEventListener("click", function () {
  // start spinner
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
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

// loadPhones();

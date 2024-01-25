// Global Variables
let users = [];
let url = 'https://randomuser.me/api/1.4/?inc=picture,name,email,location,phone,dob,nat&results=12&nat=US'
const gallery = document.querySelector('#gallery');

// 2. Get and display 12 random users
// With the information provided from The Random User Generator API, send a single request to the API.
async function getRandomUsers() {
    try {
        //  - retrieve the image, name, email, location from 12.
        const response = await fetch(url);

        if (!response.ok) throw new Error('There was an error retrieving the data.');

        //  - Convert the response to JSON.
        const data = await response.json();

        // Data added to users variable
        users = data.results;

        //  - pass the users to the displayCountries function.
        displayUsers(users);

    } catch (error) {
        //  - Catch any errors and log them to the console.
        console.error(error)
    }
}

/*
Refer to the mockups and the comments in the index.html file for an example of 
what info should be displayed on the page and how it should be styled. 
*/

function displayUsers(data) {
    //  - Loop over the array of users.
    data.forEach(user => {
        //      - Create a div for user.
        //      - Add the user name and image to the div with the provided HTML structure.
        let userHTML = `
            <div class="card" data-name="${user.email}">
                <div class="card-img-container">
                    <img class="card-img" src=${user.picture.medium} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `;

        //      - Add the created div to the gallery element.
        gallery.insertAdjacentHTML('beforeend', userHTML);
    });
};

/* 3. Create a modal window
// When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
// Image, Name, Email, City or location, Cell Number, Detailed Address, including street name and number, state or country, and postcode, Birthday */
gallery.addEventListener('click', e => {
     //   Make sure that only clicks on the user element are targeted
    const userCard = e.target.closest('.card');

    if (!userCard) return;
    
    //     Get the user name from the clicked element
    const userName = userCard.dataset.name;

    //     Find the user object in the users array that matches the name
    const user = users.find(
        (user) => user.email === userName
    );
    displayUserModal(user);
});

//   update the user content with the user data
function displayUserModal(user) {

    // Format date of birth with leading zeros: 01/01/1999 10/10/1999
    let dob = new Date(user.dob.date);
    let day = dob.getDay() + 1 < 10 ? `0${dob.getDay() + 1}` : `${dob.getDay() + 1}`;
    let month = dob.getMonth() + 1 < 10 ? `0${dob.getMonth() + 1}` : `${dob.getMonth() + 1}`;
    let year = dob.getFullYear() + 1;
    dob = `${month}/${day}/${year}`

    // console.log("from displayUserModal")
    const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}
        </div>
    </div>
    `
    document.body.insertAdjacentHTML('beforeend', modalHTML)

    modalContainer = document.querySelector('.modal-container');
    closeButton = document.querySelector('#modal-close-btn');

    // Click event listener on the close button
    closeButton.addEventListener('click', ()  => {
        modalContainer.remove();
    });

    // Click event listener outside the modal
    modalContainer.addEventListener('click', e  => {
        const isOutSide = !e.target.closest('.modal');
        if (isOutSide) {
            modalContainer.remove();
        }
    });

    // Close the modal when the user presses the escape key
    document.addEventListener('keyup', e  => {
        if (e.key === 'Escape') {
            modalContainer.remove('open');
        }
    });
}; 

/*
Extra Credit

To get an "exceeds" rating, complete all of the steps below:
*/

// 1. Add search functionality
function addSearchComponent() {
    const searchComponent = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `
    console.log(searchComponent);
    // Get search box container Div
    const searchContainer = document.querySelector(".search-container");
    console.log(searchContainer);
    // Insert the the search component into the DOM
    searchContainer.insertAdjacentHTML("beforeend", searchComponent);
 }


// Call the getRandomUsers function.
getRandomUsers();

// Call the Search Component.
addSearchComponent();

// Get Search Component
const searchInput = document.querySelector("#search-input");
console.log(searchInput);

// Event listener on Search Component
searchInput.addEventListener("keyup", e => {

    console.log(users);
   
    // Create a variable storing an empty array for the soon-to-be filtered users.
    const newUsers = [];
  
 
    // Create a variable to store the string the user has typed.
    console.log(e);
    let userInput = e.target.value.toLowerCase();
    console.log(userInput);
 
    // Loop through the data array of users
    for (let i = 0; i < users.length; i++) {
       // Create variables to hold the user name
       const userFirstName = users[i].name.first.toLowerCase();
       const userLastName = users[i].name.last.toLowerCase();
       const userFullName = userFirstName + " " + userLastName
       console.log(userFullName);
 
       // Conditional to check if the user's first or last name includes the user's input.
       if (userFullName.includes(userInput)) {
          console.log(userFullName);
          console.log(users[i]);
          newUsers.push(users[i]);
       }
    }
 
    console.log(newUsers);
    console.log(newUsers.length);
       
    // Conditional to check if the length of the new array is greater than zero.
    if (newUsers.length > 0) {
       gallery.innerHTML = "";
       // Call the displayUsers() function passing it this new users array.
       displayUsers(newUsers);
    } else {
       // If no matches are found for a search, display a “No results found” type message on the page.
       const html = `<h3 class="no-results">No Results Found!</h3>`
       gallery.innerHTML = html;
    }
 
 });
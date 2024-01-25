// Global Variables
let users = [];
let url = 'https://randomuser.me/api/1.4/?inc=picture,name,email,location,phone,dob&results=12'
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
        console.log(users);

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
    console.log(data);
    //  - Loop over the array of users.
    data.forEach(user => {
        console.log(user);
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
    console.log(userCard);

    if (!userCard) return;
    
    //     Get the user name from the clicked element
    const userName = userCard.dataset.name;
    console.log(userName);

    //     Find the user object in the users array that matches the name
    const user = users.find(
        (user) => user.email === userName
    );
    console.log(userName);
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
    console.log(modalContainer);
    closeButton = document.querySelector('#modal-close-btn');
    console.log(closeButton);

    // Click event listener on the close button
    closeButton.addEventListener('click', ()  => {
        modalContainer.remove();
    });

    // Click event listener outside the modal
    modalContainer.addEventListener('click', e  => {
        const isOutSide = !e.target.closest('.modal');
        if (isOutSide) {
            console.log(e.target.closest);
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

// Call the getRandomUsers function.
getRandomUsers()
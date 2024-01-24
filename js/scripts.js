// Global Variables
let users = [];
const gallery = document.querySelector('#gallery');

// 2. Get and display 12 random users
// With the information provided from The Random User Generator API, send a single request to the API.
async function getRandomUsers() {
    try {
        //  - retrieve the image, name, email, location from 12.
        const response = await fetch('https://randomuser.me/api/1.4/?inc=picture,name,email,location&results=12');

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
        //      - Add the user name and iamge to the div with the provided HTML structure.
        let userHTML = `
            <div class="card">
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

        //      - Add the created div to the `.countries` container element.
        gallery.insertAdjacentHTML('beforeend', userHTML);
    });
};

// Call the getRandomUsers function.
getRandomUsers()
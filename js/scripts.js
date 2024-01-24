// Global Variables
let users = [];

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
        users = data;
        console.log(users);

        //  - pass the data to the displayCountries function.
        console.log(data);
        displayUsers(data);

    } catch (error) {
        //  - Catch any errors and log them to the console.
        console.error(error)
    }
}

// Refer to the mockups and the comments in the index.html file for an example of 
// what info should be displayed on the page and how it should be styled.
function displayUsers(data) {
    console.log(data);
};

getRandomUsers()
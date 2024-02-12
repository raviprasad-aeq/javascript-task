// Get references to form elements
const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const sportTypeInput = document.getElementById("sport-type");
const sportDropdown = document.getElementById("sport");
const profilePictureInput = document.getElementById("profile-picture");
const userCards = document.getElementById("user-cards");
console.log()
let editedCard = null;

// Add a change event listener to the sport type dropdown
sportTypeInput.addEventListener("change", (e) => {
    const sportType = e.target.value;
    sportDropdown.innerHTML = "";
    sportDropdown.options.add(new Option("Select a Game", ""));

    if (sportType === "Indoor") {
        sportDropdown.options.add(new Option("Chess", "Chess"));
        sportDropdown.options.add(new Option("Table Tennis", "Table-Tennis"));
        sportDropdown.options.add(new Option("Badminton", "Badminton"));
        sportDropdown.options.add(new Option("Carrom Board", "Carrom Board"));
    } else if (sportType === "Outdoor") {
        sportDropdown.options.add(new Option("Volley Ball", "Volley Ball"));
        sportDropdown.options.add(new Option("Tennis", "Tennis"));
        sportDropdown.options.add(new Option("Cricket", "Cricket"));
        sportDropdown.options.add(new Option("Foot Ball", "Foot Ball"));
        sportDropdown.options.add(new Option("Hockey", "Hockey"));
    }

    sportDropdown.disabled = false;
});

// Add a submit event listener to the form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Validation for the Name field
    if (nameInput.value.trim() === "") {   
        isValid = false; 
        document.getElementById("name-error").textContent = "Name is required";
       
    } 

    // Validation for the Age field
    if (ageInput.value === "") {
        isValid = false;
        document.getElementById("age-error").textContent = "Age is required";
    } 

    // Validation for the Gender field
    if (genderInput.value === "") {
        isValid = false;
        document.getElementById("gender-error").textContent = "Gender is required";
    } 

    // Validation for the Sport Type field
    if (sportTypeInput .value=== "") {
        isValid = false;
        document.getElementById("sport-type-error").textContent = "Sport Type is required";
    } 

    // Validation for the Sport field
    if (sportDropdown.value === "") {
        isValid = false;
        document.getElementById("sport-error").textContent = "Sport is required";
    } 

    // Validation for the Profile Picture field
    if (!profilePictureInput.files[0]) {
        isValid = false;
        document.getElementById("profile-picture-error").textContent = "Profile Picture is required";
    } 
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim() === "") {
            document.getElementById("name-error").textContent = "Name is required";
        } else {
            document.getElementById("name-error").textContent = "";
        }
    });
    ageInput.addEventListener('input',()=>{
        if(ageInput.value ===''){
            document.getElementById('age-error').textContent ="Age is required";
        }
        else{
            document.getElementById("age-error").textContent="";
        }
    });
    genderInput.addEventListener('input', () => {
        if (genderInput.value === '') {
            document.getElementById('gender-error').textContent = "Gender is required";
        }
        else{
            document.getElementById('gender-error').textContent='';
        }
    });
    
    sportTypeInput.addEventListener('input',()=>{
        if(sportTypeInput ===''){
        document.getElementById('sport-type-error').textContent='sport type is required';
    }
    else{
        document.getElementById('sport-type-error').textContent='';
    }
    });
    sport.addEventListener('input',()=>{
        if(sport.value===''){
            document.getElementById('sport-error').textContent='sport is required';
        }
        else{
            document.getElementById('sport-error').textContent='';
        }
    });
    profilePictureInput .addEventListener('input',()=>{
        if(!profilePictureInput.files[0]){
            document.getElementById("profile-picture-error").textContent='profile is required';
        }
        else{
            document.getElementById('profile-picture-error').textContent='';
        }
    });
    
        

    if (isValid) {
        // Create or update a card from form data
        const name = nameInput.value;
        const age = ageInput.value;
        const gender = genderInput.value;
        const sportType = sportTypeInput.value;
        const sport = sportDropdown.value;
        const profilePicture = URL.createObjectURL(profilePictureInput.files[0]);

        if (editedCard) {
            // If we are editing a card, update its content.
            updateCard(editedCard, name, age, gender, sportType, sport, profilePicture);
            editedCard = null; // Reset the edited card.
        } else {
            // If not editing, create a new card.
            createCard(name, age, gender, sportType, sport, profilePicture);
        }

        form.reset();
    }
});


const createCard = (name, age, gender, sportType, sport, profilePicture) => {
    const lowercaseName = name.toLowerCase();

    // Check if a card with the same name (case-insensitive) already exists
    const existingCards = document.querySelectorAll(".user-card");
    const isDuplicate = [...existingCards].some((card) => {
        return card.querySelector("h3").textContent.toLowerCase() === lowercaseName;
    });

    if (isDuplicate) {
        alert(`A card for ${name} already exists. Please edit the existing card or choose a different name.`);
        return; // Prevent the creation of a duplicate card
    }
    const card = document.createElement("div");
    card.classList.add("user-card");

    let img = document.createElement("img");
    img.src = profilePicture;
    img.alt = name;

    const info = document.createElement("div");
    info.classList.add("info");

    const nameElement = document.createElement("h3");
    nameElement.textContent = name;

    const ageElement = document.createElement("p");
    ageElement.textContent = `Age: ${age}`;

    const genderElement = document.createElement("p");
    genderElement.textContent = `Gender: ${gender}`;

    const sportTypeElement = document.createElement("p");
    sportTypeElement.textContent = `Sport Type: ${sportType}`;

    const sportElement = document.createElement("p");
    sportElement.textContent = `Sport: ${sport}`;

    const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.id = 'edit';
editButton.addEventListener("click", () => {
    // Store a reference to the card being edited
    editedCard = card;

    // Reset the error messages
    document.getElementById("name-error").textContent = "";
    document.getElementById("age-error").textContent = "";
    document.getElementById("gender-error").textContent = "";
    document.getElementById("sport-type-error").textContent = "";
    document.getElementById("sport-error").textContent = "";
    document.getElementById("profile-picture-error").textContent = "";

    // Populate the form with the card's data
    nameInput.value = name;
    ageInput.value = age;
    genderInput.value = gender;
    sportTypeInput.value = sportType;
    sportDropdown.value = sport;

    // Scroll to the form
    // form.scrollIntoView({ behavior: "smooth" });
    populateFormWithCardData(card);
});
const populateFormWithCardData=(card)=> {
    const name = card.querySelector("h3").textContent;
    const age = card.querySelector("p:nth-child(2)").textContent.replace("Age: ", "");
    const gender = card.querySelector("p:nth-child(3)").textContent.replace("Gender: ", "");
    const sportType = card.querySelector("p:nth-child(4)").textContent.replace("Sport Type: ", "");
    const sport = card.querySelector("p:nth-child(5)").textContent.replace("Sport: ", "");
    const profilePicture = card.querySelector("img").src;

    nameInput.value = name;
    ageInput.value = age;
    genderInput.value = gender;
    sportTypeInput.value = sportType;
    sportDropdown.value=sport;
    profilePictureInput.value=profilePicture

    // Scroll to the form
    form.scrollIntoView({ behavior: "smooth" });
}
   const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        // Show a confirmation dialog
        const confirmDelete = confirm(`Delete the card for ${name}?`);

        // Check if the user confirmed the deletion
        if (confirmDelete) {
            // Remove the card from the userCards container
            card.remove();
        }
    });

    info.appendChild(nameElement);
    info.appendChild(ageElement);
    info.appendChild(genderElement);
    info.appendChild(sportTypeElement);
    info.appendChild(sportElement);
    info.appendChild(editButton);
    info.appendChild(deleteButton);

    card.appendChild(img);
    card.appendChild(info);

    userCards.appendChild(card);
};

const updateCard = (card, name, age, gender, sportType, sport, profilePicture) => {
    card.querySelector("h3").textContent = name;
    card.querySelector("p:nth-child(2)").textContent = `Age: ${age}`;
    card.querySelector("p:nth-child(3)").textContent = `Gender: ${gender}`;
    card.querySelector("p:nth-child(4)").textContent = `Sport Type: ${sportType}`;
    card.querySelector("p:nth-child(5)").textContent = `Sport: ${sport}`;
    card.querySelector("img").src = profilePicture;
};

profilePictureInput.addEventListener("change", () => {
    const selectedFile = profilePictureInput.files[0];
    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function () {
            // When a new profile picture is selected, update the preview
            const imgElement = document.getElementById("profile-picture-preview");
            imgElement.src = reader.result; // Update the image source
        };

        reader.readAsDataURL(selectedFile);
    }
});

// Get references to the search and sport filter elements
const searchInput = document.getElementById("search");
const sportFilter = document.getElementById("sport-filter");

// Add input event listener to the search input
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    filterUserCards(searchText, sportFilter.value);
    console.log(searchText, sportFilter.value);
});

// Add change event listener to the sport filter dropdown
sportFilter.addEventListener("change", () => {
    const searchText = searchInput.value.toLowerCase();
    filterUserCards(searchText, sportFilter.value);
});

// Function to filter user cards based on search text and sport filter
const filterUserCards = (searchText, selectedSport) => {
    const userCards = document.querySelectorAll(".user-card");

    userCards.forEach((card) => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const sportType = card.querySelector("p:nth-child(4)").textContent.toLowerCase();

        // Check if the card matches the search text and the selected sport filter
        const isMatch = (name.includes(searchText) || searchText === "") && (selectedSport === "all" || sportType.includes(selectedSport));

        // Show or hide the card based on the match
        card.style.display = isMatch ? "block" : "none";
    });
};

// Initial call to filter user cards with no search text and 'all' sport filter
filterUserCards("", "all");



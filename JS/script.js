
const errorMessage = document.querySelector('.error-message');
const spinner = document.querySelector('.spinner');
let storedPhoneNumbers;

const getPhoneNumbers = async() => {
    spinner.classList.toggle('none');

    try{
        const API_URL = 'https://emajency.com/js/numbers.json';
        let data = await fetch(API_URL);
        let phoneNumbers = await data.json();
        storedPhoneNumbers = phoneNumbers;
        
        populateContactList(phoneNumbers);    

        spinner.classList.toggle('none');
    } catch (err) {
        spinner.classList.toggle('none');

        errorMessage.classList.toggle('none');

        errorMessage.innerHTML = `
            <div>
                <p>${err}</p>
            </div>
        `;

        setTimeout(() => {
            errorMessage.classList.toggle('none');
        }, 3000);

    }
    
}

const contactCardContainer = document.querySelector('.card-container');

const populateContactList = (list) => {

    list.forEach(contact => {
        let { name, number } = contact;

        let contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        contactCard.innerHTML = `
            <div class="card-image">
                <img src="Images/police.jpg" alt="police-icon">
            </div>

            <div class="contact-details">
                <h4>${name}</h4>
            </div>

            <div class="icon">
                <a href='tel:${number}'><i class="fas fa-phone"></i></a>
            </div>
        `;

        contactCardContainer.appendChild(contactCard);
    });
}

// Search for specific Contact
const search = document.querySelector('#search-input');

const searchContact = () => {
    let searchValue = search.value.toLowerCase();

    let searchResult = storedPhoneNumbers.filter((contact) => {
        const { name } = contact;
        return name.toLowerCase().includes(searchValue);
    });

    if (searchResult.length > 0) {
        contactCardContainer.innerHTML = '';
    
        populateContactList(searchResult);
    } else {
        // contactCardContainer.innerHTML = '';

        contactCardContainer.innerHTML = '<h1> No Result Found 😞 </h1>';
    } 

};


window.addEventListener('load', getPhoneNumbers);

search.addEventListener('keyup', searchContact);

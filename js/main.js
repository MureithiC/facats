document.addEventListener('DOMContentLoaded', () => {
    let userName = ''; // Variable to store the user's name

    // Function to set the user's name
    // Function to set the user's name
function setName(event) {
    event.preventDefault(); // Prevent form submission
    userName = document.getElementById('user-name').value.trim();
    if (userName === '') {
        alert('Please enter your name.');
        return;
    }
    // Hide the name form and display the main content
    document.getElementById('name-form').style.display = 'none';
    document.querySelector('.fact-details').style.display = 'block';

    // Display greeting message and random fact
    document.getElementById('greeting').textContent = `Hello, ${userName}! Here is a random fact for you:`;
    displayRandomCatFact();
}


    // Event listener for submitting the name form
    document.getElementById('name-form').addEventListener('submit', setName);

    // Function to fetch a random cat image
    async function fetchRandomCatImage() {
        try {
            const catImage = document.getElementById('cat-image');
            catImage.src = 'https://cataas.com/cat'; // Fetch a random cat image
        } catch (error) {
            console.error('Error fetching random cat image:', error);
        }
    }

    // Function to fetch a random cat fact
    async function fetchRandomCatFact() {
        try {
            const response = await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat');
            const data = await response.json();
            return data.text; // Return the random cat fact
        } catch (error) {
            console.error('Error fetching random cat fact:', error);
            return 'Unable to fetch random cat fact at the moment.';
        }
    }

    // Function to display a random cat fact
    async function displayRandomCatFact() {
        try {
            const randomFact = await fetchRandomCatFact();
            document.getElementById('fact-description').textContent = `Fact: ${randomFact}`;
        } catch (error) {
            console.error('Error displaying random cat fact:', error);
        }
    }

    // Function to handle adding a comment
    function addComment(event) {
        event.preventDefault(); // Prevent form submission
        const commentInput = document.getElementById('comment');
        const comment = commentInput.value.trim();
        if (comment === '') {
            alert('Please enter a comment.');
            return;
        }
        // Display the comment in the comment list
        const commentList = document.getElementById('comment-list');
        const li = document.createElement('li');
        li.textContent = `${userName}: ${comment}`;
        commentList.appendChild(li);
        // Clear the comment input field
        commentInput.value = '';
    }

    // Function to handle reacting to the fact
    function reactToFact(reactionType) {
        // Increment the count of the reaction type
        const reactionCountElement = document.getElementById(`${reactionType}-count`);
        let reactionCount = parseInt(reactionCountElement.textContent);
        reactionCount++;
        reactionCountElement.textContent = reactionCount;
        alert(`Thank you for reacting to the fact with ${reactionType}.`);
    }

    // Event listener for submitting the comment form
    document.getElementById('comment-form').addEventListener('submit', addComment);

    // Event listeners for reacting to the fact
    document.getElementById('squint-icon').addEventListener('click', () => reactToFact('squint'));
    document.getElementById('love-icon').addEventListener('click', () => reactToFact('love'));
    document.getElementById('laugh-icon').addEventListener('click', () => reactToFact('laugh'));
    document.getElementById('thumbs-up-icon').addEventListener('click', () => reactToFact('thumbs-up'));

    // Display a random cat image and fact when the page loads
    fetchRandomCatImage();
    displayRandomCatFact();
});

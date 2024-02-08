document.addEventListener('DOMContentLoaded', () => {
    let userName = ''; // Variable to store the user's name

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
    }

    // Event listener for submitting the name form
    document.getElementById('name-form').addEventListener('submit', setName);

    // Function to fetch a random cat fact and image
    async function fetchRandomFactAndImage() {
        try {
            const response = await fetch('https://cat-fact.herokuapp.com/facts/random');
            const data = await response.json();
            const author = data.user ? data.user.name : 'Unknown';
            return { fact: data.text, author: author, image: data.user ? data.user.photo : '' };
        } catch (error) {
            console.error('Error fetching random cat fact:', error);
            return { fact: 'Unable to fetch random cat fact at the moment.', author: 'Unknown', image: '' };
        }
    }

    // Function to display the random cat fact with author and image
    async function displayRandomFact() {
        const { fact, author, image } = await fetchRandomFactAndImage();
        document.getElementById('fact-description').textContent = `Fact: ${fact}`;
        document.getElementById('author-name').textContent = `Author: ${author}`;
        document.getElementById('cat-image').src = image;
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
    document.getElementById('like-icon').addEventListener('click', () => reactToFact('like'));
    document.getElementById('love-icon').addEventListener('click', () => reactToFact('love'));
    document.getElementById('laugh-icon').addEventListener('click', () => reactToFact('laugh'));
    document.getElementById('thumbs-up-icon').addEventListener('click', () => reactToFact('thumbs up'));

    // Display a random cat fact when the page loads
    displayRandomFact();
});

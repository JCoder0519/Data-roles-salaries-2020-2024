document.addEventListener('DOMContentLoaded', function() {
    // Existing features here...
    // You can integrate the code from the previous script here for features like collapsible sections, smooth scrolling, and dynamic loading of iframes.

    // Feature: Pop-up Chat Box on Visualization Click
    const visualizations = document.querySelectorAll('img, iframe'); // Assuming all your visualizations are in <img> or <iframe>
    visualizations.forEach(vis => {
        vis.addEventListener('click', function() {
            alert('This is a visualization.');
        });
    });

    // Feature: Welcome Message
    const welcomeSection = document.createElement('div');
    welcomeSection.innerHTML = `
        <label for="nameInput">Enter your name: </label>
        <input type="text" id="nameInput" placeholder="Your Name">
        <button id="welcomeBtn">Submit</button>
    `;
    welcomeSection.style.padding = '20px';
    welcomeSection.style.textAlign = 'center';
    welcomeSection.style.backgroundColor = '#f4f4f4';
    document.body.insertBefore(welcomeSection, document.body.firstChild);

    document.getElementById('welcomeBtn').addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        if (name.trim() !== '') {
            alert(`Welcome to Junhua's project website, ${name}!`);
        } else {
            alert('Please enter your name.');
        }
    });
});


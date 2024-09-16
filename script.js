document.addEventListener('DOMContentLoaded', () => {
    const fetchDataButton = document.getElementById('fetchData');
    const usernameInput = document.getElementById('username');
    const outputDiv = document.getElementById('output');
    const showAllLink = document.getElementById('showAll');
    const showLanguagesLink = document.getElementById('showLanguages');

    let userData = {};

    const fetchUserData = async (username) => {
        try {
            const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
            if (!response.ok) {
                if (response.status === 404) {
                    outputDiv.innerHTML = '<h2>404: Felhasználó nem található</h2>';
                } else {
                    outputDiv.innerHTML = `<h2>Hiba történt: ${response.status}</h2>`;
                }
                return;
            }
            const data = await response.json();
            userData = data;
            displaySummary();  
        } catch (error) {
            outputDiv.innerHTML = `<h2>Hiba történt: ${error.message}</h2>`;
        }
    };

    const displaySummary = () => {
        let html = '<h2>Összesített adatok</h2>';
        if (userData && userData.codeChallenges && userData.codeChallenges.total) {
            html += `<p>Pontok összesen: ${userData.codeChallenges.total}</p>`;
        } else {
            html += '<p>Nincsenek elérhető adatok.</p>';
        }
        outputDiv.innerHTML = html;
    };

    const displayLanguages = () => {
        let html = '<h2>Pontok nyelvek szerint</h2>';
        if (userData && userData.codeChallenges && userData.codeChallenges.languages) {
            html += '<ul>';
            for (const [language, points] of Object.entries(userData.codeChallenges.languages)) {
                html += `<li>${language}: ${points}</li>`;
            }
            html += '</ul>';
        } else {
            html += '<p>Nincsenek nyelvi adatok.</p>';
        }
        outputDiv.innerHTML = html;
    };

    fetchDataButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchUserData(username);
        } else {
            outputDiv.innerHTML = '<h2>Kérlek add meg a felhasználónevet</h2>';
        }
    });

    showAllLink.addEventListener('click', () => {
        displaySummary();
    });

    showLanguagesLink.addEventListener('click', () => {
        displayLanguages();
    });
});
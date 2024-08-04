// Variabls
const inputFiled = document.querySelector('.input-filed input');
const btn = document.querySelector('.input-filed button');
const showRepos = document.querySelector('.show-repos');

// Git fetch
btn.onclick = function () {
    getRepos();
}

function getRepos() {   
    if (inputFiled.value == '') {
        showRepos.innerHTML = "<span>Enter Your UserName</span>";
    } else {
        // Create a new XMLHttpRequest object
        let xmlData = new XMLHttpRequest();

        // Configure it: GET-request for the URL /repos
        xmlData.open('GET', `https://api.github.com/users/${inputFiled.value}/repos`, true);

        // Send the request over the network
        xmlData.send();

        // This will be called after the response is received
        xmlData.onload = function () {
            if (xmlData.status != 200) { // analyze HTTP response status
                showRepos.innerHTML = `<span>Error ${xmlData.status}: ${xmlData.statusText}</span>`;
            } else { // show the result
                let data = JSON.parse(xmlData.response);

                showRepos.innerHTML = '';

                data.forEach(info => {
                    // Main Div
                    let repodiv = document.createElement("div");
                    repodiv.className = "repo";
                    // Create Repo Name Text
                    let repoName = document.createTextNode(info.name);
                    // Create Div to right side
                    let divr = document.createElement("div");
                    // add class to right div
                    divr.className = "right-side";
                    // Append child
                    repodiv.appendChild(repoName);
                    // Create url to visit repos
                    let url = document.createElement('a');
                    // url text
                    let textUrl = document.createTextNode(`Visit`);
                    // add url to element
                    url.href = `https://github.com/${inputFiled.value}/${info.name}`;
                    // show in new tab
                    url.setAttribute("target", '_blank');
                    // add text to url
                    url.appendChild(textUrl);
                    // add url to repo
                    divr.appendChild(url);
                    // Create span to stars count
                    let stars = document.createElement('span');
                    // Add count of stars to span
                    let nstart = document.createTextNode(info.stargazers_count);
                    // span text
                    stars.appendChild(nstart);
                    // add to right div
                    divr.appendChild(stars);
                    // Create icon element
                    let icon = document.createElement('i');
                    // add class to icon
                    icon.className = "fas fa-star";
                    // add to span stars
                    stars.appendChild(icon);
                    // add to right div
                    repodiv.appendChild(divr);
                    // show in document
                    showRepos.appendChild(repodiv);
                });
            }
        };

        // If the request failed
        xmlData.onerror = function () {
            showRepos.innerHTML = "<span>Request failed</span>";
        };
    }
}

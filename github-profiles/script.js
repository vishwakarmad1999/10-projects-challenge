const form = document.querySelector("form")
const usernameInput = document.getElementById("username")
const profileContainer = document.querySelector(".profile-container")

form.addEventListener("submit", e => {
    profileContainer.innerHTML = ""
    e.preventDefault()
    const username = usernameInput.value
    if (username) {
        fetch("https://api.github.com/users/" + username)
        .then(res => res.json())
        .then(res => {
            if (res.message !== "Not Found") {
                const profile = document.createElement("div")
                profile.classList.add("profile")

                profile.innerHTML = `
                    <div class="img-container">
                        <img class="profile-img" src=${res.avatar_url} alt="" />
                    </div>
                    <div class="user-info">
                        <h3>${res.name}</h3>
                        <p>${res.bio ? res.bio : ""}</p>
                        <ul>
                            <li>Followers: ${res.followers}</li>
                            <li>Following: ${res.following}</li>
                            <li>Repositories: ${res.public_repos}</li>
                        </ul>

                        <div id="repos"></div>
                    </div>
                `
                profileContainer.append(profile)
            }
        })

        addRepos(username)
        usernameInput.value = ""
    }
})

function addRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(repoData => {
        const reposEl = document.getElementById("repos")

        repoData.forEach(repo => {
            const repoEl = document.createElement("a")
            repoEl.classList.add("repo")

            repoEl.href = repo.html_url
            repoEl.target = "_blank"
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
    })
}
const form = document.getElementById("github-form")
const userList = document.querySelector("#user-list")
const reposList = document.getElementById("repos-list")
const search = document.getElementById("search")
const container = document.getElementById("github-container")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(res => res.json())
    .then(res => {
        // username(login), avatar_url, url
        reposList.innerHTML = ""
        userList.innerHTML = ""
        res.items.map(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login
            h2.addEventListener("click", e => showUserRepos(item.login, e))

            const img = document.createElement("img")
            img.src = item.avatar_url

            // li tag <= append <= h2 & img
            li.append(h2, img)
            // ul tag <= append <= li tag
            userList.append(li)
        })
    })
    form.reset()
})

function showUserRepos(username, e) {
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => res.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
    }))
}
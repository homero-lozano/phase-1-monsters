document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterContainer = document.getElementById("create-monster");
    if (monsterContainer && createMonsterContainer) {
        const form = document.createElement("form");
        form.innerHTML = `
            <input type="text" id="name" placeholder="Name" required>
            <input type="number" id="age" placeholder="Age" required>
            <input type="text" id="description" placeholder="Description" required>
            <button>Create Monster</button>
        `;
        createMonsterContainer.appendChild(form);
        let page = 1;
        const limit = 50;

        function loadMonsters(page, limit) {
            fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
                .then(response => response.json())
                .then(monsters => {
                    monsters.forEach(monster => {
                        const monsterDiv = document.createElement("div");
                        monsterDiv.innerHTML = `
                            <h2>${monster.name}</h2>
                            <p>Age: ${monster.age}</p>
                            <p>Description: ${monster.description}</p>
                        `;
                        monsterContainer.appendChild(monsterDiv);
                    });
                });
        }

        loadMonsters(page, limit);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const newMonster = {
                name: document.getElementById("name").value,
                age: parseFloat(document.getElementById("age").value),
                description: document.getElementById("description").value
            };

            fetch("http://localhost:3000/monsters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(newMonster)
            })
            .then(response => response.json())
            .then(monster => {
                const monsterDiv = document.createElement("div");
                monsterDiv.innerHTML = `
                    <h2>${monster.name}</h2>
                    <p>Age: ${monster.age}</p>
                    <p>Description: ${monster.description}</p>
                `;
                monsterContainer.appendChild(monsterDiv);
            });

            form.reset();
        });
        const backButton = document.getElementById("back");
        const forwardButton = document.getElementById("forward");

        backButton.addEventListener("click", () => {
            if (page > 1) {
                page--;
                monsterContainer.innerHTML = ''; 
                loadMonsters(page, limit);
            }
        });

        forwardButton.addEventListener("click", () => {
            page++;
            monsterContainer.innerHTML = ''; 
            loadMonsters(page, limit);
        });

    } else {
        console.error("Required elements not found in the DOM!");
    }
});
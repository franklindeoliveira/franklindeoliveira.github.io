fetch("https://api.github.com/users/franklindeoliveira/repos")
    .then(resp => resp.json())
    .then(function(json) {        
        let $itens = document.querySelector(".itens");

        json.forEach(repo => {
            $itens.innerHTML += 
            `<li>
                <a href="#">
                    <div class="projeto">
                        <h2 class="projeto-nome">${repo.name}</h2>
                        <p class="projeto-descricao">${repo.description}</p>
                    </div>
                </a>
            </li>`;
        });
    });

let projetosGithub = ["lacosdeencantamento", "gepetto", "vote-no-restaurante", "acolheaps"];
fetch("https://api.github.com/users/franklindeoliveira/repos")
    .then(resp => resp.json())
    .then(function(json) {        
        let $itens = document.querySelector(".projetos");

        json.filter((repo) => projetosGithub.includes(repo.name))
        .forEach(repo => {
            $itens.innerHTML += 
            `<li>
                <a href="${repo.html_url}" target="_black">
                    <div class="projeto">
                        <h2 class="projeto-nome">${repo.name}</h2>
                        <p class="projeto-descricao">${repo.description}</p>
                    </div>
                </a>
            </li>`;
        });
    });

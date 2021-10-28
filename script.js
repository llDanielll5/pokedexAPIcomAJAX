var numeroPokemons = document.getElementById("pokemonsQ");

document.querySelector('input[type=submit]').addEventListener('click',function(){
    pegarPokemons(numeroPokemons.value);
})

document.querySelector('input[name=resetar]').addEventListener('click',function(){
    resetarPokemons();
})

function resetarPokemons(){
    location.reload();
}

function pegarPokemons(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allpokemon => {

        var pokemons = [];

        allpokemon.results.map(function(val){

            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({
                    nome:val.name,
                    imagem: pokemonSingle.sprites.front_default
                });

                if(pokemons.length == quantidade){
                    console.log(pokemons);

                    var pokemonBoxes = document.querySelector('.pokemon-boxes');
                    pokemonBoxes.innerHTML = "";

                    pokemons.map(function(val){
                        pokemonBoxes.innerHTML+= `
                        
                        <div class="pokemon-box">
                            <img src="`+val.imagem+`">
                            <p>`+val.nome+`</p>
                        </div><!--pokemon-box-->
                        
                        `;
                    

                    })
                }
            })
        })
    })
}
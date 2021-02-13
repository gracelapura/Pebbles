document.addEventListener('DOMContentLoaded', function(){
      
    var url = new URL(window.location.href);
    var data = url.searchParams.get("data");
    console.log(window.location.href);
    console.log('data',data)
    alert('data'+data)
  });

const pebblesList = document.getElementById('pebblesList');
const searchBar = document.getElementById('searchBar');
let bpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchSting = e.target.value.toLowerCase();

    const filteredCharacters = bpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchSting) || 
            character.house.toLowerCase().includes(searchSting)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('data');
        bpCharacters = await res.json();
        displayCharacters(bpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character>
                <h2>${character.name}</h2>
                <p>Pebbles: ${character.pebbles}</p>
                <img src="${character.image}"></img>
            </li>
            
        `;
        })
        .join('');
        pebblesList.innerHTML = htmlString;
};

loadCharacters();
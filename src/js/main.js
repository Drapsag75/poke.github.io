document.addEventListener("DOMContentLoaded", () => {
  window.toggleMenu = function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("flex");
    } else {
      menu.classList.remove("flex");
    }
  };

  function getTypeBackgroundColor(type) {
    const colors = {
      'Acier': 'from-gray-300 to-gray-200',
      'Combat': 'from-red-200 to-red-100',
      'Dragon': 'from-indigo-200 to-indigo-100',
      'Eau': 'from-blue-200 to-blue-100',
      'Électrik': 'from-yellow-100 to-yellow-50',
      'Fée': 'from-pink-200 to-pink-100',
      'Feu': 'from-red-200 to-red-100',
      'Glace': 'from-blue-200 to-blue-50',
      'Insecte': 'from-green-200 to-green-100',
      'Normal': 'from-gray-200 to-gray-100',
      'Plante': 'from-green-200 to-green-100',
      'Poison': 'from-purple-200 to-purple-100',
      'Psy': 'from-pink-200 to-pink-100',
      'Roche': 'from-gray-300 to-gray-100',
      'Sol': 'from-yellow-200 to-yellow-50',
      'Spectre': 'from-indigo-200 to-indigo-100',
      'Ténèbres': 'from-gray-400 to-gray-200',
      'Vol': 'from-blue-200 to-blue-100'
    };
    return `bg-gradient-to-br ${colors[type] || 'from-gray-100 to-gray-50'}`;
  }

  function generateTypeCards() {
    const types = [
      { name: "Acier", pokemon: "Exagide", description: "Les Pokémon Acier sont extrêmement résistants et possèdent une défense exceptionnelle.", typeImg: "./static/images/types/acier.png", pokemonImg: "./static/images/pokemon/exagide.gif" },
      { name: "Combat", pokemon: "Lucario", description: "Les Pokémon Combat excellent dans le corps à corps avec une force physique impressionnante.", typeImg: "./static/images/types/combat.png", pokemonImg: "./static/images/pokemon/lucario.gif" },
      { name: "Dragon", pokemon: "Rayquaza", description: "Les Pokémon Dragon sont puissants et mystiques, difficiles à maîtriser mais redoutables.", typeImg: "./static/images/types/dragon.png", pokemonImg: "./static/images/pokemon/rayquaza.gif" },
      { name: "Eau", pokemon: "Amphinobi", description: "Les Pokémon Eau excellent dans la maîtrise des torrents et sont très polyvalents.", typeImg: "./static/images/types/eau.png", pokemonImg: "./static/images/pokemon/amphinobi.gif" },
      { name: "Électrik", pokemon: "Luxray", description: "Rapides et foudroyants, les Pokémon Électrik dominent par leur vitesse.", typeImg: "./static/images/types/electrik.png", pokemonImg: "./static/images/pokemon/luxray.gif" },
      { name: "Fée", pokemon: "Mimiqui", description: "Les Pokémon Fée sont enchanteurs et particulièrement efficaces contre les Dragons.", typeImg: "./static/images/types/fee.png", pokemonImg: "./static/images/pokemon/mimiqui.gif" },
      { name: "Feu", pokemon: "Feunard", description: "Les Pokémon Feu sont puissants et passionnés, avec des attaques dévastatrices.", typeImg: "./static/images/types/feu.png", pokemonImg: "./static/images/pokemon/feunard1.gif" },
      { name: "Glace", pokemon: "Dimoret", description: "Les Pokémon Glace gèlent leurs adversaires et excellent dans le contrôle.", typeImg: "./static/images/types/glace.png", pokemonImg: "./static/images/pokemon/dimoret.gif" },
      { name: "Insecte", pokemon: "Pyrax", description: "Les Pokémon Insecte évoluent rapidement et peuvent empoisonner leurs ennemis.", typeImg: "./static/images/types/insecte.png", pokemonImg: "./static/images/pokemon/pyrax.gif" },
      { name: "Normal", pokemon: "Zoroark", description: "Les Pokémon Normal sont polyvalents et s'adaptent à toutes les situations.", typeImg: "./static/images/types/normal.png", pokemonImg: "./static/images/pokemon/zoroark.gif" },
      { name: "Plante", pokemon: "Jungko", description: "Les Pokémon Plante utilisent la nature et absorbent l'énergie vitale.", typeImg: "./static/images/types/plante.png", pokemonImg: "./static/images/pokemon/jungko.gif" },
      { name: "Poison", pokemon: "Malamandre", description: "Les Pokémon Poison affaiblissent leurs adversaires avec des toxines.", typeImg: "./static/images/types/poison.png", pokemonImg: "./static/images/pokemon/malamandre.gif" },
      { name: "Psy", pokemon: "Mew", description: "Les Pokémon Psy utilisent leurs pouvoirs mentaux pour dominer les combats.", typeImg: "./static/images/types/psy.png", pokemonImg: "./static/images/pokemon/mew.gif" },
      { name: "Roche", pokemon: "Lougaroc", description: "Les Pokémon Roche sont robustes et possèdent une défense naturelle élevée.", typeImg: "./static/images/types/roche.png", pokemonImg: "./static/images/pokemon/lougaroc.gif" },
      { name: "Sol", pokemon: "Scorvol", description: "Les Pokémon Sol contrôlent la terre et créent des séismes dévastateurs.", typeImg: "./static/images/types/sol.png", pokemonImg: "./static/images/pokemon/scorvol.gif" },
      { name: "Spectre", pokemon: "Giratina", description: "Les Pokémon Spectre sont mystérieux et peuvent traverser les dimensions.", typeImg: "./static/images/types/spectre.png", pokemonImg: "./static/images/pokemon/giratina.gif" },
      { name: "Ténèbres", pokemon: "Noctali", description: "Les Pokémon Ténèbres excellent dans les attaques sournoises et la ruse.", typeImg: "./static/images/types/tenebres.png", pokemonImg: "./static/images/pokemon/noctali.gif" },
      { name: "Vol", pokemon: "Ho-Oh", description: "Les Pokémon Vol dominent les cieux et sont très agiles.", typeImg: "./static/images/types/vol.png", pokemonImg: "./static/images/pokemon/hooh.gif" }
    ];

    const typesSection = document.getElementById("types");

    types.forEach(type => {
      const card = document.createElement("div");
      card.className = `card hover:scale-105 transition-transform duration-300 p-0 ${getTypeBackgroundColor(type.name)} shadow-lg`;

      // Création des URLs Pokepedia
      const typeUrl = `https://www.pokepedia.fr/Type_${type.name}`;
      const pokemonUrl = `https://www.pokepedia.fr/${type.pokemon}`;

      card.innerHTML = `
        <figure class="p-0 m-0 pt-4">
          <a href="${pokemonUrl}" target="_blank" rel="noopener noreferrer" class="block">
            <img src="${type.pokemonImg}" alt="Pokémon ${type.name}" class="rounded-t-xl h-40 w-40 object-contain hover:scale-110 transition-transform duration-300" />
          </a>
        </figure>
        <div class="p-0 space-y-0 text-center">
          <div class="flex justify-center -mt-2">
            <a href="${typeUrl}" target="_blank" rel="noopener noreferrer">
              <img src="${type.typeImg}" alt="Type ${type.name}" class="h-20 w-20 object-contain hover:scale-110 transition-transform duration-300 -mb-3" />
            </a>
          </div>
          <p class="text-base px-2 pb-2 m-0 -mt-1">${type.description}</p>
        </div>
      `;

      typesSection.appendChild(card);
    });
  }

  generateTypeCards();
});

Pokedex.Router = Backbone.Router.extend({
  routes: {
    '': 'pokemonIndex',
    'pokemon/:id': 'pokemonDetail',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail'
  },

  pokemonDetail: function (id, callback) {

    if (this._pokemonIndex) {
      var pokemon = this._pokemonIndex.collection.get(id);
      var pokemonDetail = new Pokedex.Views.PokemonDetail({model: pokemon});
      $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
      pokemonDetail.refreshPokemon();

    } else {
      this.pokemonIndex(function() {
        this.pokemonDetail(id);
      }.bind(this));
    }

  },

  pokemonIndex: function (callback) {
    var pokemonIndex = new Pokedex.Views.PokemonIndex();
    // callback = this.pokemonDetail(id);
    pokemonIndex.refreshPokemon({}, callback);
    $("#pokedex .pokemon-list").html(pokemonIndex.$el);
    // view automatically has this.collection == all our pokemon
    this._pokemonIndex = pokemonIndex;
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

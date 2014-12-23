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
      pokemonDetail.refreshPokemon({}, callback);
      this._pokemonDetail = pokemonDetail;

    } else {
      this.pokemonIndex(function() {
        this.pokemonDetail(id, callback);
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

    this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
    if (this._pokemonDetail) {
      var toy = this._pokemonDetail.model.toys().get(toyId);
      var toyDetail = new Pokedex.Views.ToyDetail({model: toy});
      $("#pokedex .toy-detail").html(toyDetail.render().$el);
    } else {
      this.pokemonDetail(pokemonId, function() {
        this.toyDetail(pokemonId, toyId);
      }.bind(this));
    }
  },

  pokemonForm: function () {
    var newPoke = new Pokedex.Models.Pokemon();
    var pokemonForm = new Pokedex.Views.PokemonForm({ model: newPoke, collection: this._pokemonIndex.collection });
    $('#pokedex .pokemon-form').html(pokemonForm.render().$el);
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

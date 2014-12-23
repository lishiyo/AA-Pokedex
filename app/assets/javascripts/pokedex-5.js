Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    'click li': 'selectPokemonFromList'
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({ pokemon: pokemon });
    this.$el.append(content);
  },

  refreshPokemon: function (options, callback) {
    this.collection.fetch({
      success: function(){
        this.render();
        callback && callback();
      }.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(pokemon){
      this.addPokemonToList(pokemon);
    }.bind(this));
    return this;
  },

  selectPokemonFromList: function (event) {
    var $li = $(event.currentTarget);
    var id = $li.data('id');

    Backbone.history.navigate("/pokemon/" + id, {trigger: true});

    // var pokemonDetail = new Pokedex.Views.PokemonDetail({model: pokemon});
    // $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    // pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    'click li': 'selectToyFromList'
  },

  refreshPokemon: function (options, callback) {
    this.model.fetch({
      success: function(){
        this.render();
        callback && callback();
      }.bind(this)
    })
  },

  render: function () {
    var content = JST["pokemonDetail"]({pokemon: this.model});
    this.$el.html(content);

    this.model.toys().each(function(toy){
      var toyContent = JST["toyListItem"]({ toy: toy });
      this.$el.append(toyContent);
    }.bind(this));
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data("id");
    var pokemonId = this.model.id;

    Backbone.history.navigate("/pokemon/" + pokemonId + "/toys/" + toyId , {trigger: true});
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {

    var content = JST["toyDetail"]({ pokes: [], toy: this.model });
    this.$el.html(content);
    return this;
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });

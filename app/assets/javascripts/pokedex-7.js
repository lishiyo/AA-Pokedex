Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit": "savePokemon"
  },

  render: function () {
    // this.model == newPoke
    var content = JST["pokemonForm"]({ pokemon: this.model });
    this.$el.html(content);
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();
    var serialized = $(event.target).serializeJSON()['pokemon'];
    this.model.save(serialized, {
      success: function(model) {
        this.collection.add(model);
        Backbone.history.navigate("pokemon/" + model.id, {trigger: true});
      }.bind(this)
    });
  }
});

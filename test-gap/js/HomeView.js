var HomeView = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.btn-login', this.Login);
    };

    this.render = function() {
        this.el.html(HomeView.template());
        return this;
    };

    this.Login = function() {
        alert("hit this");
        $('body').html(new SearchAgentView().render().el);
    };

    this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());
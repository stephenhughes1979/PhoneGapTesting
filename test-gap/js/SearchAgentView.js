var SearchAgentView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.btn-back', this.Back);
        this.el.on('click', '.btn-viewAgent', this.GoToAgent);
    };

    this.Back = function() {
        $('body').html(new HomeView().render().el);
    };
    
    this.GoToAgent = function() {
        $('body').html(new AgentView().render().el);
    };
    
    this.render = function() {
        this.el.html(SearchAgentView.template());
        return this;
    };

    this.initialize();

}

SearchAgentView.template = Handlebars.compile($("#searchagent-tpl").html());
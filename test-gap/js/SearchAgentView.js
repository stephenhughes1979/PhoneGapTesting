var SearchAgentView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        alert('in render');
        this.el.html(SearchAgentView.template());
        return this;
    };

    this.initialize();

}

SearchAgentView.template = Handlebars.compile($("#searchagent-tpl").html());
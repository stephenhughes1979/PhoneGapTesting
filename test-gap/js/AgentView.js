var AgentView = function(agent) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.sms-class', this.sendSMS);
        this.el.on('click', '.email-class', this.sendEmail);
    };

    this.render = function() {
        console.log(agent);
        this.el.html(AgentView.template());
        return this;
    };

    this.sendSMS = function(event) {
        var url = 'sms:' + agent.phone;
        window.open(url);
    }
    
    this.sendEmail = function(event) {
        var url = 'mailto:' + agent.email;
        window.open(url);
    }
    
    this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: agent.firstname, familyName:  agent.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', agent.phone, false);
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        alert('Contact Added');
        return false;
    };

    this.changePicture = function(event) {
        event.preventDefault();
        console.log('changePicture');

        return false;
    };

    this.initialize();

}

AgentView.template = Handlebars.compile($("#agent-tpl").html());
var AgentView = function(agent) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.sms-class', this.sendSMS);
    };

    this.render = function() {
        console.log(agent);
        this.el.html(AgentView.template());
        return this;
    };

    this.sendSMS = function(event) {
        var url = 'sms:444';
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
        contact.name = {givenName: app.currentEmployee.firstName, familyName:  app.currentEmployee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', app.currentEmployee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', app.currentEmployee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
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
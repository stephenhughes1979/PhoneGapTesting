$(document).on('pageshow', '#detailsPage', function(event) {
    var agent = JSON.parse(window.localStorage.getItem("cachedAgent"));
    console.log(agent.FirstName);
    $('#fullName').text(agent.FirstName + ' ' + agent.LastName);
    $('#employeeTitle').text(agent.AgencyName);
    $('#employeeTitle').text(agent.AgencyName);
    $('#City').text("src",agent.Address1 + ' ' + agent.City + " " +agent.State);
});

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
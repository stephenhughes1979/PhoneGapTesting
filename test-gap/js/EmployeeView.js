var EmployeeView = function(employee) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' +position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    };

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
        
        $.ajax({
            type: "POST",
            url:"https://sse0389.allstate.com",
            data: JSON.stringify(usercred),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer 2386e2b7-2153-4c62-ac6c-586b12b3f2a5');

                },
            success: function (data) {
                console.log(data);
                alert("Data loaded: " + data);
            },
            error: function(httpRequest, message, errorThrown) {
                alert("error: " + errorThrown);
            }
        });
        
        /*var usercred = {"InputPayload":{"UserName":"myqatr1015", "Password":"Password1"},"Header":{"SendingSystemCode":"A3C98370-A0FC-41cf-A5AD-281F4CDE43CE","SendingSystemName":"E7065EE6-8A5F-47e2-97A0-17BAF6D5B67B"}};
        $.ajax({
            type: "POST",
            url:"https://sgglext-dv.allstate.com/mobile/r2r/customerservice/authenticatecustomercredentials",
            data: JSON.stringify(usercred),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer 2386e2b7-2153-4c62-ac6c-586b12b3f2a5');

                },
            success: function (data) {
                console.log(data);
                alert("Data loaded: " + data);
            },
            error: function(httpRequest, message, errorThrown) {
                alert("error: " + errorThrown);
            }
        });*/

        return false;
    };

    this.initialize();

}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
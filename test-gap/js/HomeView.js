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
        var username = $('.fname').val();
        var password = $('.fpassword').val();
        var usercred = {"InputPayload":{"UserName":username, "Password":password},"Header":{"SendingSystemCode":"A3C98370-A0FC-41cf-A5AD-281F4CDE43CE","SendingSystemName":"E7065EE6-8A5F-47e2-97A0-17BAF6D5B67B"}};
        var databuiltup = "grant_type=password&username=" + username + "&password=" + password;

        $.ajax({
            type: "POST",
            url:"https://sgglext-dv.allstate.com/auth/oauth/v2/token",
            data: databuiltup,
            contentType: "application/x-www-form-urlencoded",
            beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic aVJEX0w3VXNlcjpiYmJkYmY2Ny03ZTJkLTQwYTktYWQ1MS1kOTM1MDk1MzQ4ODc=');

                },
            success: function (data) {
                $.ajax({
                    type: "POST",
                    url:"https://sgglext-dv.allstate.com/mobile/r2r/customerservice/authenticatecustomercredentials",
                    data: JSON.stringify(usercred),
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + data.access_token);

                    },
                    success: function (data) {
                        $('body').html(new SearchAgentView().render().el);
                    },  
                    error: function(httpRequest, message, errorThrown) {
                        navigator.notification.alert("The Username or Password entered was incorrect", null, "Login Failure", 'OK');
                    }
                });
            },
            error: function(httpRequest, message, errorThrown) {
                alert("error: " + errorThrown);
            }
        });
    };

    this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());
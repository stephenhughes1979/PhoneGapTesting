function onDeviceReady() {
    if (parseFloat(window.device.version) === 7.0) {
          document.body.style.marginTop = "17px";
    }
}
  
document.addEventListener('deviceready', onDeviceReady, false);

$(document).on('pageshow', '#loginPage', function(event) {
        alert('hello');
        $.ajaxSetup({ cache: false });
});

function SearchByZip() {
    window.localStorage.setItem("zipsearchvalue", $('.textZip').val());
    $.mobile.changePage( "listview.html", {
      transition: "slide",
      reverse: true,
      changeHash: true
    });
}

function Login(){
        var username = $('.fname').val();
        var password = $('.fpassword').val();
        var usercred = {"InputPayload":{"UserName":username, "Password":password},"Header":{"SendingSystemCode":"A3C98370-A0FC-41cf-A5AD-281F4CDE43CE","SendingSystemName":"E7065EE6-8A5F-47e2-97A0-17BAF6D5B67B"}};
        var databuiltup = "grant_type=password&username=" + username + "&password=" + password;
        var accesstoken = '';
    
        $.ajax({
            type: "POST",
            cache: false,
            url:"https://sgglext-dv.allstate.com/auth/oauth/v2/token?id=jbjnkjnkj",
            data: databuiltup,
            contentType: "application/x-www-form-urlencoded",
            beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic aVJEX0w3VXNlcjpiYmJkYmY2Ny03ZTJkLTQwYTktYWQ1MS1kOTM1MDk1MzQ4ODc=');
                },
            success: function (data) {
                accesstoken = data.access_token;
                window.localStorage.setItem("accessToken", accesstoken);
                $.ajax({
                    type: "POST",
                    cache: false,
                    url:"https://sgglext-dv.allstate.com/mobile/r2r/customerservice/authenticatecustomercredentials?ih=kjkjkj",
                    data: JSON.stringify(usercred),
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + accesstoken);

                    },
                    success: function (data) {
                        console.log(data);
                        $.mobile.changePage( "#homePage", {
                          transition: "slide",
                          reverse: true,
                          changeHash: true
                        });
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
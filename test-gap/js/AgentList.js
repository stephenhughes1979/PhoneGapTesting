$(document).on('pageshow', '#listPage', function(event) {
    var accesstoken = window.localStorage.getItem("accessToken");

    var usercred = {"InputPayload":{"ZIP":"60062", "MaxRows":"15"},"Header":{"SendingSystemCode":"A3C98370-A0FC-41cf-A5AD-281F4CDE43CE","SendingSystemName":"E7065EE6-8A5F-47e2-97A0-17BAF6D5B67B"}};
    
    
    $.ajax({
            type: "POST",
            cache: false,
            url:"https://sgglext-dv.allstate.com/mobile/r2r/agentservice/findagentsbyzip",
            data: JSON.stringify(usercred),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accesstoken);
            },
            success: function (data) {
                var output = '';
                window.localStorage.setItem("cachedAgents", data.OutputPayload.Agents);
                $.each(data.OutputPayload.Agents, function(index, value){
                    output += '<li><a href="viewPerson.html?id=' + index + '">' + value.FirstName + ' ' + value.LastName + '</a></li>';
                });
                $('#listview').append(output);
            },  
            error: function(httpRequest, message, errorThrown) {
                alert(message + errorThrown, null, "Service Failure", 'OK');
            }
        });

    
    
});
    
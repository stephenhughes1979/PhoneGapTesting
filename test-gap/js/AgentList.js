var vars = [], hash;
    var q = document.URL.split('?')[1];
    if(q != undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
}

        var usercred = {"InputPayload":{"ZIP":"60062", "MaxRows":"15"},"Header":{"SendingSystemCode":"A3C98370-A0FC-41cf-A5AD-281F4CDE43CE","SendingSystemName":"E7065EE6-8A5F-47e2-97A0-17BAF6D5B67B"}};
    
        $.ajax({
            type: "POST",
            cache: false,
            url:"https://sgglext-dv.allstate.com/mobile/r2r/agentservice/findagentsbyzip",
            data: JSON.stringify(usercred),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + vars['accesstoken']);
            },
            success: function (data) {
                var output = '';
                $.each(data.OutputPayload.Agents, function(index, value){
                    output += '<li>' + value.FirstName + ' ' + value.LastName + '</li>';
                });
                $('#listview').append(output).listview('refresh');
                $('#listview').append(output).listview('refresh');
            },  
            error: function(httpRequest, message, errorThrown) {
                alert(message + errorThrown, null, "Service Failure", 'OK');
            }
        });

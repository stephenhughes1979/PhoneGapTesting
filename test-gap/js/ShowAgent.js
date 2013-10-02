$(document).on('pageshow', '#detailsPage', function(event) {
    var agents = window.localStorage.getItem("cachedAgents");
    console.log(agents);
	$('#fullName').val = agents[0].FirstName;
});
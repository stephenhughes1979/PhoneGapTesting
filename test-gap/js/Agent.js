var Class = function(methods) {   
    var klass = function() {    
        this.initialize.apply(this, arguments);          
    };  
    
    for (var property in methods) { 
       klass.prototype[property] = methods[property];
    }
          
    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};      
    
    return klass;    
};

var Agent = Class({ 
    initialize: function(firstname, lastname, phone, address, email) {
        this.firstname = name;
        this.lastname = name;
        this.phone  = phone;
        this.address = address;
        this.email = email;
    },
    toString: function() {
        return "My name is "+this.firstname+" and I am "+this.age+" years old.";
    }
}); 

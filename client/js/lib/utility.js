/**
 * Created by momchillgorchev on 30/12/14.
 */
/**
 * Util function. Convert camelCase to dash-separated string
 * @returns {string}
 */
String.prototype.toDash = function(){
    return this.replace(/([A-Z])/g, function($1){
        return "-" + $1.toLowerCase();
    });
};

/**
 * Validate data structure (object)
 * @param data - structure to validate
 * @returns {boolean}
 */
validateDataObject = function(data){
    // Closure vars
    var errorShown = false, nonValid = 0;
    // Iterate over the data structure
    for (var key in data) {
        // Prevent iteration over inherited properties, possibly not necessary,
        // because the source data is created as
        // data = {key:value, ..., } and not like data = new Object();
        // anyway, good practice
        if(data.hasOwnProperty(key)){
            var obj = data[key];
            // If the property holds an empty string.
            // errorShown check prevent the error popup to display more than once.
            if(obj === '' && errorShown === false){
                // Display error, update the flag
                FlashMessages.sendError('All fields are mandatory! ' + key.toDash() + ' field is empty!');
                errorShown = true;
                // Count the non-valid fields
                nonValid++;
            }
        }
    }
    // Return false if there is non-valid fields
    return !nonValid > 0;
};
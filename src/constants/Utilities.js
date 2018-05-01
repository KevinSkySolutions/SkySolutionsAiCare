
/**
 * This is a utility function which annotates the received input data for efficient searching
 * @param {*} alerts input alerts data, received from server, to be annotated
 */
export function annotateWithSearchData(alerts) {

    var annotatedAlerts = [];
    var spaceDelimiter  = " ";

    var arrayLength = alerts.length;
    for (var i = 0; i < arrayLength; i++) {
        alerts[i].searchdata =  alerts[i].id                + spaceDelimiter;
        alerts[i].searchdata += alerts[i].resident          + spaceDelimiter;
        alerts[i].searchdata += alerts[i].type              + spaceDelimiter;
        alerts[i].searchdata += alerts[i].currentlocation   + spaceDelimiter;
        alerts[i].searchdata += alerts[i].description       + spaceDelimiter;
        alerts[i].searchdata += alerts[i].location.room     + spaceDelimiter;

        annotatedAlerts.push(alerts[i]);
    }
    return annotatedAlerts;
}

/**
 * This is a utility function which receives the annotated alerts data and the keyword to 
 * search for. Returns a subset of the results which match the string.
 * @param {*} annotatedAlerts 
 * @param {*} keyword 
 */
export function filterAlertsWithKeyword(annotatedAlerts, keyword) {
    
    var filteredResults = [];
    var regExp = new RegExp(keyword, 'i');
    var arrayLength = annotatedAlerts.length;
    for (var i = 0; i < arrayLength; i++) {
        if (annotatedAlerts[i].searchdata.search(regExp) != -1) {
            filteredResults.push(annotatedAlerts[i]);
        }
    }

    return filteredResults;
}
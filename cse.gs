/*
 * Fetch Google Search Results with the Site Search API
 * https://ctrlq.org/code/20076-google-search-api
 * https://developers.google.com/custom-search/
 */

function getGoogleSearchResults(q, startIx) {  
  // Get the API key from Google's developer console
  var KEY = '';
  
  // Get the CSE ID from google.com/cse
  var CSE = '';
  
  var api = "https://www.googleapis.com/customsearch/v1?key="
  + KEY + "&cx=" + CSE + "&q=" + encodeURIComponent(q) + '&start=' + startIx.toString();
  
  try {
    
    var response = UrlFetchApp.fetch(api, {
      muteHttpExceptions: true
    });    
    
    if (response.getResponseCode() == 200) {
      
      var content = JSON.parse(response);
      
      // Did the search return any results?
      if (content.searchInformation.totalResults > 0) {
        return content;
      }
    } 
  } catch (f) {
    Logger.log(f.toString());
  }  
}

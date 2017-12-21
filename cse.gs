/*
* Fetch Google Search Results with the Site Search API
* https://ctrlq.org/code/20076-google-search-api
* https://developers.google.com/custom-search/
*/

function getGoogleSearchResults(q, startIx) {  
  // Get the API key from Google's developer console
  var KEY = '???';
  
  // Get the CSE ID from google.com/cse
  var CSE = '???';
  
  var api = "https://www.googleapis.com/customsearch/v1?key="
  + KEY + "&cx=" + CSE + "&q=" + encodeURIComponent(q) +'&excludeTerms='+ encodeURIComponent('download|zip|docs')+ '&start=' + startIx.toString();
  // Logger.log('api: %s', api);  
  // https://www.googleapis.com/customsearch/v1?key=???&cx=???&q=.mp3
  
  // "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}
  // &start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}
  // &gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}
  // &hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}
  // &exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}
  // &relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}
  // &searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}
  // &imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
  
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

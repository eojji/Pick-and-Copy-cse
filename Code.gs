/**
* Special function that handles HTTP GET requests to the published web app.
* @return {HtmlOutput} The HTML page to be served.
*
* https://developers.google.com/apps-script/guides/html/best-practices#separate_html_css_and_javascript 
* https://developers.google.com/apps-script/guides/html/communication#forms
*
* Usage
*
*  1. Run > t_processForm : 
*  2. Publish > Deploy as web app 
*    - enter Project Version name and click 'Save New Version' 
*  3. Copy the 'Current web app URL' and post this in your form/script action 
* 
*/

function doGet(request) {
  return HtmlService.createTemplateFromFile('Page')
  .evaluate();
}

function processForm(formObject) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(30000);    
    var ss = SpreadsheetApp.create('_PaC_Sheet ' + formObject.query);        
    //var ss = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("spreadsheetId"));
    var sheet = ss.getSheets()[0];
    
    for(var startIx = 1; startIx <= 10; startIx++) {
      var content = getGoogleSearchResults(formObject.query, startIx);
      if (content && content.searchInformation.totalResults > 0) {
        var count = content.items.length;      
        for (var i = 0; i < count; i++) {
          sheet.appendRow([new Date(), content.items[i].title, content.items[i].link]);
          // Logger.log('title: %s, link: %s',content.items[i].title, content.items[i].link);
        }
      }
    }
    
  } catch(e) {
    return "Error: " + e;
  } finally { 
    lock.releaseLock();
  }
  return sheet.getLastRow().toString();
}

function t_processForm() {
  var formObject = {
    name: '.mp3'
  };  
  processForm(formObject);  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();  
}

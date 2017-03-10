/*------------------------------------------------------------------
	Use web service to lookup matching names
  ------------------------------------------------------------------*/
var fieldIdNameList = 'ListBoxNames';
var fieldIdMessage = 'TextBoxMessage';
var spinnerId = 'Spinner';
function nameLookup(fieldId, maxResultsId, guidId) {
   var name = getFieldValue(fieldId);
   var guid = getFieldValue(guidId);
   var maxResults = getFieldValue(maxResultsId);
   var jasonScript
   var request = 'https://abr.business.gov.au/json/MatchingNames.aspx?callback=nameCallback&name=' + name + '&maxResults=' + maxResults + '&guid=' + guid;
   //var request = 'http://localhost:2573/MatchingNames.aspx?callback=nameCallback&name=' + name + '&maxResults=' + maxResults + '&guid=' + guid;
   try {
      nameInitialise();
      jasonScript = new jsonRequest(request);
      jasonScript.buildScriptTag();
      jasonScript.addScriptTag(); 
   }
   catch (exception) {
		alert(exception.Description);
	}
}
/*------------------------------------------------------------------
Call back function
------------------------------------------------------------------ */
function nameCallback(nameData) {
   setFieldValue(fieldIdMessage, "");
   
    for (var i = 0; i < nameData.Names.length; i++) {
       addValueToListBox(fieldIdNameList, nameData.Names[i].Abn + " " + nameData.Names[i].Name + " " + nameData.Names[i].Score);
   }
   if (nameData.Message.length > 0) {
      setFieldValue(fieldIdMessage, nameData.Message);
   } else {
      setFieldValue(fieldIdMessage, "Names returned : " + nameData.Names.length);
   }
   document.getElementById(spinnerId).style.display = 'none';
}
/*------------------------------------------------------------------
Initialise form fields 
------------------------------------------------------------------ */
function nameInitialise() {
   setFieldValue(fieldIdMessage, 'Requesting ABN Lookup name matching data ... please wait ...');
   clearListBox(fieldIdNameList);
   document.getElementById(spinnerId).style.display = 'inline';

}
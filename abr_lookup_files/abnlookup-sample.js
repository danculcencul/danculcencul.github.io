/*------------------------------------------------------------------
	Use web service to lookup details of the ABN
  ------------------------------------------------------------------*/
var fieldIdEntityName = 'TextBoxEntityName';
var fieldIdAbnStatus = 'TextBoxAbnStatus';
var fieldIdBusinessName = 'TextBoxBusinessName';
var fieldIdBusinessNameList = 'ListBoxBusinessName';
var fieldIdEntityTypeName = 'TextBoxEntityTypeName';
var fieldIdEntityTypeCode = 'TextBoxEntityTypeCode';
var fieldIdGst = 'TextBoxGst';
var fieldIdAddressState = 'TextBoxAddressState';
var fieldIdAddressPostcode = 'TextBoxAddressPostcode';
var spinnerId = 'Spinner';

function abnLookup(fieldId, guidId) {
   var abn = getFieldValue(fieldId);
   var guid = getFieldValue(guidId);
   var jasonScript
   var request = 'https://abr.business.gov.au/json/AbnDetails.aspx?callback=abnCallback&abn=' + abn + '&guid=' + guid;
   //var request = 'http://localhost:2573/AbnDetails.aspx?callback=abnCallback&abn=' + abn + '&guid=' + guid;
   try {
      abnInitialise();
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
function abnCallback(abnData) {
   setFieldValue(fieldIdEntityName, abnData.EntityName);
   setFieldValue(fieldIdAbnStatus, abnData.AbnStatus);
   setFieldValue(fieldIdEntityTypeName, abnData.EntityTypeName);
   setFieldValue(fieldIdEntityTypeCode, abnData.EntityTypeCode);
   setFieldValue(fieldIdGst, abnData.Gst);
   setFieldValue(fieldIdAddressPostcode, abnData.AddressPostcode);
   setFieldValue(fieldIdAddressState, abnData.AddressState);
   for (var i = 0; i < abnData.BusinessName.length; i++) {
      addValueToListBox(fieldIdBusinessNameList, abnData.BusinessName[i]);
      if (i == 0) {
         setFieldValue(fieldIdBusinessName, abnData.BusinessName[0]);
      }
   }
   if (abnData.Message.length > 0) {
      setFieldValue(fieldIdEntityName, abnData.Message);
   }
   document.getElementById(spinnerId).style.display = 'none';
}
/*------------------------------------------------------------------
Initialise form fields 
------------------------------------------------------------------ */
function abnInitialise() {
   setFieldValue(fieldIdEntityName, 'Requesting ABN Lookup data ... please wait');
   setFieldValue(fieldIdAbnStatus, '');
   setFieldValue(fieldIdEntityTypeName, '');
   setFieldValue(fieldIdEntityTypeCode, '');
   setFieldValue(fieldIdGst, 'not registered');
   setFieldValue(fieldIdAddressPostcode, '');
   setFieldValue(fieldIdAddressState, '');

   setFieldValue(fieldIdBusinessName, '');
   clearListBox(fieldIdBusinessNameList);
   document.getElementById(spinnerId).style.display = 'inline';
}
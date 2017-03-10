/*------------------------------------------------------------------
	Use web service to lookup details of the ABN
  ------------------------------------------------------------------*/
function sflLookup(fieldId, guidId) {
   var abn = getFieldValue(fieldId);
   var guid = getFieldValue(guidId);
   var jasonScript
   var request = 'https://abr.business.gov.au/json/SuperDetails.aspx?callback=sflCallback&abn=' + abn + '&guid=' + guid;
   try {
      sflInitialise();
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
 function sflCallback(abnData) {
   setFieldValue('TextBoxFundName', abnData.FundName);
   setFieldValue('TextBoxFundAbnStatus', abnData.AbnStatus);
   setFieldValue('TextBoxCompliance', abnData.FundStatus);
   if (abnData.Message.length > 0) {
      setFieldValue('TextBoxFundName', abnData.Message);
   }
}
/*------------------------------------------------------------------
Initialise form fields 
------------------------------------------------------------------ */
function sflInitialise(abnData) {
   setFieldValue('TextBoxFundName', 'Requesting Super Fund Lookup data ... please wait');
   setFieldValue('TextBoxFundAbnStatus', '');
   setFieldValue('TextBoxCompliance', '');
}

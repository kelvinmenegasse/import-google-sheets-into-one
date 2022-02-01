function importSheets() {

  // * add your folder ID here
  var folderId = '';
  var folder = DriveApp.getFolderById(folderId);

  var fileIterator = folder.getFiles();

  var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var file;
  var fileType;
  var spreadsheetId;
  var spreadsheetName;

  while (fileIterator.hasNext()) {
    file = fileIterator.next();
    fileType = file.getMimeType();

    if (fileType === 'application/vnd.google-apps.spreadsheet') {
      spreadsheetId = file.getId();
      if (spreadsheetId != currentSpreadsheet.getId()) {
        spreadsheetName = file.getName();
        Logger.log('spreadsheet ' + spreadsheetName + ' loading...')
        var data = getDataFromSpreadsheet(spreadsheetId);
        var newSheet = createNewSheet(currentSpreadsheet, spreadsheetName);
        newSheet.getRange(1,1,data.length,data[0].length).setValues(data);
        Logger.log('spreadsheet ' + spreadsheetName + ' finished.');
      }
    }
  }
  
  Logger.log('script finished.');
}

function createNewSheet(ss, ssName) {
  var yourNewSheet = ss.insertSheet();
  yourNewSheet.setName(ssName);
  return yourNewSheet;
}

function getDataFromSpreadsheet(ssId) {
  var ss = SpreadsheetApp.openById(ssId);
  var ws = ss.getSheets()[0];
  var range = ws.getDataRange();
  var data = range.getValues();
  return data;
}

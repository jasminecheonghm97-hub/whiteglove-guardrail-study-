/**
 * Premium Messaging Study — Google Sheets receiver
 * Paste into: Google Sheet → Extensions → Apps Script → Code.gs
 * Deploy:     Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone
 * Writes to two tabs (created automatically): "Responses" and "Participants".
 * New columns are added automatically if the survey sends a new field.
 */
const ALLOWED_SHEETS = ['Responses', 'Participants', 'FollowUp'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const name = ALLOWED_SHEETS.indexOf(data.sheet) >= 0 ? data.sheet : 'Responses';
    const row = data.row || {};
    const ss = SpreadsheetApp.openById('1LHXln8ZFcOi3SS-d632gfJ9a6aaLgQZdk_LIH3NXz4M'); // Whiteglove Guardrail Study Data
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);

    const headers = sh.getLastRow() > 0
      ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].filter(String)
      : ['server_time'];
    Object.keys(row).forEach(k => { if (headers.indexOf(k) < 0) headers.push(k); });
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);

    row.server_time = new Date();
    sh.appendRow(headers.map(h => (row[h] === undefined || row[h] === null) ? '' : row[h]));

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Open the web app URL in a browser to check it's live: you should see "OK".
function doGet() {
  return ContentService.createTextOutput('OK');
}

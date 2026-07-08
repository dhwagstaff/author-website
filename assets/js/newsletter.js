function doPost(e) {
  const sheetName = "DHWagstaffReaderList";

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      return createResponse({
        success: false,
        message: "Sheet not found: " + sheetName
      });
    }

    const email = (e.parameter.email || "").trim().toLowerCase();
    const source = e.parameter.source || "Website";
    const campaign = e.parameter.campaign || "Homepage";
    const interestedIn = e.parameter.interestedIn || "General";
    const dateJoined = new Date();

    if (!email || !isValidEmail(email)) {
      return createResponse({
        success: false,
        message: "Invalid email address"
      });
    }

    const lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      const existingEmails = sheet
        .getRange(2, 1, lastRow - 1, 1)
        .getValues()
        .flat()
        .map(value => String(value).trim().toLowerCase());

      if (existingEmails.includes(email)) {
        return createResponse({
          success: true,
          message: "Email already exists"
        });
      }
    }

    sheet.appendRow([
      email,
      dateJoined,
      source,
      campaign,
      interestedIn
    ]);

    return createResponse({
      success: true,
      message: "Subscriber added"
    });

  } catch (error) {
    return createResponse({
      success: false,
      message: error.toString()
    });
  }
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 1. 보안을 위한 고정 암호
const CLASS_PASSWORD = "우리반1234"; 

// 2. 외부(GitHub)에서 데이터를 보낼 때 실행되는 함수
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    
    // 암호 확인 로직
    if (params.password !== CLASS_PASSWORD) {
      return createResponse({ success: false, message: "암호가 틀렸습니다." });
    }

    // 데이터 저장
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('건의함');
    sheet.appendRow([
      new Date(), 
      params.name, 
      params.category, 
      params.content, 
      "대기 중"
    ]);

    return createResponse({ success: true, message: "성공적으로 전달되었습니다!" });

  } catch (err) {
    return createResponse({ success: false, message: "에러: " + err.toString() });
  }
}

// 응답을 JSON 형태로 내보내는 보조 함수
function createResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

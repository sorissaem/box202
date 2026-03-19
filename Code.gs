// 1. 웹앱 접속 시 실행 (HTML 화면 띄우기)
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('우리 반 비밀 건의함')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 2. 학급 암호 확인 함수 (간단한 인증)
function verifyClassPassword(inputPassword) {
  const CLASS_PASSWORD = "우리반1234"; // 선생님이 정한 암호로 수정하세요!
  return inputPassword === CLASS_PASSWORD;
}

// 3. 건의 사항 저장 함수
function submitSuggestion(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('건의함');
    
    // 데이터 추가: [시간, 이름, 카테고리, 내용, 기본상태]
    sheet.appendRow([
      new Date(), 
      data.name, 
      data.category, 
      data.content, 
      "대기 중"
    ]);
    
    return { success: true, message: "성공적으로 전달되었습니다!" };
  } catch (e) {
    return { success: false, message: "에러 발생: " + e.toString() };
  }
}

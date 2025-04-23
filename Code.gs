function onFormSubmit(e) {
  const webexToken = 'YOUR_WEBEX_ACCESS_TOKEN';
  const webexRoomId = 'YOUR_WEBEX_ROOM_ID';
  const formResponse = e.response;
  const responseTimestamp = formResponse.getTimestamp()
  const itemResponses = formResponse.getItemResponses();
  var arrayResponse = [];

  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var response = itemResponse.getResponse();
    arrayResponse.push([itemResponse.getItem().getTitle(), response]);
  }

  var preparedMessage = prepareMessage(responseTimestamp, arrayResponse);
  Logger.log(preparedMessage);
  callWebexBotAPI(webexToken, webexRoomId, preparedMessage);
}

function prepareMessage(responseTimestamp, arrayResponse) {
  var message = `🙌🫡 มีการส่งข้อมูลโดย Google Form เมื่อ ${responseTimestamp.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} รายละเอียดดังนี้ 🫡🙌\n`;
  for (var i = 0; i < arrayResponse.length; i++) {
    message += `${arrayResponse[i][0]} 👉 ${arrayResponse[i][1]}\n`
  }

  message += `➖➖➖➖➖➖➖➖➖➖➖➖➖`

  return message;
}

function callWebexBotAPI(webexToken, roomId, text) {
  const url = 'https://webexapis.com/v1/messages';
  const bearerToken = webexToken;
  var payload = {
    "roomId": roomId,
    "text": text
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + bearerToken
    },
    'payload': JSON.stringify(payload)
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  Logger.log(data);
}

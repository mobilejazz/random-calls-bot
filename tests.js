var TestSlackRoom = "https://hooks.slack.com/services/TXXXYYYZZZ/XXXYYYZZZ/RRRRRRRRRRRRRRRRRRRRR";

function testMakeRandomPairsAndAnnounceToRoom() {
  makeRandomPairsAndAnnounceToRoom(TestSlackRoom)
}

function testGetTeamMembers() {
  var teamMembers = getTeamMembers();
  SpreadsheetApp.getUi().alert(JSON.stringify(teamMembers));
}

function testMakeRandomPairs() {
  var teamMembers = makeRandomPairs();
  SpreadsheetApp.getUi().alert(JSON.stringify(teamMembers));
}

function testFormatPairs() {
  var input = [["a","b"],["e","f"]];
  SpreadsheetApp.getUi().alert(formatPairs(input));
  var input = [["c","d"],["a","b","e"]];
  SpreadsheetApp.getUi().alert(formatPairs(input));
}

function testSendPairs() {
  var message = "Time to make the random 1-on-1 calls!\n"+
    "Here is your pair for this week:\n\n"+
    " • <@a> meets with <@b>\n"+
    " • <@d> meets with <@c>\n"+
    " • ...\n\n"+
    "If your pair is on holidays...";
  sendPairs(message, TestSlackRoom);
}

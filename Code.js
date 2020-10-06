/**
 * @OnlyCurrentDoc
 */

// configuration: the slack room where you want to send your messages to your team
// create one like this: https://api.slack.com/messaging/webhooks#create_a_webhook
var TeamSlackRoom = "https://hooks.slack.com/services/TXXXYYYZZZ/XXXYYYZZZ/RRRRRRRRRRRRRRRRRRRRR";

// call this function from your cron job
function makeRandomPairsAndAnnounce() {
  makeRandomPairsAndAnnounceToRoom(TeamSlackRoom);
}

function makeRandomPairsAndAnnounceToRoom(room) {
  var pairs = makeRandomPairs();
  var message = formatPairs(pairs);
  sendPairs(message, room);
}

// makeRandomPairs returns a randomized array of arrays of 2 (or 3) people
// if the team is an odd number, one of the "pairs" is 3 people
function makeRandomPairs() {
  var teamMembers = shuffle(getTeamMembers());
  var pairs = [];
  var i = 0;
  while(i < teamMembers.length) {
    var pair = [teamMembers[i], teamMembers[i+1]];
    i+=2;
    // exception, group of 3
    if(i == teamMembers.length-1) {
      pair.push(teamMembers[i]);
      i++;
    }
    pairs.push(pair);
  }
  return pairs;
}

// getTeamMembers reads the team members from the spreadsheed and excludes the ones on holidays
function getTeamMembers() {
  var teamMembers = [];
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var values = sheet.getDataRange().getValues();
  for(var i = 1; i < values.length; i++) {
    var username = values[i][0];
    var onHolidays = values[i][1] != "";
    if(!onHolidays)
      teamMembers.push(username);
  }
  return teamMembers;
}

// formatPairs formats and returns the message to send to the slack room, given the pairs (an array of arrays of 2 or 3 people)
function formatPairs(pairs) {
  if(pairs.length == 0)
    return "Okay, now would be time for the random calls, but... :foreveralone:\nAnyway, enjoy doing whatever you humans do!"
  
  var result = "Time to make the random 1-on-1 calls!\n"+
    "Here is your pair for this week:\n";
  for(var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    result += " • <@"+pair[0]+"> meets with "+"<@"+pair[1]+">";
    if(pair.length > 2) {
      result += " and <@"+pair[2]+">";
    }
    result += "\n";
  }
  result += "If your pair is on holidays, try to pair with someone else whose pair is also on holidays or join the group just below yours.\n";
  result += "You should call each other at 10:30 unless you agree otherwise."
  return result;
}

// sendPairs sends a message to the given slack room
function sendPairs(message, room) {
  // tester: https://api.slack.com/docs/messages/builder
  var body = {
    text: message,
    mrkdwn: true,
  };
  UrlFetchApp.fetch(room, {
    "method" : "post",
    contentType: "application/json",
    payload: JSON.stringify(body),
  });
}

// shuffle an array
// credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

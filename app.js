'use strict';

var _ = require('lodash');
var exec = require('child_process').exec;
var cfg = require('./config.json');
var chalk = require('chalk');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	io.emit('round', 'Connected...');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function* participant(participants){
	var roundCount = 1;
	var backlog = addParticipantsToBacklog(participants);
	while(true) {
		if (backlog.length <= participants.length) {
			backlog = addParticipantsToBacklog(participants, backlog);
		}
		let round = {
			pilot: backlog.shift(),
			coPilor: backlog[0],
			getReady: backlog[1]
		};
		round.pilot.roundCount = roundCount++;

		

			io.emit('round', round);
		yield round;
	}
}
var participant = participant(_.where(cfg.participants, {"active": true}));

function init(participant) {
	var beforePilot = participant.next().value.pilot;
	var timer = setInterval(function () {
		pushCurrentCode(beforePilot);

		let actualParticipant = participant.next().value;
		console.log(chalk.green('Actual Participants on desk:'));
		console.log(actualParticipant);
		beforePilot = actualParticipant.pilot;
	}, cfg.time);


}

function pushCurrentCode(pilot) {
    

	exec('git config user.name "' + pilot.username + '" --replace-all');
	exec('git config user.email ' + pilot.email + ' --replace-all');
	exec('git add --all');
	let message = 'Dojo round: ' + pilot.roundCount + ' - My Round: ' + Math.ceil(pilot.roundCount/4);
	console.log(chalk.grey(message));
	exec('git commit -m "' + message + '"');

	console.log(chalk.green('Code to ' + pilot.username + ' has been commited.'));
	console.log(pilot);
	
}

function handleChildProcess(error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
     console.log('Signal received: '+error.signal);
   }
   console.log('Child Process STDOUT: '+stdout);
   console.log('Child Process STDERR: '+stderr);
 }

function addParticipantsToBacklog(participants, backlog) {

	if (!backlog) {
		backlog = _.shuffle(participants);
	}

	do {
		participants = _.shuffle(participants)
	} while (_.last(backlog) === _.first(participants));
	
	return backlog.concat(participants);

}

init(participant);
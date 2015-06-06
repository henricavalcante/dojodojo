'use strict';

var _ = require('lodash');
var socket = require('socket.io');
var spawn = require('child_process').spawn;
var cfg = require('./config.json');
var chalk = require('chalk');

function init(participants) {
	var backlog = addParticipantsToBacklog(participants);
	var participant = nextParticipant(backlog, participants);
}

function nextParticipant(backlog, participants) {
	let pilot = backlog.shift();

	process.stdout.write('\x1B[2J');
	console.log(chalk.green('Pilot:'));
	console.log(pilot);
	console.log(chalk.green('Co-pilot: '));
	console.log(backlog[0]);
	console.log(chalk.green('Get ready: '));
	console.log(backlog[1]);
	
	if (backlog.length <= participants.length) {
		backlog = addParticipantsToBacklog(participants, backlog);
	}

	setTimeout(function () {
		pushCurrentCode(backlog, participants);
	}, cfg.time);
}

function pushCurrentCode(backlog, participants) {
	//Do commits here
	nextParticipant(backlog, participants);
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

init(_.where(cfg.participants, {"active": true}));
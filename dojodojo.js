#!/usr/bin/env node

'use strict';

const path = require('path');
const pkg = require('./package.json');
const dojodojo = require('commander');
const _ = require('lodash');
const exec = require('./exec');
const chalk = require('chalk');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

dojodojo
.version(pkg.version)
.option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', /^\d+$/i)
.option('-c, --config-file <configFile>', 'Configuration File (defaults to .dojodojo.json)', 'dojodojo.json')
.option('-t --time <time>', 'Configure time to change pilot (defaults to 300s)', /^\d+$/i)
.parse(process.argv);

const cfgFilename = path.resolve('.') + '/' + dojodojo.configFile;

fs.access(cfgFilename, fs.F_OK, (err) => {
  let cfg = require('./' + dojodojo.configFile);
  if (!err) {
    cfg = require(path.resolve('.') + '/' + dojodojo.configFile);
  } else {
    console.log('Config file not found, please check documentation on https://github.com/henricavalcante/dojodojo');
    console.log('Loading default config file.')
  }
  dojodojo.time = dojodojo.time || cfg.time || 300;
  dojodojo.port = dojodojo.port || cfg.port || 3000;
  dojodojo.participantList = participant(_.where(cfg.participants, {"active": true}));
  init(dojodojo.participantList);
});


function* participant(participants) {
  var roundCount = 1;
  var backlog = addParticipantsToBacklog(participants);
  while(true) {

    if (backlog.length <= participants.length) {
      backlog = addParticipantsToBacklog(participants, backlog);
    }

    let round = {
      pilot: backlog.shift(),
      coPilot: backlog[0],
      getReady: backlog[1]
    };
    round.pilot.roundCount = roundCount++;
    io.on('connection', function(socket){
      socket.emit('round', round);
    });
    io.emit('round', round);
    yield round;
  }
}


function init(participant) {

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  http.listen(dojodojo.port, function(){
    console.log('listening on *:%s', dojodojo.port);
  });

  var beforePilot = participant.next().value.pilot;
  const timer = setInterval(function () {
    commitCurrentCode(beforePilot);
    let actualParticipant = participant.next().value;
    console.log(chalk.green('Actual Participants on desk:'));
    console.log(actualParticipant);
    beforePilot = actualParticipant.pilot;
  }, dojodojo.time*1000);
}


function commitCurrentCode(pilot) {
  exec.spawnSyncStream('git', ['config',
                       'user.name',
                       pilot.username,
                       '--replace-all']);
                       exec.spawnSyncStream('git', ['config',
                                            'user.email',
                                            pilot.email,
                                            '--replace-all']);
                                            exec.spawnSyncStream('git', ['add', '--all']);
                                            let message = 'dojo_round_' + pilot.roundCount;
                                            console.log(chalk.grey(message));
                                            exec.spawnSyncStream('git', ['commit', '-m', message], {stdio : 'inherit'});
                                            console.log(chalk.green('Code to ' + pilot.username + ' has been commited.'));
                                            console.log(pilot);
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



//
// Autogenerated by Thrift Compiler (0.14.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;
var Int64 = require('node-int64');

var shared_ttypes = require('./shared_types');


var ttypes = module.exports = {};
ttypes.EventId = {
  '0' : 'kReloadWorkspace',
  'kReloadWorkspace' : 0,
  '1' : 'kReloadProject',
  'kReloadProject' : 1,
  '2' : 'kReloadConfiguration',
  'kReloadConfiguration' : 2,
  '3' : 'kProjectAdded',
  'kProjectAdded' : 3,
  '4' : 'kConfigurationAdded',
  'kConfigurationAdded' : 4,
  '5' : 'kProjectRemoved',
  'kProjectRemoved' : 5,
  '6' : 'kConfigurationRemoved',
  'kConfigurationRemoved' : 6,
  '7' : 'kReloadTree',
  'kReloadTree' : 7
};
var ProjectManagerEvent = module.exports.ProjectManagerEvent = function(args) {
  this.eventId = null;
  this.project = null;
  this.configurations = null;
  if (args) {
    if (args.eventId !== undefined && args.eventId !== null) {
      this.eventId = args.eventId;
    }
    if (args.project !== undefined && args.project !== null) {
      this.project = args.project;
    }
    if (args.configurations !== undefined && args.configurations !== null) {
      this.configurations = Thrift.copyList(args.configurations, [null]);
    }
  }
};
ProjectManagerEvent.prototype = {};
ProjectManagerEvent.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.eventId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.project = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        this.configurations = [];
        var _rtmp31 = input.readListBegin();
        var _size0 = _rtmp31.size || 0;
        for (var _i2 = 0; _i2 < _size0; ++_i2) {
          var elem3 = null;
          elem3 = input.readString();
          this.configurations.push(elem3);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ProjectManagerEvent.prototype.write = function(output) {
  output.writeStructBegin('ProjectManagerEvent');
  if (this.eventId !== null && this.eventId !== undefined) {
    output.writeFieldBegin('eventId', Thrift.Type.I32, 1);
    output.writeI32(this.eventId);
    output.writeFieldEnd();
  }
  if (this.project !== null && this.project !== undefined) {
    output.writeFieldBegin('project', Thrift.Type.STRING, 2);
    output.writeString(this.project);
    output.writeFieldEnd();
  }
  if (this.configurations !== null && this.configurations !== undefined) {
    output.writeFieldBegin('configurations', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRING, this.configurations.length);
    for (var iter4 in this.configurations) {
      if (this.configurations.hasOwnProperty(iter4)) {
        iter4 = this.configurations[iter4];
        output.writeString(iter4);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ttypes.EVENTMANAGER_ID = 'com.iar.thrift.service.eventmgr';
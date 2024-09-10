/// <reference path="ListWindowBackend.d.ts" />
//
// Autogenerated by Thrift Compiler (0.14.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//

import thrift = require('thrift');
import Thrift = thrift.Thrift;
import Q = thrift.Q;
import Int64 = require('node-int64');
import ServiceRegistry_ttypes = require('./ServiceRegistry_types');
import shared_ttypes = require('./shared_types');


import ttypes = require('./listwindow_types');
import Alignment = ttypes.Alignment
import TextStyle = ttypes.TextStyle
import KeyNavOperation = ttypes.KeyNavOperation
import ScrollOperation = ttypes.ScrollOperation
import SelectionFlags = ttypes.SelectionFlags
import Target = ttypes.Target
import What = ttypes.What
import ToolbarWhat = ttypes.ToolbarWhat
import SLIDING_POS_NONE = ttypes.SLIDING_POS_NONE
import Range = ttypes.Range
import Color = ttypes.Color
import Format = ttypes.Format
import Cell = ttypes.Cell
import Row = ttypes.Row
import Column = ttypes.Column
import ListSpec = ttypes.ListSpec
import MenuItem = ttypes.MenuItem
import SelRange = ttypes.SelRange
import EditInfo = ttypes.EditInfo
import Tooltip = ttypes.Tooltip
import Drag = ttypes.Drag
import HelpTag = ttypes.HelpTag
import Note = ttypes.Note
import ToolbarNote = ttypes.ToolbarNote
import ToolbarItemState = ttypes.ToolbarItemState
import ChunkInfo = ttypes.ChunkInfo
import AddRowsResult = ttypes.AddRowsResult
import NavigateResult = ttypes.NavigateResult
import SelectionResult = ttypes.SelectionResult
import StackBarInfo = ttypes.StackBarInfo
import TraceCustomParameter = ttypes.TraceCustomParameter
import TraceFindParams = ttypes.TraceFindParams
import TraceProgress = ttypes.TraceProgress
import DragDropFeedback = ttypes.DragDropFeedback
import ListWindowRenderParameters = ttypes.ListWindowRenderParameters
import ListWindowBackend = require('./ListWindowBackend');

declare class Client extends ListWindowBackend.Client {
  #output: thrift.TTransport;
  #pClass: thrift.TProtocol;
  #_seqid: number;

  constructor(output: thrift.TTransport, pClass: { new(trans: thrift.TTransport): thrift.TProtocol });

  setRate(sampleRate: number): Q.Promise<void>;

  setRate(sampleRate: number, callback?: (error: void, response: void)=>void): void;

  getRateOfSample(): Q.Promise<number>;

  getRateOfSample(callback?: (error: void, response: number)=>void): void;

  getMaxRate(): Q.Promise<number>;

  getMaxRate(callback?: (error: void, response: number)=>void): void;
}

declare class Processor extends ListWindowBackend.Processor {
  #_handler: object;

  constructor(handler: object);
  process(input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setRate(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getRateOfSample(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getMaxRate(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
}

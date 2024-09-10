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

  isEnabled(): Q.Promise<boolean>;

  isEnabled(callback?: (error: void, response: boolean)=>void): void;

  canEnable(): Q.Promise<boolean>;

  canEnable(callback?: (error: void, response: boolean)=>void): void;

  setEnabled(on: boolean): Q.Promise<void>;

  setEnabled(on: boolean, callback?: (error: void, response: void)=>void): void;

  canClear(): Q.Promise<boolean>;

  canClear(callback?: (error: void, response: boolean)=>void): void;

  clear(): Q.Promise<void>;

  clear(callback?: (error: void, response: void)=>void): void;

  isMixedMode(): Q.Promise<boolean>;

  isMixedMode(callback?: (error: void, response: boolean)=>void): void;

  canUseMixedMode(): Q.Promise<boolean>;

  canUseMixedMode(callback?: (error: void, response: boolean)=>void): void;

  setMixedMode(on: boolean): Q.Promise<void>;

  setMixedMode(on: boolean, callback?: (error: void, response: void)=>void): void;

  canSave(): Q.Promise<boolean>;

  canSave(callback?: (error: void, response: boolean)=>void): void;

  save(filename: string): Q.Promise<void>;

  save(filename: string, callback?: (error: void, response: void)=>void): void;

  getDefaultSaveFilename(): Q.Promise<string>;

  getDefaultSaveFilename(callback?: (error: void, response: string)=>void): void;

  getDefaultSaveFilenameExt(): Q.Promise<string>;

  getDefaultSaveFilenameExt(callback?: (error: void, response: string)=>void): void;

  canFind(): Q.Promise<boolean>;

  canFind(callback?: (error: void, response: boolean)=>void): void;

  getFindParams(): Q.Promise<TraceFindParams>;

  getFindParams(callback?: (error: void, response: TraceFindParams)=>void): void;

  find(params: TraceFindParams): Q.Promise<void>;

  find(params: TraceFindParams, callback?: (error: void, response: void)=>void): void;

  findLocal(params: TraceFindParams): Q.Promise<void>;

  findLocal(params: TraceFindParams, callback?: (error: void, response: void)=>void): void;

  canBrowse(): Q.Promise<boolean>;

  canBrowse(callback?: (error: void, response: boolean)=>void): void;

  isBrowsing(): Q.Promise<boolean>;

  isBrowsing(callback?: (error: void, response: boolean)=>void): void;

  setBrowseMode(on: boolean): Q.Promise<void>;

  setBrowseMode(on: boolean, callback?: (error: void, response: void)=>void): void;

  getProgress(): Q.Promise<TraceProgress>;

  getProgress(callback?: (error: void, response: TraceProgress)=>void): void;

  supportsTraceSettings(): Q.Promise<boolean>;

  supportsTraceSettings(callback?: (error: void, response: boolean)=>void): void;
}

declare class Processor extends ListWindowBackend.Processor {
  #_handler: object;

  constructor(handler: object);
  process(input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_isEnabled(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_canEnable(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setEnabled(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_canClear(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_clear(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_isMixedMode(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_canUseMixedMode(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setMixedMode(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_canSave(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_save(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getDefaultSaveFilename(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getDefaultSaveFilenameExt(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_canFind(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getFindParams(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_find(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_findLocal(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_canBrowse(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_isBrowsing(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setBrowseMode(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getProgress(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_supportsTraceSettings(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
}

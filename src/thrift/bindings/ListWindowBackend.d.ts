/// <reference path="HeartbeatService.d.ts" />
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
import HeartbeatService = require('./HeartbeatService');

declare class Client extends HeartbeatService.Client {
  #output: thrift.TTransport;
  #pClass: thrift.TProtocol;
  #_seqid: number;

  constructor(output: thrift.TTransport, pClass: { new(trans: thrift.TTransport): thrift.TProtocol });

  connect(listener: ServiceRegistry_ttypes.ServiceLocation): Q.Promise<void>;

  connect(listener: ServiceRegistry_ttypes.ServiceLocation, callback?: (error: void, response: void)=>void): void;

  disconnect(): Q.Promise<void>;

  disconnect(callback?: (error: void, response: void)=>void): void;

  setContentStorageFile(filename: string): Q.Promise<void>;

  setContentStorageFile(filename: string, callback?: (error: void, response: void)=>void): void;

  getNumberOfRows(): Q.Promise<Int64>;

  getNumberOfRows(callback?: (error: void, response: Int64)=>void): void;

  getRow(index: Int64): Q.Promise<Row>;

  getRow(index: Int64, callback?: (error: void, response: Row)=>void): void;

  setVisibleRows(first: Int64, last: Int64): Q.Promise<void>;

  setVisibleRows(first: Int64, last: Int64, callback?: (error: void, response: void)=>void): void;

  show(on: boolean): Q.Promise<void>;

  show(on: boolean, callback?: (error: void, response: void)=>void): void;

  getColumnInfo(): Q.Promise<Column[]>;

  getColumnInfo(callback?: (error: void, response: Column[])=>void): void;

  getListSpec(): Q.Promise<ListSpec>;

  getListSpec(callback?: (error: void, response: ListSpec)=>void): void;

  toggleExpansion(index: Int64): Q.Promise<number>;

  toggleExpansion(index: Int64, callback?: (error: void, response: number)=>void): void;

  toggleCheckmark(index: Int64): Q.Promise<void>;

  toggleCheckmark(index: Int64, callback?: (error: void, response: void)=>void): void;

  getContextMenu(row: Int64, col: number): Q.Promise<MenuItem[]>;

  getContextMenu(row: Int64, col: number, callback?: (error: void, response: MenuItem[])=>void): void;

  handleContextMenu(command: number): Q.Promise<void>;

  handleContextMenu(command: number, callback?: (error: void, response: void)=>void): void;

  getDisplayName(): Q.Promise<string>;

  getDisplayName(callback?: (error: void, response: string)=>void): void;

  scroll(op: ScrollOperation, first: Int64, last: Int64): Q.Promise<Int64>;

  scroll(op: ScrollOperation, first: Int64, last: Int64, callback?: (error: void, response: Int64)=>void): void;

  click(row: Int64, col: number, flag: SelectionFlags): Q.Promise<void>;

  click(row: Int64, col: number, flag: SelectionFlags, callback?: (error: void, response: void)=>void): void;

  doubleClick(row: Int64, col: number): Q.Promise<void>;

  doubleClick(row: Int64, col: number, callback?: (error: void, response: void)=>void): void;

  getEditableString(row: Int64, col: number): Q.Promise<EditInfo>;

  getEditableString(row: Int64, col: number, callback?: (error: void, response: EditInfo)=>void): void;

  setValue(row: Int64, col: number, value: string): Q.Promise<boolean>;

  setValue(row: Int64, col: number, value: string, callback?: (error: void, response: boolean)=>void): void;

  getSelection(): Q.Promise<SelRange[]>;

  getSelection(callback?: (error: void, response: SelRange[])=>void): void;

  getToolTip(row: Int64, col: number, pos: number): Q.Promise<Tooltip>;

  getToolTip(row: Int64, col: number, pos: number, callback?: (error: void, response: Tooltip)=>void): void;

  drop(row: Int64, col: number, text: string): Q.Promise<boolean>;

  drop(row: Int64, col: number, text: string, callback?: (error: void, response: boolean)=>void): void;

  dropLocal(row: Int64, col: number, text: string, srcRow: Int64, srcCol: number): Q.Promise<boolean>;

  dropLocal(row: Int64, col: number, text: string, srcRow: Int64, srcCol: number, callback?: (error: void, response: boolean)=>void): void;

  getDrag(row: Int64, col: number): Q.Promise<Drag>;

  getDrag(row: Int64, col: number, callback?: (error: void, response: Drag)=>void): void;

  getHelpTag(): Q.Promise<HelpTag>;

  getHelpTag(callback?: (error: void, response: HelpTag)=>void): void;

  columnClick(col: number): Q.Promise<void>;

  columnClick(col: number, callback?: (error: void, response: void)=>void): void;

  handleChar(c: number, repeat: number): Q.Promise<void>;

  handleChar(c: number, repeat: number, callback?: (error: void, response: void)=>void): void;

  handleKeyDown(c: number, repeat: number, shift: boolean, ctrl: boolean): Q.Promise<void>;

  handleKeyDown(c: number, repeat: number, shift: boolean, ctrl: boolean, callback?: (error: void, response: void)=>void): void;

  keyNavigate(op: KeyNavOperation, repeat: number, flags: number, rowsInPage: number): Q.Promise<void>;

  keyNavigate(op: KeyNavOperation, repeat: number, flags: number, rowsInPage: number, callback?: (error: void, response: void)=>void): void;

  toggleMoreOrLess(row: Int64): Q.Promise<void>;

  toggleMoreOrLess(row: Int64, callback?: (error: void, response: void)=>void): void;

  dropOutsideContent(): Q.Promise<Target>;

  dropOutsideContent(callback?: (error: void, response: Target)=>void): void;

  isSliding(): Q.Promise<boolean>;

  isSliding(callback?: (error: void, response: boolean)=>void): void;

  getChunkInfo(): Q.Promise<ChunkInfo>;

  getChunkInfo(callback?: (error: void, response: ChunkInfo)=>void): void;

  addAfter(minToAdd: number, maxToTrim: number): Q.Promise<AddRowsResult>;

  addAfter(minToAdd: number, maxToTrim: number, callback?: (error: void, response: AddRowsResult)=>void): void;

  addBefore(minToAdd: number, maxToTrim: number): Q.Promise<AddRowsResult>;

  addBefore(minToAdd: number, maxToTrim: number, callback?: (error: void, response: AddRowsResult)=>void): void;

  navigateToFraction(fraction: number, chunkPos: number, minLines: number): Q.Promise<NavigateResult>;

  navigateToFraction(fraction: number, chunkPos: number, minLines: number, callback?: (error: void, response: NavigateResult)=>void): void;

  navigateTo(toWhat: string, chunkPos: number, minLines: number): Q.Promise<NavigateResult>;

  navigateTo(toWhat: string, chunkPos: number, minLines: number, callback?: (error: void, response: NavigateResult)=>void): void;

  getSel(): Q.Promise<SelectionResult>;

  getSel(callback?: (error: void, response: SelectionResult)=>void): void;

  setSel(row: number): Q.Promise<SelectionResult>;

  setSel(row: number, callback?: (error: void, response: SelectionResult)=>void): void;

  keyNav(op: KeyNavOperation, repeat: number, rowsInPage: number): Q.Promise<number>;

  keyNav(op: KeyNavOperation, repeat: number, rowsInPage: number, callback?: (error: void, response: number)=>void): void;

  getToolbarDefinition(): Q.Promise<string>;

  getToolbarDefinition(callback?: (error: void, response: string)=>void): void;

  setToolbarItemValue(id: string, property: string): Q.Promise<boolean>;

  setToolbarItemValue(id: string, property: string, callback?: (error: void, response: boolean)=>void): void;

  getToolbarItemValue(id: string): Q.Promise<string>;

  getToolbarItemValue(id: string, callback?: (error: void, response: string)=>void): void;

  getToolbarItemState(id: string): Q.Promise<ToolbarItemState>;

  getToolbarItemState(id: string, callback?: (error: void, response: ToolbarItemState)=>void): void;

  getToolbarItemTooltip(id: string): Q.Promise<string>;

  getToolbarItemTooltip(id: string, callback?: (error: void, response: string)=>void): void;
}

declare class Processor extends HeartbeatService.Processor {
  #_handler: object;

  constructor(handler: object);
  process(input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_connect(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_disconnect(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setContentStorageFile(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getNumberOfRows(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getRow(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setVisibleRows(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_show(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getColumnInfo(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getListSpec(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_toggleExpansion(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_toggleCheckmark(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getContextMenu(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_handleContextMenu(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getDisplayName(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_scroll(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_click(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_doubleClick(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getEditableString(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setValue(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getSelection(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getToolTip(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_drop(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_dropLocal(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getDrag(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getHelpTag(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_columnClick(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_handleChar(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_handleKeyDown(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_keyNavigate(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_toggleMoreOrLess(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_dropOutsideContent(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_isSliding(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getChunkInfo(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_addAfter(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_addBefore(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_navigateToFraction(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_navigateTo(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getSel(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setSel(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_keyNav(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getToolbarDefinition(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_setToolbarItemValue(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getToolbarItemValue(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getToolbarItemState(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_getToolbarItemTooltip(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
}

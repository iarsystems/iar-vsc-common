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



declare enum Alignment {
  kLeft = 0,
  kRight = 1,
  kCenter = 2,
}

declare enum TextStyle {
  kFixedPlain = 0,
  kFixedBold = 1,
  kFixedItalic = 2,
  kFixedBoldItalic = 3,
  kProportionalPlain = 4,
  kProportionalBold = 5,
  kProportionalItalic = 6,
  kProportionalBoldItalic = 7,
}

declare enum KeyNavOperation {
  kPrevItem = 0,
  kNextItem = 1,
  kPrevItemPage = 2,
  kNextItemPage = 3,
  kTopItem = 4,
  kBottomItem = 5,
  kNextRight = 6,
  kPrevLeft = 7,
}

declare enum ScrollOperation {
  kScrollLineUp = 0,
  kScrollLineDown = 1,
  kScrollPageUp = 2,
  kScrollPageDown = 3,
  kScrollTop = 4,
  kScrollBottom = 5,
  kScrollTrack = 6,
}

declare enum SelectionFlags {
  kReplace = 0,
  kAdd = 1,
  kRange = 2,
}

declare enum Target {
  kNoTarget = 0,
  kTargetAll = 1,
  kTargetRow = 2,
  kTargetColumn = 3,
  kTargetCell = 4,
}

declare enum What {
  kEnsureVisible = 0,
  kSelectionUpdate = 1,
  kRowUpdate = 2,
  kNormalUpdate = 3,
  kFullUpdate = 4,
  kFreeze = 5,
  kThaw = 6,
}

declare enum ToolbarWhat {
  kNormalUpdate = 0,
  kFullUpdate = 1,
  kFocusOn = 2,
}

declare class Range {
  public first: Int64;
  public last: Int64;

    constructor(args?: { first: Int64; last: Int64; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Color {
  public r: number;
  public g: number;
  public b: number;
  public lowContrast: boolean;
  public isDefault: boolean;

    constructor(args?: { r: number; g: number; b: number; lowContrast: boolean; isDefault: boolean; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Format {
  public align: Alignment;
  public style: TextStyle;
  public editable: boolean;
  public icons: string[];
  public transp: Color;
  public textColor: Color;
  public bgColor: Color;
  public barColor: Color;
  public barFraction: number;

    constructor(args?: { align: Alignment; style: TextStyle; editable: boolean; icons: string[]; transp: Color; textColor: Color; bgColor: Color; barColor: Color; barFraction: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Cell {
  public text: string;
  public format: Format;
  public drop: Target;

    constructor(args?: { text: string; format: Format; drop: Target; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Row {
  public cells: Cell[];
  public isChecked: boolean;
  public treeinfo: string;

    constructor(args?: { cells: Cell[]; isChecked: boolean; treeinfo: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Column {
  public title: string;
  public width: number;
  public fixed: boolean;
  public hideSelection: boolean;
  public defaultFormat: Format;

    constructor(args?: { title: string; width: number; fixed: boolean; hideSelection: boolean; defaultFormat: Format; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ListSpec {
  public bgColor: Color;
  public canClickColumns: boolean;
  public showGrid: boolean;
  public showHeader: boolean;
  public showCheckBoxes: boolean;

    constructor(args?: { bgColor: Color; canClickColumns: boolean; showGrid: boolean; showHeader: boolean; showCheckBoxes: boolean; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class MenuItem {
  public text: string;
  public command: number;
  public enabled: boolean;
  public checked: boolean;

    constructor(args?: { text: string; command: number; enabled: boolean; checked: boolean; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class SelRange {
  public first: Int64;
  public last: Int64;

    constructor(args?: { first: Int64; last: Int64; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class EditInfo {
  public editString: string;
  public column: number;
  public range: SelRange;

    constructor(args?: { editString: string; column: number; range: SelRange; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Tooltip {
  public target: Target;
  public text: string;

    constructor(args?: { target: Target; text: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Drag {
  public result: boolean;
  public text: string;
  public row: Int64;
  public col: number;

    constructor(args?: { result: boolean; text: string; row: Int64; col: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class HelpTag {
  public available: boolean;
  public text: string;

    constructor(args?: { available: boolean; text: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Note {
  public what: What;
  public seq: Int64;
  public ensureVisible: Int64;
  public row: Int64;
  public anonPos: string;

    constructor(args?: { what: What; seq: Int64; ensureVisible: Int64; row: Int64; anonPos: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ToolbarNote {
  public what: ToolbarWhat;
  public focusOn: number;

    constructor(args?: { what: ToolbarWhat; focusOn: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ToolbarItemState {
  public enabled: boolean;
  public visible: boolean;
  public on: boolean;
  public detail: Int64;
  public str: string;

    constructor(args?: { enabled: boolean; visible: boolean; on: boolean; detail: Int64; str: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ChunkInfo {
  public numberOfRows: number;
  public fractionBefore: number;
  public fractionAfter: number;
  public atStart: boolean;
  public atEnd: boolean;

    constructor(args?: { numberOfRows: number; fractionBefore: number; fractionAfter: number; atStart: boolean; atEnd: boolean; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class AddRowsResult {
  public chunkInfo: ChunkInfo;
  public rows: number;

    constructor(args?: { chunkInfo: ChunkInfo; rows: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class NavigateResult {
  public chunkInfo: ChunkInfo;
  public chunkPos: number;

    constructor(args?: { chunkInfo: ChunkInfo; chunkPos: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class SelectionResult {
  public row: number;
  public pos: string;

    constructor(args?: { row: number; pos: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class StackBarInfo {
  public currentLevel: number;
  public maxLevel: number;

    constructor(args?: { currentLevel: number; maxLevel: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class TraceCustomParameter {
  public name: string;
  public value: string;

    constructor(args?: { name: string; value: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class TraceFindParams {
  public findWhat: string;
  public useRange: boolean;
  public rangeStart: Int64;
  public rangeEnd: Int64;
  public textSearch: boolean;
  public searchColumn: number;
  public columnName: string;
  public matchCase: boolean;
  public matchWord: boolean;
  public columns: string[];
  public searchHistory: string[];
  public customParameters: TraceCustomParameter[];

    constructor(args?: { findWhat: string; useRange: boolean; rangeStart: Int64; rangeEnd: Int64; textSearch: boolean; searchColumn: number; columnName: string; matchCase: boolean; matchWord: boolean; columns: string[]; searchHistory: string[]; customParameters: TraceCustomParameter[]; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class TraceProgress {
  public current: number;
  public maxvalue: number;

    constructor(args?: { current: number; maxvalue: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class DragDropFeedback {
  public target: Target;
  public rowIdx: number;
  public colIdx: number;

    constructor(args?: { target: Target; rowIdx: number; colIdx: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ListWindowRenderParameters {
  public listSpec: ListSpec;
  public columns: Column[];
  public rows: Row[];
  public selection: SelRange[];
  public offset: Int64;
  public dragDropFeedback: DragDropFeedback;
  public hpos: number;

    constructor(args?: { listSpec: ListSpec; columns: Column[]; rows: Row[]; selection: SelRange[]; offset: Int64; dragDropFeedback: DragDropFeedback; hpos: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare var SLIDING_POS_NONE: string;

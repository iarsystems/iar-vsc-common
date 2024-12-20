//
// Autogenerated by Thrift Compiler (0.14.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
import thrift = require('thrift');
import Thrift = thrift.Thrift;
import Q = thrift.Q;
import Int64 = require('node-int64');


/**
 * See DcResult in CoreUtil/include/DcCommon.h
 */
declare enum DcResultConstant {
  kDcOk = 0,
  kDcRequestedStop = 1,
  kDcOtherStop = 2,
  kDcUnconditionalStop = 3,
  kDcSympatheticStop = 4,
  kDcBusy = 5,
  kDcError = 6,
  kDcFatalError = 7,
  kDcLicenseViolation = 8,
  kDcSilentFatalError = 9,
  kDcFailure = 10,
  kDcDllLoadLibFailed = 11,
  kDcDllFuncNotFound = 12,
  kDcDllFuncSlotEmpty = 13,
  kDcDllVersionMismatch = 14,
  kDcUnavailable = 15,
}

declare enum ExprFormat {
  kDefault = 0,
  kBin = 1,
  kOct = 2,
  kDec = 3,
  kHex = 4,
  kChar = 5,
  kStr = 6,
  kNoCustom = 7,
}

declare enum ContextType {
  CurrentBase = 0,
  CurrentInspection = 1,
  Stack = 2,
  Target = 3,
  Task = 4,
  Unknown = 5,
}

/**
 * Breakpoint access types.
 */
declare enum AccessType {
  kDkFetchAccess = 1,
  kDkReadAccess = 2,
  kDkWriteAccess = 3,
  kDkReadWriteAccess = 4,
}

/**
 * General exception throw when things go wrong in the debugger.
 */
declare class CSpyException extends Thrift.TException {
  public code: DcResultConstant;
  public method: string;
  public message: string;
  public culprit: string;

    constructor(args?: { code: DcResultConstant; method: string; message: string; culprit: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Id {
  public value: string;
  public type: string;

    constructor(args?: { value: string; type: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Success {
  public value: boolean;
  public failureMessage: string;

    constructor(args?: { value: boolean; failureMessage: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Zone {
  public id: number;

    constructor(args?: { id: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ZoneInfo {
  public id: number;
  public name: string;
  public minAddress: Int64;
  public maxAddress: Int64;
  public isRegular: boolean;
  public isVisible: boolean;
  public isBigEndian: boolean;
  public bitsPerUnit: number;
  public bytesPerUnit: number;

    constructor(args?: { id: number; name: string; minAddress: Int64; maxAddress: Int64; isRegular: boolean; isVisible: boolean; isBigEndian: boolean; bitsPerUnit: number; bytesPerUnit: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Location {
  public zone: Zone;
  public address: Int64;

    constructor(args?: { zone: Zone; address: Int64; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class SourceLocation {
  public filename: string;
  public line: number;
  public col: number;
  public locations: Location[];

    constructor(args?: { filename: string; line: number; col: number; locations: Location[]; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class SourceRange {
  public filename: string;
  public first: SourceLocation;
  public last: SourceLocation;
  public text: string;

    constructor(args?: { filename: string; first: SourceLocation; last: SourceLocation; text: string; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Symbol {
  public name: string;

    constructor(args?: { name: string; });
  read(input: Object): void;
  write(input: Object): void;
}

/**
 * A context ref is a way to refer to, or address, a context. Context refs
 * are primarily sent from the UI to the debugger when performing operations
 * which require a context. The debugger will then have to obtain a DkContext
 * object explicity using the kernel client API.
 */
declare class ContextRef {
  public type: ContextType;
  public level: number;
  public core: number;
  public task: number;

    constructor(args?: { type: ContextType; level: number; core: number; task: number; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class ContextInfo {
  public context: ContextRef;
  public aliases: ContextRef;
  public sourceRanges: SourceRange[];
  public execLocation: Location;
  public functionName: string;

    constructor(args?: { context: ContextRef; aliases: ContextRef; sourceRanges: SourceRange[]; execLocation: Location; functionName: string; });
  read(input: Object): void;
  write(input: Object): void;
}

/**
 * Settings needed for the stack view. These needs to be part of the
 * initial debugger configuration, and cannot wait until the stack view
 * is shown.
 */
declare class StackSettings {
  public fillEnabled: boolean;
  public overflowWarningsEnabled: boolean;
  public spWarningsEnabled: boolean;
  public warnLogOnly: boolean;
  public warningThreshold: number;
  public useTrigger: boolean;
  public triggerName: string;
  public limitDisplay: boolean;
  public displayLimit: number;

    constructor(args?: { fillEnabled: boolean; overflowWarningsEnabled: boolean; spWarningsEnabled: boolean; warnLogOnly: boolean; warningThreshold: number; useTrigger: boolean; triggerName: string; limitDisplay: boolean; displayLimit: number; });
  read(input: Object): void;
  write(input: Object): void;
}

/**
 * Information about a breakpoint.
 */
declare class Breakpoint {
  public id: number;
  public ule: string;
  public category: string;
  public descriptor: string;
  public description: string;
  public enabled: boolean;
  public isUleBased: boolean;
  public accessType: AccessType;
  public valid: boolean;

    constructor(args?: { id: number; ule: string; category: string; descriptor: string; description: string; enabled: boolean; isUleBased: boolean; accessType: AccessType; valid: boolean; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class PropertyTreeItem {
  public key: string;
  public value: string;
  public children: PropertyTreeItem[];

    constructor(args?: { key: string; value: string; children: PropertyTreeItem[]; });
  read(input: Object): void;
  write(input: Object): void;
}

declare class Capabilities {
  public supportsEditorHighlight: boolean;

    constructor(args?: { supportsEditorHighlight: boolean; });
  read(input: Object): void;
  write(input: Object): void;
}

//
// Autogenerated by Thrift Compiler (0.14.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//

import thrift = require('thrift');
import Thrift = thrift.Thrift;
import Q = thrift.Q;
import Int64 = require('node-int64');
import shared_ttypes = require('./shared_types');


import ttypes = require('./OptionsService_types');
import SERVICE_ID = ttypes.SERVICE_ID
import OptionsServiceError = ttypes.OptionsServiceError
import CreateSessionRequest = ttypes.CreateSessionRequest
import CreateSessionResponse = ttypes.CreateSessionResponse
import CreateSessionWithDataRequest = ttypes.CreateSessionWithDataRequest
import UpdateOptionValueRequest = ttypes.UpdateOptionValueRequest
import UpdateOptionValueResponse = ttypes.UpdateOptionValueResponse
import DestroySessionRequest = ttypes.DestroySessionRequest
import DestroySessionResponse = ttypes.DestroySessionResponse
import Tree = ttypes.Tree
import GetCategoryTreeRequest = ttypes.GetCategoryTreeRequest
import GetCategoryTreeResponse = ttypes.GetCategoryTreeResponse
import GetOptionTreeRequest = ttypes.GetOptionTreeRequest
import GetOptionTreeResponse = ttypes.GetOptionTreeResponse
import OptionValue = ttypes.OptionValue
import VerificationError = ttypes.VerificationError
import VerifyOptionStateRequest = ttypes.VerifyOptionStateRequest
import VerifyOptionStateResponse = ttypes.VerifyOptionStateResponse
import CommitOptionStateRequest = ttypes.CommitOptionStateRequest
import CommitOptionStateResponse = ttypes.CommitOptionStateResponse

declare class Client {
  #output: thrift.TTransport;
  #pClass: thrift.TProtocol;
  #_seqid: number;

  constructor(output: thrift.TTransport, pClass: { new(trans: thrift.TTransport): thrift.TProtocol });

  CreateSession(request: CreateSessionRequest): Q.Promise<CreateSessionResponse>;

  CreateSession(request: CreateSessionRequest, callback?: (error: void, response: CreateSessionResponse)=>void): void;

  CreateSessionWithData(request: CreateSessionWithDataRequest): Q.Promise<CreateSessionResponse>;

  CreateSessionWithData(request: CreateSessionWithDataRequest, callback?: (error: void, response: CreateSessionResponse)=>void): void;

  UpdateOptionValue(request: UpdateOptionValueRequest): Q.Promise<UpdateOptionValueResponse>;

  UpdateOptionValue(request: UpdateOptionValueRequest, callback?: (error: void, response: UpdateOptionValueResponse)=>void): void;

  DestroySession(destroySessionRequest: DestroySessionRequest): Q.Promise<DestroySessionResponse>;

  DestroySession(destroySessionRequest: DestroySessionRequest, callback?: (error: void, response: DestroySessionResponse)=>void): void;

  GetCategoryTree(getCategoryTreeRequest: GetCategoryTreeRequest): Q.Promise<GetCategoryTreeResponse>;

  GetCategoryTree(getCategoryTreeRequest: GetCategoryTreeRequest, callback?: (error: void, response: GetCategoryTreeResponse)=>void): void;

  GetOptionTree(getOptionTreeRequest: GetOptionTreeRequest): Q.Promise<GetOptionTreeResponse>;

  GetOptionTree(getOptionTreeRequest: GetOptionTreeRequest, callback?: (error: void, response: GetOptionTreeResponse)=>void): void;

  VerifyOptionState(verifyOptionStateRequest: VerifyOptionStateRequest): Q.Promise<VerifyOptionStateResponse>;

  VerifyOptionState(verifyOptionStateRequest: VerifyOptionStateRequest, callback?: (error: void, response: VerifyOptionStateResponse)=>void): void;

  CommitOptionState(commitOptionStateRequest: CommitOptionStateRequest): Q.Promise<CommitOptionStateResponse>;

  CommitOptionState(commitOptionStateRequest: CommitOptionStateRequest, callback?: (error: void, response: CommitOptionStateResponse)=>void): void;
}

declare class Processor {
  #_handler: object;

  constructor(handler: object);
  process(input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_CreateSession(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_CreateSessionWithData(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_UpdateOptionValue(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_DestroySession(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_GetCategoryTree(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_GetOptionTree(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_VerifyOptionState(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
  process_CommitOptionState(seqid: number, input: thrift.TProtocol, output: thrift.TProtocol): void;
}
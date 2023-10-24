import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CreateQouteError = { 'QouteNotFound' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'EmptyTitle' : null };
export type DeleteQouteError = { 'UserNotAuthenticated' : null };
export type GetQouteError = { 'QouteNotFound' : null };
export interface Qoute {
  'time_created' : Time,
  'theme' : string,
  'like' : boolean,
  'published' : boolean,
  'tags' : Array<string>,
  'author' : Principal,
  'time_updated' : Time,
  'qoute_text' : string,
}
export type QouteId = bigint;
export type Result = { 'ok' : Qoute } |
  { 'err' : GetQouteError };
export type Result_1 = { 'ok' : null } |
  { 'err' : DeleteQouteError };
export type Result_2 = { 'ok' : null } |
  { 'err' : CreateQouteError };
export type Time = bigint;
export interface _SERVICE {
  'create' : ActorMethod<
    [
      {
        'theme' : string,
        'like' : boolean,
        'published' : boolean,
        'tags' : Array<string>,
        'qoute_text' : string,
      },
    ],
    Result_2
  >,
  'delete' : ActorMethod<[QouteId], Result_1>,
  'get' : ActorMethod<[QouteId], Result>,
  'list_all' : ActorMethod<[], Array<[QouteId, Qoute]>>,
  'list_published' : ActorMethod<[], Array<[QouteId, Qoute]>>,
}

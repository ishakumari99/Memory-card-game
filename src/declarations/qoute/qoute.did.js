export const idlFactory = ({ IDL }) => {
  const CreateQouteError = IDL.Variant({
    'QouteNotFound' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'EmptyTitle' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Null, 'err' : CreateQouteError });
  const QouteId = IDL.Nat;
  const DeleteQouteError = IDL.Variant({ 'UserNotAuthenticated' : IDL.Null });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : DeleteQouteError });
  const Time = IDL.Int;
  const Qoute = IDL.Record({
    'time_created' : Time,
    'theme' : IDL.Text,
    'like' : IDL.Bool,
    'published' : IDL.Bool,
    'tags' : IDL.Vec(IDL.Text),
    'author' : IDL.Principal,
    'time_updated' : Time,
    'qoute_text' : IDL.Text,
  });
  const GetQouteError = IDL.Variant({ 'QouteNotFound' : IDL.Null });
  const Result = IDL.Variant({ 'ok' : Qoute, 'err' : GetQouteError });
  return IDL.Service({
    'create' : IDL.Func(
        [
          IDL.Record({
            'theme' : IDL.Text,
            'like' : IDL.Bool,
            'published' : IDL.Bool,
            'tags' : IDL.Vec(IDL.Text),
            'qoute_text' : IDL.Text,
          }),
        ],
        [Result_2],
        [],
      ),
    'delete' : IDL.Func([QouteId], [Result_1], []),
    'get' : IDL.Func([QouteId], [Result], ['query']),
    'list_all' : IDL.Func([], [IDL.Vec(IDL.Tuple(QouteId, Qoute))], ['query']),
    'list_published' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(QouteId, Qoute))],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };

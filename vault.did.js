export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
  const CredReq = IDL.Record({
    url: IDL.Text,
    title: IDL.Text,
    username: IDL.Text,
    password: IDL.Text,
    note: IDL.Text,
    vaultId: IDL.Text,
  });
  const Error = IDL.Variant({
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    AlreadyExists: IDL.Null,
    BadRequest: IDL.Null,
  });
  const Result_10 = IDL.Variant({ ok: IDL.Text, err: Error });
  const CreateSecretPayload = IDL.Record({
    key: IDL.Text,
    value: IDL.Text,
    projectId: IDL.Text,
  });
  const CreateProjectPayload = IDL.Record({
    name: IDL.Text,
    description: IDL.Text,
  });
  const CreateVaultReq = IDL.Record({
    title: IDL.Text,
    description: IDL.Text,
  });
  const Result = IDL.Variant({ ok: IDL.Bool, err: Error });
  const Cred__1 = IDL.Record({
    id: IDL.Text,
    uid: IDL.Principal,
    url: IDL.Text,
    title: IDL.Text,
    username: IDL.Text,
    password: IDL.Text,
    note: IDL.Text,
    createdAt: IDL.Int,
    lastModified: IDL.Int,
    vaultId: IDL.Text,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(Cred__1, List_1)));
  const Result_9 = IDL.Variant({ ok: List_1, err: Error });
  const PaginationData = IDL.Record({
    per_page: IDL.Int,
    page: IDL.Int,
    page_count: IDL.Int,
    total_count: IDL.Int,
  });
  const Cred = IDL.Record({
    id: IDL.Text,
    uid: IDL.Principal,
    url: IDL.Text,
    title: IDL.Text,
    username: IDL.Text,
    password: IDL.Text,
    note: IDL.Text,
    createdAt: IDL.Int,
    lastModified: IDL.Int,
    vaultId: IDL.Text,
  });
  const CredListResp = IDL.Record({
    pagination: PaginationData,
    data: IDL.Vec(Cred),
  });
  const Result_8 = IDL.Variant({ ok: CredListResp, err: Error });
  const Secret__1 = IDL.Record({
    id: IDL.Text,
    key: IDL.Text,
    value: IDL.Text,
    owner: IDL.Principal,
    createdAt: IDL.Int,
    lastUpdatedAt: IDL.Int,
    projectId: IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(Secret__1, List)));
  const Result_7 = IDL.Variant({ ok: List, err: Error });
  const Project = IDL.Record({
    id: IDL.Text,
    uid: IDL.Principal,
    name: IDL.Text,
    count: IDL.Int,
    description: IDL.Text,
  });
  const Result_6 = IDL.Variant({ ok: Project, err: Error });
  const Result_5 = IDL.Variant({ ok: IDL.Vec(Project), err: Error });
  const Result_4 = IDL.Variant({ ok: Secret__1, err: Error });
  const Secret = IDL.Record({
    id: IDL.Text,
    key: IDL.Text,
    value: IDL.Text,
    owner: IDL.Principal,
    createdAt: IDL.Int,
    lastUpdatedAt: IDL.Int,
    projectId: IDL.Text,
  });
  const SecretListResp = IDL.Record({
    pagination: PaginationData,
    data: IDL.Vec(Secret),
  });
  const Result_3 = IDL.Variant({ ok: SecretListResp, err: Error });
  const Vault = IDL.Record({
    id: IDL.Text,
    uid: IDL.Principal,
    title: IDL.Text,
    count: IDL.Int,
    description: IDL.Text,
  });
  const Result_2 = IDL.Variant({ ok: Vault, err: Error });
  const Result_1 = IDL.Variant({ ok: IDL.Vec(Vault), err: Error });
  const UpdateCredObj = IDL.Record({
    url: IDL.Text,
    title: IDL.Text,
    username: IDL.Text,
    password: IDL.Text,
    note: IDL.Text,
    vaultId: IDL.Text,
  });
  const UpdateSecretPayload = IDL.Record({
    key: IDL.Text,
    value: IDL.Text,
    projectId: IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    addCredential: IDL.Func([CredReq], [Result_10], []),
    addSecret: IDL.Func([CreateSecretPayload], [Result_10], []),
    createProject: IDL.Func([CreateProjectPayload], [Result_10], []),
    createVault: IDL.Func([CreateVaultReq], [Result_10], []),
    deleteCredentialById: IDL.Func([IDL.Text], [Result], []),
    deleteSecretById: IDL.Func([IDL.Text], [Result], []),
    getCredentialsByDomain: IDL.Func([IDL.Text], [Result_9], ["query"]),
    getCredentialsByVaultIds: IDL.Func(
      [IDL.Vec(IDL.Text), IDL.Nat, IDL.Nat],
      [Result_8],
      ["query"]
    ),
    getMyCredentials: IDL.Func([IDL.Nat, IDL.Nat], [Result_8], ["query"]),
    getMySecrets: IDL.Func([], [Result_7], ["query"]),
    getProjectById: IDL.Func([IDL.Text], [Result_6], ["query"]),
    getProjectList: IDL.Func([], [Result_5], ["query"]),
    getSecretByKey: IDL.Func([IDL.Text, IDL.Text], [Result_4], ["query"]),
    getSecretsByProjectId: IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [Result_3],
      ["query"]
    ),
    getVaultById: IDL.Func([IDL.Text], [Result_2], ["query"]),
    getVaultList: IDL.Func([], [Result_1], ["query"]),
    updateCredentialById: IDL.Func([IDL.Text, UpdateCredObj], [Result], []),
    updateProjectById: IDL.Func([IDL.Text, CreateProjectPayload], [Result], []),
    updateSecretById: IDL.Func([IDL.Text, UpdateSecretPayload], [Result], []),
    updateVaultById: IDL.Func([IDL.Text, CreateVaultReq], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};

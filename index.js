import * as agent from "@dfinity/agent";
import fetch from "node-fetch";
import { idlFactory } from "./vault.did.js";
import Secp256k1KeyIdentity from "@dfinity/identity";
import * as crypto from "crypto";

global.fetch = fetch;

const { Actor, HttpAgent } = agent;

class Vault {
  constructor(host = "https://ic0.app", canisterId) {
    this.canisterId = canisterId ? canisterId : "qgxzx-lqaaa-aaaaj-aaltq-cai";
    this.actor = null;
    this.agent = null;
    this.identity = null;
    this.host = host;
  }

  async initIdentity(key) {
    const privateKey = crypto.createHash("sha256").update(key).digest("base64");
    const identity = Secp256k1KeyIdentity.Secp256k1KeyIdentity.fromSecretKey(
      Buffer.from(privateKey, "base64")
    );
    const agent = new HttpAgent({
      host: this.host,
      identity: identity,
    });
    await agent.fetchRootKey();
    const actor = Actor.createActor(idlFactory, {
      canisterId: this.canisterId,
      agent,
    });
    this.identity = identity;
    this.agent = agent;
    this.actor = actor;
  }

  createVault(payload) {
    const createVaultRequest = {
      title: payload.title,
      description: payload.description,
    };

    return this.actor.createVault(createVaultRequest);
  }

  updateVaultById(id, updates) {
    const updateVaultRequest = {
      title: updates.title,
      description: updates.description,
    };

    return this.actor.updateVaultById(id, updateVaultRequest);
  }

  getVaultList() {
    return this.actor.getVaultList();
  }

  getVaultById(id) {
    return this.actor.getVaultById(id);
  }

  addCredential(addCredentialRequest) {
    const updatePayload = {
      url: addCredentialRequest.url || "",
      title: addCredentialRequest.title || "",
      username: addCredentialRequest.username || "",
      password: addCredentialRequest.password || "",
      vaultId: addCredentialRequest.vaultId,
      note: addCredentialRequest.note || "",
    };
    return this.actor.addCredential(updatePayload);
  }

  updateCredentialById(id, updateCredentialRequest) {
    const updatePayload = {
      url: updateCredentialRequest.url || "",
      title: updateCredentialRequest.title || "",
      username: updateCredentialRequest.username || "",
      password: updateCredentialRequest.password || "",
      vaultId: updateCredentialRequest.vaultId,
      note: updateCredentialRequest.note || "",
    };
    return this.actor.updateCredentialById(id, updatePayload);
  }

  deleteCredentialById(id) {
    return this.actor.deleteCredentialById(id);
  }

  getCredentialsByVaultIds(ids, page, size) {
    return this.actor.getCredentialsByVaultIds(ids, page, size);
  }

  getCredentialsByDomain(domain) {
    return this.actor.getCredentialsByDomain(domain);
  }

  createProject(createProjectRequest) {
    const projectCreatePayload = {
      name: createProjectRequest.name,
      description: createProjectRequest.description,
    };
    return this.actor.createProject(projectCreatePayload);
  }

  updateProjectById(id, updateProjectRequest) {
    const updateProjectPayload = {
      name: updateProjectRequest.name,
      description: updateProjectRequest.description,
    };
    return this.actor.updateProjectById(id, updateProjectPayload);
  }

  getProjectList() {
    return this.actor.getProjectList();
  }

  getProjectById(id) {
    return this.actor.getProjectById(id);
  }

  getProjectById(id) {
    return this.actor.getProjectById(id);
  }

  addSecret(addSecretRequest) {
    const addSecretPayload = {
      key: addSecretRequest.key,
      value: addSecretRequest.value,
      projectId: addSecretRequest.projectId,
    };
    return this.actor.addSecret(addSecretPayload);
  }

  updateSecretById(id, updateSecretRequest) {
    const updateSecretPayload = {
      key: updateSecretRequest.key,
      value: updateSecretRequest.value,
      projectId: updateSecretRequest.projectId,
    };
    return this.actor.updateSecretById(id, updateSecretPayload);
  }

  deleteSecretById(id) {
    return this.actor.deleteSecretById(id);
  }

  getSecretsByProjectId(ids, page, size) {
    return this.actor.getSecretsByProjectId(ids, page, size);
  }

  getMySecrets() {
    return this.actor.getMySecrets();
  }

  getSecretByKey(key, projectId) {
    return this.actor.getSecretByKey(key, projectId);
  }
}

export { Vault as vault };

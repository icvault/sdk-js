import * as agent from "@dfinity/agent";
import fetch from "node-fetch";
import { idlFactory } from "./vault.did.js";
import Secp256k1KeyIdentity from "@dfinity/identity";
import * as crypto from "crypto";

global.fetch = fetch;

const { Actor, HttpAgent } = agent;

class Vault {
  constructor(host = "https://ic0.app") {
    this.canisterId = "qgxzx-lqaaa-aaaaj-aaltq-cai";
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

  createVault(title, description) {
    const payload = {
      title,
      description,
    };

    return this.actor.createVault(payload);
  }

  updateVaultById(id, updates) {
    const payload = {
      title: updates.title,
      description: updates.description,
    };

    return this.actor.updateVaultById(id, payload);
  }

  getVaultList() {
    return this.actor.getVaultList();
  }

  getVaultById(id) {
    return this.actor.getVaultById(id);
  }

  getVaultById(id) {
    return this.actor.getVaultById(id);
  }

  addCredential(req) {
    const payload = {
      url: req.url || "",
      title: req.title || "",
      username: req.username || "",
      password: req.password || "",
      vaultId: req.vaultId,
      note: req.note || "",
    };
    return this.actor.addCredential(payload);
  }

  updateCredentialById(id, updates) {
    const payload = {
      url: updates.url || "",
      title: updates.title || "",
      username: updates.username || "",
      password: updates.password || "",
      vaultId: updates.vaultId,
      note: updates.note || "",
    };
    return this.actor.updateCredentialById(id, payload);
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

  createProject(name, description) {
    const payload = {
      name,
      description,
    };
    return this.actor.createProject(payload);
  }

  updateProjectById(id, updates) {
    const payload = {
      name: updates.name,
      description: updates.description,
    };
    return this.actor.updateProjectById(id, payload);
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

  addSecret(data) {
    const payload = {
      key: data.key,
      value: data.value,
      projectId: data.projectId,
    };
    return this.actor.addSecret(payload);
  }

  updateSecretById(id, updates) {
    const payload = {
      key: updates.key,
      value: updates.value,
      projectId: updates.projectId,
    };
    return this.actor.updateSecretById(id, payload);
  }

  deleteSecretById(id) {
    return this.actor.deleteSecretById(id);
  }

  getSecretsByProjectId(id, page, size) {
    return this.actor.getSecretsByProjectId(id, page, size);
  }

  getMySecrets() {
    return this.actor.getMySecrets();
  }

  getSecretByKey(key, projectId) {
    return this.actor.getSecretByKey(key, projectId);
  }
}

export default Vault;

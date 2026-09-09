import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const windowsRoot = path.resolve(here, "..");
const template = await fs.readFile(path.join(windowsRoot, "assets", "renderer-inject.js"), "utf8");
const payload = template
  .replace("__DREAM_CSS_JSON__", JSON.stringify(".fixture { color: blue; }"))
  .replace("__DREAM_ART_JSON__", JSON.stringify("data:image/png;base64,AA=="))
  .replaceAll("__DREAM_MEMES_JSON__", JSON.stringify({}));

assert.match(template, /codex-dream-skin-character/);
assert.match(template, /dream-character-switcher/);
assert.match(template, /dream-duty-label/);
assert.match(template, /dream-completion-stamp/);
assert.match(template, /dream-daily-memo/);
assert.match(template, /dream-pet-dock/);
assert.match(template, /phraseState\.relayIndex/);
assert.match(template, /memePoolSizes = \{ dashu: 100, meiji: 68, wangcai: 29 \}/);
assert.match(template, /meiji: \{ idle: 22, running: 21, review: 22 \}/);
assert.match(template, /wangcai: \{ idle: 21, running: 20, review: 22 \}/);

function createFixture(options) {
  const { shellPresent, staleSkin = false, settingsPresent = false } = options;
  const sidebarFollowsShell = !Object.hasOwn(options, "sidebarPresent");
  let hasSidebar = options.sidebarPresent ?? shellPresent;
  const nodes = new Map();
  const rootClasses = new Set(staleSkin ? ["codex-dream-skin"] : []);
  const rootStyles = new Map(staleSkin ? [["--dream-art", "url(\"blob:stale\")"]] : []);
  const revokedUrls = [];
  let hasShell = shellPresent;

  const makeClassList = (classes = new Set()) => ({
    add(value) { classes.add(value); },
    remove(value) { classes.delete(value); },
    contains(value) { return classes.has(value); },
    toggle(value, enabled) {
      if (enabled) classes.add(value);
      else classes.delete(value);
    },
  });

  const root = {
    classList: makeClassList(rootClasses),
    style: {
      setProperty(key, value) { rootStyles.set(key, value); },
      removeProperty(key) { rootStyles.delete(key); },
    },
    appendChild(node) {
      node.parentElement = root;
      nodes.set(node.id, node);
    },
  };
  const body = {
    appendChild(node) {
      node.parentElement = body;
      nodes.set(node.id, node);
    },
  };
  const shellMain = {
    dataset: {},
    classList: makeClassList(),
    querySelectorAll(selector) {
      if (selector === "input" && settingsPresent) {
        return [{ placeholder: "搜索设置", getAttribute() { return null; } }];
      }
      return [];
    },
    getBoundingClientRect() {
      return { left: 290, top: 36, width: 990, height: 784 };
    },
  };
  const staleHome = { classList: makeClassList(new Set(["dream-home"])) };
  const staleShell = { classList: makeClassList(new Set(["dream-home-shell"])) };

  const createElement = () => ({
    id: "",
    dataset: {},
    style: {},
    classList: makeClassList(),
    parentElement: null,
    textContent: "",
    innerHTML: "",
    setAttribute() {},
    remove() { nodes.delete(this.id); },
  });
  if (staleSkin) {
    const style = createElement();
    style.id = "codex-dream-skin-style";
    nodes.set(style.id, style);
    const chrome = createElement();
    chrome.id = "codex-dream-skin-chrome";
    nodes.set(chrome.id, chrome);
  }

  const document = {
    documentElement: root,
    head: root,
    body,
    createElement,
    getElementById(id) { return nodes.get(id) ?? null; },
    querySelector(selector) {
      if (selector === "main.main-surface") return hasShell ? shellMain : null;
      if (selector === "aside.app-shell-left-panel") return hasSidebar ? {} : null;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === 'button, [role="button"], a, [role="link"]' && settingsPresent) {
        return [{ textContent: "", getAttribute(name) { return name === "aria-label" ? "返回应用" : null; } }];
      }
      if (!staleSkin) return [];
      if (selector === ".dream-home") return [staleHome];
      if (selector === ".dream-home-shell") return [staleShell];
      return [];
    },
  };
  const context = {
    window: {},
    document,
    MutationObserver: class {
      observe() {}
      disconnect() {}
    },
    URL: {
      createObjectURL() { return "blob:fixture"; },
      revokeObjectURL(value) { revokedUrls.push(value); },
    },
    Blob,
    Uint8Array,
    atob,
    setInterval: () => 1,
    clearInterval: () => {},
    setTimeout: () => 2,
    clearTimeout: () => {},
  };

  return {
    context,
    nodes,
    rootClasses,
    rootStyles,
    revokedUrls,
    setShellPresent(value) {
      hasShell = value;
      if (sidebarFollowsShell) hasSidebar = value;
    },
  };
}

const main = createFixture({ shellPresent: true });
const mainResult = vm.runInNewContext(payload, main.context);
assert.equal(mainResult.installed, true);
assert.equal(main.rootClasses.has("codex-dream-skin"), true);
assert.equal(main.rootStyles.get("--dream-art"), 'url("blob:fixture")');
assert.equal(main.nodes.has("codex-dream-skin-style"), true);
assert.equal(main.nodes.has("codex-dream-skin-chrome"), true);
assert.equal(main.context.window.__CODEX_DREAM_SKIN_STATE__.cleanup(), true);
assert.equal(main.rootClasses.has("codex-dream-skin"), false);
assert.equal(main.nodes.has("codex-dream-skin-style"), false);
assert.equal(main.nodes.has("codex-dream-skin-chrome"), false);
assert.deepEqual(main.revokedUrls, ["blob:fixture"]);

const auxiliary = createFixture({ shellPresent: false, staleSkin: true });
const auxiliaryResult = vm.runInNewContext(payload, auxiliary.context);
assert.equal(auxiliaryResult.installed, true);
assert.equal(auxiliary.rootClasses.has("codex-dream-skin"), false);
assert.equal(auxiliary.rootStyles.has("--dream-art"), false);
assert.equal(auxiliary.nodes.has("codex-dream-skin-style"), false);
assert.equal(auxiliary.nodes.has("codex-dream-skin-chrome"), false);

auxiliary.setShellPresent(true);
auxiliary.context.window.__CODEX_DREAM_SKIN_STATE__.ensure();
assert.equal(auxiliary.rootClasses.has("codex-dream-skin"), true);
assert.equal(auxiliary.nodes.has("codex-dream-skin-style"), true);
assert.equal(auxiliary.nodes.has("codex-dream-skin-chrome"), true);

const settings = createFixture({ shellPresent: true, sidebarPresent: false, settingsPresent: true });
vm.runInNewContext(payload, settings.context);
assert.equal(settings.rootClasses.has("dream-settings-page"), true);
settings.context.window.__CODEX_DREAM_SKIN_STATE__.cleanup();
assert.equal(settings.rootClasses.has("dream-settings-page"), false);

console.log("PASS: renderer themes the Codex shell, detects settings, and preserves transparent auxiliary windows.");

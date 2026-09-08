((cssText, artDataUrl, memeUrls = {}) => {
  const STATE_KEY = "__CODEX_DREAM_SKIN_STATE__";
  const STYLE_ID = "codex-dream-skin-style";
  const CHROME_ID = "codex-dream-skin-chrome";
  const THINKING_ID = "codex-dream-thinking-pill";
  const SUGGESTIONS_ID = "codex-dream-home-suggestions";
  const DENSITY_KEY = "codex-dream-skin-density";
  const CHARACTER_KEY = "codex-dream-skin-character";
  const COMPLETION_ID = "codex-dream-completion-stamp";
  const DAILY_MEMO_ID = "codex-dream-daily-memo";
  const BUILD_KEY = "codex-dream-skin-app-build";
  const densityModes = ["quiet", "standard", "lively"];
  const densityLabels = { quiet: "安静", standard: "标准", lively: "热闹" };
  const statusTexts = [
    "鼠鼠已就位",
    "鼠鼠开始翻便签",
    "鼠鼠正在攒下班进度",
    "鼠鼠今天不摆烂",
    "鼠鼠正在找思路",
    "鼠鼠先喝口水",
    "鼠鼠继续推进",
    "鼠鼠保持在线",
    "鼠鼠努力清醒",
    "鼠鼠还在运转",
    "美叽批准开工",
    "美叽正在圈重点",
    "美叽替你加油",
    "美叽说先别急",
    "美叽认真看需求",
    "美叽在等灵感",
    "美叽提醒按时吃饭",
    "美叽把问题记下",
    "美叽今天也在线",
    "美叽说可以做到",
    "旺财在旁边加油",
    "旺财搬来新思路",
    "旺财守住小工位",
    "旺财提醒先保存",
    "旺财正在盯进度",
    "旺财说慢慢来",
    "旺财陪你改代码",
    "旺财抱来一颗糖",
    "旺财今天不缺席",
    "旺财在等好消息",
    "小队已全员到岗",
    "小队开始拆难题",
    "小队正在对答案",
    "小队努力不内耗",
    "小队把线头理顺",
    "小队今天继续营业",
    "小队正在攒经验",
    "小队准备出发",
    "小队守住节奏",
    "小队在给你撑场",
    "工位温度刚刚好",
    "工位灯还亮着",
    "工位正在缓慢苏醒",
    "工位申请一杯热水",
    "工位今天很安静",
    "工位等你写第一行",
    "工位已经整理好",
    "工位不急慢慢来",
    "工位陪你熬一会",
    "工位正在收集灵感",
    "便签已贴好",
    "便签等你落字",
    "便签记住了重点",
    "便签不催你",
    "便签正在排队",
    "便签留了一点空白",
    "便签写着先稳住",
    "便签提醒别忘保存",
    "便签准备接收需求",
    "便签今天很好写",
    "键盘今日状态良好",
    "键盘等待第一下敲击",
    "键盘已经热身完毕",
    "键盘陪你写到最后",
    "键盘知道你会做到",
    "键盘正在等灵感落下",
    "键盘今天不闹脾气",
    "键盘提醒手要放松",
    "键盘陪你改一行",
    "键盘继续认真响",
    "电脑亮着等你",
    "电脑今天很配合",
    "电脑暂时没有宕机",
    "电脑正在加载勇气",
    "电脑陪你守夜",
    "电脑等你点发送",
    "电脑在给你打气",
    "电脑今天保持清醒",
    "电脑先把窗口开着",
    "电脑努力不拖后腿",
    "任务已接收",
    "任务可以慢慢拆",
    "任务今天不吓人",
    "任务等着被完成",
    "任务先从小处开始",
    "任务正在排队",
    "任务没有想象中难",
    "任务允许分几次做",
    "任务值得认真对待",
    "任务先放进便签",
    "进度条正在挪动",
    "进度条也会休息",
    "进度条今天有在走",
    "进度条慢一点没关系",
    "进度条记得往前推",
    "进度条正在变长",
    "进度条等一份耐心",
    "进度条已经有起色",
    "进度条陪你数小步",
    "进度条不催你",
    "今天也要好好活着",
    "今天先完成一小步",
    "今天不和自己较劲",
    "今天也要给自己点个赞",
    "今天也可以慢慢来",
    "今天会有好消息",
    "今天的你已经很棒",
    "今天先把事情理清",
    "今天适合认真一会",
    "今天允许短暂摸鱼",
    "精神状态可以运转",
    "精神状态正在回暖",
    "精神状态先稳住",
    "精神状态不必满格",
    "精神状态值得被照顾",
    "精神状态还有余量",
    "精神状态申请暂停",
    "精神状态请勿打扰",
    "精神状态继续续航",
    "精神状态缓慢加载",
  ];
  const baseThinkingTexts = [
    "鼠鼠正在翻便签…",
    "鼠鼠正在理线头…",
    "鼠鼠正在找思路…",
    "鼠鼠正在看代码…",
    "鼠鼠正在拆问题…",
    "鼠鼠正在圈重点…",
    "鼠鼠正在收集线索…",
    "鼠鼠正在核对细节…",
    "鼠鼠正在整理答案…",
    "鼠鼠正在把话想清楚…",
    "美叽正在认真思考…",
    "美叽正在读需求…",
    "美叽正在标记重点…",
    "美叽正在找关键处…",
    "美叽正在对照上下文…",
    "美叽正在检查遗漏…",
    "美叽正在理清顺序…",
    "美叽正在换个角度…",
    "美叽正在慢慢推导…",
    "美叽正在等灵感…",
    "旺财正在搬运思路…",
    "旺财正在守住进度…",
    "旺财正在翻找资料…",
    "旺财正在帮忙核验…",
    "旺财正在盯住细节…",
    "旺财正在整理碎片…",
    "旺财正在找突破口…",
    "旺财正在搬来答案…",
    "旺财正在努力推演…",
    "旺财正在悄悄加速…",
    "小队正在凑答案…",
    "小队正在拆难题…",
    "小队正在交换线索…",
    "小队正在核对重点…",
    "小队正在整理顺序…",
    "小队正在补齐细节…",
    "小队正在换条路想…",
    "小队正在慢慢推进…",
    "小队正在检查一遍…",
    "小队正在把话说顺…",
    "正在把问题拆小一点…",
    "正在把线头理顺一点…",
    "正在把重点圈出来…",
    "正在把答案排好队…",
    "正在把思路接起来…",
    "正在把细节补完整…",
    "正在把上下文看清…",
    "正在把难处摊开看…",
    "正在把路径找出来…",
    "正在把结论磨清楚…",
    "先从最小的一步想起…",
    "先把关键点找出来…",
    "先看看哪里卡住了…",
    "先把顺序慢慢排好…",
    "先给问题换个角度…",
    "先把复杂处理简单…",
    "先检查有没有遗漏…",
    "先让答案露个头…",
    "先把逻辑接起来…",
    "先沿着线索走一段…",
    "正在读一读上下文…",
    "正在看一看现有代码…",
    "正在找一找关联处…",
    "正在翻一翻旧记录…",
    "正在比一比不同方案…",
    "正在查一查边界条件…",
    "正在捋一捋执行顺序…",
    "正在看一看报错信息…",
    "正在对一对关键数据…",
    "正在补一补缺失信息…",
    "这题有点绕，再想一下…",
    "这里需要再看仔细点…",
    "这个角度还可以再推…",
    "答案快要拼起来了…",
    "再给我一点点时间…",
    "这一处值得多想一层…",
    "这条线索好像有用…",
    "这里可能藏着关键点…",
    "这个问题正在变清楚…",
    "这个答案正在靠近…",
    "代码堆里正在找路…",
    "逻辑链正在慢慢接上…",
    "需求正在被拆开看…",
    "细节正在逐个核验…",
    "答案正在排队出现…",
    "思路正在慢慢成形…",
    "重点正在被圈出来…",
    "线头正在一根根理顺…",
    "问题正在找到出口…",
    "结论正在慢慢落地…",
    "正在认真捣鼓中…",
    "正在安静地想一想…",
    "正在耐心地查一查…",
    "正在一点点往前推…",
    "正在把空白补上…",
    "正在给难题松绑…",
    "正在为答案搭架子…",
    "正在让信息归位…",
    "正在把小步走扎实…",
    "正在给你找个好解法…",
    "别急，正在认真处理…",
    "别急，答案马上就来…",
    "别急，先把底看清…",
    "别急，正在稳稳推进…",
    "别急，先把重点抓住…",
    "别急，正在补足线索…",
    "别急，先理清再回答…",
    "别急，正在寻找入口…",
    "别急，先把路铺好…",
    "别急，答案正在路上…",
    "灵感正在加载中…",
    "思路正在热身中…",
    "答案正在赶来的路上…",
    "重点正在浮出水面…",
    "细节正在慢慢归位…",
    "逻辑正在重新排队…",
    "问题正在被温柔拆开…",
    "进度正在悄悄前进…",
    "小脑袋正在全力运转…",
    "这一小步正在完成…",
  ];
  const thinkingCharacters = ["大鼠", "美叽", "旺财"];
  const thinkingTexts = baseThinkingTexts.map((text, index) => {
    const cleaned = text
      .replace(/^(?:鼠鼠|美叽|旺财|小队)/, "")
      .replace(/…+$/, "")
      .trim();
    if (index % 5 === 4) return `${cleaned}…`;
    const character = thinkingCharacters[index % thinkingCharacters.length];
    const cuteEnding = /[呀呢啦]$/.test(cleaned) ? "" : "呀";
    return `${character}${cleaned}${cuteEnding}…`;
  });
  window.__CODEX_DREAM_SKIN_DISABLED__ = false;

  const previous = window[STATE_KEY];
  if (previous?.observer) previous.observer.disconnect();
  if (previous?.timer) clearInterval(previous.timer);
  if (previous?.statusTimer) clearInterval(previous.statusTimer);
  if (previous?.thinkingTimer) clearInterval(previous.thinkingTimer);
  previous?.eventController?.abort?.();
  if (previous?.scheduler?.timeout) clearTimeout(previous.scheduler.timeout);
  const readStoredValue = (key) => {
    try { return window.localStorage?.getItem(key) || ""; } catch { return ""; }
  };
  const writeStoredValue = (key, value) => {
    try { window.localStorage?.setItem(key, value); } catch {}
  };
  let density = previous?.density || readStoredValue(DENSITY_KEY);
  if (!densityModes.includes(density)) density = "standard";
  const characters = ["dashu", "meiji", "wangcai"];
  const characterNames = { dashu: "大鼠", meiji: "美叽", wangcai: "旺财" };
  let selectedCharacter = previous?.selectedCharacter || readStoredValue(CHARACTER_KEY);
  if (!characters.includes(selectedCharacter)) selectedCharacter = "dashu";
  const phraseState = previous?.phraseState || {
    statusIndex: Math.floor(Date.now() / 10000) % statusTexts.length,
    thinkingIndex: Math.floor(Date.now() / 10000) % thinkingTexts.length,
  };
  phraseState.memeIndexes ||= {};
  phraseState.lastThinkingPhrase ||= "";
  phraseState.thinkingMeme ||= "";
  phraseState.relayIndex ||= 0;
  phraseState.wasGenerating ??= null;
  const artUrl = previous?.artUrl || (() => {
    const comma = artDataUrl.indexOf(",");
    const binary = atob(artDataUrl.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return URL.createObjectURL(new Blob([bytes], { type: "image/png" }));
  })();
  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) {
    existingStyle.textContent = cssText;
    existingStyle.dataset.dreamVersion = "1";
  }

  const clearSkinDom = () => {
    document.documentElement?.classList.remove("codex-dream-skin");
    document.documentElement?.classList.remove("dream-settings-page");
    document.documentElement?.classList.remove("dream-focus-mode");
    document.documentElement?.classList.remove("dream-density-quiet");
    document.documentElement?.classList.remove("dream-density-standard");
    document.documentElement?.classList.remove("dream-density-lively");
    document.documentElement?.style.removeProperty("--dream-art");
    if (document.documentElement?.dataset) {
      delete document.documentElement.dataset.dreamPetCharacter;
      delete document.documentElement.dataset.dreamPetState;
    }
    document.querySelectorAll(".dream-home").forEach((node) => node.classList.remove("dream-home"));
    document.querySelectorAll(".dream-home-shell").forEach((node) => node.classList.remove("dream-home-shell"));
    document.querySelectorAll('[data-dream-main-surface="true"]').forEach((node) => {
      node.classList.remove("main-surface");
      delete node.dataset.dreamMainSurface;
    });
    document.getElementById(STYLE_ID)?.remove();
    document.getElementById(CHROME_ID)?.remove();
    document.getElementById(THINKING_ID)?.remove();
    document.getElementById(SUGGESTIONS_ID)?.remove();
    document.getElementById(COMPLETION_ID)?.remove();
    document.getElementById(DAILY_MEMO_ID)?.remove();
  };

  const isGenerating = () => [...document.querySelectorAll(".composer-surface-chrome button[aria-label]")].some((button) => {
    return button.getClientRects().length > 0 && /^(?:停止|stop)$/i.test(button.getAttribute("aria-label") || "");
  });
  if (phraseState.wasGenerating === null) phraseState.wasGenerating = isGenerating();

  const composerText = (surface) => {
    if (surface?.matches?.('[contenteditable="true"]')) return surface.textContent || "";
    const editable = surface?.querySelector?.('textarea, input, [contenteditable="true"]');
    if (!editable) return "";
    return "value" in editable ? editable.value : editable.textContent || "";
  };

  const shouldFocusTheme = () => {
    if (isGenerating()) return true;
    return [...document.querySelectorAll('.composer-surface-chrome, [data-codex-composer]')].some((surface) => {
      const active = document.activeElement;
      return Boolean(active && (surface === active || surface.contains?.(active)) && composerText(surface).trim());
    });
  };

  const appBuildFingerprint = () => [...document.querySelectorAll("script[src]")]
    .map((script) => script.src || script.getAttribute?.("src") || "")
    .filter(Boolean)
    .sort()
    .join("|");

  const isCommandActivity = (button) => {
    const text = (button.textContent || "").replace(/\s+/g, " ").trim();
    return /^(?:正在运行|运行了.+命令)/.test(text);
  };

  const isRunningCommand = (button) => {
    const text = (button.textContent || "").replace(/\s+/g, " ").trim();
    return /^正在运行/.test(text) || (
      button.classList.contains("dream-running-command") &&
      Boolean(button.querySelector(".loading-shimmer-pure-text")) &&
      isGenerating()
    );
  };

  const characterFromText = (text) => {
    if (/大鼠|鼠鼠/.test(text)) return "dashu";
    if (/美叽/.test(text)) return "meiji";
    if (/旺财/.test(text)) return "wangcai";
    return "note";
  };

  const characterFromIndex = (index) => ["dashu", "meiji", "wangcai"][index % 3];
  const petPoseIndexes = {
    dashu: { idle: 21, running: 20, review: 7 },
    meiji: { idle: 20, running: 21, review: 22 },
    wangcai: { idle: 21, running: 20, review: 22 },
  };

  const activeCharacter = () => {
    if (!isGenerating()) return selectedCharacter;
    const selectedIndex = characters.indexOf(selectedCharacter);
    return characters[(selectedIndex + phraseState.relayIndex) % characters.length];
  };

  const phraseForCharacter = (items, character, index) => {
    const matching = items.filter((text) => characterFromText(text) === character);
    return matching[index % Math.max(matching.length, 1)] || items[index % items.length];
  };

  const memePoolSizes = { dashu: 100, meiji: 68, wangcai: 29 };
  const nextMeme = (character) => {
    const count = memePoolSizes[character] || 0;
    if (count === 0) return "";
    const previousIndex = phraseState.memeIndexes[character];
    let index = Math.floor(Math.random() * count);
    if (count > 1 && index === previousIndex) index = (index + 1) % count;
    phraseState.memeIndexes[character] = index;
    return `${character}-${index}`;
  };

  const setMeme = (node, meme) => {
    if (!node?.dataset || !node?.style) return;
    if (meme && memeUrls[meme]) {
      node.dataset.dreamMeme = meme;
      node.style.setProperty("--dream-meme", `url("${memeUrls[meme]}")`);
      return;
    }
    delete node.dataset.dreamMeme;
    node.style.removeProperty("--dream-meme");
  };

  const updateThinkingPill = () => {
    const commandHeaders = [...document.querySelectorAll('button[class~="group/activity-header"]')].filter((button) => {
      return isCommandActivity(button) ||
        button.classList.contains("dream-running-command") ||
        (isGenerating() && Boolean(button.querySelector(".loading-shimmer-pure-text")));
    });
    const runningHeaders = commandHeaders.filter(isRunningCommand);
    const latestHeader = runningHeaders.at(-1) || commandHeaders.at(-1) || null;
    for (const header of document.querySelectorAll("button.dream-running-command")) {
      if (header === latestHeader) continue;
      header.classList.remove("dream-running-command");
      delete header.dataset.dreamThinking;
      delete header.dataset.dreamCharacter;
      delete header.dataset.dreamComplete;
      setMeme(header, "");
    }
    let pill = document.getElementById(THINKING_ID);
    const thinkingCharacter = activeCharacter();
    const phrase = phraseForCharacter(thinkingTexts, thinkingCharacter, phraseState.thinkingIndex)
      .replace(/…+$/, "");
    if (phraseState.lastThinkingPhrase !== phrase) {
      phraseState.lastThinkingPhrase = phrase;
      phraseState.thinkingMeme = nextMeme(characterFromText(phrase));
    }
    if (latestHeader) {
      latestHeader.classList.add("dream-running-command");
      const running = isRunningCommand(latestHeader);
      if (!latestHeader.dataset.dreamThinking || running) {
        latestHeader.dataset.dreamThinking = phrase;
      }
      latestHeader.dataset.dreamCharacter = characterFromText(latestHeader.dataset.dreamThinking);
      setMeme(latestHeader, phraseState.thinkingMeme);
      latestHeader.toggleAttribute("data-dream-complete", !running);
      pill?.remove();
      return running;
    }
    pill?.remove();
    return false;
  };

  const decorateWorkspace = (shellSidebar) => {
    updateThinkingPill();
    const character = activeCharacter();
    const status = document.querySelector(".dream-signature");
    if (status) {
      const nextStatus = Date.now() < (phraseState.characterNoticeUntil || 0)
        ? `${characterNames[selectedCharacter]}开始值班`
        : phraseForCharacter(statusTexts, character, phraseState.statusIndex);
      const statusCopy = status.querySelector?.(".dream-status-copy");
      if (statusCopy) {
        if (statusCopy.textContent !== nextStatus) statusCopy.textContent = nextStatus;
      } else if (status.textContent !== nextStatus) {
        status.textContent = nextStatus;
      }
      status.dataset.dreamCharacter = character;
      const statusMemeIdentity = `${character}:${phraseState.statusIndex}`;
      if (phraseState.statusMemeIdentity !== statusMemeIdentity) {
        phraseState.statusMemeIdentity = statusMemeIdentity;
        phraseState.statusMeme = nextMeme(character);
      }
      setMeme(status, phraseState.statusMeme);
      status.classList.remove("dream-signature-thinking");
    }

    for (const item of shellSidebar?.querySelectorAll?.('[role="listitem"] [role="button"].group') || []) {
      item.classList.add("dream-sidebar-item");
      item.classList.toggle("dream-sidebar-current", item.getAttribute("aria-current") === "page");
    }

    for (const message of document.querySelectorAll("[data-message-author-role]")) {
      const role = message.getAttribute("data-message-author-role");
      message.classList.toggle("dream-message", role === "user" || role === "assistant");
      message.classList.toggle("dream-message-user", role === "user");
      message.classList.toggle("dream-message-assistant", role === "assistant");
    }

    for (const surface of document.querySelectorAll('.composer-surface-chrome, [data-codex-composer]')) {
      surface.classList.add("dream-composer-note");
      const text = composerText(surface);
      surface.classList.toggle("dream-composer-empty", text.trim().length === 0);
      const previousCharacter = surface.dataset.dreamCharacter;
      surface.dataset.dreamCharacter = character;
      if (!surface.dataset.dreamMeme || previousCharacter !== character) {
        setMeme(surface, nextMeme(character));
      }
    }

    for (const node of document.querySelectorAll(".dream-thinking-state")) {
      node.classList.remove("dream-thinking-state");
      delete node.dataset.dreamThinking;
    }
  };

  const ensure = () => {
    if (window.__CODEX_DREAM_SKIN_DISABLED__) return;
    const root = document.documentElement;
    if (!root || !document.body) return;

    const shellMain = document.querySelector("main.main-surface") ||
      document.querySelector('main[class*="_MainContentSurface_"]');
    const shellSidebar = document.querySelector("aside.app-shell-left-panel");
    const settingsControls = [...document.querySelectorAll('button, [role="button"], a, [role="link"]')];
    const settingsPage = settingsControls.some((control) => {
      const label = `${control.textContent || ""} ${control.getAttribute?.("aria-label") || ""}`
        .replace(/\s+/g, " ")
        .trim();
      return /(?:返回应用|back to app)/i.test(label);
    }) || [...shellMain?.querySelectorAll?.("input") || []].some((input) => {
      const label = `${input.placeholder || ""} ${input.getAttribute?.("aria-label") || ""}`
        .replace(/\s+/g, " ")
        .trim();
      return /(?:搜索设置|search settings)/i.test(label);
    });
    if (!shellMain || (!shellSidebar && !settingsPage)) {
      clearSkinDom();
      return;
    }

    root.classList.add("codex-dream-skin");
    for (const mode of densityModes) root.classList.remove(`dream-density-${mode}`);
    root.classList.add(`dream-density-${density}`);
    root.classList.toggle("dream-focus-mode", shouldFocusTheme());
    root.style.setProperty("--dream-art", `url("${artUrl}")`);
    if (!shellMain.classList.contains("main-surface")) {
      shellMain.classList.add("main-surface");
      shellMain.dataset.dreamMainSurface = "true";
    }
    root.classList.toggle("dream-settings-page", settingsPage);

    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      (document.head || root).appendChild(style);
    }
    if (style.dataset.dreamVersion !== "1") {
      style.textContent = cssText;
      style.dataset.dreamVersion = "1";
    }

    const home = document.querySelector('[role="main"]:has([data-testid="home-icon"])');
    for (const candidate of document.querySelectorAll('[role="main"].dream-home')) {
      if (candidate !== home) candidate.classList.remove("dream-home");
    }
    if (home) home.classList.add("dream-home");
    const suggestionTitles = [
      "探索并理解代码",
      "构建新功能、应用或工具",
      "审查代码并提出修改建议",
      "修复问题和失败",
    ];
    const suggestionPrompts = [
      "请先探索并理解当前项目的代码结构，告诉我关键模块、运行方式和最值得关注的部分。",
      "请根据当前项目构建一个新功能、应用或工具，先理解现有代码，再直接完成实现和验证。",
      "请审查当前代码并提出修改建议，优先检查错误、回归风险、可维护性和缺失的测试。",
      "请帮我定位并修复当前项目中的问题或失败，找到根因后直接实现修复并完成验证。",
    ];
    const suggestionOptions = [
      [
        ["扫描项目结构", "请扫描当前项目结构，梳理关键目录、核心模块、技术栈和它们之间的关系，并给出一份清晰的项目导览。"],
        ["整理运行方式", "请阅读当前项目的配置和文档，整理安装依赖、启动、构建与测试方式，并验证关键命令是否可用。"],
        ["定位核心代码", "请找出当前项目最重要的入口、业务流程和数据流，说明修改不同功能时应该优先查看哪些文件。"],
      ],
      [
        ["添加一个功能", "请先理解当前项目，再根据我的后续要求实现一个新功能；沿用现有设计与代码模式，并完成必要验证。"],
        ["搭建新应用", "请基于当前工作区搭建一个可运行的新应用，优先复用已有工具链，完成主要界面、交互和本地验证。"],
        ["制作实用工具", "请在当前项目中制作一个解决实际问题的小工具，功能完整、操作清楚，并补充运行和验证方式。"],
      ],
      [
        ["全面代码审查", "请全面审查当前改动，优先找出错误、行为回归、边界问题和缺失测试，并按严重程度给出文件与行号。"],
        ["检查安全风险", "请审查当前项目中的输入处理、权限、密钥、网络请求和依赖使用，指出可利用风险并给出修复方案。"],
        ["检查测试覆盖", "请检查当前功能的测试覆盖与可测性，找出关键遗漏，补充最有价值的测试并运行验证。"],
      ],
      [
        ["定位运行错误", "请复现当前运行错误，收集必要日志并定位根因，然后直接实现最小范围修复并完成验证。"],
        ["修复构建或测试", "请运行当前项目的构建和测试，找出失败原因，修复相关代码或配置，并确认命令恢复通过。"],
        ["排查界面问题", "请复现当前界面问题，检查布局、样式、状态和交互逻辑，修复后用实际截图验证桌面与窄屏效果。"],
      ],
    ];
    document.querySelectorAll(".dream-suggestion-card").forEach((node) => {
      if (node.closest?.(`#${SUGGESTIONS_ID}`)) return;
      node.classList.remove("dream-suggestion-card", "dream-suggestion-card-1", "dream-suggestion-card-2", "dream-suggestion-card-3", "dream-suggestion-card-4");
    });
    if (home) {
      for (const button of home.querySelectorAll("button")) {
        const text = (button.textContent || "").replace(/\s+/g, " ").trim();
        const index = suggestionTitles.findIndex((title) => text.includes(title));
        if (index !== -1) {
          button.classList.add("dream-suggestion-card", `dream-suggestion-card-${index + 1}`);
        }
      }
    }

    let customSuggestions = document.getElementById(SUGGESTIONS_ID);
    const hasNativeSuggestions = [...(home?.querySelectorAll(".group\\/home-suggestions") || [])].some((group) => {
      if (group.id === SUGGESTIONS_ID) return false;
      const text = (group.textContent || "").replace(/\s+/g, " ");
      return suggestionTitles.some((title) => text.includes(title));
    });
    if (home && !hasNativeSuggestions) {
      if (!customSuggestions || customSuggestions.parentElement !== home) {
        customSuggestions?.remove();
        customSuggestions = document.createElement("div");
        customSuggestions.id = SUGGESTIONS_ID;
        customSuggestions.className = "dream-custom-suggestions";
        const renderSuggestionCards = () => {
          customSuggestions.dataset.dreamView = "cards";
          delete customSuggestions.dataset.dreamSuggestionIndex;
          customSuggestions.innerHTML = suggestionTitles.map((title, index) => `
            <button type="button" class="dream-suggestion-card dream-suggestion-card-${index + 1}" data-dream-suggestion-index="${index}">
              <span aria-hidden="true"></span>
              <span>${title}</span>
            </button>`).join("");
        };
        const renderSuggestionPanel = (index) => {
          const options = suggestionOptions[index] || [];
          customSuggestions.dataset.dreamView = "panel";
          customSuggestions.dataset.dreamSuggestionIndex = String(index);
          customSuggestions.innerHTML = `
            <section class="dream-task-panel dream-task-panel-${index + 1}" aria-label="${suggestionTitles[index]}">
              <header>
                <button type="button" class="dream-task-back" data-dream-task-back aria-label="返回任务入口">‹</button>
                <span class="dream-task-sticker" aria-hidden="true"></span>
                <div>
                  <small>任务入口</small>
                  <h2>${suggestionTitles[index]}</h2>
                </div>
              </header>
              <div class="dream-task-options" role="group" aria-label="选择具体任务">
                ${options.map(([label], optionIndex) => `
                  <button type="button" class="${optionIndex === 0 ? "is-selected" : ""}" data-dream-task-option="${optionIndex}">
                    ${label}
                  </button>`).join("")}
              </div>
              <textarea class="dream-task-prompt" aria-label="任务描述"></textarea>
              <button type="button" class="dream-task-start" data-dream-task-start>开始任务</button>
            </section>`;
          const textarea = customSuggestions.querySelector(".dream-task-prompt");
          if (textarea) textarea.value = options[0]?.[1] || suggestionPrompts[index];
        };
        const submitTaskPrompt = (prompt) => {
          const editor = document.querySelector('.composer-surface-chrome [contenteditable="true"]');
          if (!editor || !prompt) return;
          editor.focus();
          const selection = window.getSelection?.();
          if (selection) {
            const range = document.createRange();
            range.selectNodeContents(editor);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          if (!document.execCommand?.("insertText", false, prompt)) {
            editor.textContent = prompt;
            editor.dispatchEvent(new InputEvent("input", {
              bubbles: true,
              inputType: "insertText",
              data: prompt,
            }));
          }
          let submitAttempts = 0;
          const submitPrompt = () => {
            const composer = editor.closest(".composer-surface-chrome");
            const submitButton = [...(composer?.querySelectorAll("button") || [])].at(-1);
            const isVoiceButton = /语音|voice/i.test(submitButton?.getAttribute("aria-label") || "");
            if (submitButton && !submitButton.disabled && !isVoiceButton) {
              submitButton.click();
              return;
            }
            submitAttempts += 1;
            if (submitAttempts < 20) window.setTimeout(submitPrompt, 50);
          };
          window.setTimeout(submitPrompt, 50);
        };
        renderSuggestionCards();
        customSuggestions.addEventListener("click", (event) => {
          const card = event.target.closest?.("button[data-dream-suggestion-index]");
          if (card) {
            renderSuggestionPanel(Number(card.dataset.dreamSuggestionIndex));
            return;
          }
          if (event.target.closest?.("[data-dream-task-back]")) {
            renderSuggestionCards();
            return;
          }
          const option = event.target.closest?.("[data-dream-task-option]");
          if (option) {
            const panelIndex = Number(customSuggestions.dataset.dreamSuggestionIndex);
            const optionIndex = Number(option.dataset.dreamTaskOption);
            customSuggestions.querySelectorAll("[data-dream-task-option]").forEach((node) => {
              node.classList.toggle("is-selected", node === option);
            });
            const textarea = customSuggestions.querySelector(".dream-task-prompt");
            if (textarea) textarea.value = suggestionOptions[panelIndex]?.[optionIndex]?.[1] || "";
            return;
          }
          if (event.target.closest?.("[data-dream-task-start]")) {
            const prompt = customSuggestions.querySelector(".dream-task-prompt")?.value.trim() || "";
            submitTaskPrompt(prompt);
          }
        });
        home.appendChild(customSuggestions);
      }
    } else {
      customSuggestions?.remove();
    }

    shellMain.classList.toggle("dream-home-shell", Boolean(home));
    let chrome = document.getElementById(CHROME_ID);
    if (!chrome || chrome.parentElement !== document.body ||
        !chrome.querySelector?.(".dream-density-label") ||
        !chrome.querySelector?.(".dream-character-switcher") ||
        !chrome.querySelector?.(".dream-duty-label") ||
        !chrome.querySelector?.(".dream-pet-dock")) {
      chrome?.remove();
      chrome = document.createElement("div");
      chrome.id = CHROME_ID;
      chrome.innerHTML = `
        <div class="dream-brand" aria-hidden="true"><span class="dream-note">鼠</span><span><b>鼠命打工中</b><small>美叽 · 大鼠 · 旺财 主题</small></span></div>
        <div class="dream-character-switcher" role="group" aria-label="今日值班角色">
          <span class="dream-duty-label" aria-live="polite">值班</span>
          ${characters.map((character) => `<button type="button" data-dream-character-choice="${character}" aria-label="${characterNames[character]}值班" title="让${characterNames[character]}值班"></button>`).join("")}
        </div>
        <button type="button" class="dream-signature" aria-label="切换主题浓度">
          <span class="dream-status-copy">今日精神状态良好</span>
          <span class="dream-density-label">标准</span>
        </button>
        <button type="button" class="dream-repair-button" hidden>修复主题</button>
        <div class="dream-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="dream-ribbon" aria-hidden="true"><span>便签</span>摸鱼<span>续命</span></div>
        <div class="dream-polaroid" aria-hidden="true"></div>
        <aside id="${DAILY_MEMO_ID}" class="dream-daily-memo" aria-label="今日便签"></aside>
        <div class="dream-pet-dock" aria-hidden="true"><small></small></div>`;
      document.body.appendChild(chrome);
    }
    chrome.querySelector?.(".dream-thinking-header")?.remove();
    const shellBox = shellMain.getBoundingClientRect();
    chrome.style.left = `${Math.round(shellBox.left)}px`;
    chrome.style.top = `${Math.round(shellBox.top)}px`;
    chrome.style.width = `${Math.round(shellBox.width)}px`;
    chrome.style.height = `${Math.round(shellBox.height)}px`;
    chrome.classList.toggle("dream-home-shell", Boolean(home));
    chrome.dataset.dreamDensity = density;
    chrome.dataset.dreamCharacter = activeCharacter();
    const switcher = chrome.querySelector?.(".dream-character-switcher");
    const dutyLabel = switcher?.querySelector?.(".dream-duty-label");
    if (dutyLabel) dutyLabel.textContent = `值班·${characterNames[selectedCharacter]}`;
    const selectCharacter = (character) => {
      if (!characters.includes(character)) return;
      selectedCharacter = character;
      phraseState.relayIndex = 0;
      phraseState.statusIndex = 0;
      phraseState.statusMemeIdentity = "";
      phraseState.lastThinkingPhrase = "";
      phraseState.characterNoticeUntil = Date.now() + 2400;
      writeStoredValue(CHARACTER_KEY, selectedCharacter);
      ensure();
      window.setTimeout(ensure, 2400);
    };
    for (const button of switcher?.querySelectorAll?.("[data-dream-character-choice]") || []) {
      const character = button.dataset.dreamCharacterChoice;
      button.classList.toggle("is-active", character === selectedCharacter);
      button.setAttribute("aria-pressed", String(character === selectedCharacter));
      button.onclick = (event) => {
        if (event.detail !== 0) return;
        selectCharacter(character);
      };
    }
    if (switcher) {
      switcher.onpointerdown = (event) => {
        if (event.button !== 0) return;
        const directChoice = event.target.closest?.("[data-dream-character-choice]")?.dataset.dreamCharacterChoice;
        const currentIndex = characters.indexOf(selectedCharacter);
        const character = directChoice || characters[(currentIndex + 1) % characters.length];
        event.preventDefault();
        event.stopPropagation();
        selectCharacter(character);
      };
    }
    const dailyMemos = [
      "大鼠说：先完成一小步",
      "美叽说：重点已经圈好啦",
      "旺财说：记得先保存",
      "今天不和自己较劲",
      "把难题拆成小便签",
      "累了就喝口水再继续",
      "小队今日也准时到岗",
    ];
    const memo = chrome.querySelector?.(`#${DAILY_MEMO_ID}`);
    if (memo) {
      const today = new Date();
      const daySeed = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000);
      memo.hidden = !home;
      memo.innerHTML = `<small>今日便签</small><b>${dailyMemos[daySeed % dailyMemos.length]}</b>`;
    }
    const densityButton = chrome.querySelector?.(".dream-signature");
    const densityLabel = chrome.querySelector?.(".dream-density-label");
    if (densityLabel) densityLabel.textContent = densityLabels[density];
    if (densityButton) {
      densityButton.title = `主题浓度：${densityLabels[density]}，点击切换`;
      densityButton.setAttribute("aria-label", densityButton.title);
      densityButton.onclick = () => {
        density = densityModes[(densityModes.indexOf(density) + 1) % densityModes.length];
        writeStoredValue(DENSITY_KEY, density);
        ensure();
      };
    }
    decorateWorkspace(shellSidebar);

    const generating = isGenerating();
    if (phraseState.wasGenerating && !generating) {
      document.getElementById(COMPLETION_ID)?.remove();
      const stamp = document.createElement("div");
      stamp.id = COMPLETION_ID;
      stamp.className = "dream-completion-stamp";
      const completedBy = characterNames[phraseState.lastActiveCharacter || selectedCharacter];
      phraseState.completedCharacter = phraseState.lastActiveCharacter || selectedCharacter;
      stamp.innerHTML = `<strong>已完成</strong><span>${completedBy}盖章验收</span>`;
      chrome.appendChild(stamp);
      phraseState.petCelebratingUntil = Date.now() + 3200;
      window.setTimeout(() => {
        stamp.remove();
        ensure();
      }, 3200);
    }
    phraseState.wasGenerating = generating;
    phraseState.lastActiveCharacter = activeCharacter();
    const petState = generating
      ? "running"
      : Date.now() < (phraseState.petCelebratingUntil || 0) ? "review" : "idle";
    const pet = chrome.querySelector?.(".dream-pet-dock");
    if (pet) {
      const petCharacter = petState === "review"
        ? phraseState.completedCharacter || phraseState.lastActiveCharacter
        : phraseState.lastActiveCharacter;
      pet.dataset.dreamCharacter = petCharacter;
      pet.dataset.dreamPetState = petState;
      pet.querySelector?.("small")?.replaceChildren(`${characterNames[petCharacter]}${petState === "running" ? "工作中" : petState === "review" ? "验收完毕" : "值班中"}`);
      setMeme(pet, `${petCharacter}-${petPoseIndexes[petCharacter][petState]}`);
    }
    if (root.dataset) {
      root.dataset.dreamPetCharacter = phraseState.lastActiveCharacter;
      root.dataset.dreamPetState = petState;
    }

    const healthIssues = [];
    if (!document.getElementById(STYLE_ID)?.textContent) healthIssues.push("样式未加载");
    if (shellBox.width < 320 || shellBox.height < 240) healthIssues.push("工作区定位异常");
    if (home && !document.getElementById(SUGGESTIONS_ID) && !hasNativeSuggestions) healthIssues.push("首页入口缺失");
    const currentBuild = appBuildFingerprint();
    const previousBuild = readStoredValue(BUILD_KEY);
    const buildChanged = Boolean(currentBuild && previousBuild && currentBuild !== previousBuild);
    const healthy = healthIssues.length === 0;
    phraseState.health = {
      healthy,
      issues: [...healthIssues],
      buildChanged,
      density,
      focusMode: shouldFocusTheme(),
    };
    chrome.dataset.dreamHealth = healthy ? "ok" : "repair";
    const repairButton = chrome.querySelector?.(".dream-repair-button");
    if (repairButton) {
      repairButton.hidden = healthy;
      repairButton.textContent = buildChanged ? "新版主题修复" : "修复主题";
      repairButton.title = healthy ? "主题自检正常" : healthIssues.join("；");
      repairButton.onclick = () => {
        style.textContent = cssText;
        style.dataset.dreamVersion = "1";
        phraseState.lastAutoRepairAt = Date.now();
        window.setTimeout(ensure, 80);
      };
    }
    if (healthy && currentBuild) writeStoredValue(BUILD_KEY, currentBuild);
    if (!healthy && Date.now() - (phraseState.lastAutoRepairAt || 0) > 30000) {
      phraseState.lastAutoRepairAt = Date.now();
      style.textContent = cssText;
      style.dataset.dreamVersion = "1";
      window.setTimeout(ensure, 80);
    }
  };

  const cleanup = () => {
    window.__CODEX_DREAM_SKIN_DISABLED__ = true;
    clearSkinDom();
    const state = window[STATE_KEY];
    state?.observer?.disconnect();
    if (state?.timer) clearInterval(state.timer);
    if (state?.statusTimer) clearInterval(state.statusTimer);
    if (state?.thinkingTimer) clearInterval(state.thinkingTimer);
    state?.eventController?.abort?.();
    if (state?.scheduler?.timeout) clearTimeout(state.scheduler.timeout);
    if (state?.artUrl) URL.revokeObjectURL(state.artUrl);
    delete window[STATE_KEY];
    return true;
  };

  const scheduler = { timeout: null };
  const scheduleEnsure = () => {
    if (scheduler.timeout) clearTimeout(scheduler.timeout);
    scheduler.timeout = setTimeout(() => {
      scheduler.timeout = null;
      ensure();
    }, 16);
  };
  const eventController = typeof AbortController === "function"
    ? new AbortController()
    : { signal: undefined, abort() {} };
  const eventOptions = eventController.signal
    ? { capture: true, signal: eventController.signal }
    : { capture: true };
  document.addEventListener?.("input", scheduleEnsure, eventOptions);
  document.addEventListener?.("focusin", scheduleEnsure, eventOptions);
  document.addEventListener?.("focusout", scheduleEnsure, eventOptions);
  const observer = new MutationObserver(scheduleEnsure);
  observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });
  const timer = setInterval(ensure, 5000);
  const statusTimer = setInterval(() => {
    phraseState.statusIndex = (phraseState.statusIndex + 1) % statusTexts.length;
    ensure();
  }, 10000);
  const thinkingTimer = setInterval(() => {
    if (!isGenerating()) return;
    phraseState.thinkingIndex = (phraseState.thinkingIndex + 1) % thinkingTexts.length;
    if (phraseState.thinkingIndex % 2 === 0) {
      phraseState.relayIndex = (phraseState.relayIndex + 1) % characters.length;
      phraseState.lastThinkingPhrase = "";
    }
    ensure();
  }, 10000);
  window[STATE_KEY] = {
    ensure,
    cleanup,
    observer,
    timer,
    statusTimer,
    thinkingTimer,
    scheduler,
    eventController,
    phraseState,
    artUrl,
    get density() { return density; },
    get selectedCharacter() { return selectedCharacter; },
    selfCheck() { return { ...(phraseState.health || {}) }; },
    version: "1.0.0",
  };
  ensure();
  return { installed: true, version: "1.0.0" };
})(__DREAM_CSS_JSON__, __DREAM_ART_JSON__, __DREAM_MEMES_JSON__)

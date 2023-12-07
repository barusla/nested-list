(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.cdx-nested-list{margin:0;padding:0;outline:none;counter-reset:item;list-style:none}.cdx-nested-list__item{line-height:1.6em;display:flex;margin:2px 0}.cdx-nested-list__item [contenteditable]{outline:none}.cdx-nested-list__item-body{flex-grow:2}.cdx-nested-list__item-content,.cdx-nested-list__item-children{flex-basis:100%}.cdx-nested-list__item-content{word-break:break-word;white-space:pre-wrap}.cdx-nested-list__item-children{counter-increment:nested}.cdx-nested-list__item:before{margin-right:5px;white-space:nowrap}.cdx-nested-list--unordered>.cdx-nested-list__item:before{content:"•"}.cdx-nested-list--ordered>.cdx-nested-list__item:before{counter-increment:item;content:counters(item,".") ". "}.cdx-nested-list--alphabet>.cdx-nested-list__item:before{counter-increment:item;content:counters(item,".",lower-alpha) ". "}.cdx-nested-list--numberalpha>.cdx-nested-list__item:before{counter-increment:item;content:counters(item,".") ". "}.cdx-nested-list--alpharoman>.cdx-nested-list__item:before{counter-increment:item;content:counters(item,".",lower-alpha) ". "}.cdx-nested-list__item-children.cdx-nested-list--numberalpha>.cdx-nested-list__item:before{content:counter(item,lower-alpha) ". "}.cdx-nested-list__item-children.cdx-nested-list--alpharoman>.cdx-nested-list__item:before{content:counter(item,lower-roman) ". "}.cdx-nested-list__settings{display:flex}.cdx-nested-list__settings .cdx-settings-button{width:50%}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
function p(h, t = null, e = {}) {
  const r = document.createElement(h);
  Array.isArray(t) ? r.classList.add(...t) : t && r.classList.add(t);
  for (const s in e)
    r[s] = e[s];
  return r;
}
function u(h) {
  const t = p("div");
  return t.appendChild(h), t.innerHTML;
}
function S(h) {
  let t;
  return h.nodeType !== Node.ELEMENT_NODE ? t = h.textContent : (t = h.innerHTML, t = t.replaceAll("<br>", "")), t.trim().length === 0;
}
class c {
  /**
   * Store internal properties
   */
  constructor() {
    this.savedFakeCaret = void 0;
  }
  /**
   * Saves caret position using hidden <span>
   *
   * @returns {void}
   */
  save() {
    const t = c.range, e = p("span");
    e.hidden = !0, t.insertNode(e), this.savedFakeCaret = e;
  }
  /**
   * Restores the caret position saved by the save() method
   *
   * @returns {void}
   */
  restore() {
    if (!this.savedFakeCaret)
      return;
    const t = window.getSelection(), e = new Range();
    e.setStartAfter(this.savedFakeCaret), e.setEndAfter(this.savedFakeCaret), t.removeAllRanges(), t.addRange(e), setTimeout(() => {
      this.savedFakeCaret.remove();
    }, 150);
  }
  /**
   * Returns the first range
   *
   * @returns {Range|null}
   */
  static get range() {
    const t = window.getSelection();
    return t && t.rangeCount ? t.getRangeAt(0) : null;
  }
  /**
   * Extract content fragment from Caret position to the end of contenteditable element
   *
   * @returns {DocumentFragment|void}
   */
  static extractFragmentFromCaretPositionTillTheEnd() {
    const t = window.getSelection();
    if (!t.rangeCount)
      return;
    const e = t.getRangeAt(0);
    let r = e.startContainer;
    r.nodeType !== Node.ELEMENT_NODE && (r = r.parentNode);
    const s = r.closest("[contenteditable]");
    e.deleteContents();
    const i = e.cloneRange();
    return i.selectNodeContents(s), i.setStart(e.endContainer, e.endOffset), i.extractContents();
  }
  /**
   * Set focus to contenteditable or native input element
   *
   * @param {HTMLElement} element - element where to set focus
   * @param {boolean} atStart - where to set focus: at the start or at the end
   * @returns {void}
   */
  static focus(t, e = !0) {
    const r = document.createRange(), s = window.getSelection();
    r.selectNodeContents(t), r.collapse(e), s.removeAllRanges(), s.addRange(r);
  }
  /**
   * Check if the caret placed at the start of the contenteditable element
   *
   * @returns {void}
   */
  static isAtStart() {
    const t = window.getSelection();
    if (t.focusOffset > 0)
      return !1;
    const e = t.focusNode;
    return c.getHigherLevelSiblings(e, "left").every((i) => S(i));
  }
  /**
   * Get all first-level (first child of [contenteditabel]) siblings from passed node
   * Then you can check it for emptiness
   *
   * @example
   * <div contenteditable>
   * <p></p>                            |
   * <p></p>                            | left first-level siblings
   * <p></p>                            |
   * <blockquote><a><b>adaddad</b><a><blockquote>       <-- passed node for example <b>
   * <p></p>                            |
   * <p></p>                            | right first-level siblings
   * <p></p>                            |
   * </div>
   * @param {HTMLElement} from - element from which siblings should be searched
   * @param {'left' | 'right'} direction - direction of search
   * @returns {HTMLElement[]}
   */
  static getHigherLevelSiblings(t, e = "left") {
    let r = t;
    const s = [];
    for (; r.parentNode && r.parentNode.contentEditable !== "true"; )
      r = r.parentNode;
    const i = e === "left" ? "previousSibling" : "nextSibling";
    for (; r[i]; )
      r = r[i], s.push(r);
    return s;
  }
}
const w = '<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text style="font-family: Arial, sans-serif; font-size: 7.6px; font-weight: 700; white-space: pre;" transform="matrix(1.481035, 0, 0, 1.350693, -2.145362, -5.690997)" x="3.008" y="18.606">a</text><text style="font-family: Arial, sans-serif; font-size: 7.6px; font-weight: 700; white-space: pre;" transform="matrix(1.481035, 0, 0, 1.350693, -2.111746, -14.212399)" x="3.008" y="18.606">1</text><rect x="10.181" y="6.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="11.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="16.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/></svg>', f = '<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text style="font-family: Arial, sans-serif; font-size: 7.6px; font-weight: 700; white-space: pre;" transform="matrix(1.481035, 0, 0, 1.350693, -2.111746, -14.212399)" x="3.008" y="18.606">1</text><rect x="10.181" y="6.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="11.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="16.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/></svg>', C = '<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text style="font-family: Arial, sans-serif; font-size: 7.6px; font-weight: 700; white-space: pre;" transform="matrix(1.481035, 0, 0, 1.350693, -2.305134, -16.716721)" x="3.008" y="18.606">a</text><rect x="10.181" y="6.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="11.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="16.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/></svg>', b = '<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="10.181" y="6.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="11.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="16.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="5.2" y="6.1" width="1" height="1" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);"/><rect x="5.2" y="11.1" width="1" height="1" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);"/><rect x="5.2" y="16.1" width="1" height="1" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);"/></svg>', x = '<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text style="font-family: Arial, sans-serif; font-size: 7.6px; font-weight: 700; white-space: pre;" transform="matrix(1.481035, 0, 0, 1.350693, -2.305134, -16.716721)" x="3.008" y="18.606">a</text><rect x="10.181" y="6.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="11.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><rect x="10.181" y="16.085" width="11.017" height="1" style="stroke: rgb(0, 0, 0);"/><text style="font-family: Arial, sans-serif; font-size: 7.6px; font-weight: 700; white-space: pre;" transform="matrix(1.481035, 0, 0, 1.350693, -0.461012, -5.181082)" x="3.008" y="18.606">i</text></svg>';
class m {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allow to use native Enter behaviour
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: f,
      title: "List"
    };
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - tool constructor options
   * @param {ListData} params.data - previously saved data
   * @param {object} params.config - user config for Tool
   * @param {object} params.api - Editor.js API
   * @param {boolean} params.readOnly - read-only mode flag
   */
  constructor({ data: t, config: e, api: r, readOnly: s }) {
    this.nodes = {
      wrapper: null
    }, this.api = r, this.readOnly = s, this.config = e, this.defaultListStyle = this.config.defaultStyle === "ordered" ? "ordered" : "unordered";
    const i = {
      style: this.defaultListStyle,
      items: []
    };
    this.data = t && Object.keys(t).length ? t : i, this.caret = new c();
  }
  /**
   * Returns list tag with items
   *
   * @returns {Element}
   * @public
   */
  render() {
    return this.nodes.wrapper = this.makeListWrapper(this.data.style, [this.CSS.baseBlock]), this.data.items.length ? this.appendItems(this.data.items, this.nodes.wrapper) : this.appendItems([{
      content: "",
      items: []
    }], this.nodes.wrapper), this.readOnly || this.nodes.wrapper.addEventListener("keydown", (t) => {
      switch (t.key) {
        case "Enter":
          this.enterPressed(t);
          break;
        case "Backspace":
          this.backspace(t);
          break;
        case "Tab":
          t.shiftKey ? this.shiftTab(t) : this.addTab(t);
          break;
      }
    }, !1), this.nodes.wrapper;
  }
  /**
   * Creates Block Tune allowing to change the list style
   *
   * @public
   * @returns {Array}
   */
  renderSettings() {
    return [
      {
        name: "unordered",
        label: this.api.i18n.t("Odrážky"),
        icon: b
      },
      {
        name: "ordered",
        label: this.api.i18n.t("Číslovaný"),
        icon: f
      },
      {
        name: "alphabet",
        label: this.api.i18n.t("Abecední"),
        icon: C
      },
      {
        name: "numberalpha",
        label: this.api.i18n.t("Čísla a písmena"),
        icon: w
      },
      {
        name: "alpharoman",
        label: this.api.i18n.t("Písmena a římská č."),
        icon: x
      }
    ].map((e) => ({
      name: e.name,
      icon: e.icon,
      label: e.label,
      isActive: this.data.style === e.name,
      closeOnActivate: !0,
      onActivate: () => {
        this.listStyle = e.name;
      }
    }));
  }
  /**
   * On paste sanitzation config. Allow only tags that are allowed in the Tool.
   *
   * @returns {PasteConfig} - paste config.
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * On paste callback that is fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(t) {
    const e = t.detail.data;
    this.data = this.pasteHandler(e);
    const r = this.nodes.wrapper;
    r && r.parentNode.replaceChild(this.render(), r);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   *
   * @param {HTMLUListElement|HTMLOListElement|HTMLLIElement} element
   * @returns {ListData}
   */
  pasteHandler(t) {
    const { tagName: e } = t;
    let r, s;
    switch (e) {
      case "OL":
        r = "ordered", s = "ol";
        break;
      case "UL":
      case "LI":
        r = "unordered", s = "ul";
    }
    const i = {
      style: r,
      items: []
    }, a = (l) => Array.from(l.querySelectorAll(":scope > li")).map((n) => {
      var g;
      const o = n.querySelector(`:scope > ${s}`), y = o ? a(o) : [];
      return {
        content: ((g = n == null ? void 0 : n.firstChild) == null ? void 0 : g.textContent) || "",
        items: y
      };
    });
    return i.items = a(t), i;
  }
  /**
   * Renders children list
   *
   * @param {ListItem[]} items - items data to append
   * @param {Element} parentItem - where to append
   * @returns {void}
   */
  appendItems(t, e) {
    t.forEach((r) => {
      const s = this.createItem(r.content, r.items);
      e.appendChild(s);
    });
  }
  /**
   * Renders the single item
   *
   * @param {string} content - item content to render
   * @param {ListItem[]} [items] - children
   * @returns {Element}
   */
  createItem(t, e = []) {
    const r = p("li", this.CSS.item), s = p("div", this.CSS.itemBody), i = p("div", this.CSS.itemContent, {
      innerHTML: t,
      contentEditable: !this.readOnly
    });
    return s.appendChild(i), r.appendChild(s), e && e.length > 0 && this.addChildrenList(r, e), r;
  }
  /**
   * Extracts tool's data from the DOM
   *
   * @returns {ListData}
   */
  save() {
    const t = (e) => Array.from(e.querySelectorAll(`:scope > .${this.CSS.item}`)).map((s) => {
      const i = s.querySelector(`.${this.CSS.itemChildren}`), a = this.getItemContent(s), l = i ? t(i) : [];
      return {
        content: a,
        items: l
      };
    });
    return {
      style: this.data.style,
      items: t(this.nodes.wrapper)
    };
  }
  /**
   * Append children list to passed item
   *
   * @param {Element} parentItem - item that should contain passed sub-items
   * @param {ListItem[]} items - sub items to append
   */
  addChildrenList(t, e) {
    const r = t.querySelector(`.${this.CSS.itemBody}`), s = this.makeListWrapper(void 0, [this.CSS.itemChildren]);
    this.appendItems(e, s), r.appendChild(s);
  }
  /**
   * Creates main <ul> or <ol> tag depended on style
   *
   * @param {string} [style] - 'ordered' or 'unordered'
   * @param {string[]} [classes] - additional classes to append
   * @returns {HTMLOListElement|HTMLUListElement}
   */
  makeListWrapper(t = this.listStyle, e = []) {
    const r = t === "ordered" ? "ol" : "ul", s = () => {
      let i;
      switch (t) {
        case "ordered":
          i = this.CSS.wrapperOrdered;
          break;
        case "unordered":
          i = this.CSS.wrapperUnordered;
          break;
        case "numberalpha":
          i = this.CSS.wrapperNumberAlpha;
          break;
        case "alphabet":
          i = this.CSS.wrapperAlphabet;
          break;
        case "alpharoman":
          i = this.CSS.wrapperAlpharoman;
      }
      return i;
    };
    return e.push(s()), p(r, [this.CSS.wrapper, ...e]);
  }
  /**
   * Styles
   *
   * @returns {object} - CSS classes names by keys
   * @private
   */
  get CSS() {
    return {
      baseBlock: this.api.styles.block,
      wrapper: "cdx-nested-list",
      wrapperUnordered: "cdx-nested-list--unordered",
      wrapperOrdered: "cdx-nested-list--ordered",
      wrapperAlphabet: "cdx-nested-list--alphabet",
      wrapperNumberAlpha: "cdx-nested-list--numberalpha",
      wrapperAlpharoman: "cdx-nested-list--alpharoman",
      item: "cdx-nested-list__item",
      itemBody: "cdx-nested-list__item-body",
      itemContent: "cdx-nested-list__item-content",
      itemChildren: "cdx-nested-list__item-children",
      settingsWrapper: "cdx-nested-list__settings",
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive
    };
  }
  /**
   * Get list style name
   *
   * @returns {string}
   */
  get listStyle() {
    return this.data.style || this.defaultListStyle;
  }
  /**
   * Set list style
   *
   * @param {string} style - new style to set
   */
  set listStyle(t) {
    const e = Array.from(this.nodes.wrapper.querySelectorAll(`.${this.CSS.wrapper}`));
    e.push(this.nodes.wrapper), e.forEach((r) => {
      r.classList.toggle(this.CSS.wrapperUnordered, t === "unordered"), r.classList.toggle(this.CSS.wrapperOrdered, t === "ordered"), r.classList.toggle(this.CSS.wrapperAlphabet, t === "alphabet"), r.classList.toggle(this.CSS.wrapperNumberAlpha, t === "numberalpha"), r.classList.toggle(this.CSS.wrapperAlpharoman, t === "alpharoman");
    }), this.data.style = t;
  }
  /**
   * Returns current List item by the caret position
   *
   * @returns {Element}
   */
  get currentItem() {
    let t = window.getSelection().anchorNode;
    return t.nodeType !== Node.ELEMENT_NODE && (t = t.parentNode), t.closest(`.${this.CSS.item}`);
  }
  /**
   * Handles Enter keypress
   *
   * @param {KeyboardEvent} event - keydown
   * @returns {void}
   */
  enterPressed(t) {
    const e = this.currentItem;
    t.stopPropagation(), t.preventDefault();
    const r = this.getItemContent(e).trim().length === 0, s = e.parentNode === this.nodes.wrapper, i = e.nextElementSibling === null;
    if (s && i && r) {
      this.getOutOfList();
      return;
    } else if (i && r) {
      this.unshiftItem();
      return;
    }
    const a = c.extractFragmentFromCaretPositionTillTheEnd(), l = u(a), d = e.querySelector(`.${this.CSS.itemChildren}`), n = this.createItem(l, void 0);
    d && Array.from(d.querySelectorAll(`.${this.CSS.item}`)).length > 0 ? d.prepend(n) : e.after(n), this.focusItem(n);
  }
  /**
   * Decrease indentation of the current item
   *
   * @returns {void}
   */
  unshiftItem() {
    const t = this.currentItem, e = t.parentNode.closest(`.${this.CSS.item}`);
    if (!e)
      return;
    this.caret.save(), e.after(t), this.caret.restore();
    const r = e.querySelector(`.${this.CSS.itemChildren}`);
    r.children.length === 0 && r.remove();
  }
  /**
   * Return the item content
   *
   * @param {Element} item - item wrapper (<li>)
   * @returns {string}
   */
  getItemContent(t) {
    const e = t.querySelector(`.${this.CSS.itemContent}`);
    return S(e) ? "" : e.innerHTML;
  }
  /**
   * Sets focus to the item's content
   *
   * @param {Element} item - item (<li>) to select
   * @param {boolean} atStart - where to set focus: at the start or at the end
   * @returns {void}
   */
  focusItem(t, e = !0) {
    const r = t.querySelector(`.${this.CSS.itemContent}`);
    c.focus(r, e);
  }
  /**
   * Get out from List Tool by Enter on the empty last item
   *
   * @returns {void}
   */
  getOutOfList() {
    this.currentItem.remove(), this.api.blocks.insert(), this.api.caret.setToBlock(this.api.blocks.getCurrentBlockIndex());
  }
  /**
   * Handle backspace
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(t) {
    if (!c.isAtStart())
      return;
    t.preventDefault();
    const e = this.currentItem, r = e.previousSibling, s = e.parentNode.closest(`.${this.CSS.item}`);
    if (!r && !s)
      return;
    t.stopPropagation();
    let i;
    if (r) {
      const o = r.querySelectorAll(`.${this.CSS.item}`);
      i = Array.from(o).pop() || r;
    } else
      i = s;
    const a = c.extractFragmentFromCaretPositionTillTheEnd(), l = u(a), d = i.querySelector(`.${this.CSS.itemContent}`);
    c.focus(d, !1), this.caret.save(), d.insertAdjacentHTML("beforeend", l);
    let n = e.querySelectorAll(`.${this.CSS.itemChildren} > .${this.CSS.item}`);
    n = Array.from(n), n = n.filter((o) => o.parentNode.closest(`.${this.CSS.item}`) === e), n.reverse().forEach((o) => {
      r ? i.after(o) : e.after(o);
    }), e.remove(), this.caret.restore();
  }
  /**
   * Add indentation to current item
   *
   * @param {KeyboardEvent} event - keydown
   */
  addTab(t) {
    t.stopPropagation(), t.preventDefault();
    const e = this.currentItem, r = e.previousSibling;
    if (!r)
      return;
    const i = r.querySelector(`.${this.CSS.itemChildren}`);
    if (this.caret.save(), i)
      i.appendChild(e);
    else {
      const a = this.makeListWrapper(void 0, [this.CSS.itemChildren]), l = r.querySelector(`.${this.CSS.itemBody}`);
      a.appendChild(e), l.appendChild(a);
    }
    this.caret.restore();
  }
  /**
   * Reduce indentation for current item
   *
   * @param {KeyboardEvent} event - keydown
   * @returns {void}
   */
  shiftTab(t) {
    t.stopPropagation(), t.preventDefault(), this.unshiftItem();
  }
  /**
   * Convert from list to text for conversionConfig
   *
   * @param {ListData} data
   * @returns {string}
   */
  static joinRecursive(t) {
    return t.items.map((e) => `${e.content} ${m.joinRecursive(e)}`).join("");
  }
  /**
   * Convert from text to list with import and export list to text
   */
  static get conversionConfig() {
    return {
      export: (t) => m.joinRecursive(t),
      import: (t) => ({
        items: [{
          content: t,
          items: []
        }],
        style: "unordered"
      })
    };
  }
}
export {
  m as default
};

/* main.js — fills links from content.js, hides empty sections, print button. */
(function () {
  "use strict";

  var S = window.SITE || {};
  var links = S.links || {};

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---- Fill any element that declares data-link="email|github|..." ---- */
  function fillLinks() {
    $all("[data-link]").forEach(function (el) {
      var key = el.getAttribute("data-link");
      var val = links[key];
      if (!val) {
        var li = el.closest ? el.closest("li") : null;
        (li || el).hidden = true;
        return;
      }
      if (key === "email") {
        el.href = "mailto:" + val;
        if (el.hasAttribute("data-fill")) el.textContent = val;
      } else {
        el.href = val;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        if (el.hasAttribute("data-fill")) el.textContent = el.getAttribute("data-label") || val.replace(/^https?:\/\//, "");
      }
    });
  }

  /* ---- Fill text slots: [data-site="city"] etc. Empty value = hide parent block ---- */
  function fillSlots() {
    $all("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      var val = valueOf(key);
      if (!val) {
        var hideSel = el.getAttribute("data-hide");
        var target = hideSel ? $(hideSel) : el;
        if (target) target.hidden = true;
        return;
      }
      el.textContent = val;
    });
  }

  function valueOf(key) {
    if (key === "city") return S.city || "";
    if (key === "country") return S.country || "";
    if (key === "location") return [S.city, S.country].filter(Boolean).join(", ");
    if (key === "name") return S.name || "";
    if (key === "role") return S.role || "";
    if (key === "tagline") return S.tagline || "";
    if (key === "lastUpdated") return S.lastUpdated || "";
    if (key === "startYear") return (S.education || {}).startYear || "";
    if (key === "gradYear") return (S.education || {}).gradYear || "";
    if (key === "grade") return (S.education || {}).grade || "";
    if (key.indexOf("link:") === 0) return links[key.slice(5)] || "";
    return "";
  }

  /* ---- Education date range: "2024 - 2027" or hides if neither year ---- */
  function fillEducationDates() {
    $all("[data-dates]").forEach(function (el) {
      var e = S.education || {};
      if (e.startYear && e.gradYear) {
        el.textContent = e.startYear + " – " + e.gradYear;
      } else if (e.startYear || e.gradYear) {
        el.textContent = (e.startYear || e.gradYear) + " – present";
      } else {
        el.hidden = true;
      }
    });
  }

  function sectionOf(el) { return el.closest(".cv-section, .section") || el; }

  /* ---- Render certifications list ---- */
  function fillCertifications() {
    $all("[data-certs-list]").forEach(function (wrap) {
      var certs = S.certifications || [];
      if (!certs.length) { sectionOf(wrap).hidden = true; return; }
      wrap.innerHTML = "";
      certs.forEach(function (c) {
        var li = document.createElement("li");
        li.className = "def-item";
        var title = document.createElement("strong");
        title.textContent = c.name;
        var meta = document.createElement("span");
        meta.className = "muted";
        meta.textContent = [c.status, c.date].filter(Boolean).join(" · ");
        li.appendChild(title);
        if (meta.textContent) { li.appendChild(document.createTextNode(" ")); li.appendChild(meta); }
        wrap.appendChild(li);
      });
    });
  }

  /* ---- Render achievements list ---- */
  function fillAchievements() {
    $all("[data-achievements-list]").forEach(function (wrap) {
      var items = S.achievements || [];
      if (!items.length) { sectionOf(wrap).hidden = true; return; }
      wrap.innerHTML = "";
      items.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        wrap.appendChild(li);
      });
    });
  }

  /* ---- Render languages ---- */
  function fillLanguages() {
    $all("[data-languages-list]").forEach(function (wrap) {
      var langs = S.languages || [];
      if (!langs.length) { sectionOf(wrap).hidden = true; return; }
      wrap.innerHTML = "";
      langs.forEach(function (l) {
        var li = document.createElement("li");
        li.textContent = l.name + (l.level ? " — " + l.level : "");
        wrap.appendChild(li);
      });
    });
  }

  /* ---- Hide meta lines that ended up empty (all slots hidden) ---- */
  function hideEmptyLines() {
    $all(".cv-inline, .row-links").forEach(function (el) {
      if (!el.textContent.trim()) el.hidden = true;
    });
    $all(".cv-links").forEach(function (ul) {
      if (!ul.querySelector("li:not([hidden])")) ul.hidden = true;
    });
  }

  /* ---- Contact page: honest empty state when no contact details exist ---- */
  function fillContactState() {
    var empty = $all("[data-link]").every(function (el) { return !links[el.getAttribute("data-link")]; });
    var note = $("#contact-empty");
    if (note) note.hidden = !empty;
  }

  /* ---- Project / write-up links: hide "GitHub"/"Live demo" anchors when empty ---- */
  function fillProjectLinks() {
    $all("[data-proj-link]").forEach(function (el) {
      var parts = el.getAttribute("data-proj-link").split(":"); // project:key
      var proj = (S.projects || {})[parts[0]];
      var val = proj && proj[parts[1]];
      if (!val) { el.hidden = true; return; }
      el.href = val;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
    $all("[data-writeup-link]").forEach(function (el) {
      var key = el.getAttribute("data-writeup-link");
      var w = (S.writeups || {})[key];
      var val = w && w.url;
      if (!val) {
        /* keep the card, but swap link for a "coming soon" note */
        el.hidden = true;
        var soon = el.parentElement && el.parentElement.querySelector("[data-soon]");
        if (soon) soon.hidden = false;
        return;
      }
      el.href = val;
      if (el.getAttribute("data-external") === "true") {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  /* ---- Print / Save as PDF ---- */
  function bindPrint() {
    $all("[data-print]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        window.print();
      });
    });
  }

  /* ---- Mobile nav ---- */
  function bindNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Mark current page in nav ---- */
  function markCurrentNav() {
    var path = location.pathname;
    var here = path.split("/").pop() || "index.html";
    if (path.indexOf("/writeups/") !== -1) here = "writeups.html";
    $all("#site-nav a").forEach(function (a) {
      var target = (a.getAttribute("href") || "").split("/").pop();
      if (target === here) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---- Footer year ---- */
  function fillYear() {
    $all("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function init() {
    fillLinks();
    fillSlots();
    fillEducationDates();
    fillCertifications();
    fillAchievements();
    fillLanguages();
    fillContactState();
    fillProjectLinks();
    hideEmptyLines();
    bindPrint();
    bindNav();
    markCurrentNav();
    fillYear();
    document.documentElement.classList.add("js-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

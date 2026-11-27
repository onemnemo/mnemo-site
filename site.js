/* Shared behaviour for every page: the mobile menu and the platform name on download buttons. */

/* Mobile menu */
(function () {
  var b = document.querySelector(".burger"), m = document.getElementById("menu");
  if (!b || !m) return;
  function set(open) {
    b.setAttribute("aria-expanded", open);
    m.classList.toggle("open", open);
  }
  b.addEventListener("click", function (e) {
    e.stopPropagation();
    set(b.getAttribute("aria-expanded") !== "true");
  });
  m.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".top")) set(false); });
  addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  addEventListener("resize", function () { if (innerWidth > 720) set(false); });
})();

/* Name the visitor's platform on buttons marked data-os. */
(function () {
  var p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  var u = navigator.userAgent;
  var os = /Win/i.test(p) ? ["Windows", "windows"]
    : /Mac/i.test(p) && !/iPhone|iPad/.test(u) ? ["macOS", "macos"]
    : /Linux/i.test(p) && !/Android/i.test(u) ? ["Linux", "linux"]
    : null;
  if (!os) return;
  document.querySelectorAll("[data-os]").forEach(function (a) {
    a.querySelector("span").textContent = "Download for " + os[0];
    a.href = "download.html#" + os[1];
  });
})();

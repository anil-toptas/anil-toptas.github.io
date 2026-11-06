// Sayfa dili: önce kullanıcının seçimi, yoksa tarayıcı dili (Türkçe ise tr, diğerleri en).
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved || ((navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en');

  function apply(l) {
    lang = l;
    root.classList.remove('lang-tr', 'lang-en');
    root.classList.add('lang-' + l);
    root.lang = l;
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set') === l));
    }
  }

  // Hash ile dil zorlanabilir: privacy.html#tr veya #en
  if (location.hash === '#tr' || location.hash === '#en') lang = location.hash.slice(1);
  apply(lang);

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var l = this.getAttribute('data-set');
        try { localStorage.setItem('lang', l); } catch (e) {}
        apply(l);
      });
    }
  });
})();

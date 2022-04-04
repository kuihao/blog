(function() {
  function changeLang() {
    var selectLang = this.value;
    var canonical = this.dataset.canonical;
    var url = canonical.split('/')[1]; /* 原本為 canonical.split('/')[0] 
    但因為 blog 是位於主網止的次層，應抓至取第二節 */
    var lang = url === 'index.html' ? '/' : (url === 'en' ? '/' : url);
    var index = canonical.indexOf('/') === -1 ? 0 : canonical.indexOf('/');
    var path = canonical.substring(index);
    path = selectLang + (path === 'index.html' ? '/index.html' : path);
    location.href = (location.origin + '/' + path).replace('index.html', '');
  }

  if (document.getElementById('lang-select')) {
    document.getElementById('lang-select').addEventListener('change', changeLang);
  }
}());
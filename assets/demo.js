(() => {
  const T = {
    pl: {langTitle:'Język interfejsu',loginTitle:'Logowanie',user:'Użytkownik',pass:'Hasło',login:'Zaloguj',
      usersTitle:'Użytkownicy',name:'Imię i nazwisko',role:'Rola',actions:'Akcje',edit:'Edytuj',del:'Usuń',
      formTitle:'Formularz',country:'Kraj',cPl:'Polska',cDe:'Niemcy',cCz:'Czechy',terms:'Akceptuję regulamin',submit:'Wyślij',
      delayTitle:'Element z opóźnieniem',load:'Załaduj dane',dialogTitle:'Okna dialogowe',alert:'Pokaż alert',confirm:'Pokaż potwierdzenie',
      loginOk:'Zalogowano jako demo.',loginErr:'Nieprawidłowy użytkownik lub hasło.',deleted:'Usunięto: {}',editing:'Edycja: {}',
      termsErr:'Zaakceptuj regulamin.',sent:'Wysłano. Kraj: {}',loaded:'Dane załadowane.',alertText:'To jest alert.',
      confirmText:'Czy kontynuować?',yes:'Wybrano: tak',no:'Wybrano: nie'},
    en: {langTitle:'Interface language',loginTitle:'Login',user:'Username',pass:'Password',login:'Sign in',
      usersTitle:'Users',name:'Name',role:'Role',actions:'Actions',edit:'Edit',del:'Delete',
      formTitle:'Form',country:'Country',cPl:'Poland',cDe:'Germany',cCz:'Czechia',terms:'I accept the terms',submit:'Submit',
      delayTitle:'Delayed element',load:'Load data',dialogTitle:'Dialogs',alert:'Show alert',confirm:'Show confirm',
      loginOk:'Signed in as demo.',loginErr:'Invalid username or password.',deleted:'Deleted: {}',editing:'Editing: {}',
      termsErr:'Accept the terms.',sent:'Submitted. Country: {}',loaded:'Data loaded.',alertText:'This is an alert.',
      confirmText:'Continue?',yes:'You chose: yes',no:'You chose: no'}
  };
  let lang = 'pl';
  const $ = s => document.querySelector(s);
  const t = (k, v = '') => T[lang][k].replace('{}', v);
  const say = (sel, k, v) => { $(sel).textContent = t(k, v); };

  function setLang(l) {
    lang = l;
    document.querySelectorAll('[data-i18n]').forEach(e => { e.textContent = T[l][e.dataset.i18n]; });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  }

  const users = [['Anna Nowak', 'Admin'], ['Jan Kowalski', 'Tester'], ['Ewa Zielińska', 'Developer']];
  $('#users-body').innerHTML = users.map(([n, r]) =>
    `<tr data-testid="user-row"><td>${n}</td><td>${r}</td><td>` +
    `<button name="edit" data-i18n="edit"></button> <button name="delete" data-i18n="del"></button></td></tr>`).join('');

  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  $('#login-form').addEventListener('submit', e => {
    e.preventDefault();
    const ok = $('#username').value === 'demo' && $('#password').value === 'demo123';
    say('#login-msg', ok ? 'loginOk' : 'loginErr');
    $('#login-msg').dataset.status = ok ? 'success' : 'error';
  });

  $('#users-body').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    const row = b.closest('tr'), n = row.cells[0].textContent;
    if (b.name === 'delete') { row.remove(); say('#users-msg', 'deleted', n); }
    else say('#users-msg', 'editing', n);
  });

  $('#order-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!$('#terms').checked) return say('#form-msg', 'termsErr');
    say('#form-msg', 'sent', $('#country').selectedOptions[0].textContent);
  });

  $('#load-btn').addEventListener('click', () => {
    $('#delay-box').textContent = '';
    setTimeout(() => {
      const s = document.createElement('span');
      s.id = 'delayed-result';
      s.textContent = t('loaded');
      $('#delay-box').append(s);
    }, 2000);
  });

  $('#alert-btn').addEventListener('click', () => alert(t('alertText')));
  $('#confirm-btn').addEventListener('click', () => say('#dialog-msg', confirm(t('confirmText')) ? 'yes' : 'no'));

  setLang('pl');
})();

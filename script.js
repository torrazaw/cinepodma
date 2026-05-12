/* ══════ MENU ══════ */
function toggleMenu() {
  const btn  = document.getElementById('burgerBtn');
  const menu = document.getElementById('fullMenu');
  const isOpen = menu.classList.contains('open');

  if (isOpen) {
    closeMenu();
  } else {
    btn.classList.add('open');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  document.getElementById('burgerBtn').classList.remove('open');
  document.getElementById('fullMenu').classList.remove('open');

  var dm = document.getElementById('donateModal');

  if (!dm || !dm.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

/* ══════ AUTH ══════ */
function showSignUp() {
  alert('Sign Up — Backend ချိတ်ပြီးမှ အသုံးပြုနိုင်မည်');
}

function showSignIn() {
  alert('Sign In — Backend ချိတ်ပြီးမှ အသုံးပြုနိုင်မည်');
}

/* ══════ CONTACT ══════ */
function submitContact(e) {
  e.preventDefault();

  alert(
    'မက်ဆေ့ဂျ် ပို့ပြီးပါပြီ — Backend ချိတ်ပြီးမှ အသုံးပြုနိုင်မည်'
  );
}

/* ══════ SUPPORT — FILE NAME ══════ */
function supportShowFileName(file) {

  var el = document.getElementById('supportScriptFilename');

  if (!el || !file) return;

  el.textContent =
    file.name + ' — ဆာဗာတင်ခြင်း နောက်ပိုင်းတွင်';
}

/* ══════ DROPZONE ══════ */
(function setupSupportScriptDropzone() {

  var zone  = document.getElementById('scriptDropzone');
  var input = document.getElementById('supportScriptFile');

  if (!zone || !input) return;

  input.addEventListener('change', function() {

    if (input.files && input.files[0]) {
      supportShowFileName(input.files[0]);
    } else {

      var out = document.getElementById(
        'supportScriptFilename'
      );

      if (out) out.textContent = '';
    }
  });

  var dragDepth = 0;

  zone.addEventListener('dragenter', function(e) {
    e.preventDefault();

    dragDepth++;

    zone.classList.add('script-dropzone--drag');
  });

  zone.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  zone.addEventListener('dragleave', function(e) {

    e.preventDefault();

    dragDepth--;

    if (dragDepth <= 0) {

      dragDepth = 0;

      zone.classList.remove('script-dropzone--drag');
    }
  });

  zone.addEventListener('drop', function(e) {

    e.preventDefault();

    dragDepth = 0;

    zone.classList.remove('script-dropzone--drag');

    var f =
      e.dataTransfer &&
      e.dataTransfer.files &&
      e.dataTransfer.files[0];

    if (f) supportShowFileName(f);
  });

})();

/* ══════ DONATE ══════ */
var donateFlow = {
  amount: 0,
  label: '',
  fromCustom: false,
  method: ''
};

function donateModalOpen() {

  var m = document.getElementById('donateModal');

  if (!m) return;

  m.classList.add('open');

  m.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';
}

function closeDonateModal() {

  var m = document.getElementById('donateModal');

  if (!m) return;

  m.classList.remove('open');

  m.setAttribute('aria-hidden', 'true');

  var c = document.getElementById('donateStepCustom');
  var s = document.getElementById('donateStepMethod');
  var q = document.getElementById('donateStepQr');

  if (c) c.style.display = 'none';
  if (s) s.style.display = 'none';
  if (q) q.style.display = 'none';

  var img = document.getElementById('donateQrImg');

  if (img) {
    img.removeAttribute('src');
    img.alt = 'ငွေလွှဲ QR';
  }

  donateFlow = {
    amount: 0,
    label: '',
    fromCustom: false,
    method: ''
  };

  var menu = document.getElementById('fullMenu');

  if (!menu || !menu.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function openDonateCoffee(amount, label) {

  donateFlow.amount = amount;
  donateFlow.label = label;
  donateFlow.fromCustom = false;
  donateFlow.method = '';

  document.getElementById(
    'donateStepCustom'
  ).style.display = 'none';

  document.getElementById(
    'donateStepQr'
  ).style.display = 'none';

  document.getElementById(
    'donateStepMethod'
  ).style.display = 'block';

  document.getElementById(
    'donateMethodTitle'
  ).textContent =
    label + ' — ငွေပေးချေမှု ရွေးပါ';

  donateModalOpen();
}

function openDonateCoffeeCustom() {

  donateFlow.fromCustom = true;
  donateFlow.method = '';

  document.getElementById(
    'donateStepMethod'
  ).style.display = 'none';

  document.getElementById(
    'donateStepQr'
  ).style.display = 'none';

  document.getElementById(
    'donateStepCustom'
  ).style.display = 'block';

  var inp = document.getElementById(
    'donateCustomAmount'
  );

  if (inp) inp.value = '';

  donateModalOpen();
}

function donateCustomContinue() {

  var inp = document.getElementById(
    'donateCustomAmount'
  );

  var n = parseInt(inp && inp.value, 10);

  if (!n || n < 1) {

    alert('ကျပ်ပမာဏကို မှန်ကန်စွာ ထည့်ပါ');

    return;
  }

  donateFlow.amount = n;

  donateFlow.label =
    n.toLocaleString('en-US') +
    ' ကျပ် (ကြိုက်သလောက်)';

  document.getElementById(
    'donateStepCustom'
  ).style.display = 'none';

  document.getElementById(
    'donateStepQr'
  ).style.display = 'none';

  document.getElementById(
    'donateStepMethod'
  ).style.display = 'block';

  document.getElementById(
    'donateMethodTitle'
  ).textContent =
    donateFlow.label +
    ' — ငွေပေးချေမှု ရွေးပါ';
}

function donateBackFromMethod() {

  if (donateFlow.fromCustom) {

    document.getElementById(
      'donateStepMethod'
    ).style.display = 'none';

    document.getElementById(
      'donateStepCustom'
    ).style.display = 'block';

  } else {

    closeDonateModal();
  }
}

function donatePickPay(method) {

  donateFlow.method = method;

  var payload =
    'CinePodma|MMK:' +
    donateFlow.amount +
    '|' +
    method +
    '|demo-ui';

  var url =
    'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=2&data=' +
    encodeURIComponent(payload);

  var img = document.getElementById('donateQrImg');

  img.src = url;

  img.alt = method + ' ငွေလွှဲ QR';

  document.getElementById(
    'donateQrMeta'
  ).textContent =
    method + ' · ' + donateFlow.label;

  document.getElementById(
    'donateStepMethod'
  ).style.display = 'none';

  document.getElementById(
    'donateStepQr'
  ).style.display = 'block';
}

function donateBackToMethod() {

  document.getElementById(
    'donateStepQr'
  ).style.display = 'none';

  document.getElementById(
    'donateStepMethod'
  ).style.display = 'block';
}

/* ══════ LIBRARY FILTER ══════ */
function filterLib(btn, cat) {

  document
    .querySelectorAll('.lib-filter-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');

  document
    .querySelectorAll('#libGrid .lib-card')
    .forEach(card => {

      if (
        cat === 'all' ||
        card.dataset.cat === cat
      ) {

        card.style.display = '';

      } else {

        card.style.display = 'none';
      }
    });
}

/* ══════ PDF VIEWER ══════ */
function openPdf(title, pdfUrl) {

  document.getElementById(
    'pdfTitle'
  ).textContent = title;

  var body = document.getElementById('pdfBody');

  if (pdfUrl) {

    body.innerHTML =
      '<iframe src="' +
      pdfUrl +
      '#toolbar=1&navpanes=0" title="' +
      title +
      '"></iframe>';

  } else {

    body.innerHTML =
      '<div class="pdf-placeholder">' +
      '<span class="big">📄</span>' +
      '<span>' + title + '</span>' +
      '<span>PDF ဖိုင်ကို Admin တင်ပြီးမှ ဤနေရာတွင် ဖတ်ရှုနိုင်မည်</span>' +
      '<span style="font-size:12px;opacity:0.6;">Admin uploads PDF → viewer ချိတ်မည်</span>' +
      '</div>';
  }

  document
    .getElementById('pdfViewer')
    .classList.add('open');

  document.body.style.overflow = 'hidden';
}

function closePdf() {

  document
    .getElementById('pdfViewer')
    .classList.remove('open');

  document.getElementById(
    'pdfBody'
  ).innerHTML = '';

  document.body.style.overflow = '';
}

/* ══════ SCRIPT SUBMIT ══════ */
function submitScript(e) {

  e.preventDefault();

  alert(
    'ကျေးဇူးတင်ပါသည်! သင့် screenplay ကို လက်ခံရရှိပါပြီ。\nAdmin မှ စစ်ဆေးပြီးနောက် Library တွင် ထည့်သွင်းပေးမည်။'
  );

  e.target.reset();

  var fname = document.getElementById(
    'supportScriptFilename'
  );

  if (fname) fname.textContent = '';
}

/* ══════ ESC KEY ══════ */
document.addEventListener('keydown', e => {

  if (e.key !== 'Escape') return;

  var pv = document.getElementById('pdfViewer');

  if (
    pv &&
    pv.classList.contains('open')
  ) {

    closePdf();

    return;
  }

  var dm = document.getElementById('donateModal');

  if (
    dm &&
    dm.classList.contains('open')
  ) {

    closeDonateModal();

    return;
  }

  closeMenu();
});

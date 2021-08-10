import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { exportTemplate } from '../config/exportTemplate';
import { Notyf } from 'notyf';
import { Web3Storage } from 'web3.storage';

const msg = new Notyf({
  position: {
    x: 'center',
    y: 'top',
  },
});

export const getLocal = (key) => {
  let localData = localStorage.getItem(key);
  localData = localData ? JSON.parse(localData) : [];
  return localData;
};

export const addLocal = (key, content) => {
  localStorage.setItem(key, JSON.stringify(content || []));
};

export const checkExtension = (fname) => {
  let ext = /^.+\.([^.]+)$/.exec(fname);
  return ext == null ? '' : ext[1];
};

const getCustomerScripts = () => {
  let customScripts = getLocal('gjs-scripts');
  customScripts =
    customScripts.length > 0
      ? customScripts.map((c) => c.script + '\n').join('\n')
      : '';

  customScripts = `window.addEventListener('DOMContentLoaded', () => {
			  ${customScripts}
		  })`;

  return customScripts;
};

const buildZipFolder = (data) => {
  let zip = new JSZip();
  zip.file('index.html', exportTemplate(data));

  let css = zip.folder('css');
  css.file('style.css', data.css);
  css.file('global.css', data.global.css);

  let js = zip.folder('js');
  js.file('script.js', getCustomerScripts());
  js.file('global.js', data.global.js);
  return zip;
};

export const exportZip = (data) => {
  let zip = buildZipFolder(data);
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    let fileName = 'gram-' + Date.now() + '-export.zip';
    saveAs(content, fileName);
  });
};

export const modalMessage = (obj) => {
  const modalMessage = document.querySelector('.modal-message');
  modalMessage.innerHTML = `<p class="msg-${obj.type}">${obj.message}</p>
    <p style="text-align:center;"><small>Please close and re-open this modal.</small></p>`;
  const gramForm = document.querySelector('.gram-form');
  gramForm.classList.add('hide');
};

export const prepareDeployContent = async (data) => {
  const { token } = data;
  const client = new Web3Storage({ token });
  const files = [
    new File([exportTemplate(data)], 'index.html'),
    new File([getCustomerScripts()], '/js/script.js'),
    new File([data.global.js], '/js/global.js'),
    new File([data.global.css], '/css/global.css'),
    new File([data.css], '/css/global.css'),
  ];

  return client.put(files);
};
export const loadingSpinner = () => {
  let spinner_wrapper = document.querySelector('.spinner-wrapper');
  spinner_wrapper.classList.remove('hide');
  window.addEventListener('load', () => {
    setTimeout(() => {
      spinner_wrapper.classList.add('hide');
    }, 700);
  });
};

export const getGlobalJsCss = async () => {
  const global_css_url = 'gramateria/dist/global.css';
  const global_js_url = 'gramateria/dist/global.js';

  const cssRes = await fetch(global_css_url);
  const css = await cssRes.text();

  const jsRes = await fetch(global_js_url);
  const js = await jsRes.text();
  return { css, js };
};

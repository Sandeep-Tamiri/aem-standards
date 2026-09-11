import { moveInstrumentation } from '../../scripts/scripts.js';

function getFileName(url) {
  const { pathname } = new URL(url, window.location.href);
  return decodeURIComponent(pathname.split('/').pop());
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;

  const href = link.getAttribute('href');
  const fileName = getFileName(href);
  const text = link.textContent.trim() || fileName;

  const anchor = document.createElement('a');
  anchor.className = 'button download-link';
  anchor.href = href;
  anchor.setAttribute('download', fileName);
  anchor.textContent = text;
  moveInstrumentation(link, anchor);

  const extensionIndex = fileName.lastIndexOf('.');
  if (extensionIndex > -1) {
    const badge = document.createElement('span');
    badge.className = 'download-type';
    badge.textContent = fileName.slice(extensionIndex + 1).toUpperCase();
    anchor.append(badge);
  }

  block.replaceChildren(anchor);
}

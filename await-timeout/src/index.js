import Timeout from 'await-timeout';

document.querySelector('#example1Button').addEventListener('click', async () => {
  const timeout = document.querySelector('#example1Input').value;
  await Timeout.set(timeout);
  alert('Hello, world!');
});

document.querySelector('#example2Button').addEventListener('click', async () => {
  const url = document.querySelector('#example2urlInput').value;
  const timeout = document.querySelector('#example2timeoutInput').value;

  try {
    const response = await await Timeout.wrap(fetch(url), timeout, 'Timeout exceeded');
    const text = await response.text();
    alert(text);
  } catch (e) {
    alert(`Fetch failed with error: ${e}`);
  }
});
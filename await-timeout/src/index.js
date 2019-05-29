import Timeout from 'await-timeout';

document.querySelector('#example1Button').addEventListener('click', async () => {
  const timeout = document.querySelector('#example1Input').value;
  await Timeout.set(timeout);
  alert('Hello, world!');
});
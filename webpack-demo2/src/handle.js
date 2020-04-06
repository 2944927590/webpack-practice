import './handle.css';

export function handleClick () {
  console.log('handleClick');

  fetch('/api/user')
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
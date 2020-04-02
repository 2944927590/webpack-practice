import './index.sass';
import '@lib/lib-b';
import HelloComponent from 'hello';
import Link from 'link';

const handle = () => import(/* webpackChunkName: "handle" */ './handle');
const handle2 = () => import(/* webpackChunkName: "handle" */ './handle2');

new HelloComponent('hello index');
new Link('./detail.html');

document.querySelector('#btn').onclick = () => {
  handle().then(module => {
    module.handleClick();
  });

  handle2().then(module => {
    module.default();
  });
}



// if (module.hot) {
//   module.hot.accept()
// }

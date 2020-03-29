
import './index.css';
import './index.less';
import './index.sass';

class HelloComponent {
  constructor(content = '') {
    this.content = content;
    this.render();
  }
  render () {
    const element = document.createElement('div');
    element.innerHTML = this.content;
    document.body.appendChild(element);
  }
}
console.log(1);
new HelloComponent('hello webpack');


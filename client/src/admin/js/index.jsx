import ReactDOM from 'react-dom';
import React from 'react';

import Root from './components/Root';

function render(Component) {
  ReactDOM.render(
    <Component />,
    document.getElementById('app'),
  );
}

render(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    render(require('./components/Root').default);
  });
}

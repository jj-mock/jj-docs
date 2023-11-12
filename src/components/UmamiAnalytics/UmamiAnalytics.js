import React from 'react';

class UmamiAnalytics extends React.Component {

  componentDidMount() {
    const devMode = ['localhost', '127.0.0.1'].includes(location.hostname);
    if (devMode) {
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.async = true;
    script.src = 'https://analytics.vedro.io/script.js';
    script.setAttribute('data-website-id', 'e74c2feb-1a0c-4eca-a208-30efd9546015');
    document.getElementsByTagName("body")[0].appendChild(script);
  }

  render() {
    return <></>;
  }

}

export default UmamiAnalytics;

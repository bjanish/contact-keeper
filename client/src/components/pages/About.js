import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className="my-1">
        This is a full stack React app for keeping contacts.
      </p>
      <p className="bg-dark" style={{ textAlign: 'right' }}>
        <span style={{ paddingRight: '10px' }}>
          <strong>Version</strong> 1.0.0
        </span>
      </p>
    </div>
  );
};

export default About;

import React from 'react';

const Subheader = ({ currentUser }) => {
  return (
    <div>
      <h3>Welcome, {currentUser ? currentUser.firstname : 'Guest'}!</h3>
      {/* Additional subheader content can be added here */}
    </div>
  );
};

export default Subheader;
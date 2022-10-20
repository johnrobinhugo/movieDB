import React, { useState } from 'react';

import ContentSection from '../organisms/ContentSection';

import { useSelector } from 'react-redux';

function ProfilePage(props) {

  const user = useSelector(state => state.user);

  console.log(user);


  return (
    <main className="page">
      <ContentSection title="Profile">
        <h1 className="color-white">Hi {user.firstname} {user.lastname}</h1>
      </ContentSection>
    </main>
  )
}

export default ProfilePage;
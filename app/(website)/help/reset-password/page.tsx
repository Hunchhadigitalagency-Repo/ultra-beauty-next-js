import React from 'react';
import Helper from './helper-section';

const items = [
  "First go to the login screen.",
  "You will see reset password link.",
  "You will get OTP.",
  "And update the password and save.",
  "The password will be reset."
]

const ResetPassword = () => {
  
  return (
    <div>
      <Helper
        headerTitle="Rest your password"
        headerDesc="Rest your password"
        helperTitle="To reset the password follow the following steps"
        items={items}
      />
    </div>
  )
}

export default ResetPassword
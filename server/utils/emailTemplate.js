const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #1f2937; color: #f3f4f6; margin: 0; padding: 10px;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="background-color: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
      <div style="background: linear-gradient(to right, #a855f7, #6366f1); padding: 20px 16px;">
        <h1 style="color: white; margin: 0; text-align: center; font-size: clamp(20px, 4vw, 28px); font-weight: 600; word-wrap: break-word;">Verify Your Email</h1>
      </div>
      
      <div style="padding: 20px 16px;">
        <p style="margin-bottom: 20px; font-size: clamp(14px, 3vw, 16px);">Hi there,</p>
        <p style="margin-bottom: 20px; font-size: clamp(14px, 3vw, 16px);">Welcome to EESA! Please use the verification code below to complete your registration:</p>
        
        <div style="text-align: center; margin: 24px 0;">
          <div style="background-color: #1f2937; border: 2px solid #a855f7; padding: 16px; border-radius: 12px; display: inline-block;">
            <span style="font-size: clamp(24px, 6vw, 36px); font-weight: 700; letter-spacing: 8px; color: #a855f7;">{verificationCode}</span>
          </div>
        </div>
        
        <div style="margin: 24px 0; padding: 16px; background-color: #1f2937; border-radius: 8px;">
          <p style="margin: 0; font-size: clamp(12px, 2.5vw, 14px); color: #9ca3af;">
            • This code will expire in 24 hours<br>
            • If you didn't create an account, you can safely ignore this email
          </p>
        </div>
        
        <p style="margin-top: 24px; margin-bottom: 8px; font-size: clamp(14px, 3vw, 16px);">Best regards,</p>
        <p style="margin: 0; font-size: clamp(14px, 3vw, 16px); color: #a855f7; font-weight: 600;">EESA Team</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #1f2937; color: #f3f4f6; margin: 0; padding: 10px;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="background-color: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
      <div style="background: linear-gradient(to right, #a855f7, #6366f1); padding: 20px 16px;">
        <h1 style="color: white; margin: 0; text-align: center; font-size: clamp(20px, 4vw, 28px); font-weight: 600; word-wrap: break-word;">Password Reset Successful</h1>
      </div>
      
      <div style="padding: 20px 16px;">
        <p style="margin-bottom: 20px; font-size: clamp(14px, 3vw, 16px);">Hi there,</p>
        <p style="margin-bottom: 20px; font-size: clamp(14px, 3vw, 16px);">Your password has been successfully reset.</p>
        
        <div style="text-align: center; margin: 24px 0;">
          <div style="display: inline-block; width: 64px; height: 64px; background: linear-gradient(to right, #a855f7, #6366f1); border-radius: 50%; position: relative;">
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 32px;">✓</span>
          </div>
        </div>
        
        <div style="margin: 24px 0; padding: 16px; background-color: #1f2937; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-size: clamp(14px, 3vw, 16px); color: #f3f4f6;">Security Tips:</p>
          <ul style="margin: 0; padding-left: 20px; color: #9ca3af; font-size: clamp(12px, 2.5vw, 14px);">
            <li style="margin-bottom: 4px;">Use a strong, unique password</li>
            <li style="margin-bottom: 4px;">Never share your password with anyone</li>
          </ul>
        </div>
        
        <p style="margin-top: 24px; margin-bottom: 8px; font-size: clamp(14px, 3vw, 16px);">Best regards,</p>
        <p style="margin: 0; font-size: clamp(14px, 3vw, 16px); color: #a855f7; font-weight: 600;">EESA Team</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background-color: #1f2937; color: #f3f4f6; margin: 0; padding: 10px;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="background-color: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
      <div style="background: linear-gradient(to right, #a855f7, #6366f1); padding: 20px 16px;">
        <h1 style="color: white; margin: 0; text-align: center; font-size: clamp(20px, 4vw, 28px); font-weight: 600; word-wrap: break-word;">Reset Your Password</h1>
      </div>
      
      <div style="padding: 20px 16px;">
        <p style="margin-bottom: 20px; font-size: clamp(14px, 3vw, 16px);">Hi there,</p>
        <p style="margin-bottom: 20px; font-size: clamp(14px, 3vw, 16px);">We received a request to reset your password. Click the button below to create a new password:</p>
        
        <div style="text-align: center; margin: 24px 0;">
          <a href="{resetURL}" style="display: inline-block; background: linear-gradient(to right, #a855f7, #6366f1); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: clamp(14px, 3vw, 16px); text-align: center; min-width: 200px; word-wrap: break-word;">Reset Password</a>
        </div>
        
        <div style="margin: 24px 0; padding: 16px; background-color: #1f2937; border-radius: 8px;">
          <p style="margin: 0; font-size: clamp(12px, 2.5vw, 14px); color: #9ca3af;">
            • This link will expire in 1 hour<br>
            • If you didn't request this, you can safely ignore this email
          </p>
        </div>
        
        <p style="margin-top: 24px; margin-bottom: 8px; font-size: clamp(14px, 3vw, 16px);">Best regards,</p>
        <p style="margin: 0; font-size: clamp(14px, 3vw, 16px); color: #a855f7; font-weight: 600;">EESA Team</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
};
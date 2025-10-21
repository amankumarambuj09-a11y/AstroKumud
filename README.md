# Astro Kumud - Professional Astrology Consultation Website

A secure, modern website for astrology consultation services with appointment booking system.

## 🌟 Features

### Core Features
- **Professional Design**: Modern, responsive design with astrology theme
- **Service Showcase**: 12+ astrology services including Kundali analysis, matchmaking, career guidance
- **Appointment Booking**: Comprehensive booking system with form validation
- **Location Search**: Smart city search for birth place selection
- **WhatsApp Integration**: Direct contact via WhatsApp
- **Email Notifications**: Automatic booking confirmations

### Security Features
- **Rate Limiting**: Prevents spam and abuse
- **Input Sanitization**: XSS protection
- **reCAPTCHA Integration**: Bot protection
- **CSRF Protection**: Form security
- **Content Security Policy**: XSS prevention
- **Security Headers**: OWASP recommended headers
- **Right-click Protection**: Basic content protection

### Authentication
- **Google Sign-In**: OAuth integration
- **Email/Password Login**: Traditional authentication
- **User Profiles**: Account management
- **Session Management**: Secure user sessions
- **Password Validation**: Strong password requirements

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)
1. Push code to GitHub repository
2. Connect repository to Netlify
3. Deploy automatically with `netlify.toml` configuration
4. Set environment variables in Netlify dashboard

### Option 2: Vercel
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy with `vercel.json` configuration
4. Set environment variables in Vercel dashboard

### Option 3: GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (main/master)
4. Website will be available at `username.github.io/repository-name`

## 🔧 Setup Instructions

### 1. Google Sign-In Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sign-In API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Replace `YOUR_GOOGLE_CLIENT_ID` in `index.html`

### 2. reCAPTCHA Setup
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Register your site
3. Get site key and secret key
4. Replace `6LcYourSiteKeyHere` in `index.html`

### 3. Email Configuration
- Update email address in `script.js` (currently set to kumudmmaarik@gmail.com)
- For production, integrate with email service like SendGrid or Mailgun

### 4. WhatsApp Configuration
- Phone number is set to +91 8210490151
- Update in `script.js` if needed

## 📱 Contact Information

- **Phone**: +91 8210490151
- **Email**: kumudmmaarik@gmail.com
- **WhatsApp**: Direct integration available

## 🛡️ Security Considerations

### Implemented Security Measures
- Content Security Policy (CSP)
- XSS Protection headers
- CSRF protection
- Rate limiting
- Input sanitization
- reCAPTCHA verification
- Secure authentication flow

### Additional Recommendations for Production
1. **SSL Certificate**: Ensure HTTPS is enabled
2. **Backend API**: Implement server-side validation
3. **Database Security**: Use secure database connections
4. **Regular Updates**: Keep dependencies updated
5. **Monitoring**: Implement security monitoring
6. **Backup**: Regular data backups

## 🎨 Customization

### Colors
- Primary: #8B0000 (Dark Red)
- Secondary: #A0522D (Saddle Brown)
- Accent: #FFD700 (Gold)
- Success: #28a745 (Green)
- Error: #dc3545 (Red)

### Fonts
- Primary: Arial, sans-serif
- Icons: Font Awesome 6.0.0

## 📊 Analytics & Monitoring

To add analytics:
1. Google Analytics: Add tracking code to `index.html`
2. Facebook Pixel: Add pixel code for social media tracking
3. Hotjar: Add for user behavior analysis

## 🔄 Updates & Maintenance

### Regular Tasks
- Update contact information as needed
- Review and update services
- Monitor security logs
- Update dependencies
- Backup user data
- Test booking system functionality

## 📞 Support

For technical support or customization requests, contact the development team.

## 📄 License

This project is proprietary software for Astro Kumud. All rights reserved.

---

**Note**: Remember to replace placeholder values (Google Client ID, reCAPTCHA keys) with actual values before deploying to production.
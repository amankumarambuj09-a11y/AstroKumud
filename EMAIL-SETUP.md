# 📧 Email Setup Guide for Astro Kumud

## 🎯 Goal: All appointment bookings sent to kumudmmaarik@gmail.com

## 🚀 Method 1: Netlify Forms (Automatic - Recommended)

### After deploying to Netlify:

1. **Go to your Netlify dashboard**
   - Visit: https://app.netlify.com/sites/YOUR_SITE_NAME/forms

2. **Configure Form Notifications**:
   - Click on "Form notifications"
   - Click "Add notification"
   - Choose "Email notification"
   - Enter email: `kumudmmaarik@gmail.com`
   - Select forms: "appointment-booking" and "quick-booking"
   - Save settings

3. **Customize Email Template**:
   ```
   Subject: 🕉️ New Appointment Booking - Astro Kumud
   
   New booking received:
   
   Customer: {{name}}
   Email: {{email}}
   Phone: {{phone}}
   Service: {{service}}
   Date: {{date}}
   Time: {{time}}
   Birth Details: {{birthdate}} at {{birthtime}} in {{birthplace}}
   Message: {{message}}
   
   Submitted: {{submissionTime}}
   ```

## 📱 Method 2: WhatsApp Backup Notifications

Every booking also triggers WhatsApp redirect for immediate notification.

## 🔧 Method 3: Advanced Email Integration (Optional)

### Using EmailJS for client-side emails:

1. **Sign up at [EmailJS](https://emailjs.com)**
2. **Get Service ID and Template ID**
3. **Add to your website**:

```javascript
// Add to script.js
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    to_email: 'kumudmmaarik@gmail.com',
    customer_name: formData.name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    service_type: formData.service,
    booking_date: formData.date,
    booking_time: formData.time,
    birth_details: `${formData.birthdate} at ${formData.birthtime} in ${formData.birthplace}`,
    message: formData.message
});
```

## 📊 Method 4: Zapier Integration

1. **Connect Netlify Forms to Gmail via Zapier**
2. **Create automated workflows**
3. **Advanced email formatting**

## ✅ What's Already Set Up:

### ✅ Netlify Forms Integration:
- Forms configured with `data-netlify="true"`
- Hidden form-name fields added
- reCAPTCHA protection enabled
- Thank you page redirect

### ✅ Form Data Collection:
- Customer details (name, email, phone)
- Service type and preferences
- Birth details for kundali
- Submission timestamp
- User login info (if logged in)

### ✅ Security Features:
- Rate limiting to prevent spam
- Input sanitization
- reCAPTCHA verification
- CSRF protection

## 🎯 Immediate Setup (After Deployment):

1. **Deploy to Netlify** ✓
2. **Go to Forms section** in Netlify dashboard
3. **Add email notification** to kumudmmaarik@gmail.com
4. **Test booking form** to verify emails arrive
5. **Customize email template** if needed

## 📧 Email Format You'll Receive:

```
From: Netlify Forms <noreply@netlify.com>
To: kumudmmaarik@gmail.com
Subject: New form submission from Astro Kumud

Form: appointment-booking
Submitted: October 21, 2024 at 2:30 PM IST

Name: John Doe
Email: john@example.com
Phone: +91 9876543210
Service: Kundali Discussion
Preferred Date: 2024-10-25
Preferred Time: 10:00 AM
Birth Date: 1990-05-15
Birth Time: 08:30
Birth Place: Mumbai, Maharashtra
Message: Looking for career guidance

Submission Time: 21/10/2024, 2:30:00 pm
```

## 🔄 Backup Methods:

1. **WhatsApp Integration**: Customers redirected to WhatsApp
2. **Thank You Page**: Displays your contact info
3. **Local Storage**: Bookings saved in browser (for demo)
4. **Console Logs**: Technical details logged

## 📱 Mobile Notifications:

Set up Gmail mobile app to get instant notifications when bookings arrive.

## 🛠️ Troubleshooting:

**If emails don't arrive:**
1. Check Netlify Forms dashboard
2. Verify email address spelling
3. Check spam folder
4. Test with different email
5. Enable form notifications in Netlify

**Contact for support:**
- Check Netlify documentation
- Test forms after deployment
- Verify all form fields are working

---

## 🎉 Result:

Every appointment booking will automatically send a detailed email to **kumudmmaarik@gmail.com** with all customer information and booking details!
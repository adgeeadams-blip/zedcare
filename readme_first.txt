ZEDCARE APP PROTOTYPE — VERSION 0.2

WHAT IS INCLUDED
- index.html: responsive app interface for mobile and desktop
- manifest.json: installable web-app settings
- service-worker.js: basic offline caching after first visit on a supported host
- This README: how to open and test the prototype

HOW TO OPEN IT ON YOUR COMPUTER
1. Download and extract ZedCare_App_MVP.zip.
2. Open the extracted folder.
3. Double-click index.html. It should open in your browser.
4. Test the service cards and submit a sample request.
5. Open “My requests” to see locally saved sample requests.

IMPORTANT LIMITATIONS
This is a front-end prototype, not a fully live business app.
- Requests are saved online in a Netlify Database and can be viewed at /admin.html (password set by the ADMIN_PASSWORD environment variable in Netlify).
- A WhatsApp button opens a chat with ZedCare on +260 979 610 079.
- There are no customer accounts, SMS, push notifications, live dispatch or payment processing.
- The partner directory is a list of proposed leads requiring verification. It does not mean a partnership has been signed.
- Do not collect real customer data or accept real payments using this prototype.
- Do not rely on it for emergencies. It does not dispatch ambulances or contact emergency services.

HOW TO PUT IT ONLINE
To let people open it on phones using a link, upload the extracted files to a static website host that supports HTTPS. The web app can then be installed from the browser on supported phones. A public live launch should wait until the backend, privacy/security, provider agreements and emergency workflows are implemented and tested.

HOW TO GET A REAL ANDROID + IPHONE APP
The next development phase needs:
1. A backend API and secure database.
2. Customer accounts and staff/admin access.
3. Provider onboarding and verification.
4. Request notifications and assignment workflow.
5. Real telephone/WhatsApp contact and support process.
6. Mobile money/card payments through an authorised payment provider, including receipts, refunds and reconciliation.
7. Privacy notice, consent, data retention, security testing, backups and access controls.
8. A carefully tested emergency workflow with verified licensed providers. Never present an unconfirmed request as an ambulance dispatch.
9. Android and iOS packaging and store submission if native apps are required.

TEST CHECKLIST
[ ] Open on laptop
[ ] Check each service category
[ ] Submit a test request
[ ] View request history
[ ] Export request data
[ ] Delete a request
[ ] Check mobile layout
[ ] Replace demo partner details only after verification
[ ] Build and test backend before public launch

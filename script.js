// Google API Client configuration
var googleClientId = 'TU_CLIENT_ID_GOOGLE.apps.googleusercontent.com';
var googleApiKey = 'TU_API_KEY_GOOGLE';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send';

var auth2;

/**
 * Initializes the Google API client
 */
function initClient() {
    gapi.client.init({
        apiKey: googleApiKey,
        clientId: googleClientId,
        scope: scopes,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
    }).then(function () {
        auth2 = gapi.auth2.getAuthInstance();
        
        // Listen for sign-in state changes
        auth2.isSignedIn.listen(updateSigninStatus);
        
        // Handle initial sign-in state
        updateSigninStatus(auth2.isSignedIn.get());
    });
}

/**
 * Handle sign-in state changes
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        // User is signed in
        console.log('User is signed in');
        loadGmailApi();
    } else {
        // User is signed out
        console.log('User is signed out');
    }
}

/**
 * Load Gmail API client library
 */
function loadGmailApi() {
    gapi.client.load('gmail', 'v1', function() {
        console.log('Gmail API loaded');
        listMessages();
    });
}

/**
 * List messages from Gmail inbox
 */
function listMessages() {
    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'maxResults': 10,
        'labelIds': 'INBOX'
    });
    
    request.execute(function(response) {
        console.log('Messages:', response.messages);
        // Process messages and display in UI
    });
}

/**
 * Send email through Gmail API
 */
function sendEmail(to, subject, message) {
    var email = [
        'Content-Type: text/plain; charset="UTF-8"\n',
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: 7bit\n',
        'to: ', to, '\n',
        'subject: ', subject, '\n\n',
        message
    ].join('');
    
    var base64EncodedEmail = btoa(email).replace(/\//g,'_').replace(/\+/g,'-');
    
    var request = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': base64EncodedEmail
        }
    });
    
    request.execute(function(response) {
        console.log('Email sent:', response);
        // Update UI to show success
    });
}

/**
 * Handle the auth callback
 */
function signInCallback(authResult) {
    if (authResult['code']) {
        // Send the code to your backend to exchange for tokens
        // This is where you would typically make an AJAX call to your server
        console.log('Auth code:', authResult['code']);
        
        // For demo purposes, we'll just redirect to the dashboard
        window.location.href = 'dashboard.html';
    } else {
        console.error('Error during authentication');
    }
}

// Load the Google API client
gapi.load('client:auth2', initClient);
# _CHECK-IN - CRUD APP_

Check-In is a fully responsive CRUD app allows the user to record daily mental health check-ins.

## FEATURES

- CRUD
- Emoji Bar
- Check-Ins List Modal
- Pagination

## TECHNOLOGIES

- CSS
- React
- React Router
- Firebase Authentication
- Firestore Database
- Coolors Color Tool
- Google Fonts & Icons

## WHY I BUILT THIS

I wanted to build an app that allowed me to journal my mental health. Also, I wanted more practice with Firebase!

## WHAT I LEARNED

### _FIREBASE AUTHENTICATION_

- Set up Firebase for managing authentication processes
- Implement user registration using email/password in a secure manner
- Enable users to log in with their email/password and handle authentication errors
- Develop functionality to allow users to log out of the application
- Utilize the onAuthStateChanged method to track and respond to user authentication state changes
- Integrate Google Sign-In as an alternative authentication method

### _FIREBASE FIRESTORE_

- Set up Cloud Firestore in project and configure it for use with the application
- Add documents to Firestore collections and understand how collections and documents are structured
- Identify and work with different data types supported by Firestore for storing information
- Attach unique user IDs (UIDs) to check-ins for personalized data management
- Add creation timestamps to documents using the serverTimestamp method
- Retrieve data from Firestore using getDocs for single-fetch operations
- Implement real-time data updates in the application using the onSnapshot method
- Create and enforce security rules to restrict read and write access to authenticated users

### _USESTATE_

- Managing form's success/error messages
- Managing/toggling password visibility
- Managing check-ins
- Managing selected emotion for submission
- Managing modal open/close
- Managing modal pagination

### _USEEFFECT_

- Handling Firebase authentication state changes and ensuring check-ins are fetched when the user logs in
- Handles UI behavior (disabling/enabling scrolling) based on the modal state
- Defaults modal to page 1 when reopening it

### _USEREF_

- Scroll the check-ins list wrapper to the top when the user changes pages

### _RESPONSIVE WEB DESIGN_

- Implementing media queries to add device breakpoints
- Using device breakpoints to change orientation, font size, etc
- Using CSS Grid and Flexbox

### _ACCESSIBILITY_

- Calculating the contrast ratio of text, icons and background colors using Coolors' Color Contrast Checker
- Adding aria-labels and alt tags to buttons, icons, etc

## MOST CHALLENGING

- Real-time data fetching and synching with Firestore

## BUGS

- I have not found any bugs yet

## FUTURE UPDATES

- Add filtering to modal

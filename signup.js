// 1. YOUR FIREBASE CONFIGURATION (Get this from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. GOOGLE SIGN UP LOGIC
const googleBtn = document.getElementById('googleBtn');
googleBtn.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);
        console.log("Authenticated as:", result.user.displayName);
        // Successful login! Move to AI assessment
        window.location.href = "assessment.html";
    } catch (error) {
        alert("Google Sign-In failed: " + error.message);
    }
});

// 3. EMAIL/PASSWORD SIGN UP LOGIC
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const submitBtn = document.querySelector('.btn-submit');

    submitBtn.innerText = "Processing AI Setup...";
    submitBtn.disabled = true;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // New user created!
            window.location.href = "assessment.html";
        })
        .catch((error) => {
            alert(error.message);
            submitBtn.innerText = "Start Free Trial →";
            submitBtn.disabled = false;
        });
});

// 4. COOL MOUSE TILT EFFECT
const card = document.querySelector('.signup-card');
document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 60;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 60;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
// 1. YOUR REAL FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyAy24wgymy-g4vDM8tmMLnV9SBhMjHS7jg",
    authDomain: "vitals-tracker-dcb62.firebaseapp.com",
    projectId: "vitals-tracker-dcb62",
    storageBucket: "vitals-tracker-dcb62.firebasestorage.app",
    messagingSenderId: "114062862225",
    appId: "1:114062862225:web:d0b449da9f663440521c30",
    measurementId: "G-J3ST882KH4"
};

// Initialize Firebase (Using the Compat version already in your HTML)
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

import { redirect } from "react-router-dom";
//Code has been refactored to implement Firebase

//This import allows us to connect to our app in Firebase.
import { initializeApp } from "firebase/app";
//This allows the app to be in sync with the database we have created on Firestore. Any changes on the DB will reflect on our app
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where,
	addDoc,
	serverTimestamp,
	orderBy,
	onSnapshot,
} from "firebase/firestore";

// User authorization imports
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDBHMSiGdcvaqG6nwFdGqnY_zePi8N_wDw",
	authDomain: "vanlife-47009.firebaseapp.com",
	projectId: "vanlife-47009",
	storageBucket: "vanlife-47009.appspot.com",
	messagingSenderId: "248124668692",
	appId: "1:248124668692:web:5dced86719b814b9f2e001",
};

const app = initializeApp(firebaseConfig);

//We then initialize our database variable by passing the app variable
const db = getFirestore(app);

const auth = getAuth(app);

//This is a totally optional step but just for the sake of clarity, we are going to reference our collection in a separate variable
const vansCollection = collection(db, "vans");

//Every time we get any data from Firebase, it creates a Snapshot that gets the state of the data at the point we got it and saves it so we don't loose it forever after making changes to our database
export async function getVans() {
	const querySnapshot = await getDocs(vansCollection);
	const dataArray = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return dataArray;
}

//Single van function (can also be used for host van detail page)
export async function getSingleVan(id) {
	const docRef = doc(db, "vans", id);
	const vanSnapshot = await getDoc(docRef);
	return vanSnapshot.data();
	// or we can return an object with the added id
	// return {
	// 	...vanSnapshot.data(),
	// 	id: vanSnapshot.id
	// }
}

export async function getHostVans() {
	//Since the host won't be need to pull ALL the vans, we need to create a query
	const q = query(vansCollection, where("hostId", "==", "123"));
	const querySnapshot = await getDocs(q);
	const dataArray = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return dataArray;
}

//Users collection reference
const usersCollection = collection(db, "users");

const usersQuery = query(usersCollection, orderBy("createdAt"));

//Real time data collection
onSnapshot(usersQuery, (snapshot) => {
	let users = [];
	snapshot.docs.forEach((doc) => {
		users.push({ ...doc.data(), id: doc.id });
	});
});

export async function requireAuth(request) {
	const pathname = new URL(request.url).pathname;
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	if (!isLoggedIn) {
		throw redirect(
			`/login?message=You must log in first&redirectTo=${pathname}`
		);
	}
	return null;
}

export async function addNewUser(creds) {
	localStorage.setItem("isLoggedIn", true);
	createUserWithEmailAndPassword(auth, creds.email, creds.psw)
		.then((cred) => console.log("user created", cred.user))
		.catch((err) => {
			console.log(err.message);
		});
	addDoc(usersCollection, {
		name: creds.name,
		email: creds.email,
		//Creates a timestamp of when the doc is generated
		createdAt: serverTimestamp(),
	});
}

export async function logoutUser() {
	localStorage.removeItem("isLoggedIn");
	signOut(auth)
		.then(() => {
			console.log("user signed out");
		})
		.catch((err) => console.log(err.message));
}

export async function loginUser(creds) {
	try {
		const cred = await signInWithEmailAndPassword(auth, creds.email, creds.psw);
		localStorage.setItem("isLoggedIn", true);
	} catch (err) {
		console.log(err.message);
		console.log(err.code);
	}
}

// onAuthStateChanged(auth, (user) => {
// 	console.log("user status changed");
// });

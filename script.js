// const fetchData = async () => {
//     try {
//         const url = "https://dummyjson.com/products";
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data.products);
//     } catch (err) {
//         console.log(err);
//     }
// };

// fetchData();

const getUser = async () => {
    const displayUserTag = document.getElementById("displayUser");
    const span = document.createElement("span");
    const response = await fetch("http://localhost:3000/users");
    const userData = await response.json();
    console.log(userData);
    const name = userData.map((item) => item.name);
    const email = userData.map((item) => item.email);
    const password = userData.map((item) => item.password);
    displayUserTag.append(span);
    span.append(name, email, password);
};

getUser();

const handleRegister = async () => {
    const nameTag = document.getElementById("name");
    const emailTag = document.getElementById("email");
    const passwordTag = document.getElementById("password");

    const user = [{ name: nameTag.value }, { email: emailTag.value }, { password: passwordTag.value }];

    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(user),
    });
    const userData = await response.json();
    console.log(userData);
};

const handleFileUpload = async () => {
    const inputTag = document.getElementById("fileUpload");
    console.log(inputTag.files);
    const response = await fetch("http://localhost:3000/fileUpload", {
        method: "POST",
        body: inputTag.files[0],
    });
    const data = await response.json();
    console.log(data);
};

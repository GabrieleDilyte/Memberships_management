let sortOrder = "ASC";
const sortElement = document.querySelector("#sort");

const getUsers = async () => {
  const usersResponse = await fetch(
    "http://localhost:3000/users?sort=" + sortOrder,
    {
      method: "GET",
    }
  );
  const responseJSON = await usersResponse.json();

  return responseJSON;
};

const renderUsers = (users) => {
  const usersSect = document.querySelector("#users");
  usersSect.innerHTML = null;

  users.forEach((user) => {
    const divEl = document.createElement("div");
    const h2El = document.createElement("h2");
    const emailEl = document.createElement("p");
    const membershipEl = document.createElement("p");

    divEl.classList.add("singleUser");
    h2El.innerText = user["name"] + " " + user["surname"];
    emailEl.innerText = "Email Address: " + user["email"];
    membershipEl.innerText = "Membership: " + user["membershipName"];
    divEl.append(h2El, emailEl, membershipEl);
    usersSect.append(divEl);
  });
};

const getAndRenderUsers = async () => {
  const usersList = await getUsers();
  renderUsers(usersList);
};

sortElement.addEventListener("click", () => {
  if (sortOrder === "ASC") {
    sortOrder = "DESC";
  } else {
    sortOrder = "ASC";
  }

  sortElement.innerText = `Sorting By name: (${sortOrder})`;
  getAndRenderUsers();
});

getAndRenderUsers();

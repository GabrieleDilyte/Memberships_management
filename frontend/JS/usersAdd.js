const formElement = document.querySelector("form");

const getMemberships = async () => {
  const membershipResponse = await fetch("http://localhost:3000/memberships", {
    method: "GET",
  });
  const responseJSON = await membershipResponse.json();
  return responseJSON;
};

const addMembershipOptions = async () => {
  const membershipsList = await getMemberships();
  const membSelect = document.querySelector("#membership");

  membershipsList.forEach((membership) => {
    const optionEl = document.createElement("option");
    optionEl.value = membership["id"];
    optionEl.innerText = membership["name"];

    membSelect.append(optionEl);
  });
};

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  const id = Date.now();
  const name = formData.get("name");
  const surname = formData.get("surname");
  const email = formData.get("email");
  const service_id = Number(formData.get("membership"));

  const usersObject = {
    id,
    name,
    surname,
    email,
    service_id,
  };

  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usersObject),
  });
});

addMembershipOptions();

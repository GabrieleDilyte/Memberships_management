const getMemberships = async () => {
  const membershipResponse = await fetch("http://localhost:3000/memberships", {
    method: "GET",
  });
  const responseJSON = await membershipResponse.json();
  return responseJSON;
};

const deleteMembership = async (id) => {
  const membershipResponse = await fetch(
    "http://localhost:3000/memberships/" + id,
    {
      method: "DELETE",
    }
  );
};

const renderMemberships = (memberships) => {
  const membershipsSect = document.querySelector("#memberships");
  console.log(memberships);
  memberships.forEach((membership) => {
    const divEl = document.createElement("div");
    const h2El = document.createElement("h2");
    const pEl = document.createElement("p");
    const delButton = document.createElement("button");

    divEl.classList.add("singleMembership");
    h2El.innerText = "$" + membership["price"] + " " + membership["name"];
    pEl.innerText = membership["description"];
    delButton.innerText = "Delete";
    divEl.append(h2El, pEl, delButton);
    membershipsSect.append(divEl);

    delButton.addEventListener("click", () => {
      deleteMembership(membership["id"]);
      divEl.remove();
    });
  });
};

const getAndRender = async () => {
  const membershipsList = await getMemberships();
  console.log(membershipsList);
  renderMemberships(membershipsList);
};

getAndRender();

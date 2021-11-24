const formElement = document.querySelector("form");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);

  const id = Date.now();
  const name = formData.get("name");
  const price = formData.get("price");
  const description = formData.get("description");

  const mebershipObject = {
    id,
    name,
    price,
    description,
  };

  await fetch("http://localhost:3000/memberships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mebershipObject),
  });
});

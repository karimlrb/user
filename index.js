let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData[0]);
};

const userDisplay = async () => {
  await fetchUser();

  function dateParser(date) {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  }

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let registerdTimestamp = Date.parse(date);
    let howManyTimestamp = todayTimestamp - registerdTimestamp;

    return Math.ceil(howManyTimestamp / 8.64e7);
  };

  document.body.innerHTML = userData
    //  Grace au guillemet de la touche 7 ->  "<h3>" + user.name.first + "</h3>" expression du dessous
    .map(
      (user) =>
        `
    <div = class="card">
    <img src =${user.picture.large} alt="photo de ${user.name.first}">
        <h3> ${user.name.first}  ${user.name.last}</h3>
        <p> ${user.location.city}, ${dateParser(user.dob.date)}</p>
        <em>Membre depuis ${dayCalc(user.registered.date)} jours</em>
    </div>
        `
    )
    .join("");
};
userDisplay();

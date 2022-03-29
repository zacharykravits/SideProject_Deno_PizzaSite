const navigationBar = document.getElementById("navigationBar");
const navigationBarLogo = document.getElementById("navigationBarLogo");
const navigationMobileBackdrop = document.getElementById("navigationMobileBackdrop");
const navigationMobileBackdropClassList = navigationMobileBackdrop.classList;
const navigationBarMobileToggle = document.getElementById("navigationBarMobileToggle");
const navigationMobileDrawer = document.getElementById("navigationMobileDrawer");

const bodyContent = document.getElementById('main-content');

navigationBarMobileToggle.addEventListener("click", (event) => {
  event.preventDefault();

  if (navigationMobileBackdropClassList.contains("hidden")) {
    navigationMobileBackdrop.classList.remove("hidden");
  } else {
    navigationMobileBackdrop.classList.add("hidden");
  }
});

window.addEventListener("click", (event) => {
  if (!navigationMobileBackdrop.classList.contains("hidden")) {
    if (event.target.id === "navigationMobileBackdrop") {
      console.log("not the drawer");
      navigationMobileBackdrop.classList.add("hidden");
    }
  }
});
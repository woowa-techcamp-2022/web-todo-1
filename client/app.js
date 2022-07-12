import "./reset.css";
import "./style.css";

const menuBtn = document.querySelector(".menu");
const drawer = document.querySelector(".drawer");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  console.log(drawer);
  drawer.classList.toggle("open");
  drawer.style.transition = "ease-in 0.3s transform";
});

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});

const html = `
  <ul>
    <li><a href="./1-1.html">1-1</a></li>
  </ul>
`;

const ready = () => {
  const body = document.body;
  body.insertAdjacentHTML("beforeend", html);
};

window.addEventListener("DOMContentLoaded", () => {
  ready();
});

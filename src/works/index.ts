const html = `
  <ul>
    <li><a href="./1-1.html">1-1</a></li>
    <li><a href="./1-2.html">1-2</a></li>
    <li><a href="./1-3.html">1-3</a></li>
    <li><a href="./1-4.html">1-4</a></li>
    <li><a href="./1-5.html">1-5</a></li>
  </ul>
`;

const ready = () => {
  const body = document.body;
  body.insertAdjacentHTML("beforeend", html);
};

window.addEventListener("DOMContentLoaded", () => {
  ready();
});

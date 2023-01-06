window.onload = () => {
  if (document.getElementById("contact-message"))
    document.getElementById("contact-message").style.display = "none";

  const links = document.links;
  for (let i = 0; i < links.length; i++) {
    if (links[i].hostname != window.location.hostname) {
      links[i].target = "_blank";
    }
  }

  window.addEventListener("scroll", fadeIn);
  fadeIn();
};

const submitForm = (event) => {
  const formUrl =
    "https://n2a2rkcobqyccc2aupz2mc43gm0ulkar.lambda-url.us-west-2.on.aws/";

  event.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    tel: document.getElementById("tel").value,
    url: document.getElementById("url").value,
    message: document.getElementById("message").value,
  };

  //Do nothing if all fields are empty
  if (Object.values(payload).every((x) => x === null || x === "")) return false;

  payload.site = "nosecreek";

  const req = new XMLHttpRequest();
  req.open("POST", formUrl, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function () {
    if (req.status < 400) {
      document.getElementById("contact-message").innerHTML = JSON.parse(
        req.responseText
      ).message;
    } else {
      document.getElementById("contact-message").innerHTML =
        "Sorry, there was a problem sending your message. Please try again, or send us a message at <a href='mailto:dustin@nosecreekweb.ca'>dustin@nosecreekweb.ca</a>";
    }
    document.getElementById("contact-message").style.display = "block";
    document.location = document.location.toString().split("#")[0] + "#contact";
  });
  req.send(JSON.stringify(payload));
};

const fadeIn = () => {
  const elements = document.querySelectorAll("p, div, form");
  const windowHeight = window.innerHeight;
  for (var i = 0; i < elements.length; i++) {
    const elementTop = elements[i].getBoundingClientRect().top;

    if (elementTop < windowHeight - 32) {
      elements[i].style.opacity = 100;
    } else {
      elements[i].style.opacity = 0;
    }
  }
};

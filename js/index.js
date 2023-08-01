// copyright

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `Hayley ${thisYear}`;
footer.appendChild(copyright);

// skills

const skills = ["JavaScript", "React", "HTML", "CSS", "Ruby"];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");


for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");

  skill.innerText = skills[i];
  skillsList.appendChild(skill);
};

// message headings

const messageForm = document.querySelector('form[name="leave_message"]');

const messageSection = document.getElementById("messages");
messageSection.style.display = "none";

// message functionality

messageForm.addEventListener("submit", function(event) {

  // prevent refresh

  event.preventDefault();

  // create message

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  // add message

  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span>wrote: ${usersMessage}</span>
  `;

  messageSection.style.display = "block";
  messageList.append(newMessage);

  // remove message

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";
  newMessage.append(removeButton);

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;

    entry.remove();

    // hide message header

    if (messageSection.style.display = "block") {
      messageSection.style.display = "none";
    };
  });

  // reset form

  messageForm.reset();
});

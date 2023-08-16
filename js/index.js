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

const leaveMessageSection = document.getElementById("leave_a_message");

const messageSection = document.getElementById("messages");
messageSection.style.display = "none";

// message form focus

messageForm.addEventListener('focusin', (event) => {
  messageForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

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

  messageSection.style.display = "inline-block";
  messageList.append(newMessage);
  messageSection.scrollIntoView({ behavior: "smooth" });

  // create buttons

  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  const createRemoveButton = () => {
    removeButton.innerText = "remove";
    removeButton.type = "button";
    newMessage.append(removeButton); 
  };

  const createEditButton = () => {
    editButton.innerText = "edit";
    editButton.type = "button";
    newMessage.append(editButton);
  };

  createRemoveButton();
  createEditButton();

  // remove

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;

    entry.remove();

    // hide message header

    if (messageSection.style.display = "inline-block" && !messageList.hasChildNodes()) {
      messageSection.style.display = "none";
    };
  });

  // edit

  editButton.addEventListener("click", function () {
    let editTextBox = document.createElement("textarea");
    const saveButton = document.createElement("button");

    newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a>
      <span>wrote: </span>
    `;

    editTextBox.name = "editTextBox";
    editTextBox.required = true;
    editTextBox.value = usersMessage;
    newMessage.append(editTextBox);

    saveButton.innerText = "save";
    saveButton.type = "button";
    newMessage.append(saveButton);

    // save edit

    saveButton.addEventListener("click", function () {
      const usersEditedMessage = editTextBox.value;

      newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span>wrote: ${usersEditedMessage}</span>
      `;

      createRemoveButton();
      createEditButton();
    });
  });

  // reset form

  messageForm.reset();
});

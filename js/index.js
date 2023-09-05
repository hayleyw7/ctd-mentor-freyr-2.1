// copyright

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `Hayley ${thisYear}`;
footer.appendChild(copyright);

// skills

const skills = ["JavaScript", "React", "jQuery", "HTML", "CSS", "Ruby", "Rails", "Cypress"];

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

    if (messageSection.style.display = "inline-block" && messageList.childElementCount == 0) {
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

// projects - ajax

const githubRequest = new XMLHttpRequest();
githubRequest.open("GET", "https://api.github.com/users/hayleyw7/repos");
githubRequest.send();

// projects - load

githubRequest.addEventListener("load", function (event) {
  const repositories = JSON.parse(this.response);
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  let displayedRepos = [];

  // decide which repos to add to dom

  for (let i = 0; i < repositories.length; i++) {
    let repositoryURL = repositories[i].html_url;
    let repositoryName = repositories[i].name;

    // filter out specific repos

    const repoNeedsShown = () => {
      const hiddenKeywords = [
        "practice",
        "curriculum",
        "prework",
        "fundamentals",
        "hayleyw7",
        "homework",
        "2",
        "first"
      ];

      for (let j = 0; j < hiddenKeywords.length; j++) {
        const keyword = hiddenKeywords[j];

        if (repositoryName.includes(keyword)) {
          return false;
        };
      };
      return true;
    };

    if (repoNeedsShown()) {

      // format repo names

      let repositoryNameWords = repositoryName.split(/[-_]|(?=[A-Z])/);

      for (let k = 0; k < repositoryNameWords.length; k++) {
        repositoryNameWords[k] =
          repositoryNameWords[k].charAt(0).toUpperCase() +
          repositoryNameWords[k].slice(1);
      };

      repositoryName = repositoryNameWords.join(" ");

      // add repo to displayed repo list

      displayedRepos.push({ name: repositoryName, url: repositoryURL });
    };
  };

  // add repos to dom

  for (let i = 0; i < displayedRepos.length; i++) {
    const repoName = displayedRepos[i].name;
    const repoURL = displayedRepos[i].url;

    // Create an anchor element and set its attributes
    const project = document.createElement("li");
    const link = document.createElement("a");
    link.innerText = repoName;
    link.href = repoURL;
    link.target = "_blank"; // Open the link in a new tab

    // Append the anchor element to the list item
    project.appendChild(link);

    // Append the list item to the project list
    projectList.appendChild(project);
  };

  // rm last repo if odd num

  if (displayedRepos.length % 2 === 1) {
    const lastProject = projectList.lastChild;
    if (lastProject) {
      projectList.removeChild(lastProject);
    };
  };
});

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

// projects - show

function displayProjects(repositories) {
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  let displayedRepos = [];

  // decide which repos to show

  for (let i = 0; i < repositories.length; i++) {
    let repositoryName = repositories[i].name;
    let repositoryURL = repositories[i].html_url;
    let repositoryDate = repositories[i].created_at.split("-")[0];

    // filter out specific repos

    function repoNeedsShown() {
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
        }
      }
      return true;
    };

    function setRepoToShow() {

      // format repo names

      let repositoryNameWords = repositoryName.split(/[-_]|(?=[A-Z])/);

      for (let k = 0; k < repositoryNameWords.length; k++) {
        repositoryNameWords[k] =
          repositoryNameWords[k].charAt(0).toUpperCase() +
          repositoryNameWords[k].slice(1);
      }

      repositoryName = repositoryNameWords.join(" ");

      // add repo to displayed repo list

      displayedRepos.push({
        name: repositoryName,
        url: repositoryURL,
        date: repositoryDate
      });
    };

    if (repoNeedsShown()) {
      setRepoToShow();
    };
  };

  // show repos

  for (let i = 0; i < displayedRepos.length; i++) {
    const project = document.createElement("li");
    const link = document.createElement("a");
    const dateLink = document.createElement("span");

    let name = displayedRepos[i].name;
    let url = displayedRepos[i].url;
    let date = displayedRepos[i].date;

    link.innerText = name;
    dateLink.innerHTML = ` <a href="${url}">(${date})</a>`;

    project.appendChild(link);
    project.appendChild(dateLink);
    projectList.appendChild(project);
  };

  // hide last repo if odd num

  if (displayedRepos.length % 2 === 1) {
    const lastProject = projectList.lastChild;
    if (lastProject) {
      projectList.removeChild(lastProject);
    };
  };
};

// projects - ajax call

fetch("https://api.github.com/users/hayleyw7/repos")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(repositories => {
    displayProjects(repositories);
  })
  .catch(error => {
    const projectSection = document.getElementById("projects");
    projectSection.style.display = "none";
    console.error("Error fetching projects from GitHub:", error);
  });

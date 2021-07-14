const input = document.querySelector(".input-container input")
const btn = document.querySelector(".btn-container")

const template = document.querySelector("#job-title-template")
const container = document.querySelector(".jobs-container")
const jobNumber = document.querySelector("#job-number")

// Use fetch to load a JSON file (jobs.json)
function getJobsData() {
  return fetch("jobs.json")
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}

// Filter Jobs - Search Jobs
btn.addEventListener("click", () => {
  let inputValue = input.value
  getJobsData().then((jobs) => {
    let filteredJobs = searchJobs(jobs, inputValue)
    showJobs(filteredJobs)
  })
})

function searchJobs(jobs, searchText) {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText.toLowerCase()) ||
        job.type.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company.toLowerCase().includes(searchText.toLowerCase()) ||
        job.requirements.content
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) {
        return true
      } else {
        return false
      }
    })
    return filteredJobs
  } else {
    return jobs
  }
}

function showJobs(jobs) {
  // const jobsContainer = document.querySelector(".jobs-container")
  let jobsHTML = ""
  jobs.forEach((job) => {
    jobsHTML += `
      <div class="job-title">
          <div class="top">
              <img src="${job.logo}" alt="">
              <i class="fas fa-ellipsis-h"></i>
          </div>
          <div class="job-role">
              <span>${job.roleName}</span>
          </div>
          <div class="job-description">
              <span>${job.requirements.content}</span>
          </div>
          <div class="job-btn-container">
              <div class="job-btn apply-now">
                  Apply Now
              </div>
              <div class="job-btn">
                  Message
              </div>
          </div>
      </div>
    `
  })
  container.innerHTML = jobsHTML
}

// Render Jobs
function renderJobs(job) {
  const jobTitle = template.content.cloneNode(true)

  // Showing how many jobs available
  jobNumber.innerHTML = job.id

  // Company logo
  const logo = jobTitle.querySelector(".top img")
  logo.src = job.logo

  // Senior Software Engineer
  const jobRole = jobTitle.querySelector(".job-role span")
  jobRole.innerText = job.roleName

  // Job Description
  const jobDescription = jobTitle.querySelector(".job-description span")
  jobDescription.innerText = job.requirements.content

  container.appendChild(jobTitle)
}

getJobsData().then((data) => {
  jobsData(data)
})
function jobsData(job) {
  job.forEach(renderJobs)
}

getJobsData().then((data) => {
  showJobs(data)
})

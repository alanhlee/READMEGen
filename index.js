const { prompt } = require('inquirer')
const axios = require('axios')
const { writeFile, appendFile } = require('fs')
const { promisify } = require('util')
const writeFilePromise = promisify(writeFile)

prompt([
  {
    type: 'input',
    name: 'username',
    message: 'What is your GitHub Username?',
  },
  {
    type: 'input',
    name: 'title',
    message: 'Title of your app?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description of your app?',
  },
  {
    type: 'input',
    name: 'toc',
    message: 'Table of Contents?'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How would you install this repo?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Usage?'
  },
  {
    type: 'input',
    name: 'license',
    message: 'License?',
  },
  {
    type: 'input',
    name: 'contributors',
    message: 'Contributors?'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Tests that can be run on your app?'
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Questions?'
  },
])
  .then(info => {
    axios.get(`https://api.github.com/users/${info.username}`)
      .then((githubInfo) => {
        // console.log(githubInfo.data)
        
        writeFilePromise('README.md',
`
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/alanhlee/READMEGen/LICENSE)
# ${info.title}

###### ${info.description}

## ${info.toc}

## How to install: ${info.installation}

###### Program Usage:${info.usage}
###### ${info.license}©
###### ${info.contributors}
###### ${info.tests}
###### ${info.questions}

![Github Profile Picture](${githubInfo.data.avatar_url})
Email: ${githubInfo.data.email}
`
)})
.catch(err => console.log(err))
      })
    .catch(err => console.log(err))
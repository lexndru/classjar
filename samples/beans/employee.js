module.exports = {
  '$first.name': 'string',
  '$last.name': 'string',
  'job.title': {
    defaultValue: 'ceo',
    typeCheck: v => ['devops', 'project manager', 'software developer'].indexOf(v) > -1
  },
  'salary': 'uint16'
}

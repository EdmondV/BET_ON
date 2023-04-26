const request = require('request');
const fs = require('fs');

const obj = JSON.parse(fs.readFileSync('test.json', { encoding: 'utf8' }));

const failed = obj.testResults
  .filter((t) => t.status === 'failed')
  .map((t) => t.assertionResults)
  .map((t) => t.filter((r) => r.status === 'failed').map((r) => r.title));

request.post({
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  url: 'https://hooks.slack.com/services/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',
  body: `payload={
    'attachments': [
        {
            'title': '${obj.numPassedTests} tests passed. ${obj.numFailedTests} tests failed:',
            'text': '${failed.join('\n')}',
        }
    ]
  }`,
});

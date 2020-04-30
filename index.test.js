const process = require('process');
const cp = require('child_process');
const path = require('path');

test('test runs', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = '0.21.1';
    process.env['INPUT_TERRAFORM-VERSION'] = '0.12.12'
    process.env['RUNNER_TOOL_CACHE'] = 'cache'
    process.env['RUNNER_TEMP'] = 'tmp'
    const ip = path.join(__dirname, 'index.js');
    console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})

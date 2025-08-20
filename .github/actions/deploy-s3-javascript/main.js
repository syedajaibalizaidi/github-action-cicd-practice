// FIRST WE  NEED TO RUN THIS CMD IN THE TERMINAL -> npm init -y ->> it unlocks the npm command 
// npm install @actions/core @actions/github @actions/exec ->> toolkit provided by GHA , An official set of js packages we can use in our js actions. run this cmd in terminal. 

const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // Getting Input Values 
    const bucket = core.getInput('bucket', {required: true});
    const bucketReigon = core.getInput('bucket-reigon', {rquired: true});
    const distFolder = core.getInput('dist-folder', {required: true});

    // Uploading files to bucket 
    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --reigon ${bucketReigon}`) // usage of aws cli here. 

    const webUrl = `http://${bucket}.s3-website-${bucketReigon}.amazonaws.com`
    core.setOutput('web-url', webUrl); // setting the output 
}

run(); 
const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");

async function run() {
  try {
    const terragruntVersion = core.getInput("terragrunt-version");
    core.debug("terragrunt version " + terragruntVersion);
    const terraformVersion = core.getInput("terraform-version");
    core.debug("terraform version " + terraformVersion);

    const tgName = 'terragrunt';
    const tfName = 'terraform';

    let tgCachePath = tc.find(tgName, terragruntVersion);
    if(!tgCachePath) {
        core.info('no terragrunt found in cache');
        const tgDownloadUrl = `https://github.com/gruntwork-io/terragrunt/releases/download/v${terragruntVersion}/terragrunt_linux_amd64`;
        core.info(`⬇️ downloading ${tgDownloadUrl}`);
        const tgDownloadPath = await tc.downloadTool(tgDownloadUrl);
        core.info('downloaded terragrunt to ' + tgDownloadPath);
        fs.chmodSync(tgDownloadPath, "755")
        await tc.cacheFile(tgDownloadPath, tgName, tgName, terragruntVersion);
        tgCachePath = tc.find(tgName, terragruntVersion);
        core.info(`adding ${tgCachePath} to PATH`);
        core.addPath(tgCachePath);
    } else {
        core.info('terragrunt found in cache at ' + tgCachePath);
        core.info(`adding ${tgCachePath} to PATH`);
        core.addPath(tgCachePath);
    }
    // exec.exec('terragrunt -v');

    let tfCachePath = tc.find(tfName, terraformVersion);
    if(!tfCachePath) {
        core.info('no terraform found in cache');
        const terraformDownloadUrl = `https://releases.hashicorp.com/terraform/${terraformVersion}/terraform_${terraformVersion}_linux_amd64.zip`;
        core.info(`⬇️ downloading ${terraformDownloadUrl}`);
        const tfZipDownloadPath = await tc.downloadTool(terraformDownloadUrl);
        const tfExtractedPath = await tc.extractTar(tfZipDownloadPath)
        const tfBinPath = path.join(tfExtractedPath, tfName)
        await tc.cacheFile(tfBinPath, tfName, tfName, terraformVersion)
        tfCachePath = tc.find(tfName, terraformVersion);
        core.info(`adding ${tfCachePath} to PATH`);
        core.addPath(tgCachePath);
    } else {
        core.info('terraform found in cache at ' + tfCachePath);
        core.info(`adding ${tfCachePath} to PATH`);
        core.addPath(tfCachePath);
    }
    // exec.exec('terraform version');
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

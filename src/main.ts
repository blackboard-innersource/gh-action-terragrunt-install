import * as core from "@actions/core";
import * as tc from "@actions/tool-cache"
import * as io from "@actions/io";
import * as path from "path";

async function run(): Promise<void> {
  try {
    const terragruntVersion: string = core.getInput("terragrunt-version");
    core.debug("terragrunt version " + terragruntVersion);
    const terraformVersion: string = core.getInput("terraform-version");
    core.debug("terraform version " + terraformVersion);

    const binPath = "bin";
    io.mkdirP("bin");

    const tgBinPath = path.join(binPath, "terragrunt");
    await tc.downloadTool(`https://github.com/gruntwork-io/terragrunt/releases/download/v${terragruntVersion}/terragrunt_linux_amd64`,
      tgBinPath
    );
    tc.cacheFile(binPath, "terragrunt", "terragrunt", terragruntVersion);
    core.addPath(tgBinPath);

    const terraformBinPath = path.join(binPath, "terraform");
    const tfDownloadPath = await tc.downloadTool(`https://releases.hashicorp.com/terraform/${terraformVersion}/terraform_${terraformVersion}_linux_amd64.zip`)
    await tc.extractZip(tfDownloadPath, binPath);
    tc.cacheFile(terraformBinPath, "terraform", "terraform", terraformVersion);
    core.addPath(terraformBinPath);
    io.rmRF(tfDownloadPath);
    
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

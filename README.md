# Terragrunt Install GitHub Action

This action takes in a terragrunt and terraform verion, downloads the tools, adds them to PATH, and caches them for reuse.

## Inputs

### `terragrunt-version`

**Required** Terragrunt version.

### `terraform-version`

**Required** Terraform version.

## Example Usage

```yaml
uses: blackboard-innersource/gh-action-terragrunt-install@master
with:
  terragrunt-version: "0.1.0"
  terraform-version: "0.1.0"
```

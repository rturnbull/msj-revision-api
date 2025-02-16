#!/bin/bash

# log in to the GitHub CLI: "gh auth login". The password is the GH_TOKEN.
# use the command below to make the file executable
# then execute it from the root of the project directory
# chmod +x import-secrets.sh

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it first:"
    echo "macOS: brew install gh"
    echo "Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub first:"
    echo "gh auth login"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo ".env file not found in current directory"
    exit 1
fi

# Get list of existing secrets and check if any exist
existing_secrets=$(gh secret list | awk '{print $1}' | tail -n +2)
if [ ! -z "$existing_secrets" ]; then
    echo "Error: Found existing secrets in GitHub:"
    echo "$existing_secrets"
    echo "Please remove existing secrets first if you want to import new ones."
    echo "You can remove secrets using: gh secret remove <secret-name>"
    exit 1
fi

echo "Reading secrets from .env file..."

# Read .env file and create secrets
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ $key != \#* ]] && [ ! -z "$key" ]; then
        # Trim whitespace
        key=$(echo $key | xargs)
        value=$(echo $value | xargs)
        
        if [ ! -z "$value" ]; then
            echo "Setting secret: $key"
            # Use -f flag to not prompt for confirmation
            echo "$value" | gh secret set "$key"
        fi
    fi
done < .env

echo "Secrets import complete!"
echo "You can verify secrets using: gh secret list"

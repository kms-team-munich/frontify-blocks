# 🧱 Zeiss Frontify Blocks

## Development

### Requirements:

- Node 16
- [pnpm 7](https://pnpm.io/installation)
- Access to a Frontify styleguide

### Setup

1. Clone this repository
   ```
   $ git clone git@github.com:kms-team-munich/zeiss-frontify-blocks.git
   ```
2. Install the dependencies
   ```
   $ pnpm install
   ```
3. Create a build of the utilities
   ```
   $ pnpm build
   ```
4. Serve a block
   ```
   $ cd packages/<block name>
   $ pnpm serve
   ```
5. Go to your Frontify guideline and switch to edit mode
6. Click on the plus icon and add a `Local Block Development` block
7. Choose port (default is 5600) and click OK

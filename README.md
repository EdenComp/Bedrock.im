# Bedrock.im

Bedrock.im is a decentralized platform for creating and sharing digital content.
Bedrock.im allows you to create workspaces as the form of notes, supporting the `Markdown` format.

You can use Bedrock.im for almost anything, from taking notes to creating a blog post, or organizing your thoughts.

Bedrock.im is offering a secure and private environment for your content.
You will be soon able to share your notes privately with your team, or publicly with the world.

> :warning: You need an Ethereum Mainnet wallet on Metamask to use the application.
> More chains and providers will be supported soon.

## Development

### Runtime

Be sure to have installed Node v20.11.0 (or a compatible version)<br>
You can use [nvm](https://github.com/nvm-sh/nvm) to manage your Node versions and install the current one with the following command:<br>
(In the projet root directory)

```bash
nvm use
```

### Package manager

This project uses [yarn](https://yarnpkg.com/) as package manager. You can install it with the following command:

```bash
npm install -g yarn
```

### Dependencies

To install the project dependencies, run the following command:

```bash
yarn install
```

This project uses:

- [TypeScript](https://www.typescriptlang.org/) as the main language for the project
- [Vite](https://vitejs.dev/) as the build tool
- [React](https://reactjs.org/) as the main library for the user interface
- [TailwindCSS](https://tailwindcss.com/) as the utility-first CSS framework
- [Aleph SDK](https://aleph-im.gitbook.io/ts-sdk/) to interact with the Aleph network

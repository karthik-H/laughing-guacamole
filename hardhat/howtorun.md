# How to Run: Hardhat User Data Tokenization

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Setup
1. Clone the repository and navigate to the `hardhat` directory:
   ```bash
   cd hardhat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Edit `.env` and set your `PRIVATE_KEY` (for deployment), `RPC_URL` (Ethereum node), and `CSV_PATH` (path to your user CSV file).

## Compile Contracts
```bash
npx hardhat compile
```

## Run Tokenization Script
```bash
npx hardhat run scripts/tokenizeUsers.ts --network <network>
```
Replace `<network>` with your configured network (e.g., `localhost`, `goerli`, etc.).

## Deploy Contract Only
```bash
npx hardhat run scripts/deploy.ts --network <network>
```

## CSV Format
- Place your CSV file at the path specified in `.env` (default: `./data/users.csv`).
- Each row should represent a user. Example:
  ```csv
  id,name,email
  1,Alice,alice@example.com
  2,Bob,bob@example.com
  ```

## Notes
- Ensure your RPC node and account have sufficient funds for deployment and minting.
- All environment variables must be set in `.env`.

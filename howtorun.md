# How to Run: JSONPlaceholder User to CSV Exporter

## Prerequisites
- Python 3.8+
- pip (Python package manager)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-directory>
   ```

2. **Create and activate a virtual environment (recommended)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Edit the `.env` file if you want to change the API URL or output CSV path.

5. **Run the application**
   ```bash
   python src/main.py
   ```

6. **Check the output**
   - The CSV file will be generated at the path specified in `.env` (default: `output/users.csv`).

## Troubleshooting
- Ensure your `.env` file is present and correctly configured.
- If you encounter errors, check your Python version and dependency installation.
- For logging and error details, see the console output.

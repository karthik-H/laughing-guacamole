import logging
from src.controller.user_controller import UserController

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

def main():
    try:
        UserController.export_users_to_csv()
    except Exception as e:
        logging.error(f"Application error: {e}")

if __name__ == "__main__":
    main()

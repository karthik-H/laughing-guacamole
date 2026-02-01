import csv
import os
import logging
from src.service.user_service import UserService
from src.config.config import Config

class UserController:
    @staticmethod
    def export_users_to_csv():
        users = UserService.get_all_users()
        if not users:
            logging.warning("No users to export.")
            return
        flat_users = [user.to_flat_dict() for user in users]
        fieldnames = sorted(flat_users[0].keys())
        os.makedirs(os.path.dirname(Config.OUTPUT_CSV), exist_ok=True)
        try:
            with open(Config.OUTPUT_CSV, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(flat_users)
            logging.info(f"Exported {len(flat_users)} users to {Config.OUTPUT_CSV}")
        except Exception as e:
            logging.error(f"Failed to write CSV: {e}")
            raise

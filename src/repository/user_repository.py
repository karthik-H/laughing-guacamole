import requests
from src.config.config import Config
from typing import List, Dict
import logging

class UserRepository:
    @staticmethod
    def fetch_users() -> List[Dict]:
        try:
            response = requests.get(Config.API_URL, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logging.error(f"Failed to fetch users: {e}")
            raise

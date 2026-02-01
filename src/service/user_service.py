from src.repository.user_repository import UserRepository
from src.domain.user import User
from typing import List, Dict
import logging

class UserService:
    @staticmethod
    def get_all_users() -> List[User]:
        raw_users = UserRepository.fetch_users()
        users = []
        for data in raw_users:
            try:
                users.append(User(data))
            except Exception as e:
                logging.warning(f"Skipping user due to error: {e}")
        return users

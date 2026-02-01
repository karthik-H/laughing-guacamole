from typing import Dict, Any

class User:
    def __init__(self, data: Dict[str, Any]):
        self.data = data

    def to_flat_dict(self) -> Dict[str, Any]:
        # Flatten nested fields for CSV output
        flat = self.data.copy()
        if 'address' in flat:
            address = flat['address']
            for k, v in address.items():
                if isinstance(v, dict):
                    for subk, subv in v.items():
                        flat[f'address_{k}_{subk}'] = subv
                else:
                    flat[f'address_{k}'] = v
            del flat['address']
        if 'company' in flat:
            company = flat['company']
            for k, v in company.items():
                flat[f'company_{k}'] = v
            del flat['company']
        return flat

import json

def sort_keys_alphabetically(json_data):
    if isinstance(json_data, dict):
        sorted_keys = sorted(json_data.keys())
        sorted_data = {key: sort_keys_alphabetically(json_data[key]) for key in sorted_keys}
        return sorted_data
    elif isinstance(json_data, list):
        return [sort_keys_alphabetically(item) for item in json_data]
    else:
        return json_data

if __name__ == "__main__":
    # Replace "your_json_file_path" with the actual path of your JSON file.
    your_json_file_path = "stem.json"

    with open(your_json_file_path, "r") as file:
        json_data = json.load(file)

    sorted_json_data = sort_keys_alphabetically(json_data)

    # Replace "sorted_json_file_path" with the desired path to store the sorted JSON data.
    sorted_json_file_path = "sortedstem.json"

    with open(sorted_json_file_path, "w") as file:
        json.dump(sorted_json_data, file, indent=2)

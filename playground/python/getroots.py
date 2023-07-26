import os
import json

def extract_stem_key_values(directory_path, output_file_path):
    data_to_store = {}
    for filename in os.listdir(directory_path):
        if filename.endswith(".json"):
            file_path = os.path.join(directory_path, filename)
            with open(file_path, "r") as file:
                try:
                    data = json.load(file)
                    if "stem" in data and data["stem"]:
                        stem_value = data["stem"]
                        data_to_store[os.path.splitext(filename)[0]] = stem_value
                except json.JSONDecodeError:
                    print(f"Error decoding JSON file: {file_path}")

    with open(output_file_path, "w") as output_file:
        json.dump(data_to_store, output_file)

if __name__ == "__main__":
    # Replace "your_directory_path" with the specific directory path where your JSON files are located.
    directory_path = "../docs/s"

    # Replace "output_file.json" with the specific path of the output JSON file.
    output_file_path = "vc_stem.json"

    extract_stem_key_values(directory_path, output_file_path)

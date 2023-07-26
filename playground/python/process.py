import os
import json

def process_json(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Create the new data structure based on the template
    new_data = {
        "term": data.get("t", ""),
        "stem": data.get("stem", ""),  # Set default value if "stem" is missing
        "id": "",  # The 'id' field will be populated later
        "properties": {
            "tags": {},
            "basic": {
                "pos": "",
                "ipa": ""
            },
            "level": {
                "cefr": "",
                "ilrdf": ""
            },
            "other": {
                "author": "",
                "time": "",
                "location": "",
                "device": "",
                "license": "",
                "reference": ""
            }
        },
        "definitions": [],
        "declension": {},
        "conjugation": {}
    }

    # Process the definitions and translations
    index = 1  # Initialize the index outside the loop
    for item in data.get("h", []):  # Set default empty list if "h" is missing
        for entry in item.get("d", []):  # Set default empty list if "d" is missing
            definition = {
                "definition": {
                    "tmp": entry.get("f", ""),
                    "ami": "",
                    "eng": "",
                    "zh-tw": "",
                    "jpn": ""
                },
                "translation": {
                    "tmp": entry.get("e", [""])[0],  # Set default empty string if "e" is missing
                    "ami": "",
                    "eng": "",
                    "zh-tw": "",
                    "jpn": ""
                }
            }
            new_data["definitions"].append(definition)
            index += 1  # Increment the index within the loop to maintain sequence

    # Add id based on the sequence
    new_data["id"] = str(index)

    # Write the new data to the output file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)

# Replace '../docs/p' and './dict' with the actual paths to your folders
input_folder = './origin'
output_folder = './dict'

# Process each JSON file in the input folder
for filename in os.listdir(input_folder):
    if filename.endswith('.json'):
        input_file = os.path.join(input_folder, filename)
        output_file = os.path.join(output_folder, filename)
        process_json(input_file, output_file)

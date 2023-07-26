import os
import json

folder_path = '../docs/p/'

# Get the names of all JSON files in the folder
json_files = [filename[:-5] for filename in os.listdir(folder_path) if filename.endswith('.json')]

# Sort the list of JSON file names (optional)
json_files.sort()

# Save the list of JSON file names to a JSON file
output_json_file = 'p.json'
with open(output_json_file, 'w') as file:
    json.dump(json_files, file)
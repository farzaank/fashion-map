import pandas as pd

# 60-69.9%,50-59.9%,40-49.9%,30-39.9%,20-29.9%,10-19.9%,<0-9.9%
rating_maps = {
    "A": "60-69.9%",
    "BBB": "60-59.9%",
    "BB": "40-49.9%",
    "B": "30-39.9%",
    "CCC": "20-29.9%",
    "CC": "20-29.9%",
    "C": "10-19.9%",
    "D": "<0-9.9%",
}

country_score_pairs = []

# Open the file in read mode
with open("datas2016.txt", "r") as file:
    # Iterate over each line in the file
    for line in file:
        line = line.strip().split(" ")
        country = line[1:]
        if len(country) == 7:
            country = country[0]
        else:
            country = " ".join(country[0 : len(country) - 6])
        score = rating_maps[line[0]]
        country_score_pairs.append((country, score))


import json

country_score_dict = dict(country_score_pairs)

# Converting the dictionary to JSON format
json_output = json.dumps(country_score_dict, indent=4)

# Printing the JSON formatted string
print(json_output)

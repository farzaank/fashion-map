import pandas as pd

# Load the CSV file
file_path = "datas.csv"
data = pd.read_csv(file_path)

# Display the first few rows of the dataframe to understand its structure
data.head()

country_score_pairs = []

# Iterating through each column and assigning scores to countries
for column in data.columns:
    countries = data[column].dropna()  # Drop NaN values
    for country in countries:
        country_score_pairs.append((country, column))


import json

country_score_dict = dict(country_score_pairs)

# Converting the dictionary to JSON format
json_output = json.dumps(country_score_dict, indent=4)

# Printing the JSON formatted string
print(json_output)

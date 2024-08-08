# import json
# import pandas as pd
# from datetime import datetime

# with open('/src/assets/data/data.json') as f:
#     data = json.load(f)

# import pandas as pd
# from datetime import datetime

# #df = pd.DataFrame(data['results'])
# df = pd.DataFrame(data)

# import pandas as pd

# def apply_longlag_transformations(df):
#     df['latitude'] = df['lat_long'].apply(lambda x: x['lat'] if x is not None else None)
#     df['longitude'] = df['lat_long'].apply(lambda x: x['lon'] if x is not None else None)
#     df.drop(columns=['lat_long'], inplace=True)
#     return df

# def apply_datetime_transformations(df):
#     # Print data types of the dataframe columns
#     print("Data types before conversion:")
#     print(df.dtypes)
    
#     # Print first few entries of 'time' column to inspect
#     print("Sample of 'time' column before conversion:")
#     print(df['time'].head())
    
#     # Ensure 'time' column values are strings
#     df['time'] = df['time'].astype(str)
    
#     # Convert 'time' column to datetime
#     df['datetime'] = pd.to_datetime(df['time'], errors='coerce', utc=True)
    
#     # Debugging: Check for non-convertible values
#     non_convertible = df[df['datetime'].isna() & df['time'].notna()]
#     if not non_convertible.empty:
#         print("Non-convertible 'time' values:")
#         print(non_convertible['time'])
    
#     # Drop rows where conversion to datetime failed
#     df = df.dropna(subset=['datetime'])
    
#     # Additional debugging: Check 'datetime' column
#     print("Sample of 'datetime' column after conversion:")
#     print(df['datetime'].head())
    
#     # Convert timezone-aware datetime to UTC and then floor to the nearest second
#     df['datetime'] = df['datetime'].dt.tz_convert(None).dt.floor('s')
#     df['date'] = df['datetime'].dt.date
#     df['time_only'] = df['datetime'].dt.time
    
#     # Print data types after conversion
#     print("Data types after conversion:")
#     print(df.dtypes)
    
#     return df

# # Example usage
# # df_bins = apply_longlag_transformations(df)
# df_bins = df.dropna(subset=['time'])
# df_bins = apply_datetime_transformations(df_bins)

# print(len(df_bins))


# ############## export
# # Red plot with average fill level per month in current year
# df_bins['year'] = pd.to_datetime(df_bins['datetime']).dt.strftime('%Y')
# year2024 = df_bins.loc[df_bins['year'] == '2024']

# year2024['month'] = pd.to_datetime(year2024['datetime']).dt.strftime('%B')

# temperature = year2024.groupby('month')['temperature'].mean().sort_values(ascending=False).reset_index()

# import json
# temperature_str = temperature.astype(str)
# temp_dict = temperature_str.to_dict(orient='records')
# temp_json = json.dumps(temp_dict)

# with open('/home/mardeen/Desktop/black-dashboard-angular-master/src/assets/data/temperature.json', "wb") as f:
#     f.write(temp_json.encode())

# # bins data
# import json
# bins_str = df_bins.astype(str)
# bins_dict = bins_str.to_dict(orient='records')
# bins_json = json.dumps(bins_dict)

# with open('/home/mardeen/Desktop/black-dashboard-angular-master/src/assets/data/data.json', "wb") as f:
#     f.write(bins_json.encode())

# # live
# # live bins data
# live_turno_corrente = df_bins.groupby('dev_id').agg({
#     'filllevel': 'last',
#     'temperature': 'last',
#     'datetime': 'last',
#     'battery':'last'}).reset_index()
    
# def create_dict_from_dataframe(df, column_name):
#     """Create a Dict frm a dataframe grouped by Macchina column name"""
#     result_dict = dict()
#     for val in df[column_name].unique():
#         filtered_df = df[df[column_name] == val]
#         result_dict[str(val)] = filtered_df.to_dict('records')
#     return result_dict
# live_turno_corrente = live_turno_corrente.astype(str)
# live_turno_corrente_dict = create_dict_from_dataframe(live_turno_corrente, 'dev_id')
# total_json = {}
# import json
# total_json = live_turno_corrente_dict
# total_json = json.dumps(total_json)

# with open('/home/mardeen/Desktop/black-dashboard-angular-master/src/assets/data/live.json', "wb") as f:
#     f.write(total_json.encode())


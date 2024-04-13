import csv
import random


def generate_data(num_rows):
    data = []
    for _ in range(num_rows):
        house_size = round(random.uniform(0.1, 5), 2)
        num_bedrooms = random.randint(1, 6)
        num_bathrooms = random.randint(1, 4)
        year_built = random.randint(1950, 2022)
        distance_from_city_center = round(random.uniform(1, 50), 2)
        price = round(random.uniform(10, 1000), 2)
        data.append([house_size, num_bedrooms, num_bathrooms, year_built, distance_from_city_center, price])
    return data


def save_to_csv(data, filename):
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['House Size (Acres)', 'Number of Bedrooms', 'Number of Bathrooms', 'Year Built', 'Distance from City Center (km)', 'Price (Lakhs to Crores)'])
        writer.writerows(data)


if __name__ == "__main__":
    num_rows = 10000
    data = generate_data(num_rows)
    save_to_csv(data, 'real_estate_data.csv')

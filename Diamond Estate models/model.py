import csv
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score


# noinspection PyShadowingNames
def load_data(filename):
    with open(filename, 'r') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row
        data = [list(map(float, row)) for row in reader]
    return data


# Split data into features and target variable
# noinspection PyShadowingNames
def split_data(data):
    X = [row[:-1] for row in data]
    y = [row[-1] for row in data]
    return X, y


# noinspection PyShadowingNames
def train_model(X_train, y_train):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model


# noinspection PyShadowingNames
def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print("Mean Squared Error:", mse)
    print("R^2 Score:", r2)


# Save the trained model
# noinspection PyShadowingNames
def save_model(model, filename):
    joblib.dump(model, filename)
    print("Model saved as", filename)


if __name__ == "__main__":
    data = load_data('real_estate_data.csv')

    X, y = split_data(data)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = train_model(X_train, y_train)

    # Evaluate the model
    print("Model Evaluation:")
    evaluate_model(model, X_test, y_test)

    save_model(model, 'model2.joblib')

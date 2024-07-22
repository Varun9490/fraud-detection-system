import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Example dataset
data = {
    'user_id': [1, 2, 1, 2, 3],
    'amount': [5000, 20000, 6000, 500, 30000],
    'description': ['purchase', 'withdrawal', 'purchase', 'transfer', 'withdrawal'],
    'fraudulent': [0, 1, 0, 0, 1]  # Labels: 0 for non-fraudulent, 1 for fraudulent
}

df = pd.DataFrame(data)

# Preprocess the data
df['is_high_amount'] = df['amount'] > 10000
X = df[['amount', 'is_high_amount']]
y = df['fraudulent']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Test the model
y_pred = clf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(classification_report(y_test, y_pred))

# Save the model
joblib.dump(clf, 'fraud_detection_model.pkl')

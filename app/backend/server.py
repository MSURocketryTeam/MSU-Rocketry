from flask import Flask, render_template, jsonify
from flask_cors import CORS 
import serial
import threading
import ast 

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

SERIAL_PORT = "/dev/tty.usbserial-A10NX6XN"
BAUD_RATE = 9600 

ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)

latest_data = "Waiting for data..."

# Function to read data through serial ports
def read_xbee_data():
    global latest_data
    while True:
        try:
            data = ser.readline().decode('utf-8', errors='ignore').strip()
            print(f"Raw Data Received: {repr(data)}")  # Debugging
            if data:
                try:
                    latest_data = ast.literal_eval(data)  # Convert string to a Python list
                    print("Parsed Data:", latest_data)  # Debugging
                except (SyntaxError, ValueError):
                    print("Invalid Data:", data)  # Debugging
        except Exception as e:
            print("Error:", e)

# Start background thread to allow continous requests while data is processed
thread = threading.Thread(target=read_xbee_data, daemon=True)
thread.start()

# Define frontend
@app.route("/")
def index():
    return render_template("index.html")

# Returns latest data
@app.route("/data")
def get_data():
    return jsonify({"xbee_data": latest_data})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5002, debug=True) # Make sure this matches with react port


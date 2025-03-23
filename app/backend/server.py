from flask import Flask, jsonify
from flask_cors import CORS
import serial
import threading
import ast
import logging

app = Flask(__name__)
CORS(app)

SERIAL_PORT = "/dev/tty.usbserial-A10NX6XN"
BAUD_RATE = 9600

latest_list = []

ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)

def read_xbee_data():
    global latest_list
    while True:
        data = ser.readline()
        decoded = data.decode('utf-8').strip()
        try:
            parsed = ast.literal_eval(decoded)
            if isinstance(parsed, list):
                latest_list = parsed
                print(parsed)  # just the values
            else:
                latest_list = []
        except Exception:
            latest_list = []

# Start background thread
threading.Thread(target=read_xbee_data, daemon=True).start()

@app.route("/data")
def get_data():
    return jsonify({
        "accx": latest_list[0] if len(latest_list) >= 1 else None,
        "accy": latest_list[1] if len(latest_list) >= 2 else None,
        "accz": latest_list[2] if len(latest_list) >= 3 else None,
        "altitude": latest_list[3] if len(latest_list) >= 4 else None,
        "temperature": latest_list[4] if len(latest_list) >= 5 else None,
    })

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)

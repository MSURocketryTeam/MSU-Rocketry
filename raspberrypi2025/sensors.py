import time
import board
import serial
import csv
import json
from mpl3115a2 import adafruit_mpl3115a2
from mpu6050 import adafruit_mpu6050
import adafruit_gps


class Sensors:
    """
        Interface with Adafruit MPU6050, MPL3115A2, and GPS Breakout using their respective libraries.
    """

    def __init__(self):
        self.filename = "data.csv"
        fields = ["X Acc.", "Y Acc.", "Z Acc.", "Altitude", "Temperature"]
        # Open file for writing
        with open(self.filename, "w") as fp:
            csvwriter = csv.writer(fp, delimiter=',')
            csvwriter.writerow(fields)

        # Initialize Serial communication
        self.serial_port = serial.Serial("/dev/ttyUSB0", baudrate=9600, timeout=1)

        i2c = board.I2C()  # uses board.SCL and board.SDA

        # Initialize the MPL3115A2.
        self.mpl = adafruit_mpl3115a2.MPL3115A2(i2c)
        self.mpl.sealevel_pressure = 1022.5  # Look up the pressure at sealevel at the specific time/locat>

        # Initialize the MPU6050
        self.mpu = adafruit_mpu6050.MPU6050(i2c)

        # Initialize the GPS
        uart = serial.Serial("/dev/ttyS0", baudrate=9600, timeout=10)
        self.gps = adafruit_gps.GPS(uart, debug=False)  # Use UART/pyserial
        self.gps.send_command(b"PMTK314,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
        self.gps.send_command(b"PMTK220,1000")

    def getAccelerationX(self):
        acceleration = (round(self.mpu.acceleration[0], 3))
        return acceleration

    def getAccelerationY(self):
        acceleration = (round(self.mpu.acceleration[1], 3))
        return acceleration

    def getAccelerationZ(self):
        acceleration = (round(self.mpu.acceleration[2], 3))
        return acceleration

    def getAltitude(self):
        altitude = (round(self.mpl.altitude, 3))
        return altitude

    def getTemp(self):
        temp = (round(self.mpl.temperature, 3))
        return temp

    def sensors_send(self):
        """
        Start collecting and transmitting sensor data.
        """
        try:
            # Collect sensor data
            self.gps.update()
            lat = self.gps.latitude
            long = self.gps.longitude
            accX = self.getAccelerationX()
            accY = self.getAccelerationY()
            accZ = self.getAccelerationZ()
            altitude = self.getAltitude()
            temperature = self.getTemp()

            data = [accX, accY, accZ, altitude, temperature]

            # Write to CSV file
            with open(self.filename, "a") as fp:
                csvwriter = csv.writer(fp, delimiter=',')
                csvwriter.writerow(data)

            data_string = json.dumps(data)
            print(f"Sending: {data_string.strip()}")
            self.serial_port.write(data_string.encode("utf-8"))
            self.serial_port.flush()
        except Exception as e:
            print(f"Error: {e}")
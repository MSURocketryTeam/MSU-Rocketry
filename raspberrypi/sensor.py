import time
import board
import serial
import csv

import os
import ssl
import socketpool
import paho.mqtt.client as mqtt

from mpl3115a2 import adafruit_mpl3115a2
from mpu6050 import adafruit_mpu6050
import adafruit_gps

#yug


class Sensor:
    """
	Interface with Adafruit MPU6050, MPL3115A2, and GPS Breakout using their respective libraries.
    """

    def __init__(self):

        self.filename = "data.csv"
        fields = ["X Acc.", "Y Acc.", "Temperature", "Altitude"] #added altitude 4/3

        # open file for writing
        fp = open(self.filename, "w")
        csvwriter = csv.writer(fp, delimiter=',')
        csvwriter.writerow(fields)
        fp.close()
        # initialize mqtt connection
        client_name = "SpartanFlight"
        server_address = "raspberrypi"
        self.mqtt_client = mqtt.Client(client_name)

        self.mqtt_client.connect(server_address, 1883, 60)

        i2c = board.I2C()  # uses board.SCL and board.SDA

        # Initialize the MPL3115A2.
        self.mpl = adafruit_mpl3115a2.MPL3115A2(i2c)
        self.mpl.sealevel_pressure = 1022.5  # Look up the pressure at sealevel at the specific time/location in hectopascals

        # Initialize the MPU6050
        self.mpu = adafruit_mpu6050.MPU6050(i2c)

        # Initialize the gps
        uart = serial.Serial("/dev/ttyS0", baudrate=9600, timeout=10)
        self.gps = adafruit_gps.GPS(uart, debug=False)  # Use UART/pyserial
        self.gps.send_command(b"PMTK314,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")		
        self.gps.send_command(b"PMTK220,1000")


    def start_sensors(self):
        """
	Start collecting sensor data.
        """
        # Main loop runs forever printing the location, etc. every second.
        last_print = time.monotonic()
        while True:
            try:
                # publish altimeter data
                self.mqtt_client.publish("mpl3115a2/altitude", str( self.mpl.altitude ))
                self.mqtt_client.publish("mpl3115a2/temperature", str( self.mpl.temperature ))

                # publish accelerometer data
                self.mqtt_client.publish("mpu6050/AcX", str( self.mpu.acceleration[0] ))
                self.mqtt_client.publish("mpu6050/AcY", str( self.mpu.acceleration[1] ))
                self.mqtt_client.publish("mpu6050/AcZ", str( self.mpu.acceleration[2] ))

                # format data and log it in CSV file
                accX = str(round(self.mpu.acceleration[0]))
                accY = str(round(self.mpu.acceleration[1]))
                temperature = str(round(self.mpl.temperature, 6))
                altitude = str(round(self.mpl.altitude,6))

                print(str(self.mpu.acceleration[1]))

                self.print_data(accX, accY, temperature, altitude)

                # GPS data
                self.gps.update()
                self.mqtt_client.publish("gps/updating", "Updating...")
                # Every second print out current location details if there's a fix.
                current = time.monotonic()

                if current - last_print >= 0.1:
                    last_print = current
                    if not self.gps.has_fix:
                    # Try again if we don't have a fix yet.
                        self.mqtt_client.publish("gps/status", "Waiting for fix...")
                        self.mqtt_client.publish("gps/inuse", str( self.gps.satellites ))
                        continue

                    # We have a fix! (gps.has_fix is true)
                    self.mqtt_client.publish("gps/status", str(self.gps.has_fix))
                    self.mqtt_client.publish("gps/inuse", str( self.gps.satellites ))
                    self.mqtt_client.publish("gps/latitude", str( self.gps.latitude ))
                    self.mqtt_client.publish("gps/longitude", str( self.gps.longitude ))
                    self.mqtt_client.publish("gps/altitude", str( self.gps.altitude_m ))

                    time.sleep(0.001)

            except:
                continue


    def print_data(self, accelX, accelY, temp, altitude): #added altitude - 4/3
       """
       Log data in a single CSV file.
       """

       fp = open(self.filename, "a")
       csvwriter = csv.writer(fp)

       #formatted_x = f'{str(accelX)}'
       #formatted_y = f'{str(accelY)}'
       #formatted_temp = f'{str(temp)}'

       csvwriter.writerow([accelX, accelY, temp, altitude]) #added altitude - 4/3
       fp.close()

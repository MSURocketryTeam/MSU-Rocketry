from sensors import Sensors
from airbrakes import Servo
import json

#Start sensors
sensors = Sensors()
print("Starting sensor data collection and transmission...")

#Call servo clas
servo = Servo(pin=18)



# Main loop
while True:

        #Start sending data to backend
        sensors.sensors_send()
        accX = sensors.getAccelerationX()
        accY = sensors.getAccelerationY()
        accZ = sensors.getAccelerationZ()
        altitude = sensors.getAltitude()
        temperature = sensors.getTemp()

        #Open airbrakes at 8000 feet
        if altitude >= 8000:
                servo.open()
                servo.close()

        #Track the states of the class


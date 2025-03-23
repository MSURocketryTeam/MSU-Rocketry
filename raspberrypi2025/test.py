import time
import serial
from sensors import Sensors


def main():
    sensors = Sensors()
    print("Starting sensor data collection and transmission...")

    while True:
        sensors.sensors_start()
        time.sleep(1)  # Adjust delay as needed


if __name__ == "__main__":
    main()
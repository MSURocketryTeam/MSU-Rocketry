from sensor import Sensor
from state import State

# Bit latches: this serves as a signal that we are entering a particular stage.
# Setting one of these to true means that we are currently entering the relevan>
arm                 = False
liftoff             = False
apogee              = False
main_deploy         = False
recovery            = False

# Current state latches: when true, it means that the current stage has been re>
_armed              = False  # Rocket is armed.
_liftoff_detected   = False  # Rocket is accelerating
_apogee_detected    = False  # Algorithm detects that apogee is reached
_main_deployed      = False  # Main parachute is deployed


#######################################################################
# Initialization
#######################################################################

# initialize our sensors so we can read from them, and start collecting data
sensors = Sensor()

# initialize state object so we can determine/change state
state = State()

#TODO: xbee stuff, see MSU-Rocketry/FrontierOS/mosquittopub.py on the github

# initially, we will be in the idle state
current_state = "idle"

# Main loop

rocket_state = State()
while True:

    #######################################################################
    # Interpret state information
    #######################################################################

    # if y-acceleration equals ~9.8, we are entering the armed state
    #TODO: make this a range instead of exactly 9.8
    # if sensors.mpu.acceleration[1] == 9.8:
    sensors.start_sensors()


    acceleration = sensors.mpu.acceleration[1]
    altitude = sensors.mpl.altitude

    #for each if statement, check if the previous state is active, and next state is inactive
    #call function that checks if state exists

    if (rocket_state.state & rocket_state.LIFTOFF) == 0:
        rocket_state.lift_off(acceleration)

    elif (rocket_state.state & rocket_state.LIFTOFF) != 0 and (rocket_state.state & rocket_state.BURNOUT == 0):
        rocket_state.burnout(acceleration)

    elif (rocket_state.state & rocket_state.BURNOUT) != 0 and (rocket_state.state & rocket_state.APOGEE) == 0:
        rocket_state.descent(acceleration)

    elif (rocket_state.state & rocket_state.APOGEE) != 0 and (rocket_state.state & rocket_state.DESCENT) == 0:
        rocket_state.apogee(altitude)

    elif (rocket_state.state & rocket_state.MAIN_DEPLOY != 0):
        rocket_state.descent(acceleration)





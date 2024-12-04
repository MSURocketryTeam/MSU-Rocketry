class State:

    def __init__(self):
        '''
        Define different states of the rocket.

        Each state has an assigned bit corresponding to a bit in the binary integer "0000 0000".
        When sending a command to change the state, we can send a single byte: each of the 8 bits
        signifies which state is currently active (i.e. sending "7"  would mean "0000 0111" in binary,
        so the first 3 states (from right to left) are active)
        '''

        # idle, default state
        self.IDLE = 0

        # rocket has been armed
        self.ARMED = 1 # sending this number means we are entering this state

        # rocket is accelerating (powered flight)
        self.LIFTOFF = 2

        self.BURNOUT = 4

        # we have reached apogee, deploy drogue parachute
        self.APOGEE = 8

        # we are at an altitude of 1000 feet, deploy main parachute
        self.MAIN_DEPLOY = 16

        #we are descending
        self.DESCENT = 32

        #we have landed
        self.LANDED = 64

        self.state = self.IDLE
    
    # Set state
    def set(self, new_state):
        self.state = new_state

    # Add state (input each state as separate parameter)
    def add(self, *new_states):
        for new_state in new_states:
            self.state |= new_state

    def remove(self, *remove_state):
        for state in remove_state:
            self.state &= ~state

    #define each state
    def lift_off(self, acceleration):
        if acceleration > 0:
            self.set(self.LIFTOFF)

    def burnout(self, acceleration):
        if acceleration < 0:
            self.set(self.BURNOUT)

    def apogee(self, altitude):
        if 9900 <= altitude <= 10100:
            self.set(self.APOGEE)

    def descent(self, acceleration):
        if acceleration < 0:
            self.set(self.DESCENT)

    def landed(self, acceleration):
        if acceleration == 0:
            self.set(self.LANDED)
                
                
                
    
                
            
            

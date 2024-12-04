# given altitude and acceleration

g = -9.81 # m/s^2
m = 10 # kg
drag = 267 # N
t_step = 4 # s
alt1 = 3000
alt2 = 3100


airbrakes_accel = -drag/m
rocket_velocity = (alt2 - alt1)*t_step

t = -rocket_velocity/(g + airbrakes_accel)

apogee = 0.5*(g + airbrakes_accel)*(t**2) + rocket_velocity*t + alt2

print(apogee)

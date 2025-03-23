import time

start_time = time.time()

while True:
        elapsed_time = round(time.time() - start_time)
        hours = elapsed_time // 3600
        minutes = (elapsed_time % 3600) // 60
        seconds = elapsed_time % 60

        print(f"Elapsed Time: {hours:02}:{minutes:02}:{seconds:02}", end="\r",flush=True)
        time.sleep(1)
# To access the elapsed time, just in terminal say "cat /home/MSURocketry/clock_log.txt"
# If 'cat' doesnt work, try 'less', it will open it up as a scrollable log file
# To see live entries to the log, do 'tail -f /home/MSURocketry/clock_log.txt'